self.addEventListener("install", () => {
    self.skipWaiting();
});
 
self.addEventListener("message", (event) => {
    if (event.data.type === "wait") {
    const time = event.data.wait * 1000;
        setTimeout(function() {
            event.ports[0].postMessage(event.data.wait + "秒待ちました。");
            self.registration.showNotification(event.data.wait + "秒待ちました。", {
                body: "HelloWorld!",
                icon: "./img/onigiri.png",
            });
        }, time); 
    }
});
