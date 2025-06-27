import { Post, PostsResponse } from "@/types/post";

/**
 * Fetches posts from the JSONPlaceholder API.
 * @param page - The page number to fetch.
 * @param perPage - The number of posts per page.
 * @returns A promise that resolves to a PostsResponse containing the fetched posts and total count.
 */
export async function fetchPosts(page : number, perPage : number): Promise<PostsResponse> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${perPage}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data: Post[] = await response.json();

  return {
    data,
    totalCount: response.headers.get("X-Total-Count") ? parseInt(response.headers.get("X-Total-Count") as string, 10) : 100,
  };
}

/**
 * Fetches a single post by its ID from the JSONPlaceholder API.
 * @param id - The ID of the post to fetch.
 * @returns A promise that resolves to a Post object or null if not found.
 */
export async function fetchPostById(id: number | string): Promise<Post | null> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Post with id ${id} not found`);
  }
  const data: Post = await response.json();
  return data;
}
