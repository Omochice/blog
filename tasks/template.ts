import { stringify } from "jsr:@std/yaml@0.224.1";
import { format } from "npm:date-fns@3.6.0";
import { join } from "jsr:@std/path@0.225.1";

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
