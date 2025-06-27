import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  generateAuthor,
  generateDate,
  generateTagColor,
  generateTags,
  truncateText,
} from "@/lib/utils";

interface BigPostCardProps {
  userId: number;
  coverImage?: string;
  id: number;
  title: string;
  body: string;
  createdAt?: string;
  tags?: string[];
}

export default function BigPostCard(props: BigPostCardProps) {
  const postTags = props.tags || generateTags(props.id);
  return (
    <article>
      <div className="relative overflow-hidden mb-4">
        <Link href={`/posts/${props.id}`}>
          <Image
            src={
              props.coverImage ||
              `https://picsum.photos/seed/${props.id}/800/400`
            }
            alt={props.title}
            width={800}
            height={400}
            className="object-cover w-full duration-300 hover:scale-105 ease-in-out"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEUlEQVR42mNkYGBgYGDYBwAABQAB6QNFTwAAAABJRU5ErkJggg=="
          />
        </Link>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300">
          {generateAuthor(props.userId)} • {generateDate(props.id)}
        </h4>
        <div className="flex justify-between">
          <Link href={`/posts/${props.id}`}>
            <h2 className="text-xl font-bold hover:text-purple-700 dark:hover:text-purple-300">
              {props.title}
            </h2>
          </Link>
          <Link
            href={`/posts/${props.id}`}
            className="flex-shrink-0 self-start p-1 hover:-translate-y-1 transition-transform duration-300 focus-ring rounded"
            aria-label={`Read more about ${props.title}`}
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-xs text-primary/50">
          {truncateText(props.body, 100)}
        </p>
        <div className="flex self-end gap-2 flex-wrap">
          {postTags.map((tag, index) => (
            <span
              key={tag}
              className={`inline-block px-2 py-1 text-xs ${generateTagColor(
                index
              )} rounded-full`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
