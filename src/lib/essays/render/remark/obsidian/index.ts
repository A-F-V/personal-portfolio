import type { Root } from "mdast";
import type { Plugin } from "unified";

import { transformObsidianCallouts } from "./callout";

/**
 * Converts only Obsidian callout blockquotes into ordinary mdast blockquotes.
 * Output shape is documented in `callout.ts`; this intentionally does not
 * handle wiki links, image embeds, or block ids.
 */
export const remarkObsidianCallouts: Plugin<[], Root> = () => (tree) => {
    transformObsidianCallouts(tree);
};
