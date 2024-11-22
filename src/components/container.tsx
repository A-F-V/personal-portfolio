import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("", "shadow-[0_0_20px_var(--midground)]")}>
      <div
        className={cn(
          "relative p-10 bg-midground",
          "rounded-3xl shadow-[inset_0_0_20px_var(--background)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
