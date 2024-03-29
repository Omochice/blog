import type { Data } from "lume/core/file.ts";
import { getPosts } from "./logics/posts.ts";
import { BlogPosts } from "./blogPosts.tsx";

export const layout = "base.tsx";

export default ({ title }: Data) => {
  const blogPosts = getPosts().map((page) => page.data);
  return (
    <>
      <h1 className="text-4xl leading-normal font-mono">
        {title}
      </h1>
      <BlogPosts posts={blogPosts} />
    </>
  );
};
