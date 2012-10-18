var setup = {
    "bill":{
        "hicks":"hicksQuery"
    },
    "bob": {
        "bill":function (text) {
            return "iWasCalledWith" + text;
        }
    },
    "bond":{
        "moore":  "mooreQuery",
        "craig":  "craigQuery",
        "connery":"conneryQuery",
        "dalton": "daltonQuery",
        "lazenby":"lazenbyQuery"
    },
    "rita":{
        "alan":"alanQuery"
    },
    "sue": {
        "mel":"melQuery"
    }
};

var qwg = new Qwg(setup);
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    suggest(_.map(qwg.suggestions(text), function (suggestion) {
        return {content:suggestion, description: "Search: " + suggestion};
    }));
});

chrome.omnibox.onInputEntered.addListener(function (text) {
    chrome.tabs.getCurrent(function (tab) {
        var url = qwg.resolveUrl(text);
        if(url) chrome.tabs.update(tab.id, {url:url});
    });
});
