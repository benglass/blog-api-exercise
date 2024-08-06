import { Express, Request, Response } from "express";
import { CategoryService } from "./CategoryService";

export class CategoryRouter {
  apply(app: Express) {
    const categoryService = new CategoryService();

    app.get("/categories", async (req: Request, res: Response) => {
      const categories = await categoryService.getCategories();

      res.json(categories).send();
    });
  }
}
