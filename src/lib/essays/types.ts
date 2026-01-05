import type { ZodIssue } from "zod";

export interface EssayFrontMatterBase {
    title: string;
    subtitle?: string;
    description: string;
    heroImage?: string;
    slug: string;
    publishDate: Date;
    readingTime?: number;
    tags: string[];
    authors: string[];
    draft: boolean;
    canonicalUrl?: string;
}

export interface EssayFrontMatter extends EssayFrontMatterBase {
    readingTime: number;
}

export interface EssayDocument {
    slug: string;
    frontMatter: EssayFrontMatter;
    content: string;
    filePath: string;
}

export class EssayFrontMatterError extends Error {
    issues: ZodIssue[];
    filePath?: string;

    constructor(message: string, issues: ZodIssue[], filePath?: string) {
        super(message);
        this.name = "EssayFrontMatterError";
        this.issues = issues;
        this.filePath = filePath;
    }
}

export class EssayNotFoundError extends Error {
    slug: string;

    constructor(slug: string) {
        super(`Essay not found for slug: ${slug}`);
        this.name = "EssayNotFoundError";
        this.slug = slug;
    }
}

export class DuplicateEssaySlugError extends Error {
    slug: string;
    filePaths: string[];

    constructor(slug: string, filePaths: string[]) {
        super(`Duplicate essay slug detected: ${slug}`);
        this.name = "DuplicateEssaySlugError";
        this.slug = slug;
        this.filePaths = filePaths;
    }
}
