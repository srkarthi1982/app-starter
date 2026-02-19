import { defineDb } from "astro:db";
import { ExampleItem, Faq } from "./tables";

export default defineDb({
  tables: {
    ExampleItem,
    Faq,
  },
});
