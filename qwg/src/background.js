var setup = (function () {
    var twice = function (text) {
        return "http://localhost:9876:" + text + text;
    };
    var echo = function (text) {
        return "http://localhost:9876:" + text;
    };
    var toUpper = function (text) {
        return "http://localhost:9876:" + text.toUpperCase();
    };

    return {
        "bob": {
            "bill":twice
        },
        "rita":{
            "alan":echo
        },
        "sue": {
            "mel":toUpper
        }
    }
})();

var qwg = new Qwg(setup);
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    suggest(_.map(qwg.suggestions(text), function (suggestion) {
        return {content:suggestion, description:suggestion};
    }));
});

chrome.omnibox.onInputEntered.addListener(function (text) {
    chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.update(tab.id, {url:qwg.resolveUrl(text)});
    });
});
