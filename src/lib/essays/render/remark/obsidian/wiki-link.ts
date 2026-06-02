import type { Heading, Link, Node, Paragraph, Parent, Root, Text } from "mdast";
import { visit } from "unist-util-visit";

type BlockReferenceContainer = Heading | Paragraph;
type InlineParent = Parent & { children: Node[] };

const WIKI_LINK_REGEX = /!?\[\[([^\]\n]+)\]\]/g;
const BLOCK_REFERENCE_MARKER_REGEX = /(?:^|\s)\^([A-Za-z0-9_-]+)\s*$/;

function isText(node: Node): node is Text {
    return node.type === "text";
}

/**
 * Obsidian block ids are usually written at the end of a block:
 * `##### Implementation ^solution`.
 *
 * The marker is not prose, so the public essay should not render `^solution`.
 * We still need a DOM target for links such as `[[#^solution|here]]`, which is
 * why headings and paragraphs are the only block nodes allowed to receive ids.
 */
function isBlockReferenceContainer(
    node: Node
): node is BlockReferenceContainer {
    return node.type === "heading" || node.type === "paragraph";
}

function isInlineParent(node: Node): node is InlineParent {
    /**
     * Wiki links can appear inside formatting nodes, not just paragraphs. The
     * production "How to Embed..." essay has a bold wiki link, so traversal has
     * to include phrasing parents like `strong` and `emphasis`.
     *
     * Existing markdown links are intentionally excluded. Rewriting text inside
     * a link would create nested anchors, which HTML cannot represent safely.
     */
    return (
        node.type === "heading" ||
        node.type === "paragraph" ||
        node.type === "strong" ||
        node.type === "emphasis" ||
        node.type === "delete" ||
        node.type === "tableCell"
    );
}

function getHProperties(node: Node): Record<string, unknown> {
    const hProperties = node.data?.hProperties;

    return typeof hProperties === "object" && hProperties !== null
        ? (hProperties as Record<string, unknown>)
        : {};
}

function setNodeId(node: Node, id: string): void {
    node.data = {
        ...node.data,
        hProperties: {
            ...getHProperties(node),
            id,
        },
    };
}

function removeEmptyTextChildren(
    node: BlockReferenceContainer,
    startIndex: number
): void {
    for (let index = node.children.length - 1; index >= startIndex; index -= 1) {
        const child = node.children[index];

        if (isText(child) && child.value.length === 0) {
            node.children.splice(index, 1);
        }
    }
}

function hideTrailingBlockReferenceMarker(
    node: BlockReferenceContainer
): string | undefined {
    /**
     * Walk backward so only a trailing authoring marker becomes an id. A marker
     * in the middle of a paragraph should remain normal text because Obsidian
     * block ids are anchored to the block they trail.
     */
    for (let index = node.children.length - 1; index >= 0; index -= 1) {
        const child = node.children[index];

        if (!isText(child)) {
            return undefined;
        }

        if (!child.value.trim()) {
            continue;
        }

        const marker = child.value.match(BLOCK_REFERENCE_MARKER_REGEX);

        if (!marker) {
            return undefined;
        }

        child.value = child.value.slice(0, marker.index).replace(/[ \t]+$/, "");
        removeEmptyTextChildren(node, index);

        return marker[1];
    }

    return undefined;
}

function slugifyHeadingTarget(value: string): string | undefined {
    /**
     * This mirrors the subset of GitHub-style heading ids that `rehypeSlug`
     * emits for these essays. The target is created in remark so ordinary
     * Markdown links, RSS rendering, and React rendering all share one path.
     *
     * See: https://github.com/rehypejs/rehype-slug
     */
    const slug = value
        .trim()
        .toLowerCase()
        .replace(/['\u2019]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return slug || undefined;
}

function normalizeBlockReferenceId(value: string): string | undefined {
    const id = value.trim().replace(/^\^/, "");

    return /^[A-Za-z0-9_-]+$/.test(id) ? id : undefined;
}

function splitWikiTarget(rawTarget: string): {
    label: string;
    target: string;
} | undefined {
    const [targetPart, aliasPart] = rawTarget.split("|", 2);
    const target = targetPart.trim();

    if (!target) {
        return undefined;
    }

    return {
        target,
        label: (aliasPart?.trim() || target).replace(/^#\^?/, ""),
    };
}

function getWikiHref(target: string): string | undefined {
    if (!target.startsWith("#")) {
        return undefined;
    }

    const targetAfterHash = target.slice(1);

    if (targetAfterHash.startsWith("^")) {
        const id = normalizeBlockReferenceId(targetAfterHash);

        return id ? `#${id}` : undefined;
    }

    /**
     * Until the site has a cross-essay resolver, only explicit same-page wiki
     * targets become links. Bare page names like `[[CSS Cascade Algorithm]]`
     * render as readable text instead of publishing a broken local hash.
     */
    const slug = slugifyHeadingTarget(targetAfterHash);

    return slug ? `#${slug}` : undefined;
}

function createWikiLink(rawTarget: string): Link | Text {
    const wikiTarget = splitWikiTarget(rawTarget);
    const href = wikiTarget ? getWikiHref(wikiTarget.target) : undefined;

    if (!wikiTarget) {
        return {
            type: "text",
            value: `[[${rawTarget}]]`,
        };
    }

    /**
     * Keep unresolved page-style wiki links readable without inventing a URL.
     * Example: `[[CSS Cascade Algorithm|CSS cascade]]` renders as `CSS cascade`
     * until a resolver can map `CSS Cascade Algorithm` to a canonical essay.
     */
    if (!href) {
        return {
            type: "text",
            value: wikiTarget.label,
        };
    }

    return {
        type: "link",
        url: href,
        children: [
            {
                type: "text",
                value: wikiTarget.label,
            },
        ],
    };
}

function splitWikiLinks(value: string): Array<Link | Text> {
    const nodes: Array<Link | Text> = [];
    let cursor = 0;

    for (const match of value.matchAll(WIKI_LINK_REGEX)) {
        const matchIndex = match.index ?? 0;

        if (matchIndex > cursor) {
            nodes.push({
                type: "text",
                value: value.slice(cursor, matchIndex),
            });
        }

        /**
         * Image embeds are deliberately left as text here because asset embeds
         * need different mdast output (`image` nodes) and alt-text handling.
         * `index.ts` keeps that as the remaining Obsidian syntax task, while
         * this transformer owns internal links only.
         */
        const replacement = match[0].startsWith("!")
            ? {
                  type: "text" as const,
                  value: match[0],
              }
            : createWikiLink(match[1]);

        nodes.push(replacement);
        cursor = matchIndex + match[0].length;
    }

    if (cursor < value.length) {
        nodes.push({
            type: "text",
            value: value.slice(cursor),
        });
    }

    return nodes;
}

function transformWikiLinkChildren(node: InlineParent): void {
    node.children = node.children.flatMap((child) => {
        if (!isText(child) || !child.value.includes("[[")) {
            return [child];
        }

        return splitWikiLinks(child.value);
    });
}

/**
 * Obsidian block references are authoring-only markers. Hide the trailing marker
 * and attach its id before `rehypeSlug`; this gives `[[#^solution|here]]` a real
 * target without leaking `^solution` into public essay headings.
 */
export function transformObsidianInternalLinks(tree: Root): void {
    /**
     * Order matters:
     * 1. Hide block markers and attach explicit ids before `rehypeSlug`, so
     *    `rehypeSlug` preserves the manual `id="solution"` instead of deriving
     *    `id="implementation-solution"` from the visible heading text.
     * 2. Rewrite wiki syntax into ordinary mdast links before remark-rehype, so
     *    the rest of the pipeline never needs Obsidian-specific string handling.
     */
    visit(tree, (node) => {
        if (isBlockReferenceContainer(node)) {
            const blockReferenceId = hideTrailingBlockReferenceMarker(node);

            if (blockReferenceId) {
                setNodeId(node, blockReferenceId);
            }
        }
    });

    visit(tree, (node) => {
        if (isInlineParent(node)) {
            transformWikiLinkChildren(node);
        }
    });
}
