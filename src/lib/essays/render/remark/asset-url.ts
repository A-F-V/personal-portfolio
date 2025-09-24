import { ASSET_PREFIX } from "./asset-paths";

export function normalizeUrl(url: string | undefined): string | undefined {
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
