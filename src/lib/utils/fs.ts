import path from "node:path";
import fs from "node:fs/promises";

export async function collectFiles(
    dirPath: string,
    fileExtensions: string[]
): Promise<string[]> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            const nested = await collectFiles(entryPath, fileExtensions);
            files.push(...nested);
        } else if (
            fileExtensions.includes(path.extname(entry.name).toLowerCase())
        ) {
            files.push(entryPath);
        }
    }

    return files;
}
