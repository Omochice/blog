import { getCollection } from "astro:content";
import { isPublished } from "./is-published";

/**
 * Get all posts, excluding those scheduled for a future date.
 *
 * Future-dated posts are filtered out only in production builds, so that
 * `astro dev` can still preview a scheduled post before its date arrives.
 *
 * @returns The posts that are published as of build time.
 */
export const getPosts = async () => {
  const posts = await getCollection("post");
  if (!import.meta.env.PROD) {
    return posts;
  }
  const now = new Date();
  return posts.filter((post) => isPublished(post.data.date, now));
};
