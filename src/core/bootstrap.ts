import express, { Express, Request, Response } from "express";
import { PostRouter } from "../posts";
import { CategoryRouter } from "../categories";
import { APIError } from "./APIError";

export function bootstrap(): Express {
  const app: Express = express();
  const port = process.env.PORT || 8000;

  // middleware
  app.use(express.json());

  // routes
  const routers = [new PostRouter(), new CategoryRouter()];
  routers.forEach((router) => {
    router.apply(app);
  });

  // error handler
  app.use((err: any, _req: Request, res: Response, _next: any) => {
    let statusCode = 500;
    let message = "Server error";

    if (err instanceof APIError) {
      statusCode = err.statusCode;
      message = err.message;
    }

    res
      .status(statusCode)
      .json({
        statusCode,
        message,
      })
      .send();
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  return app;
}
