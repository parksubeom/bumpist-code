// Builds rules.json (contract C3) from markers in rules/**/*.md.
//
// A marker sits on its own line directly above the rule it names:
//   <!-- rule: CORE-001 | severity: error | enforce: review | status: enforced -->
//   - 명시되지 않은 패키지, 설정을 임의로 추가하지 않는다.
// The next non-empty line (list item, numbered item) becomes the title; a table row
// carries its marker inline at the end of the row instead.
// Markers are HTML comments, so the rendered Markdown does not change.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const MARKER = /^<!--\s*rule:\s*([A-Z0-9]+-\d{3})\s*((?:\|[^|>]+)*)-->\s*$/;
// Inside a table a marker can't sit on its own line, so it goes at the end of the row:
//   | 임의 패키지 추가 금지 | ... <!-- rule: CORE-006 | enforce: review --> |
const INLINE = /<!--\s*rule:\s*([A-Z0-9]+-\d{3})\s*((?:\|[^|>]+)*)-->/;
const ID = /^(CORE|ARCH|UI|A11Y|FIGMA|API|TEST|GIT|SEC|DATA|CI|OPS|NEXT|REACT|VUE)-\d{3}$/;
const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p) : n.endsWith(".md") && files.push(p);
  }
})("rules");

const rules = [];
const seen = new Map();
const errors = [];
for (const file of files.sort()) {
  // POSIX separators so rules.json is identical whether built on Windows or Linux.
  const rel = relative(".", file).split(sep).join("/");
  const lines = readFileSync(file, "utf8").split("\n");
  let section = "";
  lines.forEach((line, i) => {
    const h = line.match(/^#{1,3}\s+(.*)/);
    if (h) section = h[1].trim();
    const own = line.trim().match(MARKER);
    const inline = !own && line.match(INLINE);
    const m = own || inline;
    if (!m) return;
    const [, id, rest] = m;
    const attrs = Object.fromEntries(rest.split("|").map((s) => s.trim()).filter(Boolean).map((kv) => kv.split(":").map((x) => x.trim())));
    let j = i;
    if (own) { j = i + 1; while (j < lines.length && !lines[j].trim()) j++; }
    const raw = (lines[j] ?? "").replace(INLINE, "").trim();
    let title = raw;
    if (raw.startsWith("|")) title = raw.split("|").map((c) => c.trim()).filter(Boolean).join(" — ");
    // Drop bold markers outside code spans (so `src/**/*.ts` survives), then the backticks.
    title = title.replace(/^([-*]|\d+\.)\s+/, "").split("`").map((s, k) => (k % 2 ? s : s.replace(/\*\*/g, ""))).join("");
    const where = `${rel}:${i + 1}`;
    if (!ID.test(id)) errors.push(`${where} bad id ${id}`);
    if (seen.has(id)) errors.push(`${where} duplicate id ${id} (first at ${seen.get(id)})`);
    seen.set(id, where);
    rules.push({
      id, title,
      severity: attrs.severity ?? "error",
      enforcement: (attrs.enforce ?? "review").split(",").map((s) => s.trim()),
      ...(attrs.tool ? { tool: attrs.tool } : {}),
      status: attrs.status ?? "enforced",
      file: rel, section, line: j + 1,
    });
  });
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const out = {
  $schema: "https://parksubeom.github.io/bumpist-code/schemas/rules/v0.json",
  version: pkg.version,
  rules: rules.sort((a, b) => a.id.localeCompare(b.id)),
};
writeFileSync("rules.json", JSON.stringify(out, null, 2) + "\n");
console.log(`rules.json: ${rules.length} rules from ${files.length} files`);
