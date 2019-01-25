importScripts("./precache-manifest.046babd91789cf583f7b556570a7b3d4.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");


workbox.skipWaiting()
workbox.clientsClaim()

// 设置缓存名称前缀
workbox.core.setCacheNameDetails({
    prefix: 'vuecli'
})

// 缓存manifest.json
workbox.routing.registerRoute(
    /\/manifest\.json/,
    workbox.strategies.staleWhileRevalidate()
)

// sw-register网络请求优先
workbox.routing.registerRoute(
    /\/sw-register\.js/,
    workbox.strategies.networkOnly()
)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
