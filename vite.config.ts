import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  // Only imported by lazily loaded routes, so bundle them at startup instead of on first visit.
  optimizeDeps: {
    include: [
      "zustand",
      "zustand/middleware",
      "sonner",
      "react-hook-form",
      "@hookform/resolvers/zod",
      "zod",
      "@radix-ui/react-dialog",
    ],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    react(),
    ...(command === "build" ? [nitro({
      preset: process.env["NITRO_PRESET"] ||
        (process.env["VERCEL"] ? "vercel" :
          process.env["NETLIFY"] ? "netlify" :
            process.env["CF_PAGES"] ? "cloudflare-pages" : "node-server"),
    })] : []),
  ],
}));
