# Nikitha Keshan — Vercel edition

Standard Next.js App Router, React 19, TypeScript and Motion. Includes the latest blue-and-white design, five featured projects, all 24 projects on /work, Process and Now cards, Skills, Journey, CV and contact form.

## Deploy on Vercel

1. Extract this ZIP. Upload the contents of `nikitha-portfolio` to a GitHub repository (not the ZIP itself).
2. In Vercel, choose Add New → Project and import the repository.
3. Set the Root Directory to the directory containing `package.json`. If its contents are at your repository root, leave the default `./`.
4. Use these settings:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Node.js | 24.x |
| Install command | pnpm install --frozen-lockfile |
| Build command | pnpm build |
| Output directory | Leave the Next.js default; do not set dist or out |

`vercel.json` and `package.json` already provide the build configuration. Keep the included pnpm lockfile and package-manager version.

5. Add the environment variables below. Deploy. If you add or change variables afterward, redeploy.

## Environment variables

| Name | Value to supply | Required? |
| --- | --- | --- |
| RESEND_API_KEY | Your Resend API key | For direct contact email delivery |
| CONTACT_FROM | A sender on your verified Resend domain, such as `Portfolio <hello@your-domain.com>` | For direct contact email delivery |
| SITE_URL | Your final public origin, such as `https://your-domain.com` | Optional; recommended for your custom domain |

Enter secrets directly in Vercel Project Settings → Environment Variables. Do not paste them into source code, GitHub, or chat. Keep server variable names exactly as above; do not prefix them with NEXT_PUBLIC_. Set them for Production and for Preview if you want the form working there too.

If SITE_URL is omitted, metadata uses Vercel's production hostname, then its deployment hostname. Local development falls back to http://localhost:3000. The app includes robots.txt and sitemap.xml.

Contact messages are addressed to nikithakeshan@gmail.com. Without the two email values the website still builds and works, but the form clearly explains that delivery is unavailable and offers an email-app draft. Real delivery requires your verified sender and a live submission after deployment. Provider tests use mocks and do not send email.

## Run locally

Install Node.js 24 and pnpm 11.25.0, then:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` if configuring email locally.

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm start
```

The build deliberately uses Next.js's supported webpack option. This package has no Vinext, Vite or Cloudflare build dependency. No database is needed.

## Before sharing your deployment

- Test your contact form once with the real provider configured.
- Open five featured projects and a project from each Work category; verify the CV download.
- Inspect mobile and desktop layouts and keyboard controls in your browser.
- Review your existing CV and reference contact information before making the portfolio public.
- The private preview's access settings do not transfer to Vercel; choose the appropriate deployment protection in your account.

## Included and excluded

Source, local fonts, images, CV, all project/case-study records, dependency lockfile and tests are included. Dependencies, generated output, secrets and the former hosting platform's files are excluded. Existing honest evidence labels and original project accounts remain intact.

See VALIDATION.md for completed checks and remaining limits.

Official references:
- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/environment-variables
- https://nextjs.org/docs/app/getting-started/deploying
- https://resend.com/docs/dashboard/domains/introduction
