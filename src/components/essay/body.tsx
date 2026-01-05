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
                "flex flex-col gap-4 text-[1.125rem] lg:text-[1.3125rem] leading-[1.7] lg:leading-[1.8] text-foreground/90",
                "!font-essay",
                "[&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:text-7xl lg:[&>p:first-of-type::first-letter]:text-8xl [&>p:first-of-type::first-letter]:font-serif [&>p:first-of-type::first-letter]:mr-4 [&>p:first-of-type::first-letter]:mt-2 [&>p:first-of-type::first-letter]:leading-none [&>p:first-of-type::first-letter]:text-primary [&>p:first-of-type::first-letter]:font-bold",
                "[&_h2]:scroll-mt-24 [&_h2]:text-4xl lg:[&_h2]:text-5xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-8 lg:[&_h2]:mt-12 [&_h2]:mb-1",
                "[&_h3]:scroll-mt-24 [&_h3]:text-3xl lg:[&_h3]:text-4xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-6 lg:[&_h3]:mt-10 [&_h3]:mb-1",
                "[&_h4]:scroll-mt-20 [&_h4]:text-2xl lg:[&_h4]:text-3xl [&_h4]:font-serif [&_h4]:font-bold [&_h4]:tracking-tight [&_h4]:text-foreground [&_h4]:mt-4",
                "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-all [&_a:hover]:text-primary/80 [&_a:hover]:underline-offset-2",
                "[&_blockquote]:border-l-4 [&_blockquote]:border-primary/20 [&_blockquote]:pl-8 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-xl lg:[&_blockquote]:text-2xl [&_blockquote]:font-serif [&_blockquote]:text-foreground/70 [&_blockquote]:my-6 lg:[&_blockquote]:my-10",
                "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
                "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
                "[&_li]:pl-2",
                "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-foreground",
                "[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-muted/50 [&_pre]:p-6 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit",
                "[&_img]:mx-auto [&_img]:my-8 lg:[&_img]:my-10 [&_img]:block [&_img]:max-h-[600px] [&_img]:max-w-full [&_img]:rounded-xl [&_img]:object-contain [&_img]:shadow-2xl lg:-mx-12 lg:w-[calc(100%+6rem)]",
                "[&_figure]:space-y-4 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:font-medium [&_figcaption]:tracking-wide [&_figcaption]:uppercase [&_figcaption]:text-foreground/40",
                "[&_hr]:my-8 lg:[&_hr]:my-10 [&_hr]:border-foreground/10",
                "[&_table]:w-full [&_table]:border-collapse [&_th]:border-b-2 [&_th]:border-foreground/10 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-bold [&_td]:border-b [&_td]:border-foreground/5 [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm"
            )}
        >
            {essayContent}
        </div>
    );
}
