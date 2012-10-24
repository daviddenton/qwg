function ChromeStorage(defaultDataFactory) {
    return {
        load:function (callback) {
            chrome.storage.local.get("qwgDataAsString", function (stored) {
                callback(stored.qwgDataAsString ? stored.qwgDataAsString : defaultDataFactory());
            });
        },
        save:function (updated, callback) {
            chrome.storage.local.set({"qwgDataAsString":updated}, function () {
                callback && callback();
            });
        }
    };
}