import { renderEssayContent } from "@/lib/essays/render";
import { EssayDocument } from "@/lib/essays/types";
import { cn } from "@/lib/utils/shadcn";

interface EssayBodyProps {
    essay: EssayDocument;
}

export async function EssayBody({ essay }: EssayBodyProps) {
    const essayContent = await renderEssayContent(essay);

    return (
        <div
            className={cn(
                "flex flex-col gap-6 text-lg leading-8 text-foreground/90 md:text-xl md:leading-9",
                "!font-essay",
                "[&_h2]:scroll-mt-24 [&_h2]:text-4xl [&_h2]:font-semibold [&_h2]:tracking-tight",
                "[&_h3]:scroll-mt-24 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight",
                "[&_h4]:scroll-mt-20 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:tracking-tight",
                "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-primary/80",
                "[&_blockquote]:rounded-xl [&_blockquote]:border [&_blockquote]:border-border [&_blockquote]:bg-muted/40 [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:text-foreground/80",
                "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
                "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
                "[&_li]:pl-1",
                "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-foreground",
                "[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit",
                "[&_img]:mx-auto [&_img]:my-6 [&_img]:block [&_img]:max-h-[400px] [&_img]:max-w-full [&_img]:rounded-xl [&_img]:object-contain [&_img]:shadow-lg",
                "[&_figure]:space-y-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground",
                "[&_hr]:my-12 [&_hr]:border-foreground/10",
                "[&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_td]:border-b [&_td]:border-border/60 [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm"
            )}
        >
            {essayContent}
        </div>
    );
}
