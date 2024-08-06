import { Express, Request, Response } from "express";
import { PostId, PostService } from "./PostService";
import { APIError } from "../core/APIError";

function guardInvalidPostId(postIdRaw: string): PostId {
  const postId = Number(postIdRaw);

  if (Number.isNaN(postId)) {
    throw new APIError(400, "Invalid post id");
  }

  return postId;
}

export class PostRouter {
  constructor(private postService: PostService) {}

  apply(app: Express) {
    app.get("/posts/:id", async (req: Request, res: Response) => {
      const postId = guardInvalidPostId(req.params.id);

      const post = await this.postService.getPostById(postId);
      if (!post) throw new APIError(404, "Could not find post");

      res.json(post).send();
    });

    app.get("/posts", async (req: Request, res: Response) => {
      const posts = await this.postService.getPosts();

      res.json(posts).send();
    });

    app.post("/posts", async (req: Request, res: Response) => {
      const postData = {
        title: req.body.title,
        // TODO: Sanitize incoming html?
        contents: req.body.contents,
        categoryId: req.body.categoryId,
      };

      const post = await this.postService.createPost(postData);

      res.json(post).send();
    });

    app.put("/posts/:id", async (req: Request, res: Response) => {
      const postId = guardInvalidPostId(req.params.id);

      const postData = {
        id: postId,
        title: req.body.title,
        // TODO: Sanitize incoming html?
        contents: req.body.contents,
        categoryId: req.body.categoryId,
      };

      const post = await this.postService.updatePost(postData);

      res.json(post).send();
    });
  }
}
