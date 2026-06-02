import type { Root } from "mdast";
import type { Plugin } from "unified";

import { transformObsidianCallouts } from "./callout";
import { transformObsidianImageEmbeds } from "./embed";
import { transformObsidianInternalLinks } from "./wiki-link";

/**
 * Converts supported Obsidian markdown into ordinary mdast nodes:
 * - callout blockquotes documented in `callout.ts`
 * - image embeds documented in `embed.ts`
 * - wiki links and block references documented in `wiki-link.ts`
 *
 * Remaining Obsidian markdown support to add:
 * - Cross-essay wiki links: `[[CSS Cascade Algorithm|CSS cascade]]` currently
 *   renders as readable text until a future resolver can map vault page names
 *   to canonical essay URLs.
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
    transformObsidianInternalLinks(tree);
};
