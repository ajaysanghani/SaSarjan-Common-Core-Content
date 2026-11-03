# Vercel and CI integration

The package is a normal public npm dependency, so Vercel needs **no special configuration**: no
environment variables, no tokens, no `transpilePackages` and no build-command changes.

## In each site

1. Install with an exact pin and commit the lockfile:
   ```bash
   npm install -E @sasarjan/web-core@0.1.0                         # npm sites
   pnpm add -E @sasarjan/web-core@0.1.0                            # single-app pnpm sites
   pnpm add -E @sasarjan/web-core@0.1.0 --filter @sevapremi/web    # pnpm monorepos: target the app
   ```
2. Import `@sasarjan/web-core/styles.css` once in the root layout, before the site's own global CSS.
3. Add `site.config.ts` and the footer and `/ecosystem` page ([README](../README.md#use-it-in-a-site)).
4. Push a branch. The Vercel preview deployment is the review surface.

Vercel installs from the committed lockfile, so production runs exactly the pinned version. A
change in this package reaches a site only when that site's lockfile changes and it redeploys.
That is the intended deploy-time sync.

## Automated upgrade PRs (recommended)

Let a bot open the version-bump PR in each of the seven repos. Each PR gets a Vercel preview
automatically.

**Dependabot** (`.github/dependabot.yml` in each site repo):

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: "/" # "/apps/web" (SevaPremi, Incubator), "/apps/10xgrowth" (10xGrowth)
    schedule:
      interval: daily
    allow:
      - dependency-name: "@sasarjan/web-core"
    versioning-strategy: increase
    labels: ["sasarjan-web-core"]
```

**Renovate** (`renovate.json`), as an alternative:

```json
{
  "extends": ["config:recommended"],
  "packageRules": [
    {
      "matchPackageNames": ["@sasarjan/web-core"],
      "rangeStrategy": "pin",
      "labels": ["sasarjan-web-core"],
      "automerge": false
    }
  ]
}
```

Keep automerge **off**. A person should look at the preview before production changes.

Bots follow the `latest` dist-tag. Versions published on `next` (pre-approval content) are
installed only when a site asks for them explicitly.

## CI in each site

Nothing new is required: the site's existing `next build` exercises the package. The footer and
`/ecosystem` render at build time, and `defineSiteConfig` fails the build on invalid config.
Optional additions:

- A smoke test that `/ecosystem` returns 200 and contains `swc-intro`.
- `next build` on a matrix if the site supports more than one Node version.

## This repository's CI

| Workflow                        | Trigger                       | What it does                                                                  |
| ------------------------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| `.github/workflows/ci.yml`      | pull requests, pushes to main | verify on Node 22 and 24, Node 20 runtime smoke, example builds, draft report |
| `.github/workflows/release.yml` | manual (`workflow_dispatch`)  | validate → reviewer approval (`npm-publish`) → publish with provenance → tag  |

## Vercel project settings to check per site

- **Root Directory**: the app folder for monorepos (`apps/web`, `apps/10xgrowth`).
- **Install Command**: the default, which respects the lockfile. Don't override it with `npm install` on
  pnpm projects.
- **Node.js version**: 22.x or 24.x. Vercel deprecated Node 20 on 2026-10-01.
  SevaPremi (`.nvmrc` 20.18.1) and IT Vidya (`>=20.9`) should move. The package itself still runs on Node 20.
- **Instant Rollback** is available on every project and is the fastest rollback
  ([RELEASE.md](RELEASE.md#rollback)).

## If the package becomes private later

The package layout doesn't change. Only distribution changes:

1. On npm: `npm access set status=private @sasarjan/web-core`. Private packages in the
   `sasarjan` org need a paid npm plan.
2. Create a **read-only granular access token** scoped to `@sasarjan`. In each Vercel project, add an
   environment variable `NPM_TOKEN` (Production + Preview, marked Sensitive).
3. In each site repo, commit an `.npmrc` that refers to the variable without containing the token:
   ```
   @sasarjan:registry=https://registry.npmjs.org/
   //registry.npmjs.org/:_authToken=${NPM_TOKEN}
   ```
4. Give the sites' CI the same secret. Rotate the token on a schedule; granular tokens expire.

GitHub Packages works the same way (`@sasarjan:registry=https://npm.pkg.github.com`) if you
prefer to keep access tied to GitHub permissions.
