import type { Blockquote, Node, Paragraph, Root, Text } from "mdast";
import { visit } from "unist-util-visit";

const CALLOUT_MARKER_REGEX =
    /^\[!([A-Za-z][A-Za-z0-9_-]*)\]([+-]?)(?:[ \t]+([^\n]*))?\n?/;

interface CalloutPresentation {
    icon: string;
    label: string;
    tone: string;
}

const CALLOUT_PRESENTATION: Record<string, CalloutPresentation> = {
    abstract: { icon: "§", label: "Abstract", tone: "info" },
    bug: { icon: "!", label: "Bug", tone: "danger" },
    caution: { icon: "!", label: "Caution", tone: "warning" },
    check: { icon: "✓", label: "Check", tone: "success" },
    danger: { icon: "!", label: "Danger", tone: "danger" },
    done: { icon: "✓", label: "Done", tone: "success" },
    error: { icon: "!", label: "Error", tone: "danger" },
    example: { icon: "#", label: "Example", tone: "neutral" },
    fail: { icon: "×", label: "Fail", tone: "danger" },
    failure: { icon: "×", label: "Failure", tone: "danger" },
    faq: { icon: "?", label: "FAQ", tone: "question" },
    help: { icon: "?", label: "Help", tone: "question" },
    hint: { icon: "✦", label: "Hint", tone: "success" },
    important: { icon: "!", label: "Important", tone: "warning" },
    info: { icon: "ⓘ", label: "Info", tone: "info" },
    insight: { icon: "✦", label: "Insight", tone: "insight" },
    missing: { icon: "×", label: "Missing", tone: "danger" },
    note: { icon: "ⓘ", label: "Note", tone: "info" },
    question: { icon: "?", label: "Question", tone: "question" },
    quote: { icon: "“", label: "Quote", tone: "neutral" },
    success: { icon: "✓", label: "Success", tone: "success" },
    summary: { icon: "§", label: "Summary", tone: "info" },
    tip: { icon: "✦", label: "Tip", tone: "success" },
    todo: { icon: "□", label: "Todo", tone: "warning" },
    warning: { icon: "!", label: "Warning", tone: "warning" },
};

function isBlockquote(node: Node): node is Blockquote {
    return node.type === "blockquote";
}

function getFirstParagraph(node: Blockquote): Paragraph | undefined {
    const firstChild = node.children[0];

    return firstChild?.type === "paragraph" ? firstChild : undefined;
}

function getFirstTextNode(node: Paragraph): Text | undefined {
    const firstChild = node.children[0];

    return firstChild?.type === "text" ? firstChild : undefined;
}

function getCalloutPresentation(calloutType: string): CalloutPresentation {
    return (
        CALLOUT_PRESENTATION[calloutType] ?? {
            icon: "ⓘ",
            label: calloutType.replace(/-/g, " "),
            tone: "info",
        }
    );
}

function getHProperties(node: Node): Record<string, unknown> {
    const hProperties = node.data?.hProperties;

    return typeof hProperties === "object" && hProperties !== null
        ? (hProperties as Record<string, unknown>)
        : {};
}

function createTitleParagraph(
    presentation: CalloutPresentation,
    explicitTitle: string | undefined
): Paragraph {
    const title = explicitTitle?.trim();
    const label = title
        ? `${presentation.icon} ${presentation.label}: ${title}`
        : `${presentation.icon} ${presentation.label}`;

    const paragraph: Paragraph = {
        type: "paragraph",
        data: {
            hProperties: {
                className: ["essay-callout-title"],
            },
        },
        children: [
            {
                type: "text",
                value: label,
            },
        ],
    };

    return paragraph;
}

function removeEmptyFirstParagraph(node: Blockquote, paragraph: Paragraph): void {
    if (paragraph.children.length === 0) {
        node.children.shift();
    }
}

function transformCallout(node: Blockquote): void {
    const firstParagraph = getFirstParagraph(node);
    const firstText = firstParagraph ? getFirstTextNode(firstParagraph) : undefined;

    if (!firstParagraph || !firstText) {
        return;
    }

    const match = firstText.value.match(CALLOUT_MARKER_REGEX);

    if (!match) {
        return;
    }

    const calloutType = match[1].toLowerCase();
    const presentation = getCalloutPresentation(calloutType);
    firstText.value = firstText.value.slice(match[0].length);

    if (firstText.value.length === 0) {
        firstParagraph.children.shift();
    }

    removeEmptyFirstParagraph(node, firstParagraph);
    node.children.unshift(createTitleParagraph(presentation, match[3]));

    node.data = {
        ...node.data,
        hProperties: {
            ...getHProperties(node),
            "data-callout": calloutType,
            className: [
                "essay-callout",
                `essay-callout--${calloutType}`,
                `essay-callout--tone-${presentation.tone}`,
            ],
        },
    };
}

/**
 * Output shape:
 * - `> [!NOTE] Optional title` becomes a blockquote with
 *   `data-callout="note"` plus `essay-callout`, `essay-callout--note`, and
 *   `essay-callout--tone-info` classes.
 * - The Obsidian marker is removed from body text.
 * - A first child paragraph with `essay-callout-title` is injected, containing
 *   an icon, the callout type label, and any explicit marker title.
 */
export function transformObsidianCallouts(tree: Root): void {
    visit(tree, (node) => {
        if (isBlockquote(node)) {
            transformCallout(node);
        }
    });
}
