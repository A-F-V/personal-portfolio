"use client";

import Giscus from "@giscus/react";

import { giscusEssayConfig } from "@/lib/giscus";
import { cn } from "@/lib/utils/shadcn";

interface EssayDiscussProps {
    className?: string;
}

export function EssayDiscuss({ className }: EssayDiscussProps) {
    return (
        <section
            aria-labelledby="essay-discuss-heading"
            className={cn(
                "essay-discuss mt-10 border-t border-foreground/10 pt-8",
                className
            )}
        >
            <h2
                id="essay-discuss-heading"
                className="font-serif text-3xl font-bold leading-tight text-foreground"
            >
                Discuss
            </h2>
            <div className="mt-5">
                <Giscus id="essay-discussion" {...giscusEssayConfig} />
            </div>
        </section>
    );
}
