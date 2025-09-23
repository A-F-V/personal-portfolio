import { cn } from "@/lib/utils/shadcn";
import { ReactNode } from "react";

interface LegalPageContainerProps {
    children: ReactNode;
    className?: string;
}

export function LegalPageContainer({
    children,
    className,
}: LegalPageContainerProps) {
    return (
        <div
            className={cn(
                // Container layout
                "p-8 max-w-4xl mx-auto pt-8 space-y-6",
                "text-gray-100",

                // H2 main headings
                "[&>h2]:text-2xl [&>h2]:font-bold",
                "[&>h2]:text-gray-100",
                "[&>h2]:border-b [&>h2]:border-gray-200 [&>h2]:dark:border-gray-700",
                "[&>h2]:pb-2 [&>h2]:mb-4",

                // H3 subheadings
                "[&>h3]:text-xl [&>h3]:font-semibold",
                "[&>h3]:text-gray-100",
                "[&>h3]:mt-6 [&>h3]:mb-3",

                // Paragraphs
                "[&>p]:text-gray-100",
                "[&>p]:leading-relaxed [&>p]:mb-4",

                // Lists
                "[&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-2 [&>ul]:mb-4",
                "[&>ul>li]:text-gray-100 [&>ul>li]:leading-relaxed",

                // Nested lists
                "[&>ul_ul]:list-disc [&>ul_ul]:list-inside [&>ul_ul]:ml-6 [&>ul_ul]:mt-2",

                className
            )}
        >
            {children}
        </div>
    );
}
