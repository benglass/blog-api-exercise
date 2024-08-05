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
  apply(app: Express) {
    const postService = new PostService();

    app.get("/posts/:id", async (req: Request, res: Response) => {
      const postId = guardInvalidPostId(req.params.id);

      const post = await postService.getPostById(postId);
      if (!post) throw new APIError(404, "Could not find post");

      res.json(post).send();
    });

    app.get("/posts", async (req: Request, res: Response) => {
      const posts = await postService.getPosts();

      res.json(posts).send();
    });

    app.post("/posts", async (req: Request, res: Response) => {
      // TODO: Have to add middleware to parse incoming body JSON
      const body = JSON.parse(req.body);

      const postData = {
        title: body.title,
        // TODO: Sanitize incoming html?
        contents: body.contents,
        categoryId: body.categoryId,
      };

      const post = await postService.createPost(postData);

      res.json(post).send();
    });

    app.put("/posts/:id", async (req: Request, res: Response) => {
      const postId = guardInvalidPostId(req.params.id);

      // TODO: Have to add middleware to parse incoming body JSON
      const body = JSON.parse(req.body);

      const postData = {
        id: postId,
        title: body.title,
        // TODO: Sanitize incoming html?
        contents: body.contents,
        categoryId: body.categoryId,
      };

      const post = await postService.updatePost(postData);

      res.json(post).send();
    });
  }
}
