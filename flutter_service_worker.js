'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "44f30e46ed4fae9f5dc50af1cbd3669f",
"assets/assets/img/google-play-badge.png": "db9b21a1c41f3dcd9731e1e7acfdbb57",
"assets/assets/img/ml.png": "5dd025d7ba5b30d3d0ee10cd03dffb07",
"assets/assets/img/nutrition.png": "b02cfdf036245478af5f7c467da145de",
"assets/assets/img/pets.png": "59c251e45cc2aab8e7361c5596a446f3",
"assets/assets/img/recommend.png": "a1e524eec602c336880495c272cb5bfd",
"assets/assets/img/search.png": "2d3b00672ca1ce1d38f42098c8a210cb",
"assets/assets/img/survey.jpg": "ab5220bb02184a52aaf70f153b623cff",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "4a975d6032d2cda6c8cdba8cbc5f12c2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "b37ae0f14cbc958316fac4635383b6e8",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "5178af1d278432bec8fc830d50996d6f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "aa1ec80f1b30a51d64c72f669c1326a7",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"favicon.ico": "feab745ece8ac15c7cc825c9de3c52b3",
"icons/android-icon-144x144.png": "38a2f69e70a0a117ef4438e144ed8aa7",
"icons/android-icon-192x192.png": "73d6085ec8066f4bd1aeafbd2dde354c",
"icons/android-icon-36x36.png": "bc801e32df9c1e775ab28701e529563d",
"icons/android-icon-48x48.png": "59ea7fc0ef7bd04b561772ddf1f933b4",
"icons/android-icon-72x72.png": "af9b05bbd7188f612a204b113272b43d",
"icons/android-icon-96x96.png": "ceb0a1ed3106ad72b9737cfb5cb66ce8",
"icons/apple-icon-114x114.png": "1ad409d857d742a7bcce16143091bb0d",
"icons/apple-icon-120x120.png": "6317f61ccc7ab5e41d27296484d0848f",
"icons/apple-icon-144x144.png": "38a2f69e70a0a117ef4438e144ed8aa7",
"icons/apple-icon-152x152.png": "fa77051fe4725bc5d8f344b07d8b20a5",
"icons/apple-icon-180x180.png": "384e0f2090ea416d1a6af26ee81afa2e",
"icons/apple-icon-57x57.png": "f0c3a8a72804dc8f24a5203c16f44ebc",
"icons/apple-icon-60x60.png": "1a85a0b3dd777821fd111b8600527fa0",
"icons/apple-icon-72x72.png": "af9b05bbd7188f612a204b113272b43d",
"icons/apple-icon-76x76.png": "08edeaeb6553fe18cb045aa96010105b",
"icons/apple-icon-precomposed.png": "72ea5f0e5921517f623711c86bf177a0",
"icons/apple-icon.png": "72ea5f0e5921517f623711c86bf177a0",
"icons/browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"icons/favicon-16x16.png": "9a297c437283dd921684fadfc6f5521f",
"icons/favicon-32x32.png": "82cb536ff47345bbc1fcd5cdd80a1912",
"icons/favicon-96x96.png": "ceb0a1ed3106ad72b9737cfb5cb66ce8",
"icons/favicon.ico": "feab745ece8ac15c7cc825c9de3c52b3",
"icons/manifest.json": "9a2a3f9e63b9a4249e1559eb6375cceb",
"icons/ms-icon-144x144.png": "38a2f69e70a0a117ef4438e144ed8aa7",
"icons/ms-icon-150x150.png": "0bbb2c6c30e9b9cb6cfc16507413b5e0",
"icons/ms-icon-310x310.png": "04d4f34ec64363a890c15321dd4cd77f",
"icons/ms-icon-70x70.png": "5c879d349c77b20a6b2072b043ff6780",
"index.html": "29429e29ef954332bd616c9745f24f22",
"/": "29429e29ef954332bd616c9745f24f22",
"main.dart.js": "5c665932c32d23438f90ee144b188343",
"manifest.json": "03b3bc9b7efa03a0bfe2015a51e50d1d",
"version.json": "2b0e62e19aa20339ebc5b12b1d7f7880"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
