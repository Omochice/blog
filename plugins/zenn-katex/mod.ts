import { katex, KatexOptions } from "lume/deps/katex.ts";
import { merge } from "lume/core/utils.ts";
import { Exception } from "lume/core/errors.ts";

import type { Element } from "lume/deps/dom.ts";
import type { DeepPartial, Page, Site } from "lume/core.ts";

export interface Options {
  extensions: string[];
  options: KatexOptions;
}

const defaultOptions: Options = {
  extensions: [".html"],
  options: {
    strict: true,
    throwOnError: true,
  },
};

const SELECTOR = "embed-katex";

export default function (userOptions?: DeepPartial<Options>) {
  const options = merge(defaultOptions, userOptions);
  return (site: Site) => {
    site.process(options.extensions, (page: Page) => {
      const { document } = page;

      if (!document) {
        return;
      }

      // TODO: inject this element to "head"
      // const el = document.createElement("link");

      // const opts = {
      //   rel: "stylesheet",
      //   href: "https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.min.css",
      //   integrity:
      //     "sha384-Juol1FqnotbkyZUT5Z7gUPjQ9gzlwCENvUZTpQBAPxtusdwFLRy382PSDx5UUJ4/",
      //   crossOrigin: "anonymous",
      // };

      // for (const [key, value] of Object.entries(opts)) {
      //   // @ts-ignore sample
      //   el[key] = value;
      // }

      document.querySelectorAll(SELECTOR)
        .forEach((node) => {
          const element = node as Element;

          try {
            const parent = element.parentElement;
            const isBlock = parent && parent.tagName === "EQN";
            const rendered = katex.renderToString(
              element.textContent,
              {
                ...options.options,
                displayMode: isBlock,
              },
            );
            const div = document.createElement("div");
            div.innerHTML = rendered.trim();

            // we've selected the <code> element, we want to also replace the parent <pre>
            if (isBlock) {
              parent.replaceWith(div.firstChild);
            } else {
              element.replaceWith(div.firstChild);
            }
          } catch (cause) {
            throw new Exception("Katex failed to render", {
              page,
              cause,
            });
          }
        });
    });
  };
}
