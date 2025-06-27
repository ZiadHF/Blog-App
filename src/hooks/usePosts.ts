"use client";
import { useState, useEffect } from "react";
import { Post, PostsResponse } from "@/types/post";
import { fetchPostById, fetchPosts } from "@/lib/api";

export function usePosts(currentPage: number = 1, perPage: number = 6) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts: PostsResponse = await fetchPosts(
        currentPage,
        perPage
      );
      const totalPages: number = Math.ceil(fetchedPosts.totalCount / perPage);
      setPosts(fetchedPosts.data);
      setTotalPages(totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [currentPage, perPage]);

  return { posts, isLoading, error, totalPages };
}

export function usePost(postId: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (!postId) {
    throw new Error("Post ID is required");
  }

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const fetchedPost = await fetchPostById(postId);
      if (fetchedPost) {
        setPost(fetchedPost);
        setError(null);
      } else {
        setError("Post not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return { post, isLoading, error };
}
