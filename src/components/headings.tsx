import { cn } from "@/lib/utils/shadcn";
import { Icon, IconType } from "./icon";

type MinorHeadingProps = {
    className?: string;
    icon?: IconType;
    children: React.ReactNode;
};

export function MinorHeading({ children, icon, className }: MinorHeadingProps) {
    return (
        <>
            <h2
                className={cn(
                    "text-5xl font-serif  flex items-center gap-4 text-foreground my-4 lg:my-6",
                    className
                )}
            >
                {icon && <Icon icon={icon} />}
                {children}
            </h2>
        </>
    );
}
