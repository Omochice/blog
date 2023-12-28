import { TopicButton } from "./topicButton.tsx";
import { joinUrl } from "./logics/joinUrl.ts";
import type { PageData } from "lume/core.ts";

type Props = { post: PageData };
export const BlogPost = ({ post }: Props) => (
  <>
    <div className="flex">
      <div
        name="page-title"
        className="sm:w-3/5 truncate"
      >
        <a
          href={joinUrl(post.url || "")}
        >
          {post.title}
        </a>
      </div>

      <div name="page-metadata" className="hidden gap-1 sm:flex">
        {(post.topics ?? []).filter((e: string) => !(/^\s*$/.test(e)))
          .map((topic: string) => <TopicButton key={topic} topic={topic} />)}
      </div>
    </div>
  </>
);
