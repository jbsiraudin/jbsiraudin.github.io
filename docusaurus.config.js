const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "jb siraudin's blog",
  tagline: "mostly game design stuff",
  organizationName: "jbsiraudin",
  projectName: "jbsiraudin.github.io",
  url: "https://jbsiraudin.github.io",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  themeConfig: {
    navbar: {
      title: "jb siraudin",
      logo: {
        alt: "logo",
        src: "img/logo.svg",
      },
      items: [{ to: "/blog", label: "Blog", position: "left" }],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Contact",
          items: [
            {
              label: "Email",
              href: "mailto:jb.siraudin@gmail.com",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/scinema_x",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/jean-baptiste-siraudin/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Resume",
              to: "/files/JeanBaptisteSiraudinResume.pdf",
            },
            {
              label: "Scinema",
              href: "https://www.youtube.com/c/Scinemax",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Jean-Baptiste Siraudin`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: false,
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.scss"),
            require.resolve("./src/css/ToggleSwitch.scss"),
            require.resolve("./src/css/TimelineViewer.scss"),
            require.resolve("./src/css/ContentDistribution.scss"),
          ],
        },
      },
    ],
  ],
  plugins: ["docusaurus-plugin-sass"],
};
