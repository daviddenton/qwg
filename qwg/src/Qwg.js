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
                    return _.isFunction(target) ? [text] : _.map(sortedMatchingKeys("", target), prependWithCurrentText);
                }
                if (tList.length == 1 && !target[tList[0]]) {
                    return _.map(sortedMatchingKeys(tList[0], target), prependWithCurrentText);
                }
                matchedTokens.push(tList[0]);
                return suggestions0(_.rest(tList), target[tList[0]], matchedTokens);
            }

            return suggestions0(toQueryTokens(text), schema.load, []);
        },
        resolveUrl: function (text) {
            function resolveUrl0(tList, target) {
                if (tList.length == 0)  return undefined;
                if (tList.length == 1) {
                    var newTarget = target[tList[0]];
                    if (_.isFunction(newTarget)) return newTarget(text);
                    if (_.isString(newTarget)) return newTarget;
                    return undefined;
                }

                return resolveUrl0(_.rest(tList), target[tList[0]]);
            }

            return resolveUrl0(toQueryTokens(text), schema.load);
        }
    };
}
