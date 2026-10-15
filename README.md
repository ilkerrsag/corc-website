# corc-website

Static SvelteKit site on Cloudflare Pages, with a contact form backed by a Cloudflare Worker
and a D1 database. Everything runs in one Cloudflare account.

```
browser ── Cloudflare ──┬── /api/contact ──> Worker (worker/) ──┬─> D1 `submissions` table
                        │                                       └─> Email Routing ──> inbox
                        └── everything else ──> Pages (static build/)
```

## Pages and languages

| Page         | German (default) | English            |
| ------------ | ---------------- | ------------------ |
| Landing      | `/`              | `/en`              |
| Bases        | `/bases`         | `/en/bases`        |
| One flavour  | `/bases/<slug>`  | `/en/bases/<slug>` |
| About        | `/about`         | `/en/about`        |
| Book tasting | `/tasting`       | `/en/tasting`      |
| Imprint      | `/imprint`       | `/en/imprint`      |
| Privacy      | `/privacy`       | `/en/privacy`      |

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
2. Email → Email Routing → enable it for the zone, and verify the destination address that
   `send_email` in `worker/wrangler.jsonc` points at. The worker can only send to that address.
3. In `worker/`:
   ```sh
   pnpm wrangler login
   pnpm wrangler d1 create corc-contact --location weur   # paste the id into wrangler.jsonc
   pnpm db:migrate:remote
   pnpm wrangler secret put TURNSTILE_SECRET_KEY
   pnpm run deploy
   ```

`--location weur` keeps the submissions in the EU, which is what the privacy policy says.

### Site

Workers & Pages → create a Pages project from the GitHub repo:

| Setting          | Value        |
| ---------------- | ------------ |
| Build command    | `pnpm build` |
| Output directory | `build`      |

Set `VITE_TURNSTILE_SITE_KEY` to the Turnstile site key and `VITE_SITE_URL` to the public origin
(enables canonical and hreflang links), then add the custom domain in the Pages project. Every
push to `main` redeploys.

The worker route in `wrangler.jsonc` wins over Pages for `/api/contact`, so the form keeps
working on the same domain.

### Legal pages

The imprint and the privacy policy are generated from `src/lib/legal.ts`, with the business
details at the top of that file. Add the VAT id to `business.vatId` once there is one and the
line appears in both languages.

## Reading submissions

```sh
cd worker && pnpm db:list
```

Or use the D1 console in the Cloudflare dashboard.
