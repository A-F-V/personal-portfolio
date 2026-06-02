import { getAllEssays } from "@/lib/essays";
import { buildEssayRssXml } from "@/lib/essays/feed";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
    // `force-static` prerenders this RSS feed at build time, so updates publish
    // with the next site build rather than regenerating on every request.
    const essays = await getAllEssays();
    const rssXml = await buildEssayRssXml(essays);

    return new Response(rssXml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
