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

function renderDynamicMenu(tabId) {
    storage.load(function (schema) {
        var rootMenuItem = chrome.contextMenus.create({title:"Qwg", contexts:["selection"]});

        qwg.contextMenu("some query", schema, function (o) {
            function renderTree0(parentMenuItem) {
                _.each(_.keys(o), function (key) {
                    console.log(key);
                    var newMenuItem = chrome.contextMenus.create({title:key, contexts:["selection"], parentId:parentMenuItem});
                    renderTree0(newMenuItem, o);
                });
            }

            renderTree0(rootMenuItem, o);
        });
    });
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.contextMenus.removeAll(function () {
        renderDynamicMenu(activeInfo.tabId);
    });
});
