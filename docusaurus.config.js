const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "jb siraudin's blog",
  tagline: 'mostly game design stuff',
  organizationName: 'jbsiraudin',
  projectName: 'jbsiraudin.github.io',
  url: 'https://jbsiraudin.github.io',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'jb siraudin',
      logo: {
        alt: 'logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/portfolio', label: 'Portfolio', position: 'left' },
        { to: '/misc', label: 'Misc', position: 'left' },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Contact',
          items: [
            {
              label: 'Email',
              href: 'mailto:jb.siraudin@gmail.com',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/scinema_x',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/jean-baptiste-siraudin/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Resume',
              href: '/files/JeanBaptisteSiraudinResume.pdf',
              target: '_blank',
            },
            {
              label: 'Scinema',
              href: 'https://www.youtube.com/c/Scinemax',
            },
            {
              label: 'The Shape of Movies',
              href: 'https://theshapeofmovies.com',
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
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: {
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
            require.resolve('./src/css/ToggleSwitch.scss'),
            require.resolve('./src/css/TimelineViewer.scss'),
            require.resolve('./src/css/ContentDistribution.scss'),
            require.resolve('./src/css/Combinatorics.scss'),
            require.resolve('./src/css/Rules.scss'),
            require.resolve('./src/css/Dolly.scss'),
          ],
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      integrity: 'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
      crossorigin: 'anonymous',
    },
  ],
  plugins: ['docusaurus-plugin-sass'],
};
