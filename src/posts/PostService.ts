import { SQLClient } from "../core";
import { APIError } from "../core/APIError";

export type PostId = number;

let posts = [
  {
    id: 1,
    title: "My excellent blog post",
    contents: "<p>Some HTML contents</p>",
    // TODO: Need to ensure server is using a reliable time zone (utc)
    timeStamp: new Date().toString(),
    // TODO: Where to persist categories?
    categoryId: 1,
  },
];

type PostRow = {
  id: number;
  title: string;
  contents: string;
  created_at: string;
  category_id: number;
};

export type Post = {
  id: number;
  title: string;
  contents: string;
  timeStamp: string;
  categoryId: number;
};

const adapter = {
  fromDB: (row: PostRow): Post => {
    return {
      id: row.id,
      title: row.title,
      contents: row.contents,
      timeStamp: row.created_at,
      categoryId: row.category_id,
    };
  },
};

export class PostService {
  constructor(private client: SQLClient) {}

  async getPostById(id: PostId): Promise<Post | null> {
    // TODO: Move sql/adapter into a DAO
    const post = await this.client.get("SELECT * FROM posts WHERE id = ?", id);

    return post ? adapter.fromDB(post as PostRow) : null;
  }

  async getPosts(): Promise<Post[]> {
    // TODO: Get the from persistence/database
    return posts;
  }

  async createPost(postPartial: Partial<Post>): Promise<Post> {
    const post: Partial<Post> = {
      title: postPartial.title,
      contents: postPartial.contents,
      categoryId: postPartial.categoryId,
    };

    // TODO: Validation of presence/length of required
    // TODO: Validation of categoryId, or let it be enforced at the DB level
    // VAlidation would ensure that post is a valid Post type, so no need for "as Post"

    // TODO: Push sql into a DAO layer
    const postId = await this.client.insert(
      "INSERT INTO posts (title, contents, category_id) VALUES(?, ?, ?)",
      post.title,
      post.contents,
      post.categoryId
    );

    // TODO: Might have to load from DB to get full post (if id/ts is populated by db)
    return (await this.getPostById(postId as number)) as Post;
  }

  async updatePost(postPartial: Partial<Post>): Promise<Post> {
    // TODO: Make a better type for update that has id required
    const postToUpdate = await this.getPostById(postPartial.id as PostId);
    if (!postToUpdate) throw new APIError(404, "Could not find post");

    // Merge in existing fields
    const post: Partial<Post> = {
      ...postToUpdate,
      title: postPartial.title,
      contents: postPartial.contents,
      categoryId: postPartial.categoryId,
    };

    // TODO: Validation of presence/length of required
    // TODO: Validation of categoryId, or let it be enforced at the DB level
    // VAlidation would ensure that post is a valid Post type, so no need for "as Post"
    const updatedPost = post as Post;

    // TODO: Real persistence
    posts = posts.map((p) => {
      if (p.id === post.id) {
        return updatedPost;
      }

      return p;
    });

    // TODO: Might have to load from DB to get full post (if id/ts is populated by db)
    return updatedPost;
  }
}
