const configured=process.env.SITE_URL?.trim();
const deployment=process.env.VERCEL_PROJECT_PRODUCTION_URL||process.env.VERCEL_URL;
export const siteUrl=new URL(configured||(deployment?`https://${deployment}`:"http://localhost:3000")).origin;
