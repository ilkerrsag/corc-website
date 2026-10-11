# corc-website

Static SvelteKit site (hosted on Vercel, behind Cloudflare) with a contact form backed by a
Cloudflare Worker and a D1 database.

```
browser ── Cloudflare ──┬── /api/contact ──> Worker (worker/) ──> D1 `submissions` table
                        └── everything else ──> Vercel (static build/)
```

## Pages and languages

| Page         | German (default) | English            |
| ------------ | ---------------- | ------------------ |
| Landing      | `/`              | `/en`              |
| Bases        | `/bases`         | `/en/bases`        |
| One flavour  | `/bases/<slug>`  | `/en/bases/<slug>` |
| About        | `/about`         | `/en/about`        |
| Book tasting | `/tasting`       | `/en/tasting`      |

- Routes live in `src/routes/[[lang=lang]]/`; the `lang` matcher is in `src/params.ts`.
- Copy is in `src/lib/i18n/de.ts` and `en.ts` (`en` must have the same shape as `de`); the
  flavours and their texts are in `src/lib/products.ts`.
- Build links with `pagePath(lang, 'about')` from `src/lib/i18n`, so they keep the language.
- Brand name, email and tagline are in `src/lib/site.ts`; colours and fonts are the tokens at
  the top of `src/app.css`.
- `src/ui/` is the component kit copied from eventist-monorepo.

## Develop

```sh
pnpm install
cp .env.example .env

cd worker
pnpm install
cp .dev.vars.example .dev.vars
pnpm db:migrate:local
pnpm dev            # worker on :8787

# in another terminal, from the repo root
pnpm dev            # site on :5173, proxies /api to the worker
```

The example env files use Cloudflare's Turnstile test keys, which always pass.

## Deploy

### Worker (once)

1. Cloudflare dashboard → Turnstile → add a widget for the domain; note the site key and secret.
2. In `worker/`:
   ```sh
   pnpm wrangler login
   pnpm wrangler d1 create corc-contact   # paste the id into wrangler.jsonc
   pnpm db:migrate:remote
   pnpm wrangler secret put TURNSTILE_SECRET_KEY
   ```
3. Replace `example.com` in `worker/wrangler.jsonc` with the real domain, then `pnpm run deploy`.

### Site

Import the repo in Vercel (settings come from `vercel.json`) and set `VITE_TURNSTILE_SITE_KEY` to
the Turnstile site key and `VITE_SITE_URL` to the public origin (enables canonical and hreflang
links). In Cloudflare, point the domain at Vercel with a **proxied** DNS record and
set SSL/TLS mode to **Full (strict)**.

## Reading submissions

```sh
cd worker && pnpm db:list
```

Or use the D1 console in the Cloudflare dashboard.
