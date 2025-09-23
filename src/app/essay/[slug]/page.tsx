import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getEssayBySlug, listEssaySlugs } from "@/lib/essays";
import { EssayNotFoundError, type EssayDocument } from "@/lib/essays/types";
import { renderEssayContent } from "@/lib/essays/render";
import { formatDate } from "@/lib/utils/format";

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
        const { title, subtitle, authors, publishDate } = essay.frontMatter;
        const description = subtitle ?? essay.content.slice(0, 150);

        return {
            title,
            description: description ?? undefined,
            authors: authors.map((name) => ({ name })),
            openGraph: {
                title,
                description: description ?? undefined,
                type: "article",
                publishedTime: publishDate.toISOString(),
                authors,
            },
            twitter: {
                card: "summary_large_image",
                title,
                description: description ?? undefined,
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
    const essayContent = await renderEssayContent(essay);
    const { frontMatter } = essay;

    const formattedDate = formatDate(frontMatter.publishDate);
    const readingTimeLabel = `${Math.round(frontMatter.readingTime)} min read`;
    const tagLabel = frontMatter.tags.join(" • ");

    return (
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
            <header className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-foreground/60">
                    <span>{formattedDate}</span>
                    <span>{readingTimeLabel}</span>
                    <span>{tagLabel}</span>
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {frontMatter.title}
                </h1>
                {frontMatter.subtitle ? (
                    <p className="text-lg text-foreground/80">
                        {frontMatter.subtitle}
                    </p>
                ) : null}
                <div className="text-sm text-foreground/70">
                    {frontMatter.authors.join(", ")}
                </div>
            </header>

            <div className="flex flex-col gap-6 text-base leading-7 text-foreground/90">
                {essayContent}
            </div>
        </article>
    );
}
