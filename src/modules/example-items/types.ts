export type ExampleItemDTO = {
  id: string;
  userId: string;
  title: string;
  content: string | null;
  isArchived: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ExampleItemForm = {
  title: string;
  content: string;
  isArchived?: boolean;
};
