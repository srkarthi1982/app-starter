import { randomUUID } from "node:crypto";
import { ActionError, defineAction, type ActionAPIContext } from "astro:actions";
import { z } from "astro:schema";
import { ExampleItem, and, desc, eq, sql } from "astro:db";
import { exampleItemRepository } from "./repositories";
import { requireAdmin, requireUser } from "./_guards";
import { normalizeExampleItem, normalizeText } from "../modules/example-items/helpers";

const itemPayloadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  isArchived: z.boolean().optional(),
});

const listSchema = z.object({
  includeArchived: z.boolean().optional(),
  limit: z.number().int().min(1).max(200).default(50),
});

const adminListSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(25),
  query: z.string().optional(),
});

const normalizePayload = (input: z.infer<typeof itemPayloadSchema>) => {
  const title = normalizeText(input.title);
  if (!title) {
    throw new ActionError({ code: "BAD_REQUEST", message: "Title is required" });
  }

  const content = normalizeText(input.content ?? "");
  return {
    title,
    content: content || null,
    isArchived: input.isArchived ?? false,
  };
};

const buildSearch = (query?: string) => {
  const trimmed = normalizeText(query);
  if (!trimmed) return null;
  return sql`lower(${ExampleItem.title}) LIKE ${`%${trimmed.toLowerCase()}%`}`;
};

export const fetchMyItems = defineAction({
  input: listSchema,
  async handler({ includeArchived, limit }, context: ActionAPIContext) {
    const user = requireUser(context);

    const conditions = [eq(ExampleItem.userId, user.id)];
    if (!includeArchived) {
      conditions.push(eq(ExampleItem.isArchived, false));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const rows = await exampleItemRepository.getData({
      where: () => whereClause,
      orderBy: () => [desc(ExampleItem.updatedAt), desc(ExampleItem.createdAt)],
      limit,
    });

    return {
      items: rows.map(normalizeExampleItem),
    };
  },
});

export const createItem = defineAction({
  input: itemPayloadSchema,
  async handler(input, context: ActionAPIContext) {
    const user = requireUser(context);
    const payload = normalizePayload(input);
    const now = new Date();

    try {
      const inserted = await exampleItemRepository.insert({
        id: randomUUID(),
        userId: user.id,
        title: payload.title,
        content: payload.content,
        isArchived: payload.isArchived,
        createdAt: now,
        updatedAt: now,
      });

      return { item: normalizeExampleItem(inserted[0]) };
    } catch (err: unknown) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: (err as Error)?.message ?? "Unable to create item",
      });
    }
  },
});

export const updateMyItem = defineAction({
  input: z.object({
    id: z.string().min(1),
    data: itemPayloadSchema,
  }),
  async handler({ id, data }, context: ActionAPIContext) {
    const user = requireUser(context);
    const payload = normalizePayload(data);

    const existing = await exampleItemRepository.getById((table) => table.id, id);
    if (!existing || existing.userId !== user.id) {
      throw new ActionError({ code: "NOT_FOUND", message: "Item not found" });
    }

    try {
      const updated = await exampleItemRepository.update(
        {
          title: payload.title,
          content: payload.content,
          isArchived: payload.isArchived,
          updatedAt: new Date(),
        },
        (table) => eq(table.id, id),
      );

      return { item: normalizeExampleItem(updated[0]) };
    } catch (err: unknown) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: (err as Error)?.message ?? "Unable to update item",
      });
    }
  },
});

export const deleteMyItem = defineAction({
  input: z.object({ id: z.string().min(1) }),
  async handler({ id }, context: ActionAPIContext) {
    const user = requireUser(context);

    const existing = await exampleItemRepository.getById((table) => table.id, id);
    if (!existing || existing.userId !== user.id) {
      throw new ActionError({ code: "NOT_FOUND", message: "Item not found" });
    }

    try {
      await exampleItemRepository.delete((table) => eq(table.id, id));
      return { success: true };
    } catch (err: unknown) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: (err as Error)?.message ?? "Unable to delete item",
      });
    }
  },
});

export const adminListItems = defineAction({
  input: adminListSchema,
  async handler({ page, pageSize, query }, context: ActionAPIContext) {
    requireAdmin(context);
    const conditions = [] as any[];
    const searchClause = buildSearch(query);
    if (searchClause) conditions.push(searchClause);

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await exampleItemRepository.getPaginatedData({
      page,
      pageSize,
      where: () => whereClause,
      orderBy: () => [desc(ExampleItem.updatedAt), desc(ExampleItem.createdAt)],
    });

    return {
      items: result.data.map(normalizeExampleItem),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  },
});

export const adminUpdateItem = defineAction({
  input: z.object({
    id: z.string().min(1),
    data: itemPayloadSchema,
  }),
  async handler({ id, data }, context: ActionAPIContext) {
    requireAdmin(context);
    const payload = normalizePayload(data);

    const existing = await exampleItemRepository.getById((table) => table.id, id);
    if (!existing) {
      throw new ActionError({ code: "NOT_FOUND", message: "Item not found" });
    }

    try {
      const updated = await exampleItemRepository.update(
        {
          title: payload.title,
          content: payload.content,
          isArchived: payload.isArchived,
          updatedAt: new Date(),
        },
        (table) => eq(table.id, id),
      );

      return { item: normalizeExampleItem(updated[0]) };
    } catch (err: unknown) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: (err as Error)?.message ?? "Unable to update item",
      });
    }
  },
});

export const adminDeleteItem = defineAction({
  input: z.object({ id: z.string().min(1) }),
  async handler({ id }, context: ActionAPIContext) {
    requireAdmin(context);

    const existing = await exampleItemRepository.getById((table) => table.id, id);
    if (!existing) {
      throw new ActionError({ code: "NOT_FOUND", message: "Item not found" });
    }

    try {
      await exampleItemRepository.delete((table) => eq(table.id, id));
      return { success: true };
    } catch (err: unknown) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: (err as Error)?.message ?? "Unable to delete item",
      });
    }
  },
});
