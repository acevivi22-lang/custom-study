// 관세사 공부방 오프라인 캐시. 파일을 고치면 VERSION 값을 바꿔 주세요.
// 페이지와 데이터는 설치할 때 미리 받아 두고, 문제 이미지는 처음 열 때 저장해 둡니다.
const VERSION = "v4-2026-11-09";
const CORE = ["./","index.html","amgi.html","nk.html","tc.html","gichul.html","lawmap.html","trademap.html","jeongri.html","jeongri-data.js","gichul-data.js","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","icons/icon-maskable-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "img-v1").map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) {
    e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  // 문제 이미지(img/, p2/): 한 번 받으면 버전이 바뀌어도 계속 보관
  if (/\/(img|p2)\//.test(url.pathname)) {
    e.respondWith(caches.open("img-v1").then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }))));
    return;
  }
  // 페이지·데이터: 네트워크 우선(새 버전 바로 반영), 오프라인이면 캐시
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match("index.html"))));
});
