import { EssayFrontMatter } from "@/lib/essays/types";
import { formatDate } from "@/lib/utils/format";
import { EssayHeroImage } from "../essay-hero-image";
import { normalizeUrl } from "@/lib/essays/render/remark/asset-url";

interface EssayHeaderProps {
    frontMatter: EssayFrontMatter;
}

export function EssayHeader({ frontMatter }: EssayHeaderProps) {
    const formattedDate = formatDate(frontMatter.publishDate);
    const readingTimeLabel = `${Math.round(frontMatter.readingTime)} min read`;
    return (
        <header className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="font-serif text-5xl tracking-tight text-foreground sm:text-6xl">
                    {frontMatter.title}
                </h1>
                {frontMatter.subtitle ? (
                    <p className="text-lg leading-relaxed text-foreground/80">
                        {frontMatter.subtitle}
                    </p>
                ) : null}
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/70">
                    {/* <span>{frontMatter.authors.join(", ")}</span> */}
                    <span>{formattedDate}</span>
                    <span>{readingTimeLabel}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {frontMatter.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.12em] text-foreground/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            {frontMatter.heroImage ? (
                <EssayHeroImage
                    src={normalizeUrl(frontMatter.heroImage) ?? ""}
                    alt={frontMatter.title}
                    priority
                />
            ) : null}
        </header>
    );
}
