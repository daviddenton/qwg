$(document).ready(function () {
    var storage = {
        load:function (cb) {
            cb({
                "bill":{
                    "hicks":"hicksQuery"
                },
                "bob": {
                    "bill":function (text) {
                        return "http://localhost/" + text;
                    }
                },
                "bond":{
                    "moore":  "http://localhost/" + "mooreQuery",
                    "craig":  "http://localhost/" + "craigQuery",
                    "connery":"http://localhost/" + "conneryQuery",
                    "dalton": "http://localhost/" + "daltonQuery",
                    "lazenby":"http://localhost/" + "lazenbyQuery"
                },
                "rita":{
                    "alan":"http://localhost/" + "alanQuery"
                },
                "sue": {
                    "mel":"http://localhost/" + "melQuery"
                }
            });
        }
    };

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



