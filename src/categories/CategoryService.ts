type CategoryId = number;

type Category = {
  id: CategoryId;
  name: string;
};

const categories = [
  {
    id: 1,
    name: "General",
  },
  {
    id: 2,
    name: "Technology",
  },
  {
    id: 3,
    name: "Random",
  },
];

export class CategoryService {
  async getCategoryById(id: number): Promise<Category | null> {
    // TODO: Load the post from persistence
    const category = categories.find((c) => c.id === id);

    return category || null;
  }

  async getCategories(): Promise<Category[]> {
    // TODO: Get the from persistence/database
    return categories;
  }
}
