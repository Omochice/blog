import { BlogPost } from "./blogPost.tsx";
import type { PageData } from "lume/core/file.ts";

type Props = { posts: PageData[] };

export const BlogPosts = ({ posts }: Props) => (
  <>
    <ul>
      {posts.map((post) => (
        <li key={post.title} class="my-3">
          <BlogPost post={post} />
        </li>
      ))}
    </ul>
  </>
);
