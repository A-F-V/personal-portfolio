import Link from "next/link";
import { cn } from "@/lib/utils/shadcn";
import { formatDate } from "../lib/utils/format";

type EssayLinkProps = {
    title: string;
    subtitle?: string;
    datePublished: string | Date;
    readingTime?: number;
    tags?: string[];
    link: string;
    className?: string;
};

export function EssayLink({
    title,
    subtitle,
    datePublished,
    readingTime,
    tags,
    link,
    className,
}: EssayLinkProps) {
    const isExternalLink = /^https?:\/\//.test(link);
    const href = link;
    const formattedDate = formatDate(datePublished);
    const readingTimeLabel =
        typeof readingTime === "number" && readingTime > 0
            ? `${Math.round(readingTime)} min read`
            : null;

    return (
        <Link
            href={href}
            className={cn("group block focus-visible:outline-none", className)}
            {...(isExternalLink
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            prefetch={false}
            aria-label={`Read ${title}`}
        >
            <div className="flex items-baseline justify-between gap-4">
                <span className="truncate text-lg font-bold text-foreground transition-colors duration-150 group-hover:underline group-focus-visible:underline">
                    {title}
                </span>
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-accent/80">
                    {formattedDate}
                </span>
            </div>

            {subtitle ? (
                <p className="mt-1 text-sm text-foreground/80 line-clamp-2">
                    {subtitle}
                </p>
            ) : null}

            {tags?.length || readingTimeLabel ? (
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.18em] text-foreground/60">
                    {tags?.length ? (
                        <span className="flex flex-wrap items-center gap-1">
                            {tags.join(" • ")}
                        </span>
                    ) : null}
                    {readingTimeLabel ? (
                        <span className="font-mono tracking-tight">
                            {readingTimeLabel}
                        </span>
                    ) : null}
                </div>
            ) : null}
        </Link>
    );
}
