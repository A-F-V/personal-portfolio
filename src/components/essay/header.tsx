import { EssayFrontMatter } from "@/lib/essays/types";
import { formatDate } from "@/lib/utils/format";
import { EssayHeroImage } from "../essay-hero-image";
import { normalizeUrl } from "@/lib/essays/render/remark/asset-url";
import { SubstackLink } from "../substack-link";

interface EssayHeaderProps {
    frontMatter: EssayFrontMatter;
}

export function EssayHeader({ frontMatter }: EssayHeaderProps) {
    const formattedDate = formatDate(frontMatter.publishDate);
    const readingTimeLabel = `${Math.round(frontMatter.readingTime)} min read`;
    const isSubstack = frontMatter.canonicalUrl?.includes("substack.com");

    return (
        <header className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-3">
                <h1 className="font-serif text-5xl lg:text-7xl tracking-tight text-foreground leading-[1.2] font-bold">
                    {frontMatter.title}
                </h1>
                {frontMatter.subtitle ? (
                    <p className="text-xl lg:text-2xl leading-relaxed text-foreground/70 font-serif italic">
                        {frontMatter.subtitle}
                    </p>
                ) : null}
            </div>

            <div className="flex flex-col gap-2">
                {/* Row 1: Date, Reading Time, and optional Substack Button */}
                <div className="flex items-center gap-x-4 text-sm uppercase tracking-wider text-foreground/50 font-medium w-full">
                    <span>{formattedDate}</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span>{readingTimeLabel}</span>
                    {isSubstack && (
                        <SubstackLink
                            url={frontMatter.canonicalUrl!}
                            className="ml-auto"
                        />
                    )}
                </div>

                {/* Row 2: Tags */}
                {frontMatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-sm uppercase tracking-wider text-foreground/50 font-medium">
                        {frontMatter.tags.map((tag) => (
                            <span
                                key={tag}
                                className="hover:text-foreground/80 transition-colors cursor-default"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {frontMatter.heroImage ? (
                <div className="relative -mx-6 lg:-mx-12 mt-2">
                    <EssayHeroImage
                        src={normalizeUrl(frontMatter.heroImage) ?? ""}
                        alt={frontMatter.title}
                        priority
                    />
                </div>
            ) : (
                <hr className="border-foreground/10 mt-2" />
            )}
        </header>
    );
}
