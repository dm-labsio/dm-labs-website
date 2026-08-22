// DM FileViewer service worker
// Handles: app-shell caching for offline installs, and the Web Share Target
// POST (so files shared from other apps land inside this app instead of a
// third-party viewer).

const CACHE = "fileviewer-v1";
const APP_SHELL = ["/fileviewer/", "/fileviewer/index.html", "/fileviewer/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL).catch(() => {})));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method === "POST" && url.pathname === "/fileviewer/share-target") {
    event.respondWith(handleShareTarget(event));
    return;
  }

  if (event.request.method === "GET" && url.pathname.startsWith("/fileviewer/")) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
  }
});

async function handleShareTarget(event) {
  try {
    const formData = await event.request.formData();
    const files = formData.getAll("files").filter((entry) => entry instanceof File);
    const title = formData.get("title") || "";
    const text = formData.get("text") || "";
    await storeSharedFiles(files, { title, text });
  } catch (err) {
    // Fall through to redirect even if storing fails; the app will just show
    // the "open a file" screen instead of the shared file.
  }
  return Response.redirect("/fileviewer/?shared=1", 303);
}

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("fileviewer-share", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("shared");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function storeSharedFiles(files, meta) {
  const db = await openDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction("shared", "readwrite");
    tx.objectStore("shared").put({ files, meta, at: Date.now() }, "latest");
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}
