import { ActionError, defineAction, type ActionAPIContext } from "astro:actions";
import { Bookmark, ExampleItem, and, db, desc, eq, inArray } from "astro:db";
import { z } from "astro:schema";
import { requireUser } from "./_guards";

const bookmarkEntityTypeSchema = z.enum(["item"]);

const normalizeEntityId = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new ActionError({ code: "BAD_REQUEST", message: "Entity id is required." });
  }
  return trimmed;
};

const normalizeLabel = (value?: string) => {
  const trimmed = value?.trim() ?? "";
  return trimmed || "Untitled item";
};

const normalizeMeta = (value?: unknown) => {
  if (typeof value === "undefined") return undefined;
  if (value === null) return null;
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
};

export const listItemBookmarks = defineAction({
  input: z.object({}).optional(),
  async handler(_input, context: ActionAPIContext) {
    const user = requireUser(context);

    const bookmarks = await db
      .select({
        id: Bookmark.id,
        entityId: Bookmark.entityId,
        label: Bookmark.label,
        createdAt: Bookmark.createdAt,
      })
      .from(Bookmark)
      .where(and(eq(Bookmark.userId, user.id), eq(Bookmark.entityType, "item")))
      .orderBy(desc(Bookmark.createdAt), desc(Bookmark.id));

    const entityIds = bookmarks.map((row) => String(row.entityId)).filter(Boolean);
    const items = entityIds.length
      ? await db
          .select({
            id: ExampleItem.id,
            title: ExampleItem.title,
            updatedAt: ExampleItem.updatedAt,
          })
          .from(ExampleItem)
          .where(and(eq(ExampleItem.userId, user.id), inArray(ExampleItem.id, entityIds)))
      : [];

    const itemMap = new Map<string, { title?: string | null; updatedAt?: Date | string | null }>(
      items.map((item) => [String(item.id), { title: item.title, updatedAt: item.updatedAt }]),
    );

    return {
      items: bookmarks.map((row) => {
        const item = itemMap.get(String(row.entityId));
        const title = item?.title ?? row.label ?? "Untitled item";
        const updatedAt = item?.updatedAt ?? row.createdAt ?? null;
        const itemId = String(row.entityId);

        return {
          entityId: itemId,
          itemId,
          title,
          label: title,
          updatedAt,
          bookmarkedAt: row.createdAt,
          href: `/items/${itemId}`,
        };
      }),
    };
  },
});

export const toggleBookmark = defineAction({
  input: z.object({
    entityType: bookmarkEntityTypeSchema,
    entityId: z.string().min(1, "Entity id is required"),
    label: z.string().optional(),
    meta: z.unknown().optional(),
  }),
  async handler(input, context: ActionAPIContext) {
    const user = requireUser(context);
    const entityId = normalizeEntityId(input.entityId);
    const label = normalizeLabel(input.label);
    const meta = normalizeMeta(input.meta);

    const existing = await db
      .select({ id: Bookmark.id })
      .from(Bookmark)
      .where(
        and(
          eq(Bookmark.userId, user.id),
          eq(Bookmark.entityType, input.entityType),
          eq(Bookmark.entityId, entityId),
        ),
      )
      .get();

    if (existing?.id) {
      await db.delete(Bookmark).where(eq(Bookmark.id, existing.id));
      return { saved: false };
    }

    try {
      await db.insert(Bookmark).values({
        userId: user.id,
        entityType: input.entityType,
        entityId,
        label,
        meta,
      });
      return { saved: true };
    } catch {
      const stillExists = await db
        .select({ id: Bookmark.id })
        .from(Bookmark)
        .where(
          and(
            eq(Bookmark.userId, user.id),
            eq(Bookmark.entityType, input.entityType),
            eq(Bookmark.entityId, entityId),
          ),
        )
        .get();

      if (stillExists?.id) {
        return { saved: true };
      }

      throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to toggle bookmark." });
    }
  },
});
