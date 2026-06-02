import fs from "node:fs/promises";
import path from "node:path";

const readAppFile = (filePath: string) =>
    fs.readFile(path.join(process.cwd(), "src/app", filePath), "utf8");

describe("iOS viewport canvas backgrounds", () => {
    let css: string;
    let homeLayout: string;
    let essayLayout: string;
    let rootShell: string;

    beforeAll(async () => {
        [css, homeLayout, essayLayout, rootShell] = await Promise.all([
            readAppFile("globals.css"),
            readAppFile("(home)/layout.tsx"),
            readAppFile("(essays)/layout.tsx"),
            readAppFile("root-shell.tsx"),
        ]);
    });

    it("uses explicit route root layouts for home and essay canvases", () => {
        expect(homeLayout).toContain('createCanvasLayout("home-canvas")');
        expect(essayLayout).toContain('createCanvasLayout("essay-canvas")');
        expect(rootShell).toMatch(/htmlClassName=\{canvasClassName\}/);
        expect(rootShell).toMatch(/bodyClassName=\{canvasClassName\}/);
    });

    it("sets route-specific browser theme colors for iOS chrome", () => {
        expect(rootShell).toMatch(
            /homeViewport[\s\S]*themeColor:\s*"#02223f"/
        );
        expect(rootShell).toMatch(
            /essayViewport[\s\S]*themeColor:\s*"#faf7ef"/
        );
    });

    it("keeps browser-exposed canvas styles on html and body", () => {
        expect(css).toMatch(/html\.home-canvas,\s*body\.home-canvas\s*\{/);
        expect(css).toMatch(/html\.essay-canvas,\s*body\.essay-canvas\s*\{/);
        expect(css).toMatch(/\.home-canvas\s*\{[\s\S]*background-image:\s*linear-gradient/);
        expect(css).toMatch(/\.essay-canvas\s*\{[\s\S]*background-color:\s*#faf7ef/);
    });

    it("does not depend on child selectors or runtime DOM mutation for route themes", () => {
        expect(css).not.toContain(":has(.light-mode)");
        expect(homeLayout).not.toContain("use client");
        expect(essayLayout).not.toContain("use client");
    });
});
