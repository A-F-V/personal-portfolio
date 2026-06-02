import type { Root } from "mdast";
import type { Plugin } from "unified";

import { transformObsidianCallouts } from "./callout";
import { transformObsidianImageEmbeds } from "./embed";

/**
 * Converts supported Obsidian markdown into ordinary mdast nodes:
 * - callout blockquotes documented in `callout.ts`
 * - image embeds documented in `embed.ts`
 *
 * Remaining Obsidian markdown support to add:
 * - Wiki links: `[[CSS Cascade Algorithm|CSS cascade]]` should become an
 *   internal essay link whose visible text is `CSS cascade`; `[[CSS Cascade
 *   Algorithm]]` should use the page name as both the destination label and
 *   visible text. The likely behavior is to slugify the destination in the same
 *   way essay headings are slugged and emit a normal mdast link to
 *   `#css-cascade-algorithm`, unless a future cross-essay resolver maps vault
 *   page names to canonical essay URLs.
 * - Heading or block links: `[[#The Hard Part|skip ahead]]` and
 *   `[[#^solution|here]]` should become hash links. Heading links can point to
 *   the slugged heading id produced by `rehypeSlug`. Block ids like `^solution`
 *   need either a small remark pass that strips the marker from the prose and
 *   attaches an id to the preceding block, or a fallback that emits
 *   `href="#solution"` only when the target marker is known to exist.
 *
 * The important ordering constraint is that Obsidian-specific rewrites should
 * happen before `remarkEssayAssetPaths` and before the mdast tree is converted
 * to hast. That lets the rest of the essay pipeline keep treating the result as
 * ordinary Markdown instead of carrying Obsidian-specific string handling into
 * rendering components.
 */
export const remarkObsidianMarkdown: Plugin<[], Root> = () => (tree) => {
    transformObsidianCallouts(tree);
    transformObsidianImageEmbeds(tree);
};
