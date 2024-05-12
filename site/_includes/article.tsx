import type { Data } from "lume/core/file.ts";
import { TopicButton } from "./topicButton.tsx";
import { joinUrl } from "./logics/joinUrl.ts";
import SuggestButton from "./components/suggestButton.tsx";
import { loadDefaultJapaneseParser } from "npm:budoux@0.6.2";

const parser = loadDefaultJapaneseParser();

export const layout = "base.tsx";

type PageData = Data & {
  topics?: string[];
};

export default ({ title, children, topics, page }: PageData) => (
  <>
    <a href={joinUrl("/")}>&lt; Return to index</a>
    <article className="overflow-ellipsis flex flex-col gap-10">
      <div className="flex justify-center flex-col gap-y-4">
        {/* NOTE: compatible for budoux-web-components */}
        {title == null ? <></> : (
          <h1
            className="text-4xl text-center break-keep overflow-wrap"
            style={{ overflowWrap: "anywhere" }}
          >
            {parser.parse(title).join("\u200b")}
          </h1>
        )}
        <div className="flex gap-2">
          {(topics ?? []).map((topic) => (
            <TopicButton
              topic={topic}
              key={topic}
            />
          ))}
        </div>
      </div>
      <section className="leading-10 article">{children}</section>
      <SuggestButton path={page?.src.entry?.path ?? ""} />
    </article>
  </>
);
