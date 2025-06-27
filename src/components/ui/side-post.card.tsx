import {
  generateAuthor,
  generateDate,
  generateTagColor,
  generateTags,
} from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidePostCardProps {
  userId: number;
  coverImage?: string;
  id: number;
  title: string;
  body: string;
  createdAt?: string;
  tags?: string[];
}

export default function SidePostCard(props: SidePostCardProps) {
  const postTags = props.tags || generateTags(props.id);
  return (
    <article className="grid md:grid-cols-2 gap-4 relative">
      <div className="relative overflow-hidden h-48 md:h-full">
        <Link href={`/posts/${props.id}`}>
          <Image
            src={
              props.coverImage ||
              `https://picsum.photos/seed/${props.id}/800/400`
            }
            alt={props.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77zgAAAABJRU5ErkJggg=="
          />
        </Link>
      </div>
      <div className="space-y-4 break-all">
        <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300">
          {generateAuthor(props.userId)} • {generateDate(props.id)}
        </h4>
        <div className="flex justify-between items-center">
          <Link href={`/posts/${props.id}`}>
            <h2 className="text-lg font-bold hover:text-purple-700 dark:hover:text-purple-300">
              {props.title}
            </h2>
          </Link>
          <Link
            href={`/posts/${props.id}`}
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-xs text-primary/50">{props.body}</p>
        <div className="flex gap-2 flex-wrap mt-auto">
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
