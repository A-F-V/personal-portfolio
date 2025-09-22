import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDate } from "../utils/format-date";

type EssayLinkProps = {
    title: string;
    datePublished: string | Date;
    tags?: string[];
    link: string;
    className?: string;
};

export function EssayLink({
    title,
    datePublished,
    tags,
    link,
    className,
}: EssayLinkProps) {
    const isExternalLink = /^https?:\/\//.test(link);
    const href = link;
    const formattedDate = formatDate(datePublished);

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
                <span className="truncate  text-lg font-bold text-foreground transition-colors duration-150 group-hover:underline group-focus-visible:underline">
                    {title}
                </span>
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-accent/80">
                    {formattedDate}
                </span>
            </div>

            {tags?.length ? (
                <div className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground/60">
                    <span className="flex flex-wrap items-center gap-1">
                        {tags.join(" • ")}
                    </span>
                </div>
            ) : null}
        </Link>
    );
}
