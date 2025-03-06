import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // Open the visualizer after build
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: "/omra-korbo",
});
