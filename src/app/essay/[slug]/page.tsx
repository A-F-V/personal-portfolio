import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { getEssayBySlug, listEssaySlugs } from "@/lib/essays";
import { EssayNotFoundError, type EssayDocument } from "@/lib/essays/types";
import { Essay } from "@/components/essay";
import { normalizeUrl } from "@/lib/essays/render/remark/asset-url";

interface EssayPageProps {
    params: Promise<{ slug: string }>;
}

async function resolveEssay(slug: string): Promise<EssayDocument> {
    try {
        const essay = await getEssayBySlug(slug);
        return essay;
    } catch (error) {
        if (error instanceof EssayNotFoundError) {
            notFound();
        }

        throw error;
    }
}

export async function generateStaticParams() {
    const slugs = await listEssaySlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    try {
        const { slug } = await params;
        const essay = await getEssayBySlug(slug);
        const { title, description, authors, publishDate } = essay.frontMatter;
        const heroImage = essay.frontMatter.heroImage
            ? normalizeUrl(essay.frontMatter.heroImage)
            : undefined;

        return {
            title,
            description,
            authors: authors.map((name) => ({ name })),
            openGraph: {
                title,
                description,
                type: "article",
                publishedTime: publishDate.toISOString(),
                authors,
                siteName: "Alessandro Farace",
                images: heroImage ? [heroImage] : undefined,
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: heroImage ? [heroImage] : undefined,
            },
        };
    } catch (error) {
        if (error instanceof EssayNotFoundError) {
            return {};
        }

        throw error;
    }
}

export default async function EssayPage({ params }: EssayPageProps) {
    const { slug } = await params;
    const essay = await resolveEssay(slug);

    return (
        <main className="flex min-h-screen flex-col home-gradient">
            <SiteHeader containerClassName="" />
            <div className="pb-6 lg:pb-12">
                <Essay essay={essay} />
            </div>
        </main>
    );
}
