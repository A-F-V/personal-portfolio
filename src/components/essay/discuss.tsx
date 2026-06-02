"use client";

import {
    type ComponentType,
    useEffect,
    useRef,
    useState,
} from "react";
import type { GiscusProps } from "@giscus/react";
import { MessageCircle } from "lucide-react";

import { giscusEssayConfig } from "@/lib/giscus";
import { cn } from "@/lib/utils/shadcn";

interface EssayDiscussProps {
    className?: string;
}

type GiscusComponent = ComponentType<GiscusProps>;

const GISCUS_LOAD_ROOT_MARGIN = "300px 0px";

async function loadGiscusComponent(): Promise<GiscusComponent> {
    const giscusModule = await import("@giscus/react");
    return giscusModule.default;
}

export function EssayDiscuss({ className }: EssayDiscussProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [Giscus, setGiscus] = useState<GiscusComponent | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            void loadGiscusComponent().then((Component) => {
                if (!cancelled) {
                    setGiscus(() => Component);
                }
            });
        };

        const section = sectionRef.current;

        if (!section || typeof IntersectionObserver === "undefined") {
            load();
            return () => {
                cancelled = true;
            };
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) {
                    return;
                }

                observer.disconnect();
                load();
            },
            { rootMargin: GISCUS_LOAD_ROOT_MARGIN }
        );

        observer.observe(section);

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="essay-discuss-heading"
            className={cn(
                "essay-discuss mt-10 border-t border-foreground/10 pt-8",
                className
            )}
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2
                    id="essay-discuss-heading"
                    className="inline-flex items-center gap-2 font-serif text-3xl font-bold leading-tight text-foreground"
                >
                    <MessageCircle
                        className="size-5 text-primary"
                        aria-hidden
                    />
                    Discuss
                </h2>
                <span className="w-fit rounded-full bg-primary/5 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75">
                    Powered by Giscus
                </span>
            </div>
            <div className="mt-5">
                {Giscus ? (
                    <Giscus id="essay-discussion" {...giscusEssayConfig} />
                ) : (
                    <div className="min-h-24" aria-hidden />
                )}
            </div>
        </section>
    );
}
