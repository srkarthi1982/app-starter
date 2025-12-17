import { defineDb } from 'astro:db';
import { tables } from './tables';

export default defineDb({
  tables,
});
