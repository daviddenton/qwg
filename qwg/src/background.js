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
        qwg.contextMenu("$QUERY$", schema, function (o) {
            var rootMenuItem = chrome.contextMenus.create({title:"Qwg", contexts:["selection"]});

            function renderTree0(parentMenuItem, targetNode) {
                _.each(_.keys(targetNode), function (key) {
                    var menuItemContext = {title:key, contexts:["selection"], parentId:parentMenuItem};
                    var val = targetNode[key];
                    if (!_.isString(val)) {
                        var newTarget = _.isFunction(val) ? val("") : val;
                        var newMenuItem = chrome.contextMenus.create(menuItemContext);
                        renderTree0(newMenuItem, newTarget);
                    } else {
                        menuItemContext.onclick = function (info) {
                            chrome.tabs.create({url:val.replace("\$QUERY\$", info.selectionText)});
                        };
                        chrome.contextMenus.create(menuItemContext);
                    }
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
