import { defineDb } from "astro:db";
import { Bookmark, ExampleItem, Faq } from "./tables";

export default defineDb({
  tables: {
    ExampleItem,
    Bookmark,
    Faq,
  },
});
