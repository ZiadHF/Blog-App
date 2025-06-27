export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  coverImage?: string;
  createdAt?: string;
  tags?: string[];
  author?: string;
  readTime?: number;
}

export interface PostsResponse {
  data: Post[];
  totalCount: number;
}
