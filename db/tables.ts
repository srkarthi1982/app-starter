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
  Faq,
} as const;
