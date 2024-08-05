import { v4 } from "uuid";

type Post = {
  id: string;
  title: string;
  contents: string;
  timeStamp: string;
  categoryId: number;
};

export class PostService {
  async getPosts(): Promise<Post[]> {
    return [
      {
        id: v4(),
        title: "My excellent blog post",
        contents: "<p>Some HTML contents</p>",
        // TODO: Need to ensure server is using a reliable time zone (utc)
        timeStamp: new Date().toString(),
        // TODO: Where to persist categories?
        categoryId: 1,
      },
    ];
  }
}
