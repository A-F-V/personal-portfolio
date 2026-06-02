import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";

import { remarkEssayAssetPaths } from "./remark/asset-paths";
import { rehypeAbsoluteUrls } from "./rehype/absolute-urls";
import type { EssayDocument } from "../types";

import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { ReactNode } from "react";

function createReactOptions() {
    return {
        Fragment,
        jsx,
        jsxs,
    };
}

function createEssayProcessor() {
    return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkEssayAssetPaths)
        .use(remarkRehype)
        .use(rehypeRaw)
        .use(rehypePrism, { ignoreMissing: true })
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
