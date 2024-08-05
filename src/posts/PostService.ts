import { v4 } from "uuid";

export class PostService {
  async getPosts() {
    return [
      {
        id: v4(),
        title: "My excellent blog post",
        contents: "<p>Some HTML contents</p>",
        // TODO: Need to ensure server is using a reliable time zone (utc)
        timestamp: new Date().toString(),
        // TODO: Where to persist categories?
        category: "General",
      },
    ];
  }
}
