import { type ReactNode } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import { cn } from "@/lib/utils/shadcn";

interface ProjectCardProps {
    title: string;
    keywords?: string | string[];
    description: string;
    icon?: ReactNode;
    className?: string;
    href?: string;
}

export function ProjectCard({
    title,
    keywords,
    description,
    icon,
    className,
    href,
}: ProjectCardProps) {
    const keywordContent = Array.isArray(keywords)
        ? keywords.join(" • ")
        : keywords;

    const baseClasses = cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/30 bg-card/80 px-8 py-6 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
    );

    const isExternalLink = href ? /^https?:\/\//.test(href) : false;

    const CardBody = (
        <>
            <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-3xl sm:text-5xl font-serif font-semibold tracking-tight text-foreground flex items-center">
                    <span className="flex items-center gap-3">
                        <span>{title}</span>
                        {href ? (
                            <FiArrowUpRight className="text-xl text-accent/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                        ) : null}
                    </span>
                    {icon ? (
                        <span className="ml-auto flex items-center">
                            {icon}
                        </span>
                    ) : null}
                </h3>

                {keywordContent ? (
                    <p className="font-accent text-xs sm:text-sm uppercase tracking-extra-wide text-accent/80">
                        {keywordContent}
                    </p>
                ) : null}

                <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                    {description}
                </p>
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={baseClasses}
                {...(isExternalLink
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                prefetch={false}
                role="article"
            >
                {CardBody}
            </Link>
        );
    }

    return <article className={baseClasses}>{CardBody}</article>;
}
