import { v4 } from "uuid";

type PostId = string;

type Post = {
  id: PostId;
  title: string;
  contents: string;
  timeStamp: string;
  categoryId: number;
};

const posts = [
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

export class PostService {
  async getPostById(id: PostId): Promise<Post | null> {
    // TODO: Load the post from persistence
    const post = posts.find((p) => p.id === id);

    return post || null;
  }

  async getPosts(): Promise<Post[]> {
    // TODO: Get the from persistence/database
    return posts;
  }
}
