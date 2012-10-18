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
        "alan":{
            "q":"alanQuery"
        }
    },
    "sue": {
        "mel":"melQuery"
    }
};
function Qwg(schema) {
    function toQueryTokens(text) {
        var trimmed = _.trim(text);
        return trimmed.length == 0 ? [] : trimmed.split(" ");
    }

    function sortedMatchingKeys(token, o) {
        var matchingKeys = _.filter(_.keys(o), function (t) { return _.startsWith(t, token) });
        return _.sortBy(matchingKeys, function (name) { return name; });
    }

    return {
        suggestions:function (text) {
            function suggestions0(tList, target, matchedTokens) {
                function prependWithCurrentText(term) {
                    var newMatched = matchedTokens.slice();
                    newMatched.push(term);
                    return newMatched.join(' ');
                }

                if (tList.length == 0) {
                    if (_.isFunction(target)) {
                        return [text];
                    }
                    return _.map(sortedMatchingKeys("", target), prependWithCurrentText);
                }
                if (tList.length == 1 && !target[tList[0]]) {
                    return _.map(sortedMatchingKeys(tList[0], target), prependWithCurrentText);
                }
                matchedTokens.push(tList[0]);
                return suggestions0(_.rest(tList), target[tList[0]], matchedTokens);
            }

            return suggestions0(toQueryTokens(text), schema, []);
        },
        resolveUrl: function (text) {
            function resolveUrl0(tList, target) {
                console.log("s");
                console.log(tList);
                console.log(target);
                if (tList.length == 0) {
                    return '';
                }
                if (tList.length == 1) {
                    var newTarget = target[tList[0]];
                    if (!newTarget) return '';
                    if (_.isFunction(newTarget)) return newTarget(text);
                    if (_.isString(newTarget)) return newTarget;
                    return '';
                }

                return resolveUrl0(_.rest(tList), target[tList[0]]);
            }

            return resolveUrl0(toQueryTokens(text), schema);
        }
    };
}
