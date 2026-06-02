This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Essay Discussions

Essay pages render a `Discuss` section backed by
[Giscus](https://giscus.app/) and GitHub Discussions. The embed configuration
lives in `src/lib/giscus.ts` because repository IDs and category IDs are public
widget identifiers, not secrets.

Required GitHub setup:

- Keep `A-F-V/personal-portfolio` public.
- Enable GitHub Discussions for the repository.
- Install the [Giscus GitHub App](https://github.com/apps/giscus) for the
  repository.
- Keep the configured discussion category available. The current embed uses the
  default `Announcements` category because Giscus recommends an announcement
  category so maintainers and the Giscus app can create discussions while
  visitors can still comment.

The root `giscus.json` restricts which page origins can load this repository's
discussions and allows localhost for development. See the Giscus
[advanced usage guide](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md)
and GitHub's
[discussion category documentation](https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-categories-for-discussions).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
