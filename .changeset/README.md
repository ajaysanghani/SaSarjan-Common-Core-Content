# Changesets

Every pull request that changes published code, content or styles adds a changeset:

```bash
pnpm changeset
```

Pick `patch`, `minor` or `major` (see docs/RELEASE.md for which to use) and describe the change for
the seven site teams. Changesets are turned into a version bump and CHANGELOG entry by
`pnpm version-packages`. Nothing is published until the release workflow is run and approved.
