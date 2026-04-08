import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://jbsiraudin.github.io",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    ssr: {
      noExternal: ["react-range-slider-input", "react-toastify", "vis-network"],
    },
  },
});
