import { z, type ZodIssue } from "zod";
import type { EssayFrontMatter } from "../../types";
import { ensureStringArray, toBoolean, toDate, toNumber } from "./coerce";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const stringListSchema = z.array(z.string().min(1)).nonempty();

const essayFrontMatterRawSchema = z.object({
    title: z.string().min(1, "title is required"),
    subtitle: z.string().min(1, "subtitle is required").optional(),
    hero_image: z
        .preprocess(
            (value) =>
                typeof value === "string" ? value.trim() : value,
            z.string().min(1, "hero_image must be a non-empty string")
        )
        .optional(),
    slug: z
        .string()
        .min(1, "slug is required")
        .regex(slugRegex, "slug must be lowercase alphanumeric with dashes"),
    publish_date: z.preprocess(toDate, z.date()),
    reading_time: z
        .preprocess(toNumber, z.number().positive().finite())
        .describe("reading_time must be a positive number"),
    tags: z.preprocess(ensureStringArray, stringListSchema),
    authors: z.preprocess(ensureStringArray, stringListSchema),
    draft: z.preprocess(toBoolean, z.boolean()),
});

export const essayFrontMatterSchema = essayFrontMatterRawSchema.transform(
    (raw): EssayFrontMatter => {
        const publishDate = raw.publish_date;

        const normalizeList = (list: string[]): string[] =>
            list
                .map((value) => value.trim())
                .filter((value) => value.length > 0);

        const tags = normalizeList(raw.tags);
        const authors = normalizeList(raw.authors);

        const issues: ZodIssue[] = [];

        if (tags.length === 0) {
            issues.push({
                code: z.ZodIssueCode.custom,
                path: ["tags"],
                message: "must include at least one tag",
            });
        }

        if (authors.length === 0) {
            issues.push({
                code: z.ZodIssueCode.custom,
                path: ["authors"],
                message: "must include at least one author",
            });
        }

        if (issues.length > 0) {
            throw new z.ZodError(issues);
        }

        const heroImage =
            typeof raw.hero_image === "string" && raw.hero_image.length > 0
                ? raw.hero_image
                : undefined;

        return {
            title: raw.title.trim(),
            subtitle: raw.subtitle?.trim(),
            heroImage,
            slug: raw.slug.trim(),
            publishDate,
            readingTime: Math.round(raw.reading_time * 10) / 10,
            tags,
            authors,
            draft: raw.draft,
        };
    }
);
