$(document).ready(function () {
    var storage = new ChromeStorage(DefaultData);

    var editor = new CodeMirror($("#code")[0], {
        mode:         "javascript",
        lineNumbers:  true,
        matchBrackets:true
    });

    var memo;
    $("#save").click(function () {
        storage.save(editor.getValue(), function () {
            $("#message").text("saved").fadeOut(3000);
        });
    });

    $("#reset").click(function () {
        editor.setValue(DefaultData());
    });

    $("#cancel").click(function () {
        editor.setValue(memo);
    });

    storage.load(function (schema) {
        memo = schema;
        editor.setValue(schema);
    });
});



