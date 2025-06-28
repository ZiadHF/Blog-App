"use client";
import { ErrorMessage, PostCardSkeleton } from "@/components/ui/loading";
import { usePost } from "@/hooks/usePosts";
import { generateDate, isImageUrl, truncateText } from "@/lib/utils";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, use, useEffect, useState } from "react";

const updateMetadata = (postData: Post) => {
  document.title = `${postData.title} - The Blog`;
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", truncateText(postData.body, 150));
};

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [renderedBody, setRenderedBody] = useState<ReactNode[]>([]);
  const parameters = use(params);
  const { post, isLoading, error } = usePost(parameters.id);

  useEffect(() => {
    if (!post) return;

    const postData = post as Post;
    updateMetadata(postData);

    const formatBodyWithImages = async (body: string) => {
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      const parts = body.split(linkRegex);

      const formatted: ReactNode[] = [];

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isUrl = /^https?:\/\//.test(part);

        if (isUrl) {
          const isImg = await isImageUrl(part);
          if (isImg) {
            formatted.push(
              <div key={`img-${i}`} className="mb-4">
                <Image
                  src={part}
                  alt={`Image ${i}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto"
                />
              </div>
            );
          } else {
            formatted.push(
              <Link
                href={part}
                key={`link-${i}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-300 underline"
              >
                {part}
              </Link>
            );
          }
        } else {
          part.split("\n").forEach((line, j) => {
            formatted.push(
              <span key={`regular-text-${i}-${j}`} className="block mb-2">
                {line}
              </span>
            );
          });
        }
      }

      setRenderedBody(formatted);
    };

    formatBodyWithImages(postData.body);
  }, [post]);

  if (isLoading) {
    return <PostCardSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const postData = post as Post;

  return (
    <article className="space-y-6">
      <h6 className="text-sm text-purple-700 dark:text-purple-300 font-semibold">
        {generateDate(postData.id)}
      </h6>
      <h1 className="text-3xl font-bold">{postData.title}</h1>
      <div className="relative overflow-hidden mb-4">
        <Image
          src={
            postData.coverImage ||
            `https://picsum.photos/seed/${postData.id}/600/300`
          }
          alt={postData.title}
          width={600}
          height={300}
          className="object-cover w-full h-auto"
        />
      </div>
      <div className="text-primary/70">{renderedBody}</div>
    </article>
  );
}
