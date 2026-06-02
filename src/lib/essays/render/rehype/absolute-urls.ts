import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const URL_SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:/i;

export function toAbsoluteEssayHtmlUrl(value: string, siteUrl: string): string {
    const trimmed = value.trim();

    if (
        !trimmed ||
        trimmed.startsWith("#") ||
        URL_SCHEME_PATTERN.test(trimmed)
    ) {
        return value;
    }

    return new URL(trimmed, siteUrl).toString();
}

export function rehypeAbsoluteUrls(siteUrl: string): Plugin<[], Root> {
    return () => (tree) => {
        visit(tree, "element", (node: Element) => {
            for (const attribute of ["href", "src"] as const) {
                const value = node.properties?.[attribute];

                if (typeof value === "string") {
                    node.properties[attribute] = toAbsoluteEssayHtmlUrl(
                        value,
                        siteUrl
                    );
                }
            }
        });
    };
}
