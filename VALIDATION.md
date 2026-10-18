# Vercel preparation checks

- Standard Next.js 16.3.4 production build: passed.
- TypeScript: passed as part of native Next.js build.
- Contact handler: 7 tests passed (validation, honeypot, missing configuration, origin check, mocked success and provider failure, and Next.js public-host origin handling).
- Routes: /, /work, /api/contact, /robots.txt and /sitemap.xml generated successfully.
- Original project records and case-study sources preserved.
- Direct contact delivery still requires RESEND_API_KEY and CONTACT_FROM in your account.
- Browser visual/device testing and an actual Vercel deployment are not claimed.

- Clean `pnpm install --frozen-lockfile`: passed with an independent dependency directory.
- Local production HTTP checks: home, Work, robots, sitemap, CV and security headers passed; invalid form (400), missing email configuration (503) and cross-origin rejection (403) passed.
