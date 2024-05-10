import type { Data } from "lume/core/file.ts";
import { TopicButton } from "./topicButton.tsx";
import { joinUrl } from "./logics/joinUrl.ts";
import SuggestButton from "./components/suggestButton.tsx";

export const layout = "base.tsx";

type PageData = Data & {
  topics?: string[];
};

export default ({ title, children, topics, page }: PageData) => (
  <>
    <a href={joinUrl("/")}>&lt; Return to index</a>
    <article className="overflow-ellipsis">
      <div className="flex justify-center flex-col gap-y-4">
        <h1 className="text-4xl text-center">
          {title}
        </h1>
        <div className="flex gap-2">
          {(topics ?? []).map((topic) => (
            <TopicButton
              topic={topic}
              key={topic}
            />
          ))}
        </div>
      </div>
      <section className="leading-loose article">{children}</section>
      <SuggestButton path={page?.src.entry?.path ?? ""} />
    </article>
  </>
);
