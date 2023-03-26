import { title } from "./_config.ts";
import type { Data } from "lume/core.ts";
import { getPosts } from "./_includes/logics/posts.ts";
import { BlogPosts } from "./_includes/blogPosts.tsx";

export const layout = "base.tsx";

export default (_: Data) => {
  const blogPosts = getPosts();
  return (
    <>
      <h1 className="text-5xl leading-normal font-mono">
        {title}
      </h1>
      <BlogPosts posts={blogPosts} />
    </>
  );
};
