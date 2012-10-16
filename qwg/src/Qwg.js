var s2 = {
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
function Qwg(schema) {
    return {
        suggestions:function (text) {
            function sortedMatchingKeys(token, o) {
                var matchingKeys = _.filter(_.keys(o), function (t) {
                    return _.startsWith(t, token)
                });
                return _.sortBy(matchingKeys, function (name) { return name; });
            }

            function suggestions0(tList, target) {
                if (tList.length == 0) {
                    return sortedMatchingKeys("", target);
                }
                if (tList.length == 1 && !target[tList[0]]) {
                    return sortedMatchingKeys(tList[0], target);
                }
                return suggestions0(tList.slice(1), target[tList[0]]);
            }

            return suggestions0(text.trim().split(" "), schema);
        },
        resolveUrl: function (text) {
            function resolveUrl0(tList, target) {
                if (tList.length == 0) {
                    return target;
                }
                if (tList.length == 1) {
                    return _.isFunction(target) ? target(text) : target;
                }
                return resolveUrl0(tList[0], target[tList[0]]);
            }

            return resolveUrl0(text.trim().split(" "), schema);
        }
    };
}
