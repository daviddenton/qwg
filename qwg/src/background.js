var storage = new ChromeStorage(DefaultData);
var qwg = new AsyncQwg();

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    storage.load(function (schema) {
        qwg.suggestions(text, schema, function (sList) {
            suggest(_.map(sList, function (suggestion) {
                return {content:suggestion, description:"Search: " + suggestion};
            }))
        });
    });
});

chrome.omnibox.onInputEntered.addListener(function (text) {
    storage.load(function (schema) {
        qwg.resolveUrl(text, schema, function (url) {
            if (url) chrome.tabs.create({url:url});
        });
    });
});
