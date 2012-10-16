var setup = (function () {
    var twice = function (text) {
        return text + text;
    };
    var echo = function (text) {
        return text;
    };
    var toUpper = function (text) {
        return text.toUpperCase();
    };

    return {
        "bob": {
            "bill":twice
        },
        "rita":{
            "alan":echo
        },
        "sue": {
            "mel":toUpper
        }
    }
})();
