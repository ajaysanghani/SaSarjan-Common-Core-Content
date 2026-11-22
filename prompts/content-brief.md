# Content brief: SaSarjan ecosystem messaging (v0.2)

This is the single source for the new copy. The package prompts (`01`–`03`) read it; nothing else
should restate it. When the copy changes, change it here first, then in `src/content/`.

All of this copy enters the package as `status: "draft"`. Only the content owner flips it to
`approved` (see [docs/CONTENT-GOVERNANCE.md](../docs/CONTENT-GOVERNANCE.md)).

## Decisions (fill in before running prompt 01)

Claude applies the default shown when a line is left as-is.

| #   | Decision                                                                                           | Your answer | Default if unanswered                                                                                                                             |
| --- | -------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Display names: "NanhaSitara" / "ITVidya" or "Nanha Sitara" / "IT Vidya"?                           |             | Keep the current package names ("Nanha Sitara", "IT Vidya"), which match each site's own metadata                                                 |
| D2  | Canonical URLs                                                                                     |             | Keep the current canonical URLs in `src/content/sites.ts` (SevaPremi stays `https://www.sevapremi.com`); the bare URLs below are for display only |
| D3  | Closing line: "SaSarjan – CoCreating Collective Prosperity." or "SaSarjan – CoCreating Together."? |             | "SaSarjan – CoCreating Collective Prosperity." on both the footer and the page                                                                    |
| D4  | Content approver (name or GitHub handle)                                                           |             | Repository owner                                                                                                                                  |
| D5  | Initiative categories (used on page cards)                                                         |             | The proposed categories in the table below, marked draft                                                                                          |
| D6  | "Become a CoCreator" destination per site                                                          |             | None. The CTA is hidden on any site that doesn't configure one. Never invent a URL                                                                |
| D7  | May site PRs merge to production while copy is still draft?                                        |             | No. Site PRs stay open on their Vercel preview until go-live (prompt `05`)                                                                        |

D6 answers, per site (site-relative path or absolute `https:` URL):

| Site         | CoCreator destination |
| ------------ | --------------------- |
| SaSarjan     |                       |
| TalentExcel  |                       |
| 10xGrowth    |                       |
| SevaPremi    |                       |
| IT Vidya     |                       |
| Incubator.in |                       |
| Nanha Sitara |                       |

## Messaging hierarchy

| Level                    | Copy                                               |
| ------------------------ | -------------------------------------------------- |
| Vision                   | Collective Prosperity.                             |
| Mission                  | Solve the Unsolved. Advance Collective Prosperity. |
| Approach                 | CoCreating the Future, Together.                   |
| Participation philosophy | Learn. Earn. Lead. Inspire. CoCreate.              |

**Common introduction** (footer `full` variant and the `/ecosystem` hero):

> CoCreating the Future, Together.
> Solve the Unsolved. Advance Collective Prosperity.
>
> We unite youth, professionals, experts, entrepreneurs, institutions, communities, funders and AI
> to develop human potential, strengthen organisations, empower communities, redesign systems and
> regenerate nature.
>
> Learn. Earn. Lead. Inspire. CoCreate.
>
> Seven interconnected initiatives. One shared vision. Countless possibilities.

Tone rules:

- AI is an enabling intelligence that complements human knowledge, creativity and collective
  participation. It never replaces people.
- SaSarjan is the overarching CoCreation framework and systems-redesign initiative. The other six
  have specialised, complementary roles. It is not a "parent company" and the page must not read like
  a corporate group directory.
- British spelling (organisation, programme), as used throughout the brief.

## The seven initiatives

Field mapping in the package:

- `headline` → the short line in the footer directory and the card headline
- `positioning` → the card body. Its first sentence also replaces the existing `description`, so
  sites on the old layout get the new wording.
- `focusAreas` → the card's list
- `category` → the card's small label (D5)

| Id            | Name (D1)    | Native name | Category (proposed, D5)                 | Website (display)       |
| ------------- | ------------ | ----------- | --------------------------------------- | ----------------------- |
| `sasarjan`    | SaSarjan     | स सर्जन     | CoCreation framework · Systems redesign | https://sasarjan.com    |
| `talentexcel` | TalentExcel  |             | Learning and opportunities              | https://talentexcel.com |
| `10xgrowth`   | 10xGrowth    |             | Organisational growth                   | https://10xgrowth.com   |
| `sevapremi`   | SevaPremi    |             | Community development                   | https://sevapremi.com   |
| `itvidya`     | IT Vidya     |             | Lifelong learning                       | https://itvidya.com     |
| `incubator`   | Incubator.in |             | Startup ecosystem                       | https://incubator.in    |
| `nanhasitara` | Nanha Sitara |             | Child development                       | https://nanhasitara.com |

### 1. SaSarjan – स सर्जन (the overarching framework)

- **Headline:** Reimagining Systems for Collective Prosperity.
- **Positioning:** An overarching CoCreation framework and systems redesign initiative. Enabling
  top-down systems redesign at national, state and district levels by bringing together citizens,
  experts, institutions, policymakers, professionals and technology.
- **Focus areas:** National systems redesign · State-level systems redesign · District-level systems
  redesign · Governance transformation · Institutional alignment · Collective intelligence and
  AI-enabled systems

### 2. TalentExcel

- **Headline:** Learn and Earn.
- **Positioning:** A learning, skills and opportunities platform enabling youth and professionals to
  develop capabilities and discover meaningful opportunities.
- **Focus areas:** Learning and skill development · Internships · Fellowships · Freelancing · Gap-year
  leadership development · Mentorship and training · Co-founder and entrepreneurial opportunities

### 3. 10xGrowth

- **Headline:** Organisational Growth and Scale.
- **Positioning:** Helping organisations grow and scale through specialised studios providing
  strategic, research, innovation, revenue and technology capabilities.
- **Focus areas:** Vision and Implementation Studio · Research and Innovation Studio · Revenue Studio ·
  Zoho Studio · AI Studio · Visual Communication Studio · Organisational growth and execution

### 4. SevaPremi

- **Headline:** Youth-Powered Community Change Leadership.
- **Positioning:** Enabling change leaders and volunteers, especially youth, to identify local
  challenges, co-create solutions and contribute to community development. A bottom-up development
  approach rooted in local participation.
- **Focus areas:** Village development · Ward development · Taluka development · Block-level
  development · Youth-powered change leadership · Volunteer mobilisation · Local problem
  identification · Solution blueprints · Action circles · Citizen participation · Community resource
  sharing

### 5. IT Vidya

- **Headline:** Lifelong Learning for Self, Family and Society.
- **Positioning:** Enabling individuals and families to continuously learn, develop understanding,
  improve their capabilities and contribute positively to society.
- **Focus areas:** Personal development · Family learning · Social understanding · Lifelong education ·
  Values and wisdom · Knowledge sharing

### 6. Incubator.in

- **Headline:** Nurturing Startups. Strengthening the Startup Ecosystem.
- **Positioning:** Connecting startups and ecosystem participants to create an environment where
  entrepreneurial ideas can develop into sustainable enterprises.
- **Focus areas:** Startup founders · Mentors · Investors · Incubators · Accelerators · Academic
  institutions · Startup service providers · Entrepreneurship support

### 7. Nanha Sitara

- **Headline:** Growing Children Together.
- **Positioning:** Supporting the holistic development of children through the collective involvement
  of parents, teachers and communities.
- **Focus areas:** Child development · Parent participation · Teacher development · Community
  involvement · Child-friendly villages · Learning environments · Future-ready children

## Footer copy

| Block             | Copy                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Brand line        | SaSarjan \| स सर्जन                                                                                                                                                      |
| Introduction      | The common introduction above                                                                                                                                            |
| Directory heading | Explore the SaSarjan Ecosystem                                                                                                                                           |
| CoCreator heading | Become a CoCreator                                                                                                                                                       |
| CoCreator body    | Bring your ideas, knowledge, skills, experience, resources and enthusiasm. Together, we can create solutions and opportunities that contribute to Collective Prosperity. |
| CoCreator CTA     | Become a CoCreator (destination from D6; hidden when unset)                                                                                                              |
| Closing           | SaSarjan – CoCreating Collective Prosperity. (D3) / Seven interconnected initiatives. One shared vision. Countless possibilities.                                        |

## `/ecosystem` page copy

1. **Hero.** Eyebrow "CoCreating the Future, Together." Sub-line "Solve the Unsolved. Advance Collective
   Prosperity." Prominent headline "Learn. Earn. Lead. Inspire. CoCreate." Body: the common
   introduction. CTAs: "Explore Our Initiatives" (in-page anchor to section 4) and "Become a CoCreator"
   (D6).
2. **Our Vision: A World Where Everyone Can Flourish.** Collective Prosperity in four dimensions:
   Human Potential Development · Organisation Potential Development · Community Potential
   Development · Nature Regeneration. Prosperity includes human development, harmonious
   relationships, responsible organisations, thriving communities and coexistence with nature.
3. **Our CoCreation Approach: Different Strengths. Shared Possibilities.** Participants: Youth ·
   Professionals · Experts · Entrepreneurs · Institutions · Communities · Funders and Resource Partners
   · AI and Technology. One line each on what they bring; then how complementary capabilities solve
   complex challenges.
4. **One Ecosystem. Seven Pathways to Collective Prosperity.** Seven cards (name, icon, category,
   headline, positioning, focus areas, "Explore website" link). SaSarjan visually distinguished as the
   framework. A short line on how the initiatives complement one another.
5. **Connecting Systems Transformation with Community Action.** A diagram, not prose:
   - SaSarjan, top-down systems redesign: National → State → District. Governance structures,
     institutional alignment, policy and implementation frameworks.
   - SevaPremi, bottom-up community development: Village → Ward → Taluka → Block. Citizen
     participation, youth leadership, local problem identification, solution design, volunteer
     mobilisation.
   - How they connect. Proposed, needs sign-off: the two meet where district-level systems work and
     block-level community action overlap.
   - Supporting roles: TalentExcel develops people and leadership capabilities · 10xGrowth strengthens
     organisations · Incubator.in supports startups and entrepreneurship · IT Vidya enables lifelong
     learning · Nanha Sitara supports the development of children.
6. **Everyone Has Something Valuable to Contribute.** Interconnected pathways, not sequential stages:
   - Learn: Develop knowledge, understanding and skills.
   - Earn: Create economic value through meaningful contributions.
   - Lead: Take responsibility and initiate positive change.
   - Inspire: Share knowledge, experience and possibilities with others.
   - CoCreate: Bring people, ideas, knowledge and resources together to create solutions.
7. **The Future Is Something We Create Together.** Who: students, professionals, entrepreneurs,
   experts, institutions, volunteers, mentors, funders, community leaders. Pathways: Learn and develop
   · Share knowledge · Mentor and guide · Volunteer · Develop solutions · Build organisations · Fund
   meaningful initiatives · Research and innovate · Partner with institutions · CoCreate initiatives.
   CTA: Become a CoCreator (D6).
8. **Closing.** "CoCreating the Future, Together." / "Solve the Unsolved. Advance Collective
   Prosperity." / the D3 closing line.

Repetition rule: on `/ecosystem`, the tagline pair ("CoCreating the Future, Together. / Solve the
Unsolved…") may appear at most twice in total, counting the footer.

Copy Claude has to write itself (participant one-liners in section 3, the "how the initiatives
complement one another" line in section 4) must stay short, follow the tone rules and be listed in
the PR description so the approver can find it.

## SEO for `/ecosystem` (proposed, needs sign-off)

- Title: "The SaSarjan Ecosystem: CoCreating the Future, Together"
- Description: "Seven interconnected initiatives uniting youth, professionals, experts,
  entrepreneurs, institutions, communities, funders and AI to advance Collective Prosperity."
