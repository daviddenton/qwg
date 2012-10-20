function AsyncQwg() {
    function sendMessage(spec, callback) {
        window.addEventListener('message', function (event) {
            callback(event.data.response);
            window.removeEventListener('message', this);
        });
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