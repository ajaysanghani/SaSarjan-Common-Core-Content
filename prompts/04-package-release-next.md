# Prompt 04: prepare the `next` release (package repo)

Run in: `SaSarjan-Common-Core-Content`, on a new branch from `main` after prompts 01–03 are merged.

---

Prepare a release of `@sasarjan/web-core` with the pending changesets, following `docs/RELEASE.md`
exactly.

1. Run `pnpm version-packages`. Check the bump is a minor (expected `0.2.0`) and that `CHANGELOG.md`
   reads well for the site teams: what changed, which new config field a site sets for the
   CoCreator CTA, and that nothing was removed.
2. Run `pnpm verify:release` and `npm pack --dry-run`. Confirm the file list contains only `dist`,
   `README.md`, `LICENSE`, `CHANGELOG.md` and `package.json`.
3. Run `pnpm check:drafts` and paste its list of draft items into the PR description, so the content
   owner has one place to review.
4. Open a PR titled "Version 0.2.0". Do not merge it.

Then stop and tell me the remaining manual steps; do not trigger the workflow yourself:

- merge the PR;
- run **Actions → Release → Run workflow** on `main` with `dist_tag = next`;
- approve the `publish` job in the `npm-publish` environment;
- confirm with the registry `curl` command from `docs/RELEASE.md` that `next` points to the new
  version.
