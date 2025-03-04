import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // If you need to add PostCSS config reference:
  css: {
    postcss: "./postcss.config.js",
  },
});
