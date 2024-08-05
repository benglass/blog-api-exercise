import { Express, Request, Response } from "express";
import { PostService } from "./PostService";
import { APIError } from "../core/APIError";

export class PostRouter {
  apply(app: Express) {
    const postService = new PostService();

    app.get("/posts/:id", async (req: Request, res: Response) => {
      const postId = Number(req.params.id);

      if (Number.isNaN(postId)) {
        throw new APIError(400, "Invalid post id");
      }

      const post = await postService.getPostById(postId);

      if (!post) {
        throw new APIError(404, "Could not find post");
      }

      res.json(post).send();
    });

    app.get("/posts", async (req: Request, res: Response) => {
      const posts = await postService.getPosts();

      res.json(posts).send();
    });
  }
}
