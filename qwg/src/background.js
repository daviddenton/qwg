chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    new ChromeStorage().load(function (schema) {
        suggest(_.map(new Qwg(schema).suggestions(text, schema), function (suggestion) {
            return {content:suggestion, description:"Search: " + suggestion};
        }))
    });
});

chrome.omnibox.onInputEntered.addListener(function (text) {
    new ChromeStorage().load(function (schema) {
        var url = new Qwg(schema).resolveUrl(text, schema);
        if (url) chrome.tabs.create({url:url});
    });
});
