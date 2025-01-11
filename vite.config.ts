import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ViteImageOptimizer({
      jpg: {
        quality: 30,
      },
    }),
  ],
});
