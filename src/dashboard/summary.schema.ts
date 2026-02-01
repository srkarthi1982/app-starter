import { ExampleItem, count, db, desc, eq } from "astro:db";

export type AppStarterDashboardSummaryV1 = {
  appId: "app-starter";
  version: 1;
  updatedAt: string;
  itemsCount: number;
  lastItemAt: string | null;
};

const toIso = (value?: Date | string | null) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
};

export const buildAppStarterSummary = async (userId: string): Promise<AppStarterDashboardSummaryV1> => {
  const updatedAt = new Date().toISOString();

  const [{ total: itemsRaw } = { total: 0 }] = await db
    .select({ total: count() })
    .from(ExampleItem)
    .where(eq(ExampleItem.userId, userId));

  const lastItemRow = await db
    .select({ updatedAt: ExampleItem.updatedAt, createdAt: ExampleItem.createdAt })
    .from(ExampleItem)
    .where(eq(ExampleItem.userId, userId))
    .orderBy(desc(ExampleItem.updatedAt), desc(ExampleItem.createdAt), desc(ExampleItem.id))
    .limit(1);

  const lastItemAt =
    toIso(lastItemRow?.[0]?.updatedAt) ?? toIso(lastItemRow?.[0]?.createdAt) ?? null;

  return {
    appId: "app-starter",
    version: 1,
    updatedAt,
    itemsCount: Number(itemsRaw ?? 0),
    lastItemAt,
  };
};
