import type { Root } from "mdast";
import type { Plugin } from "unified";

import { transformObsidianCallouts } from "./callout";
import { transformObsidianInternalLinks } from "./wiki-link";

/**
 * Converts supported Obsidian markdown into ordinary mdast nodes:
 * - Callout blockquotes are documented in `callout.ts`.
 * - Wiki links and block references are documented in `wiki-link.ts`.
 *
 * Remaining Obsidian markdown support to add:
 * - Image embeds: `![[buttons-without-prefix.png]]` should become the same
 *   mdast image shape as `![buttons-without-prefix.png](buttons-without-prefix.png)`
 *   so `remarkEssayAssetPaths` can normalize it to `/essay-assets/...`. Aliases
 *   such as `![[diagram.png|Specific alt text]]` should use the alias as the
 *   image alt text, while the asset filename remains the URL source. Size hints
 *   such as `![[diagram.png|400]]` are worth preserving as metadata only if the
 *   essay renderer later supports explicit image dimensions.
 *
 * The important ordering constraint is that Obsidian-specific rewrites should
 * happen before `remarkEssayAssetPaths` and before the mdast tree is converted
 * to hast. That lets the rest of the essay pipeline keep treating the result as
 * ordinary Markdown instead of carrying Obsidian-specific string handling into
 * rendering components.
 */
export const remarkObsidianSyntax: Plugin<[], Root> = () => (tree) => {
    transformObsidianCallouts(tree);
    transformObsidianInternalLinks(tree);
};
