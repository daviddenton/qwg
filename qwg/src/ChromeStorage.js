function ChromeStorage(defaultDataFactory) {
    return {
        load:function (callback) {
            chrome.storage.sync.get("qwgData", function (stored) {
                callback(stored.schema ? stored.schema : defaultDataFactory());
            });
        },
        save:function (updated, callback) {
            chrome.storage.sync.set({"qwgData":updated}, function () {
                callback && callback();
            });
        }
    };
}