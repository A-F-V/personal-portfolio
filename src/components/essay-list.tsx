import type { EssayFrontMatter } from "@/lib/essays/types";
import { EssayLink } from "./essay-link";
import { MinorHeading } from "./headings";
import { IconType } from "./icon";
import { FaCodeCommit } from "react-icons/fa6";

const headingIcon: IconType = {
    img: FaCodeCommit,
};

interface EssayListProps {
    essays: EssayFrontMatter[];
}

export function EssayList({ essays }: EssayListProps) {
    const essaysByYear = essays.reduce((acc, essay) => {
        const year = new Date(essay.publishDate).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(essay);
        return acc;
    }, {} as Record<number, EssayFrontMatter[]>);

    const years = Object.keys(essaysByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div>
            <MinorHeading icon={headingIcon}>Essays</MinorHeading>

            <div className="flex flex-col gap-10">
                {years.map((year) => (
                    <div key={year} className="flex flex-col gap-4">
                        <h3 className="text-3xl font-serif text-foreground/40">
                            {year}
                        </h3>
                        <div className="flex flex-col gap-6">
                            {essaysByYear[year]
                                .sort(
                                    (a, b) =>
                                        new Date(b.publishDate).getTime() -
                                        new Date(a.publishDate).getTime()
                                )
                                .map((essay) => (
                                    <EssayLink
                                        key={`${essay.slug}-${essay.publishDate}`}
                                        title={essay.title}
                                        subtitle={essay.subtitle}
                                        link={`/essay/${essay.slug}`}
                                        datePublished={essay.publishDate}
                                        readingTime={essay.readingTime}
                                        tags={essay.tags}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
