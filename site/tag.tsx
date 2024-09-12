import { join } from "jsr:@std/path@1.0.6";
import { getPosts, getTags } from "./_includes/logics/posts.ts";
import { BlogPosts } from "./_includes/blogPosts.tsx";

export default function* (): Generator {
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
