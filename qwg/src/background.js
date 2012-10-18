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
        "moore":  "http://localhost/"+"mooreQuery",
        "craig":  "http://localhost/"+"craigQuery",
        "connery":"http://localhost/"+"conneryQuery",
        "dalton": "http://localhost/"+"daltonQuery",
        "lazenby":"http://localhost/"+"lazenbyQuery"
    },
    "rita":{
        "alan":"http://localhost/"+"alanQuery"
    },
    "sue": {
        "mel":"http://localhost/"+"melQuery"
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
        console.log("url is " + url);
        if(url) chrome.tabs.update(tab.id, {url:url});
    });
});
