import type { Root } from "mdast";
import type { Plugin } from "unified";

import { transformObsidianCallouts } from "./callout";

/**
 * Converts only Obsidian callout blockquotes into ordinary mdast blockquotes.
 * Output shape is documented in `callout.ts`.
 *
 * Remaining Obsidian markdown support to add:
 * - Image embeds: `![[buttons-without-prefix.png]]` should become the same
 *   mdast image shape as `![buttons-without-prefix.png](buttons-without-prefix.png)`
 *   so `remarkEssayAssetPaths` can normalize it to `/essay-assets/...`. Aliases
 *   such as `![[diagram.png|Specific alt text]]` should use the alias as the
 *   image alt text, while the asset filename remains the URL source. Size hints
 *   such as `![[diagram.png|400]]` are worth preserving as metadata only if the
 *   essay renderer later supports explicit image dimensions.
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
export const remarkObsidianCallouts: Plugin<[], Root> = () => (tree) => {
    transformObsidianCallouts(tree);
};
