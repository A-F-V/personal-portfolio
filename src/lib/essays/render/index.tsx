import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";

import { remarkEssayAssetPaths } from "./remark/asset-paths";
import type { EssayDocument } from "../types";

import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ReactNode } from "react";

function createReactOptions() {
    return {
        Fragment,
        jsx,
        jsxs,
    };
}

export async function renderEssayContent(
    document: EssayDocument
): Promise<ReactNode> {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkEssayAssetPaths)
        .use(remarkRehype)
        .use(rehypeRaw)
        .use(rehypeSlug)
        .use(rehypeReact, createReactOptions());

    const { result } = await processor.process(document.content);

    return result;
}
