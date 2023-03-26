import site from "../_config.ts";
import type { Page } from "lume/core.ts";
import { BlogPost } from "./blogPost.tsx";

type Props = { posts: Page[] };

export const BlogPosts = ({ posts }: Props) => (
  <>
    <ul>
      {posts.map((post) => (
        <li key={post.data.title}>
          <BlogPost post={post} />
        </li>
      ))}
    </ul>
  </>
);
