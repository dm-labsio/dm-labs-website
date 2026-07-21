FROM node:22-bookworm

# Install Playwright's Chromium browser and all required system dependencies.
# This uses Playwright's own install command (recommended approach) which downloads
# the exact Chromium version Playwright was tested against, plus all OS-level deps.
# Must run BEFORE pnpm install so the browser is available when pnpm run build
# calls scripts/prerender-full.mjs.
RUN npx -y playwright@1.61.1 install chromium --with-deps

WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack pnpm install && corepack pnpm run build

ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
