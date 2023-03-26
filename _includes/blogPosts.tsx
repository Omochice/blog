import site from "../_config.ts";
import type { Page } from "lume/core.ts";
import { joinUrl } from "./logics/joinUrl.ts";
import { TopicButton } from "./topicButton.tsx";

type Props = { posts: Page[] };

export const BlogPosts = ({ posts }: Props) => {
  return (
    <>
      <ul className="leading-relaxed">
        {posts.map((page) => (
          <li key={page.data.title}>
            <div className="flex">
              <div
                name="page-title"
                key={page.data.title}
                className="w-3/5 truncate"
              >
                <a
                  href={joinUrl(page.data.url)}
                  className="text-blue-500 cursor-pointer"
                >
                  {page.data.title}
                </a>
              </div>

              <div name="page-metadata" className="flex gap-1">
                {(page.data.topics ?? []).filter((e) => e.length !== 0).map((
                  topic: string,
                ) => <TopicButton topic={topic} />)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
