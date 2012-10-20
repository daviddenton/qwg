function AsyncQwg() {
    function sendMessage(spec, callback) {
        var listener = function (event) {
            callback(event.data.response);
            window.removeEventListener('message', listener);
        };
        window.addEventListener('message', listener);
        chrome.extension.getBackgroundPage().document.getElementById("sandboxFrame").contentWindow.postMessage(spec, '*');
    }

    return {
        suggestions:function (query, schema, callback) {
            sendMessage({type:'suggestions', query:query, schema:schema}, callback);
        },
        resolveUrl: function (query, schema, callback) {
            sendMessage({type:'resolveUrl', query:query, schema:schema}, callback);
        }
    };
}