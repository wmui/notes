import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "胖胖熊笔记",
  description: "记录我的学习笔记",
  icon: "/rspress-icon.png",
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png",
  },
  themeConfig: {
    outlineTitle: "目录",
    editLink: {
      docRepoBaseUrl: "https://github.com/wmui/notes/tree/main/docs",
      text: "📝 在 GitHub 上编辑此页",
    },
    prevPageText: "上一篇",
    nextPageText: "下一篇",
    searchPlaceholderText: "搜索",
    searchNoResultsText: "未搜索到相关结果",
    searchSuggestedQueryText: "可更换不同的关键字后重试",
    footer: {
      message: "© 2024 胖胖熊笔记 Inc. All Rights Reserved.",
    },
  },
});
