import type { Data } from "lume/core.ts";
import { getPosts } from "./posts.ts";
import { BlogPosts } from "./_includes/blogPosts.tsx";

export const layout = "base.tsx";

export default (_data: Data) => {
  const blogPosts = getPosts();
  return (
    <>
      <h1 className="text-6xl leading-normal">
        Recent posts
      </h1>
      <BlogPosts posts={blogPosts} />
    </>
  );
};
