"use client";

import type { EssayFrontMatter } from "@/lib/essays/types";
import { BioSidebar, BioIntro } from "./bio";
import { ProjectList } from "./project-list";
import { EssayList } from "./essay-list";

interface LandingHeroProps {
    essays: EssayFrontMatter[];
}

export function LandingHero({ essays }: LandingHeroProps) {
    return (
        <div className="max-w-full lg:max-w-7xl w-full flex justify-center">
            <div className="grid gap-4 lg:gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] items-start">
                <BioSidebar />

                <div className="flex flex-col gap-12 max-w-[60ch] w-full min-w-0 px-2">
                    <BioIntro />
                    <ProjectList />
                    <EssayList essays={essays} />
                </div>
            </div>
        </div>
    );
}
