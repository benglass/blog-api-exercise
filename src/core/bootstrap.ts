import express, { Express } from "express";
import { PostRouter } from "../posts";

export function bootstrap(): Express {
  const app: Express = express();
  const port = process.env.PORT || 8000;

  const postRouter = new PostRouter();
  postRouter.apply(app);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  return app;
}
