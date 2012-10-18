function ChromeStorage() {
    var setup = {
        "bill":{
            "hicks":"hicksQuery"
        },
        "bob": {
            "bill":function (text) {
                return "http://localhost/" + text;
            }
        },
        "bond":{
            "moore":  "http://localhost/" + "mooreQuery",
            "craig":  "http://localhost/" + "craigQuery",
            "connery":"http://localhost/" + "conneryQuery",
            "dalton": "http://localhost/" + "daltonQuery",
            "lazenby":"http://localhost/" + "lazenbyQuery"
        },
        "rita":{
            "alan":"http://localhost/" + "alanQuery"
        },
        "sue": {
            "mel":"http://localhost/" + "melQuery"
        }
    };

    return {
        load:function (callback) {
            chrome.storage.sync.get("qwgData", function (stored) {
                callback(stored.schema ? stored.schema : setup);
            });
        },
        save:function (updated, callback) {
            chrome.storage.sync.set({"qwgData":updated}, function () {
                callback && callback();
            });
        }
    };
}