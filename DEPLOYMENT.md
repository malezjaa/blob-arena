# Cloudflare deployment

Blob Arena deploys as a Cloudflare Worker with OpenNext.

## First deployment

1. Authenticate with `pnpm exec wrangler login`.
2. Run `pnpm run deploy`.
3. Add a custom domain in the Cloudflare dashboard, then set
   `NEXT_PUBLIC_SITE_URL` to its `https://` URL in the Worker settings.

Use `pnpm run preview` to test the production Worker runtime locally.

## Analytics

Enable **Cloudflare Web Analytics** in the Cloudflare dashboard after the
first deployment. It provides page views, visitors, referrers, page paths,
device and browser data, and Core Web Vitals without any analytics code in
this repository.

Blob Arena uses player-entered names in `/fight/*` paths. Cloudflare Web
Analytics will list those paths separately, so do not enable it if you do not
want entered names shown in the analytics dashboard.
