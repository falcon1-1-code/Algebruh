// Offline cache: everything is fetched once, then served from the device. The version changes with the content.
const V = "algebruh-fb58924831", FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "apple-touch-icon.png", "worker.js", "engine.txt", "steps.txt", "vendor/katex.min.js", "pyodide/pyodide.js", "pyodide/pyodide.asm.js", "pyodide/pyodide.asm.wasm", "pyodide/pyodide-lock.json", "pyodide/python_stdlib.woff2", "pyodide/sympy.woff2", "pyodide/mpmath.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => { if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request))); });
