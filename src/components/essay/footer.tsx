import Link from "next/link";
import { cn } from "@/lib/utils/shadcn";
import { SubstackLink } from "../substack-link";

export function EssayFooter() {
    return (
        <div className="flex flex-col gap-4 mt-8">
            <SubstackLink
                url="https://alessandrofv.substack.com/"
                variant="subscribe"
            />
            <div
                className={cn(
                    "pt-4",
                    "text-lg text-foreground/60 leading-relaxed font-serif italic"
                )}
            >
                <p className="max-w-2xl">
                    I write these essays to explore tools for better thinking,
                    learning, and remembering, as well as the business mindset
                    required to bring these tools into existence. If you found
                    this valuable, you might enjoy{" "}
                    <Link
                        href="https://janus.cards"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline underline-offset-8 decoration-primary/30 transition-all hover:decoration-primary"
                    >
                        Janus
                    </Link>
                    , my tool for turning what you read and learn into lasting
                    memory.
                </p>
            </div>
        </div>
    );
}
