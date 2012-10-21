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
            function suggestions0(tList, targetNode, matchedTokens) {
                function prependWithCurrentText(term) {
                    var newMatched = matchedTokens.slice();
                    newMatched.push(term);
                    return newMatched.join(' ');
                }

                function leafSuggestionFor(query) {
                    return (_.isFunction(targetNode) || _.isString(targetNode)) ? [text] : _.map(sortedMatchingKeys(query, targetNode), prependWithCurrentText);
                }

                if (tList.length == 0) return leafSuggestionFor("");
                if (!targetNode[tList[0]]) return leafSuggestionFor(tList[0]);

                matchedTokens.push(tList[0]);
                var childNode = targetNode[tList[0]];
                var newTargetNode = _.isFunction(childNode) && !_.isString(childNode(text)) ? childNode(text) : childNode;
                return suggestions0(_.rest(tList), newTargetNode, matchedTokens);
            }

            return suggestions0(toQueryTokens(text), schema, []);
        },
        resolveUrl: function (text) {
            function resolveUrl0(tList, targetNode) {
                if (tList.length == 0)  return undefined;
                var newTarget = targetNode[tList[0]];
                if (_.isFunction(newTarget) && _.isString(newTarget(""))) return newTarget(tList.slice(1).join(' '));
                if (_.isString(newTarget)) return newTarget.replace("\$QUERY\$", _.rest(tList).join(' '));
                var childNode = targetNode[tList[0]];
                var newTargetNode = _.isFunction(childNode) && !_.isString(childNode(text)) ? childNode(text) : childNode;
                return resolveUrl0(_.rest(tList), newTargetNode);
            }

            return resolveUrl0(toQueryTokens(text), schema);
        }
    };
}
