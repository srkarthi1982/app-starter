import { column, defineTable, NOW } from "astro:db";

export const ExampleItem = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text(),
    title: column.text(),
    content: column.text({ optional: true }),
    isArchived: column.boolean({ default: false }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const Bookmark = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    userId: column.text(),
    entityType: column.text(),
    entityId: column.text(),
    label: column.text({ optional: true }),
    meta: column.text({ optional: true }),
    createdAt: column.date({ default: NOW }),
  },
  indexes: [
    {
      name: "bookmark_user_entity_unique",
      on: ["userId", "entityType", "entityId"],
      unique: true,
    },
    {
      name: "bookmark_user_idx",
      on: "userId",
    },
    {
      name: "bookmark_entity_lookup_idx",
      on: ["entityType", "entityId"],
    },
  ],
});

export const Faq = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    audience: column.text({ default: "user" }),
    category: column.text({ optional: true }),
    question: column.text(),
    answer_md: column.text(),
    sort_order: column.number({ default: 0 }),
    is_published: column.boolean({ default: false }),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
  },
  indexes: [
    {
      name: "faq_audience_published_idx",
      on: ["audience", "is_published"],
    },
    {
      name: "faq_sort_order_idx",
      on: "sort_order",
    },
  ],
});

export const starterTables = {
  ExampleItem,
  Bookmark,
  Faq,
} as const;
