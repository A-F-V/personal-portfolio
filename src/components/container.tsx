import { cn } from "@/lib/utils/shadcn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
    return (
        <div>
            <div
                className={cn("relative p-10 ", "rounded-3xl ", className)}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}
