"use client";
import { useState, useEffect, useCallback } from "react";
import { Post } from "@/types/post";
import { fetchPostById, fetchPosts } from "@/lib/api";

export function usePosts(currentPage: number = 1, perPage: number = 6) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await fetchPosts(currentPage, perPage);
      const calculatedTotalPages = Math.ceil(fetchedPosts.totalCount / perPage);
      setPosts(fetchedPosts.data);
      setTotalPages(calculatedTotalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, perPage]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return { posts, isLoading, error, totalPages };
}

export function usePost(postId: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!postId) {
    throw new Error("Post ID is required");
  }

  const fetchPost = useCallback(async () => {
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
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, isLoading, error };
}
