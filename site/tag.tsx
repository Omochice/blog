import { join } from "https://deno.land/std@0.204.0/path/mod.ts";
import { Data } from "lume/core.ts";
import { getPosts, getTags } from "./_includes/logics/posts.ts";
import { BlogPosts } from "./_includes/blogPosts.tsx";

export default function* (): Generator<Data> {
  const ext = ".html";
  for (const tag of getTags()) {
    const title = `#${tag}`;
    const posts = getPosts(tag);

    yield {
      url: join("/", "tag", tag + ext),
      title,
      tag,
      layout: "base.tsx",
      content: () => (
        <>
          <h1 className="text-6xl leading-normal">
            {title}: match {posts.length} posts.
          </h1>
          <BlogPosts posts={posts.map((e) => e.data)} />
        </>
      ),
    };
  }
}
