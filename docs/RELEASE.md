# Release, upgrade and rollback

Releases are deliberate. Nothing is published on push or merge. A maintainer starts the
**Release** workflow by hand, and a reviewer approves it in the `npm-publish` GitHub environment.
Publishing uses npm **trusted publishing** (GitHub OIDC), so there is no npm token in GitHub,
Vercel or anyone's `.npmrc`. Every published version is immutable.

## Semantic versioning

| Bump      | Use it for                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **patch** | Copy or typo fixes, approving draft content without changing it, CSS fixes that don't change layout                                        |
| **minor** | New props, components, layouts or tokens; adding a site; new or rewritten copy; new labels                                                 |
| **major** | Removed or renamed props, exports, classes or tokens; changed defaults that alter layout; removing a site; raising the React or Node floor |

While the version is `0.x`, breaking changes go in a **minor** bump. Say clearly in the changeset that
the change is breaking.

## Day-to-day flow

1. Open a pull request. CI runs `pnpm verify` on Node 22 and 24, a Node 20 smoke test, and the
   example app builds from the packed tarball.
2. Add a changeset to the PR with `pnpm changeset`, written for the site teams.
3. Merge to `main`. This publishes nothing.

## Cutting a release

1. Create a branch from `main` and run `pnpm version-packages`. It applies the pending changesets,
   bumps `package.json` and writes `CHANGELOG.md`. Commit, open a PR and merge it.
2. In GitHub, go to **Actions → Release → Run workflow** on `main` and pick a dist-tag:
   - `next`: prereleases and anything with draft content.
   - `latest`: requires `pnpm check:drafts` to pass, meaning all content is approved.
3. The `validate` job checks that the version is unpublished and runs `verify`, `test:examples` and,
   for `latest`, the draft gate.
4. A reviewer approves the `publish` job in the `npm-publish` environment. It publishes with
   provenance and pushes the `vX.Y.Z` git tag.
5. Check the release on npmjs.com (version, provenance badge, file list), then upgrade the sites
   ([SEVEN-SITE-ROLLOUT.md](SEVEN-SITE-ROLLOUT.md)).

Before releasing, you can also check locally:

```bash
pnpm verify:release   # verify + example app builds
pnpm check:drafts     # must pass for `latest`
npm pack --dry-run    # exact file list that would be uploaded
```

## First release (one time)

npm trusted publishing is configured on an existing package, so the very first version is
published by hand.

1. Merge `feat/web-core-v0.1` to `main`. Run `pnpm version-packages`, which applies
   `.changeset/initial-release.md` and produces `0.1.0`. Commit and merge.
2. On a clean checkout of `main`:
   ```bash
   pnpm install --frozen-lockfile
   pnpm verify:release
   npm login                         # your npm account, with 2FA
   npm whoami
   npm publish --access public --tag next
   ```
   `prepublishOnly` runs `pnpm verify` again. npm asks for your 2FA code. Because content is still
   draft, use the `next` tag. On a brand-new package npm may also point `latest` at this first
   version; that is expected.
3. On npmjs.com, open **@sasarjan/web-core → Settings → Trusted publishing → GitHub Actions** and enter:
   - Organization or user: `ajaysanghani`
   - Repository: `SaSarjan-Common-Core-Content`
   - Workflow filename: `release.yml`
   - Environment: `npm-publish`
4. Under **Publishing access**, choose **Require two-factor authentication and disallow tokens**.
5. In GitHub, go to **Settings → Environments → New environment `npm-publish`**. Add required reviewers
   and limit deployment branches to `main`.
6. Tag the first release: `git tag v0.1.0 && git push origin v0.1.0`.
7. Run `npm logout`. Later releases go through the workflow only.

npm's trusted-publishing screens and rules have changed recently. If what you see differs from
these steps, follow npm's current documentation and update this file.

## Upgrading a site

1. Bump the exact version in the site's `package.json`, by hand or via the Renovate or Dependabot PR
   ([VERCEL-INTEGRATION.md](VERCEL-INTEGRATION.md)).
2. Read the changelog entries between the two versions, especially anything breaking.
3. Check the Vercel preview: the footer, `/ecosystem`, mobile width, keyboard focus.
4. Merge. Vercel deploys production.

## Rollback

Never `npm unpublish`: it breaks every site pinned to that version, and the version number can never
be reused.

**When a single site breaks after an upgrade:**

- Fastest: use **Instant Rollback** in Vercel (Project → Deployments → previous production
  deployment → Instant Rollback). No rebuild is needed.
- Then revert the upgrade PR, or pin the previous version, and redeploy so `main` matches production.

**When a published version itself is bad:**

1. Deprecate it so new installs warn:
   ```bash
   npm deprecate @sasarjan/web-core@0.3.0 "Broken footer layout; use 0.3.1"
   ```
2. If it was tagged `latest`, move the tag back:
   ```bash
   npm dist-tag add @sasarjan/web-core@0.2.0 latest
   ```
   Because token publishing is disabled, run both commands locally after `npm login`, with 2FA.
3. Fix forward with a patch release through the normal workflow.
4. Roll back or upgrade any site that already deployed the bad version.

## Credentials

- No npm token exists in GitHub, Vercel or the repository. Publishing uses OIDC.
- Never commit `.npmrc` files containing auth, `.env*` files or keys. `.gitignore` and
  `scripts/check-pack.mjs` guard against both.
- If the package ever becomes private, see the private-registry notes in
  [VERCEL-INTEGRATION.md](VERCEL-INTEGRATION.md).
