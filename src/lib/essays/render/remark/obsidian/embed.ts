import type { Image, PhrasingContent, Root, Text } from "mdast";
import { visit } from "unist-util-visit";

const IMAGE_EMBED_REGEX = /!\[\[([^\]\n]+)\]\]/g;
const SIZE_HINT_REGEX = /^(\d+)(?:x(\d+))?$/;

type ParentWithPhrasingChildren = {
    children: PhrasingContent[];
};

interface ParsedImageEmbed {
    alt: string;
    height?: number;
    url: string;
    width?: number;
}

function parseSizeHint(value: string): Pick<
    ParsedImageEmbed,
    "height" | "width"
> | null {
    const match = value.match(SIZE_HINT_REGEX);

    if (!match) {
        return null;
    }

    return {
        width: Number(match[1]),
        ...(match[2] ? { height: Number(match[2]) } : {}),
    };
}

function parseImageEmbed(value: string): ParsedImageEmbed | null {
    const [rawUrl, ...rawOptions] = value
        .split("|")
        .map((part) => part.trim());
    const url = rawUrl;

    if (!url) {
        return null;
    }

    const options = rawOptions.filter(Boolean);
    const size = options
        .map((option) => parseSizeHint(option))
        .find((option) => option !== null);
    const explicitAlt = options.find((option) => parseSizeHint(option) === null);

    return {
        alt: explicitAlt ?? url,
        url,
        ...size,
    };
}

function createImageNode(embed: ParsedImageEmbed): Image {
    const hProperties =
        embed.width || embed.height
            ? {
                  ...(embed.width ? { width: embed.width } : {}),
                  ...(embed.height ? { height: embed.height } : {}),
              }
            : undefined;

    return {
        type: "image",
        url: embed.url,
        alt: embed.alt,
        ...(hProperties
            ? {
                  data: {
                      hProperties,
                  },
              }
            : {}),
    };
}

function replaceImageEmbeds(value: string): PhrasingContent[] | null {
    const children: PhrasingContent[] = [];
    let lastIndex = 0;
    let foundEmbed = false;

    IMAGE_EMBED_REGEX.lastIndex = 0;

    for (const match of value.matchAll(IMAGE_EMBED_REGEX)) {
        const index = match.index ?? 0;
        const embed = parseImageEmbed(match[1]);

        if (index > lastIndex) {
            children.push({
                type: "text",
                value: value.slice(lastIndex, index),
            });
        }

        children.push(
            embed
                ? createImageNode(embed)
                : {
                      type: "text",
                      value: match[0],
                  }
        );
        foundEmbed = true;
        lastIndex = index + match[0].length;
    }

    if (!foundEmbed) {
        return null;
    }

    if (lastIndex < value.length) {
        children.push({
            type: "text",
            value: value.slice(lastIndex),
        });
    }

    return children;
}

/**
 * Output shape:
 * - `![[diagram.png]]` becomes the same mdast image shape as
 *   `![diagram.png](diagram.png)` so the asset-path pass can normalize it.
 * - `![[diagram.png|Specific alt text]]` uses the alias as alt text.
 * - `![[diagram.png|400]]` preserves the size hint as image metadata.
 */
export function transformObsidianImageEmbeds(tree: Root): void {
    visit(tree, "text", (node: Text, index, parent) => {
        if (typeof index !== "number" || !parent || !("children" in parent)) {
            return;
        }

        const replacement = replaceImageEmbeds(node.value);

        if (!replacement) {
            return;
        }

        (parent as ParentWithPhrasingChildren).children.splice(
            index,
            1,
            ...replacement
        );

        return index + replacement.length;
    });
}
