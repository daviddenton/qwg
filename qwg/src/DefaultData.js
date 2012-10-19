function DefaultData() {
    return {
        "search": {
            "google": function (query) {
                return "http://www.google.com/search?q=" + query;
            },
            "bing":   function (query) {
                return "http://www.bing.com/search?q=" + query;
            },
            "ask":    function (query) {
                return "http://www.ask.com/web?q=" + query;
            },
            "wolfram":function (query) {
                return "http://www.wolframalpha.com/input/?i=" + query;
            }
        },
        "torrent":{
            "isohunt":function (query) {
                return "http://isohunt.com/torrents/?ihq=" + query;
            }
        },
        "vcs":    {
            "github":    function (query) {
                return "http://github.com/search?q=" + query;
            },
            "bitbucket": function (query) {
                return "https://bitbucket.org/repo/all?name=" + query;
            },
            "googlecode":function (query) {
                return "http://code.google.com/query/#q=" + query;
            }
        },
        "quotes": {
            bond:      {
                "moore":  "http://www.google.com/search?q=Well just don't stand there Tibbit, unpack my clothes.",
                "brosnan":"http://www.google.com/search?q=Vodka martini. Plenty of ice, if you can spare it.",
                "craig":  "http://www.google.com/search?q=Yes, considerably.",
                "connery":"http://www.google.com/search?q=I must be dreaming.",
                "dalton": "http://www.google.com/search?q=Watch the birdie, you bastard...",
                "lazenby":"http://www.google.com/search?q=It's alright, it's quite alright. She's just sleeping, you see, we have all the time in the world."
            },
            "einstein":function () {
                alert("Insanity: doing the same thing over and over again and expecting different results.");
            }
        }
    };
}