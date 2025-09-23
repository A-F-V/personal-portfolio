import { LandingHero } from "@/components/landing-hero";
import { getAllEssays } from "@/lib/essays";

export default async function Home() {
    const essays = await getAllEssays();
    const featured = essays.slice(0, 3).map((essay) => essay.frontMatter);

    return (
        <div className="flex flex-col items-center min-h-screen lg:pt-[20vh] lg:pb-[5vh] home-gradient">
            <LandingHero essays={featured} />
        </div>
    );
}
