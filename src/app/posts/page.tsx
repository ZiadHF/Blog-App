"use client";
import React, { useState } from "react";
import BigPostCard from "@/components/ui/big-post-card";
import SidePostCard from "@/components/ui/side-post.card";
import Pagination from "@/components/ui/pagination";
import {
  PostCardSkeleton,
  FeaturedPostSkeleton,
  ErrorMessage,
} from "@/components/ui/loading";
import { usePosts } from "@/hooks/usePosts";

function FeaturedSection() {
  const { posts: featuredPosts, isLoading, error } = usePosts(1, 4);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <FeaturedPostSkeleton />
        </div>
        <div className="space-y-8 md:col-span-2">
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
        <div className="hidden md:block md:col-span-4">
          <PostCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <BigPostCard {...featuredPosts[0]} />
        </div>
        <div className="space-y-8 md:col-span-2">
          {featuredPosts.slice(1, 3).map((post) => (
            <SidePostCard key={post.id} {...post} />
          ))}
        </div>
      </div>

      <div className="lg:hidden mb-8">
        <BigPostCard {...featuredPosts[3]} />
      </div>
      <div className="hidden lg:block mb-8">
        <SidePostCard {...featuredPosts[3]} />
      </div>
    </>
  );
}

function AllPostsSection() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { posts, isLoading, error, totalPages } = usePosts(currentPage);

  const handlePageChange = (page: number | string) => {
    if (typeof page === "string") return;
    setCurrentPage(page);
    document.getElementById("all-posts-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (error) {
    return (
      <section className="mt-8">
        <h2 className="mb-6 font-semibold text-xl">All blog posts</h2>
        <ErrorMessage error={error} onRetry={() => setCurrentPage(1)} />
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-6 font-semibold text-xl">All blog posts</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div
          id="all-posts-section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {posts.map((post) => (
            <BigPostCard key={post.id} {...post} />
          ))}
        </div>
      )}

      {((posts.length === 0 && !isLoading)) && (
        <div className="text-center text-primary mb-4">
          No posts available at the moment.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </section>
  );
}

export default function PostsPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-8xl lg:text-[10rem] xl:text-[13rem] font-bold my-16 border-y border-primary/30 tracking-wide">
          THE BLOG
        </h1>
      </div>
      {/* Recent Posts Section */}
      <section>
        <h2 className="mb-8 font-semibold text-xl">Recent blog posts</h2>
          <FeaturedSection />
      </section>
        <AllPostsSection />
    </div>
  );
}
