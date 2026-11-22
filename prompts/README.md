# Prompts: ecosystem messaging v0.2 rollout

Claude Code prompts for rolling out the new SaSarjan messaging, footer and `/ecosystem` page
through `@sasarjan/web-core` to all seven sites. Copy everything below the `---` line of a prompt
file into a new Claude Code session opened in the folder it names.

This folder is not published to npm (`package.json` `files` covers only `dist`, `README.md`,
`LICENSE` and `CHANGELOG.md`).

## Before you start

1. **Decisions are settled** in the table at the top of [content-brief.md](content-brief.md). In
   short: no CoCreator destination yet (the CTA stays hidden), and site PRs may merge and go live on
   0.2.0 while the copy is still draft.
2. **Housekeeping in the site repos:**
   - Incubator: local `main` is one commit behind `origin/main`. Run `git pull`.
   - 10xGrowth: checked out on `homepage-hero-rewrite`. The site prompt branches from `main`.
   - SevaPremi: the repository is `ajaysanghani/SevaPremi`, not `sevapremi-old`. The local checkout's
     only remote is `old` (`sevapremi-old.git`); add `ajaysanghani/SevaPremi` as `origin` before starting.

## Order

| Step | Prompt                                                       | Run in                         | Depends on       | Output                                   |
| ---- | ------------------------------------------------------------ | ------------------------------ | ---------------- | ---------------------------------------- |
| 1    | [01-package-content-model.md](01-package-content-model.md)   | `SaSarjan-Common-Core-Content` | decisions filled | PR: types + copy                         |
| 2    | [02-package-footer.md](02-package-footer.md)                 | `SaSarjan-Common-Core-Content` | 1 merged         | PR: footer                               |
| 3    | [03-package-ecosystem-page.md](03-package-ecosystem-page.md) | `SaSarjan-Common-Core-Content` | 2 merged         | PR: `/ecosystem` page                    |
| 4    | [04-package-release-next.md](04-package-release-next.md)     | `SaSarjan-Common-Core-Content` | 3 merged         | PR: version 0.2.0; you publish to `next` |
| 5    | [sites/talentexcel.md](sites/talentexcel.md)                 | `TalentExcel`                  | 0.2.0 on npm     | PR (pilot)                               |
| 6    | [sites/incubator.md](sites/incubator.md)                     | `Incubator`                    | 5 reviewed       | PR                                       |
| 7    | the five first-time sites, below                             | each site repo                 | 5 reviewed       | one PR each                              |
| 8    | [05-go-live.md](05-go-live.md)                               | package, then each site        | copy approved    | `latest` release, site bumps             |

Steps 1–4 are sequential: each one builds on the previous PR. Review and merge each PR yourself
before starting the next.

After the TalentExcel pilot (step 5), fix anything awkward it found in the package first (a patch
release), then run the remaining six. They are separate repos, so they can run as parallel sessions.
Suggested order if you go one at a time: Incubator → Nanha Sitara → IT Vidya → SaSarjan → SevaPremi →
10xGrowth.

| Site         | Prompt                                       | Kind              |
| ------------ | -------------------------------------------- | ----------------- |
| Nanha Sitara | [sites/nanhasitara.md](sites/nanhasitara.md) | first integration |
| IT Vidya     | [sites/itvidya.md](sites/itvidya.md)         | first integration |
| SaSarjan     | [sites/sasarjan.md](sites/sasarjan.md)       | first integration |
| SevaPremi    | [sites/sevapremi.md](sites/sevapremi.md)     | first integration |
| 10xGrowth    | [sites/10xgrowth.md](sites/10xgrowth.md)     | first integration |

Every site prompt starts by reading [sites/site-common.md](sites/site-common.md), which holds the
shared rules and the verification checklist.

## Where things stand (checked 2026-11-22)

| Site                                                   | `@sasarjan/web-core`                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| TalentExcel                                            | 0.1.1 on `main` (`band` in `PublicShell`, `/ecosystem` page)                   |
| Incubator.in                                           | 0.1.1 on `origin/main` (`full` under the consent statement, `/ecosystem` page) |
| SaSarjan, SevaPremi, IT Vidya, Nanha Sitara, 10xGrowth | not integrated                                                                 |

npm: `latest` = 0.1.0, `next` = 0.1.1. All shared content is still `draft`.

## Ground rules baked into every prompt

- Enhance the existing package; never create a second footer, page or package.
- Additive API changes only (minor bump while on `0.x`); existing props, classes and tokens keep
  working.
- All new copy enters as `draft`. Only you flip it to `approved` (step 8).
- Claude opens PRs. It never merges, publishes, deploys or changes Vercel settings.
- No invented URLs: the CoCreator CTA is hidden on any site without a configured destination.
