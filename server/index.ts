import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Serve static assets (JS, CSS, images, fonts, etc.)
  app.use(express.static(staticPath));

  // Handle client-side routing:
  // 1. Try to serve a pre-rendered route-specific index.html (e.g. /web-design-limassol/index.html)
  // 2. Fall back to the root index.html for routes without a pre-rendered file
  app.get("*", (req, res) => {
    // Strip query string and trailing slash, build candidate path
    const urlPath = req.path.replace(/\/$/, "") || "/";
    const routeFile = path.join(staticPath, urlPath, "index.html");

    if (urlPath !== "/" && fs.existsSync(routeFile)) {
      res.sendFile(routeFile);
    } else {
      res.sendFile(path.join(staticPath, "index.html"));
    }
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
