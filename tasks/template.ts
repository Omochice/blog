import { stringify } from "https://deno.land/std@0.218.2/yaml/mod.ts";
import { format } from "npm:date-fns@3.4.0";
import { join } from "https://deno.land/std@0.218.2/path/mod.ts";

function generate() {
  const frontMatter = {
    title: "",
    topics: [],
    excerpt: "",
    type: "tech",
  };
  return ["---", stringify(frontMatter), "---"]
    .map((e) => e.trim())
    .join("\n");
}

if (import.meta.main) {
  const filename =
    [format(new Date(), "yyyy-MM-dd"), crypto.randomUUID()].join("-") +
    ".md";
  const outPath = join(Deno.cwd(), "site", "posts", filename);

  Deno.writeTextFileSync(outPath, generate(), { create: true });
  console.log(`generate template to ${outPath}`);
}
