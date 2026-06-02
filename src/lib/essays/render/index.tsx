import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

import { remarkEssayAssetPaths } from "./remark/asset-paths";
import type { EssayDocument } from "../types";

import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { ReactNode } from "react";

const DOMAIN_SEGMENT_PATTERN =
    /^(?:[a-z0-9-]+\.)+[a-z][a-z0-9-]*(?::\d+)?$/i;
const LOCAL_FILE_EXTENSION_PATTERN =
    /\.(?:gif|html?|jpe?g|mdx?|pdf|png|svg|webp|zip)$/i;

function createReactOptions() {
    return {
        Fragment,
        jsx,
        jsxs,
    };
}

function looksLikeBareExternalDomain(value: string): boolean {
    if (
        value.startsWith("/") ||
        value.startsWith("./") ||
        value.startsWith("../")
    ) {
        return false;
    }

    const [firstSegment] = value.split(/[/?#]/);

    return (
        DOMAIN_SEGMENT_PATTERN.test(firstSegment) &&
        !LOCAL_FILE_EXTENSION_PATTERN.test(firstSegment)
    );
}

function toAbsoluteUrl(value: string, siteUrl: string): string {
    const trimmed = value.trim();

    if (
        !trimmed ||
        trimmed.startsWith("#") ||
        /^[a-z][a-z0-9+.-]*:/i.test(trimmed)
    ) {
        return value;
    }

    if (looksLikeBareExternalDomain(trimmed)) {
        return `https://${trimmed}`;
    }

    return new URL(trimmed, siteUrl).toString();
}

function rehypeAbsoluteUrls(siteUrl: string): Plugin<[], Root> {
    return () => (tree) => {
        visit(tree, "element", (node: Element) => {
            for (const attribute of ["href", "src"] as const) {
                const value = node.properties?.[attribute];

                if (typeof value === "string") {
                    node.properties[attribute] = toAbsoluteUrl(value, siteUrl);
                }
            }
        });
    };
}

function createEssayProcessor() {
    return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkEssayAssetPaths)
        .use(remarkRehype)
        .use(rehypeRaw)
        .use(rehypeSlug);
}

export async function renderEssayContent(
    document: EssayDocument
): Promise<ReactNode> {
    const processor = createEssayProcessor().use(
        rehypeReact,
        createReactOptions()
    );

    const { result } = await processor.process(document.content);

    return result;
}

export async function renderEssayHtml(
    document: EssayDocument,
    siteUrl: string
): Promise<string> {
    const processor = createEssayProcessor()
        .use(rehypeAbsoluteUrls(siteUrl))
        .use(rehypeStringify);

    const file = await processor.process(document.content);

    return file.toString();
}
