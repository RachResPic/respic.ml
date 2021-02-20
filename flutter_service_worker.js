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
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "670aff0cd02925014cc548d4abf3498f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "831eb40a2d76095849ba4aecd4340f19",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "a126c025bab9a1b4d8ac5534af76a208",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "d80ca32233940ebadc5ae5372ccd67f9",
"favicon.ico": "7c710086b08d421b5df55820c4ad4330",
"icons/android-icon-144x144.png": "cf5219417edb7354ad737f5d625bee13",
"icons/android-icon-192x192.png": "60681fe2ec1b500e25573efa61bcd800",
"icons/android-icon-36x36.png": "35e6ace65108161574b97c331ad44897",
"icons/android-icon-48x48.png": "c5983f36d52123bad48ccb7d20aaa07e",
"icons/android-icon-72x72.png": "25a8e78ec55ba089771362d16267a1cc",
"icons/android-icon-96x96.png": "b11bc9f2287310a87025909233a1cb13",
"icons/apple-icon-114x114.png": "d963be9e401207ca02c4b30c345c7bac",
"icons/apple-icon-120x120.png": "7480c72c88d6eacf0c8690847bd73bff",
"icons/apple-icon-144x144.png": "cf5219417edb7354ad737f5d625bee13",
"icons/apple-icon-152x152.png": "c3002ec7e69f0cca8f68681297c98dd8",
"icons/apple-icon-180x180.png": "365706ec5bd41613035c422fcf1ef654",
"icons/apple-icon-57x57.png": "4d7108d09ac58cdfaa5963934c22c2f9",
"icons/apple-icon-60x60.png": "c57f68602323f221198d87fe20a6504d",
"icons/apple-icon-72x72.png": "25a8e78ec55ba089771362d16267a1cc",
"icons/apple-icon-76x76.png": "6b15be7bcaab22312dd19a046f06795a",
"icons/apple-icon-precomposed.png": "d7ab73ba435fd82e96c03f61b8473c77",
"icons/apple-icon.png": "d7ab73ba435fd82e96c03f61b8473c77",
"icons/browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"icons/favicon-16x16.png": "3792685f4f505974beff78e16d85d89f",
"icons/favicon-32x32.png": "c1a5c0b10a7dbcb0e7c66245211388ad",
"icons/favicon-96x96.png": "b11bc9f2287310a87025909233a1cb13",
"icons/favicon.ico": "7c710086b08d421b5df55820c4ad4330",
"icons/manifest.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"icons/ms-icon-144x144.png": "cf5219417edb7354ad737f5d625bee13",
"icons/ms-icon-150x150.png": "e247a3a823def1ee4b43b622af4f3899",
"icons/ms-icon-310x310.png": "7278acbaea5c8e8a0bf62a09f5b6923a",
"icons/ms-icon-70x70.png": "099a4244745e44c6fa01bcdd63b63d9b",
"icons/Thumbs.db": "02e9e611e8ba5f7297cccdd2e3dcd698",
"index.html": "a676021000a3294e58578824a06439bc",
"/": "a676021000a3294e58578824a06439bc",
"main.dart.js": "eee39da7e9c18361528635c36addccab",
"manifest.json": "06e1fb63a79ee01417afa1a7fe83b7d9",
"version.json": "98d692249bfb310a49f4dfd710459425"
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
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
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
  for (var resourceKey in Object.keys(RESOURCES)) {
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
