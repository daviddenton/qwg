$(document).ready(function () {
    var storage = new ChromeStorage(DefaultData);

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

    storage.load(function (schema) {
        var editor = new CodeMirror($("#code")[0], {
            value:      stringifyWithFunctions(schema),
            mode:       "javascript",
            lineNumbers:true
        });
    });
});



