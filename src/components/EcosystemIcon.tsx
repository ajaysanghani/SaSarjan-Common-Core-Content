import type { ReactNode } from "react";
import type { DevelopmentDimension, EcosystemIconKey } from "../config/types";
import { cx } from "../lib/resolve";

/**
 * One line-art icon per initiative, drawn on a 24px grid with the same stroke so they read as a set.
 * They inherit `currentColor` and are decorative: the initiative's name is always next to them.
 */
const paths: Record<EcosystemIconKey, ReactNode> = {
  // SaSarjan: a hub joining many parts, for CoCreation and systems redesign.
  framework: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="4" r="1.75" />
      <circle cx="5" cy="17.5" r="1.75" />
      <circle cx="19" cy="17.5" r="1.75" />
      <path d="M12 5.75V9M6.5 16.6l2.9-1.8M17.5 16.6l-2.9-1.8" />
    </>
  ),
  // TalentExcel: a mortarboard, for learning that leads to opportunities.
  talent: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5Z" />
      <path d="M6.5 11.2v4.3c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.3" />
      <path d="M21.5 9v5" />
    </>
  ),
  // 10xGrowth: a rising line, for organisational growth.
  growth: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  // SevaPremi: people together, for community development.
  community: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c0-3.1 2.5-5.5 5.5-5.5s5.5 2.4 5.5 5.5" />
      <circle cx="17" cy="9" r="2.25" />
      <path d="M16.2 14.1c2.7-.3 4.8 1.9 4.8 4.9" />
    </>
  ),
  // IT Vidya: an open book, for lifelong learning.
  learning: (
    <>
      <path d="M12 6.5C10 5 7.5 4.5 3.5 4.5v13c4 0 6.5.5 8.5 2 2-1.5 4.5-2 8.5-2v-13c-4 0-6.5.5-8.5 2Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  // Incubator.in: a seedling, for nurturing startups.
  startup: (
    <>
      <path d="M12 20v-8" />
      <path d="M12 12c0-4 2.5-6.5 7-6.5 0 4.5-2.5 6.5-7 6.5Z" />
      <path d="M12 14.5c0-3-2-5-5.5-5 0 3.5 2 5 5.5 5Z" />
      <path d="M8 20h8" />
    </>
  ),
  // Nanha Sitara ("little star"): a star, for children.
  children: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z" />,
};

export interface EcosystemIconProps {
  icon: EcosystemIconKey;
  className?: string;
}

/** Decorative inline SVG icon of an initiative. Hidden from assistive technology. */
export function EcosystemIcon({ icon, className }: EcosystemIconProps) {
  return <LineIcon className={className}>{paths[icon]}</LineIcon>;
}

/** One icon per development dimension, in the same line-art style as the initiative icons. */
const dimensionPaths: Record<DevelopmentDimension, ReactNode> = {
  // Human potential: a person, growing.
  human: (
    <>
      <circle cx="10" cy="7" r="3" />
      <path d="M4 20c0-3.6 2.7-6.5 6-6.5s6 2.9 6 6.5" />
      <path d="M18 10V4M15.5 6.5 18 4l2.5 2.5" />
    </>
  ),
  // Organisation potential: a building.
  organisation: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M5.5 20.5v-15h9v15" />
      <path d="M14.5 10h4v10.5" />
      <path d="M8.5 9h3M8.5 12.5h3M8.5 16h3" />
    </>
  ),
  // Community potential: people side by side.
  community: (
    <>
      <circle cx="12" cy="7.5" r="2.5" />
      <circle cx="5.5" cy="10" r="2" />
      <circle cx="18.5" cy="10" r="2" />
      <path d="M7.5 19.5c0-2.6 2-4.5 4.5-4.5s4.5 1.9 4.5 4.5" />
      <path d="M2.5 18.5c0-2 1.3-3.6 3-4M21.5 18.5c0-2-1.3-3.6-3-4" />
    </>
  ),
  // Nature regeneration: a leaf.
  nature: (
    <>
      <path d="M5 19c0-8 5-13.5 14.5-14 .5 9.5-5 14.5-13 14.5Z" />
      <path d="M4 20 13.5 10.5" />
    </>
  ),
};

export interface DimensionIconProps {
  dimension: DevelopmentDimension;
  className?: string;
}

/** Decorative inline SVG icon of a development dimension. Hidden from assistive technology. */
export function DimensionIcon({ dimension, className }: DimensionIconProps) {
  return <LineIcon className={className}>{dimensionPaths[dimension]}</LineIcon>;
}

function LineIcon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      className={cx("swc-icon", className)}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}
