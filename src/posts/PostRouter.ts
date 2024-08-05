import { Express, Request, Response } from "express";
import { PostService } from "./PostService";

export class PostRouter {
  apply(app: Express) {
    const postService = new PostService();

    app.get("/posts", async (req: Request, res: Response) => {
      const posts = await postService.getPosts();

      res.json(posts).send();
    });
  }
}
