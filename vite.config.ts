import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import visitorCurrency from "./api/visitor-currency";

const localCurrency: Plugin = {
  name: "local-visitor-currency",
  configureServer(server) {
    server.middlewares.use("/api/visitor-currency", (req, res) => {
      // Local development fixture only, never a public currency override.
      req.headers["x-vercel-ip-country"] = process.env.DM_QA_COUNTRY ?? "";
      visitorCurrency(req, res);
    });
  },
};
const plugins = [react(), tailwindcss(), localCurrency];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
