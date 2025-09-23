const ignoredModules = [
    // These are modules that SHOULD be transformed (what is the problematic language version?)
    // UUID
    "uuid",

    // Project specific
    "github-slugger",

    // Remark/Rehype & Unified ecosystem (Markdown/HTML processing)
    "@mdx-js",
    "@shikijs",
    "bail",
    "ccount",
    "character-entities.*",
    "character-reference.*",
    "collapse-white-space",
    "comma-separated-tokens",
    "decode-named-character-reference",
    "devlop",
    "escape-string-regexp",
    "estree-util.*",
    "hast-util.*",
    "hastscript",
    "html-void-elements",
    "is-.*",
    "longest-streak",
    "markdown-extensions",
    "markdown-table",
    "mdast-util.*",
    "micromark.*",
    "parse-entities",
    "property-information",
    "recma-.*",
    "rehype.*",
    "remark.*",
    "shiki",
    "space-separated-tokens",
    "stringify-entities",
    "trim-lines",
    "trough",
    "unified",
    "unist-util.*",
    "vfile",
    "vfile-location",
    "vfile-message",
    "web-namespaces",
    "zwitch",
];

const customJestConfig = {
    testEnvironment: "jest-fixed-jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testMatch: ["**/tests/**/*.test.(ts|tsx|js)"],
    transformIgnorePatterns: [
        `node_modules/(?!(${ignoredModules.join("|")})/)`, // I am ignoring all the modules. Seems to be more permissive but what are the downsides?
    ],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: false,
                tsconfig: "tsconfig.json",
                diagnostics: false,
            },
        ],
        "^.+\\.(js|jsx|mjs)$": [
            "babel-jest",
            {
                presets: [
                    ["@babel/preset-env", { targets: { node: "current" } }],
                    "@babel/preset-typescript",
                ],
                plugins: [
                    "babel-plugin-transform-import-meta", // For pdfjs-dist
                ],
            },
        ],
    },
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};

module.exports = customJestConfig;
