import {
  adminDeleteItem,
  adminListItems,
  adminUpdateItem,
  createItem,
  deleteMyItem,
  fetchMyItems,
  updateMyItem,
} from "./exampleItems";

export const exampleItems = {
  fetchMyItems,
  createItem,
  updateMyItem,
  deleteMyItem,
  adminListItems,
  adminUpdateItem,
  adminDeleteItem,
};

export const server = {
  exampleItems,
  admin: {
    listExampleItems: exampleItems.adminListItems,
    updateExampleItem: exampleItems.adminUpdateItem,
    deleteExampleItem: exampleItems.adminDeleteItem,
  },
};
