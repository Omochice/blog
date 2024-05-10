import type { Data } from "lume/core/file.ts";
import { getPosts } from "./_includes/logics/posts.ts";
import { BlogPosts } from "./_includes/blogPosts.tsx";

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
