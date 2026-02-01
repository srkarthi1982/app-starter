import {
  adminCreateItem,
  adminDeleteItem,
  adminListItems,
  adminUpdateItem,
  createItem,
  deleteMyItem,
  exportItems,
  fetchMyItems,
  updateMyItem,
} from "./exampleItems";

export const exampleItems = {
  fetchMyItems,
  createItem,
  updateMyItem,
  deleteMyItem,
  exportItems,
  adminListItems,
  adminCreateItem,
  adminUpdateItem,
  adminDeleteItem,
};

export const server = {
  exampleItems,
  admin: {
    listExampleItems: exampleItems.adminListItems,
    createExampleItem: exampleItems.adminCreateItem,
    updateExampleItem: exampleItems.adminUpdateItem,
    deleteExampleItem: exampleItems.adminDeleteItem,
  },
};
