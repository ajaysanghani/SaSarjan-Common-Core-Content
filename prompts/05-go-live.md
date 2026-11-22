# Prompt 05: go live (package repo, then each site)

Run after the content owner has approved the copy on the package PRs or the site previews.

---

## Part A: package (run in `SaSarjan-Common-Core-Content`)

The content owner has approved the ecosystem copy. Apply the approved wording changes (I'll paste
them below, if there are any), then follow `docs/CONTENT-GOVERNANCE.md` step 4: set every approved
item to `status: "approved"` and remove its `// DRAFT: requires approval` comment. Don't approve
anything I haven't listed.

Run `pnpm check:drafts` (it must pass), add a patch changeset ("approve ecosystem copy"), and run
`pnpm version-packages` and `pnpm verify:release`. Open a PR and stop. I'll merge it and run the
Release workflow with `dist_tag = latest`.

Approved items / wording changes:

```
(paste here)
```

## Part B: each site (one session per site repo)

Upgrade `@sasarjan/web-core` to `<latest version>` with `-E`, following the "Upgrading a site"
section of `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\docs\RELEASE.md`.
If this site's 0.2.0 PR is still open, update that PR instead of opening a new one. Build, check the
footer and `/ecosystem` on the dev server, open or update the PR, and stop.

Then add Renovate or Dependabot config for `@sasarjan/web-core` (exact pins, grouped, weekly) in the
same PR, so future releases arrive as PRs.

## Part C: after all seven are live (package repo)

Update `docs/SEVEN-SITE-ROLLOUT.md`: mark every site done with its version, and tick the
"After all seven" checklist. Correct the inventory table where it no longer matches reality
(for example TalentExcel uses `band` inside `PublicShell`, not `full`).
