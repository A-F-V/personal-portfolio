import Link from "next/link";
import { cn } from "@/lib/utils/shadcn";

export function EssayFooter() {
    return (
        <div
            className={cn(
                "mt-12 rounded-xl border border-border bg-muted/30 px-6 py-5",
                "text-base text-foreground/80"
            )}
        >
            <p>
                I write these essays to explore tools for better thinking,
                learning, and remembering, as well as the business mindset
                required to bring these tools into existence. If you found this
                valuable, you might enjoy{" "}
                <Link
                    href="https://janus.cards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                >
                    Janus
                </Link>
                , my tool for turning what you read and learn into lasting
                memory.
            </p>
        </div>
    );
}
