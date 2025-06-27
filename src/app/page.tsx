import Link from "next/link";

export default function Home() {
  return (
    <div>
      You&apos;re not supposed to be here. Please visit the{" "}
      <Link href="/posts">posts</Link> page to see the blog posts. or visit{" "}
      <Link href="/about">about</Link> page to know more this project me.
    </div>
  );
}
