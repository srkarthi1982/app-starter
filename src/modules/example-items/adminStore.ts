import type { Alpine } from "alpinejs";
import { AvBaseStore } from "@ansiversa/components/alpine";
import { actions } from "astro:actions";
import type { ExampleItemDTO } from "./types";

const PAGE_SIZE = 25;

const defaultState = () => ({
  items: [] as ExampleItemDTO[],
  total: 0,
  page: 1,
  pageSize: PAGE_SIZE,
  query: "",
  loading: false,
  error: null as string | null,
  success: null as string | null,
});

export class AdminExampleItemsStore extends AvBaseStore implements ReturnType<typeof defaultState> {
  items: ExampleItemDTO[] = [];
  total = 0;
  page = 1;
  pageSize = PAGE_SIZE;
  query = "";
  loading = false;
  error: string | null = null;
  success: string | null = null;

  init(initial?: Partial<ReturnType<typeof defaultState>>) {
    if (!initial) return;
    Object.assign(this, defaultState(), initial);
    this.items = (initial.items ?? []) as ExampleItemDTO[];
    this.total = Number(initial.total ?? this.total ?? 0);
    this.page = Math.max(1, Number(initial.page ?? this.page ?? 1));
    this.pageSize = Math.max(1, Number(initial.pageSize ?? this.pageSize ?? PAGE_SIZE));
    this.query = initial.query ?? "";
  }

  get totalPages() {
    return Math.max(1, Math.ceil((this.total || 0) / this.pageSize));
  }

  private unwrapResult<T = any>(result: any): T {
    if (result?.error) {
      const message = result.error?.message || result.error;
      throw new Error(message || "Request failed.");
    }
    return (result?.data ?? result) as T;
  }

  async load() {
    this.loading = true;
    this.error = null;

    try {
      const res = await actions.exampleItems.adminListItems({
        page: this.page,
        pageSize: this.pageSize,
        query: this.query || undefined,
      });
      const data = this.unwrapResult(res) as {
        items: ExampleItemDTO[];
        total: number;
        page: number;
        pageSize: number;
      };
      this.items = data.items ?? [];
      this.total = Number(data.total ?? this.items.length ?? 0);
      this.page = Math.max(1, Number(data.page ?? this.page));
      this.pageSize = Math.max(1, Number(data.pageSize ?? this.pageSize));
    } catch (err: any) {
      this.error = err?.message || "Failed to load items.";
    } finally {
      this.loading = false;
    }
  }

  setQuery(value: string) {
    this.query = value ?? "";
    this.page = 1;
    this.load();
  }

  setPage(value: number) {
    const next = Number(value);
    if (!Number.isFinite(next) || next < 1) return;
    this.page = next;
    this.load();
  }

  async deleteItem(id: string) {
    this.loading = true;
    this.error = null;

    try {
      const res = await actions.exampleItems.adminDeleteItem({ id });
      this.unwrapResult(res);
      this.items = this.items.filter((item) => item.id !== id);
      this.total = Math.max(0, this.total - 1);
      this.success = "Item deleted.";
    } catch (err: any) {
      this.error = err?.message || "Unable to delete item.";
    } finally {
      this.loading = false;
    }
  }
}

export const registerAdminExampleItemsStore = (Alpine: Alpine) => {
  Alpine.store("adminExampleItems", new AdminExampleItemsStore());
};
