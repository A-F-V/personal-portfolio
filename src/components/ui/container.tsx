import { cn } from "@/lib/utils/shadcn";
import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("max-w-screen-xl mx-auto", className)}>
            {children}
        </div>
    );
};
