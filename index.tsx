import type { Data } from "lume/core.ts";
import { getPosts } from "./_includes/logics/posts.ts";
import { BlogPosts } from "./_includes/blogPosts.tsx";

export const layout = "base.tsx";

export default (_data: Data) => {
  const blogPosts = getPosts();
  return (
    <>
      <h1 className="text-5xl leading-normal font-mono">
        $ Omochice 2&gt;&amp;1
      </h1>
      <BlogPosts posts={blogPosts} />
    </>
  );
};
