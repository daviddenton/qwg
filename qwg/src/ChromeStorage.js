function ChromeStorage(defaultDataFactory) {
    return {
        load:function (callback) {
            chrome.storage.sync.get("qwgDataAsString", function (stored) {
                callback(stored.qwgDataAsString ? stored.qwgDataAsString : defaultDataFactory());
            });
        },
        save:function (updated, callback) {
            chrome.storage.sync.set({"qwgDataAsString":updated}, function () {
                callback && callback();
            });
        }
    };
}