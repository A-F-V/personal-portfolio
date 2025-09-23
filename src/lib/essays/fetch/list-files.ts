import path from "node:path";
import { collectFiles } from "../../utils/fs";

const ROOT_DIR = process.cwd();
export const ESSAY_DIRECTORY = path.join(ROOT_DIR, "essays");
const MARKDOWN_EXTENSIONS = [".md", ".mdx"];

const toPosix = (value: string) => value.split(path.sep).join("/");

export async function listEssayFiles(): Promise<string[]> {
    const files = await collectFiles(ESSAY_DIRECTORY, MARKDOWN_EXTENSIONS);
    files.sort();
    return files;
}

export function toEssayRelativePath(filePath: string): string {
    const relative = path.relative(ESSAY_DIRECTORY, filePath);
    return toPosix(relative);
}
