import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "jb siraudin",
  EMAIL: "jb.siraudin@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PORTFOLIO_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "jb siraudin — mostly game design stuff",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Game design, science communication, and interactive tools.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PORTFOLIO: Metadata = {
  TITLE: "Portfolio",
  DESCRIPTION: "A collection of my work, with links to repositories and demos.",
};

export const TOOLS: Metadata = {
  TITLE: "Tools",
  DESCRIPTION: "Small web tools and utilities.",
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter",
    HREF: "https://twitter.com/scinema_x",
  },
  {
    NAME: "bluesky",
    HREF: "https://bsky.app/profile/jbsiraudin.bsky.social",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/jean-baptiste-siraudin/",
  },
];
