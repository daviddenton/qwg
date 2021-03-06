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
                var unmatchedTokens = _.rest(tList);
                var newTargetNode = _.isFunction(childNode) && !_.isString(childNode("", text)) ? childNode(unmatchedTokens.join(' '), text) : childNode;
                return suggestions0(unmatchedTokens, newTargetNode, matchedTokens);
            }

            return suggestions0(toQueryTokens(text), schema, []);
        },
        resolveUrl: function (text) {
            function resolveUrl0(tList, targetNode) {
                if (tList.length == 0)  return undefined;
                var newTarget = targetNode[tList[0]];
                if (_.isFunction(newTarget) && _.isString(newTarget("", text))) return newTarget(tList.slice(1).join(' '));
                if (_.isString(newTarget)) return newTarget.replace("\$QUERY\$", _.rest(tList).join(' '));
                var childNode = targetNode[tList[0]];
                var newTargetNode = _.isFunction(childNode) && !_.isString(childNode("", text)) ? childNode(text, text) : childNode;
                return resolveUrl0(_.rest(tList), newTargetNode);
            }

            return resolveUrl0(toQueryTokens(text), schema);
        },
        contextMenu:function (selection) {
            function contextMenu0(query, targetNode) {
                if (_.isString(targetNode)) return targetNode.replace("\$QUERY\$", selection);
                if (_.isFunction(targetNode)) {
                    var newNode = targetNode(selection);
                    return _.isString(newNode) ? newNode.replace("\$QUERY\$", selection) : contextMenu0(query, newNode);
                }
                var newNode = {};
                _.each(_.keys(targetNode), function (name) {
                    newNode[name] = contextMenu0(name, targetNode[name]);
                });
                return newNode;
            }

            return contextMenu0(selection, schema);
        }
    };
}
