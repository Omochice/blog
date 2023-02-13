import site from "../_config.ts";
import type { Page } from "lume/core.ts";

type Props = { posts: Page[] };

function joinURL(to: string): string {
  const n = new URL(to.replace(/^\//, "./"), site.options.location);
  return n.href;
}

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
                  href={joinURL(page.data.url)}
                  className="text-blue-500 cursor-pointer"
                >
                  {page.data.title}
                </a>
              </div>

              <div name="page-metadata" className="flex gap-1">
                {(page.data.topics ?? []).filter((e) => e.length !== 0).map((
                  topic: string,
                ) => (
                  <a
                    className="bg-gray-300 rounded px-2 font-mono h-11/12 cursor-pointer"
                    href={joinURL(`/tag/${topic.toLowerCase()}`)}
                  >
                    {topic.toLowerCase()}
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
