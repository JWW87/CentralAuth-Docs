import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CentralAuth Docs',
  tagline: 'Documentation for CentralAuth',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.centralauth.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CentralAuth', // Usually your GitHub org/user name.
  projectName: 'CentralAuth', // Usually your repo name.

  onBrokenLinks: 'throw',
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
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/'
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'CentralAuth',
      logo: {
        alt: 'CentralAuth Logo',
        src: 'img/logo_round.svg',
      },
      items: [
        {
          to: 'https://centralauth.com',
          label: 'Home',
          position: 'left'
        },
        {
          to: 'https://centralauth.com/dashboard',
          label: 'Dashboard',
          position: 'left',
        },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} CentralAuth`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
