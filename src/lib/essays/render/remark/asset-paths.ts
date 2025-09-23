import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { normalizeUrl } from "./asset-url";

export const ASSET_PREFIX = "/essay-assets/";

type ImageLikeNode = {
    type: string;
    url?: string;
    identifier?: string;
};

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
