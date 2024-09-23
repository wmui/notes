import * as path from 'path';
import { defineConfig } from 'rspress/config';
// import ghPages from 'rspress-plugin-gh-pages';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: '胖胖熊笔记',
  base: '/notes/',
  description: '记录我的学习笔记',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  // plugins: [
  //   ghPages({
  //     repo: 'https://github.com/wmui/notes.git',
  //     branch: 'website',
  //     siteBase:'/',
  //     history: false,
  //     cname: 'ppx.link'
  //   }),
  // ],
  // themeConfig: {
  //   socialLinks: [
  //     { icon: 'github', mode: 'link', content: 'https://github.com/wmui' },
  //   ],
  // },
});
