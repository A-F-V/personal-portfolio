import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const ASSET_PREFIX = "/essay-assets/";

type ImageLikeNode = {
    type: string;
    url?: string;
    identifier?: string;
};

function normalizeUrl(url: string | undefined): string | undefined {
    if (!url) {
        return url;
    }

    const trimmed = url.trim();

    if (!trimmed || /^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
        return trimmed;
    }

    const withoutPrefix = trimmed.replace(/^\.\//, "");
    const sanitized = withoutPrefix.replace(/^[./\\]+/, "");

    return `${ASSET_PREFIX}${sanitized}`;
}

export const remarkEssayAssetPaths: Plugin = () => (tree) => {
    visit(tree, (node: ImageLikeNode) => {
        if (node.type === "image" && typeof node.url === "string") {
            node.url = normalizeUrl(node.url);
        }

        if (
            node.type === "imageReference" &&
            typeof node.identifier === "string"
        ) {
            node.identifier = normalizeUrl(node.identifier);
        }
    });
};

