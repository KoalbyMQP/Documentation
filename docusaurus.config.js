// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Humanoid Robot',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/KoalbyMQP/Documentation/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        hideOnScroll: false,
        title: 'Humanoid Robot MQP',
        logo: {
          alt: 'WPI Robot Logo',
          src: 'assets/logo.webp',
          srcDark: 'assets/logo_dark.webp',
        },
        items: [
          { 
            label: 'Sections',
            position: 'left',
            items: [
              {
                label: 'Getting Started',
                type: 'docSidebar',
                sidebarId: 'docsSidebar',
              },
              {
                label: 'Speech',
                to: '/docs/sections/speech-recognition',
              },
              {
                label: 'Vision',
                to: '/docs/sections/vision',
              },
              {
                label: 'Locomotion',
                to: '/docs/sections/urdf',
              },
              {
                label: 'Tools',
                to: '/docs/sections/tools',
              },
            ],
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/KoalbyMQP',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Speech',
                to: '/docs/sections/speech-recognition',
              },
              {
                label: 'Vision',
                to: '/docs/sections/vision',
              },
              {
                label: 'Locomotion',
                to: '/docs/sections/urdf',
              },
              {
                label: 'Tools',
                to: '/docs/sections/performance-monitoring',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'About MQP',
                href: 'https://www.wpi.edu/academics/undergraduate/major-qualifying-project',
              },
              {
                label: 'About WPI',
                href: 'https://www.wpi.edu/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/KoalbyMQP',
              },
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/docs',
              },
              {
                label: 'Decap CMS',
                href: 'https://decapcms.org/docs/intro/',
              },
              {
                label: 'Algolia DocSearch',
                href: 'https://docsearch.algolia.com/docs/what-is-docsearch/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WPI Humanoid Robot MQP. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
