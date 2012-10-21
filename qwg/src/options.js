$(document).ready(function () {
    var storage = new ChromeStorage(DefaultData);

    var editor = new CodeMirror($("#code")[0], {
        mode:         "javascript",
        lineNumbers:  true,
        matchBrackets:true
    });

    var memo;
    $("#save").click(function () {
        var newConfig = editor.getValue();
        storage.save(newConfig, function () {
            memo = newConfig;
            $("#message").text("saved").show().fadeOut(3000);
        });
    });

    $("#reset").click(function () {
        editor.setValue(memo);
    });

    $("#defaults").click(function () {
        editor.setValue(DefaultData());
    });

    storage.load(function (schema) {
        memo = schema;
        editor.setValue(schema);
    });
});



