function DefaultData() {
    var stringifyWithFunctions = function (obj) {
        var placeholder = '____PLACEHOLDER____';
        var fns = [];
        var json = JSON.stringify(obj, function (key, value) {
            if (typeof value === 'function') {
                fns.push(value);
                return placeholder;
            }
            return value;
        }, 4);
        json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function (_) {
            return fns.shift();
        });
        return json;
    };

    return stringifyWithFunctions({
        "search": {
            "google": "http://www.google.com/search?q=$QUERY$",
            "bing":   "http://www.bing.com/search?q=$QUERY$",
            "ask":    "http://www.ask.com/web?q=$QUERY$",
            "wolfram":"http://www.wolframalpha.com/input/?i=$QUERY$"
        },
        "torrent":{
            "isohunt":function (query) {
                return "http://isohunt.com/torrents/?ihq=" + query;
            }
        },
        "vcs":    {
            "github":    "http://github.com/search?q=$QUERY$",
            "bitbucket": "http://bitbucket.org/repo/all?name=$QUERY$",
            "googlecode": "http://code.google.com/query/#q=$QUERY$"
        },
        "quotes": {
            bond:      {
                "moore":  "http://www.youtube.com/results?search_query=James+Bond+Well+just+don't+stand+there+Tibbit,+unpack+my+clothes.",
                "brosnan":"http://www.youtube.com/results?search_query=James+Bond+Vodka+martini.+Plenty+of+ice,+if+you+can+spare+it.",
                "craig":  "http://www.youtube.com/results?search_query=James+Bond+Yes,+considerably.",
                "connery":"http://www.youtube.com/results?search_query=James+Bond+I+must+be+dreaming.",
                "dalton": "http://www.youtube.com/results?search_query=James+Bond+Watch+the+birdie,+you+bastard...",
                "lazenby":"http://www.youtube.com/results?search_query=James+Bond+It's+alright,+it's+quite+alright.+She's+just+sleeping,+you+see,+we+have+all+the+time+in+the+world."
            },
            "einstein":function () {
                return "http://www.google.com/search?q=Insanity: doing the same thing over and over again and expecting different results.";
            }
        },
        "dynamic":{
            "day":function () {
                var day = {};
                var today = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
                day[today] = function(query) {
                    return "http://www.google.com/search?q="+today + " AND " + query;
                };
                return day;
            }
        }
    });
}