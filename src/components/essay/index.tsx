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
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-4 lg:py-12">
            <EssayHeader frontMatter={frontMatter} />
            <EssayBody essay={essay} />
            <EssayFooter />
        </article>
    );
}
