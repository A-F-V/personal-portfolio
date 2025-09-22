import { Icon, IconType } from "./icon";

type MinorHeadingProps = {
    className?: string;
    icon?: IconType;
    children: React.ReactNode;
};

export function MinorHeading({ children, icon }: MinorHeadingProps) {
    return (
        <>
            <h2 className="text-lg sm:text-xl lg:text-lg font-accent accent-style tracking-tight flex items-center gap-2 text-foreground">
                {icon && <Icon icon={icon} />}
                {children}
            </h2>
        </>
    );
}
