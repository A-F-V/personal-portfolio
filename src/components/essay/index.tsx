import { EssayHeader } from "./header";
import { EssayDocument } from "@/lib/essays/types";
import { EssayBody } from "./body";
import { EssayFooter } from "./footer";

interface EssayProps {
    essay: EssayDocument;
}

export function Essay({ essay }: EssayProps) {
    const { frontMatter } = essay;

    return (
        <article className="mx-auto flex w-full max-w-[720px] flex-col gap-4 px-6 py-8 lg:gap-8 lg:py-12">
            <EssayHeader frontMatter={frontMatter} />
            <EssayBody essay={essay} />
            <EssayFooter />
        </article>
    );
}
