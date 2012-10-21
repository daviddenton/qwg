$(document).ready(function () {
    var storage = new ChromeStorage(DefaultData);

    var editor = new CodeMirror($("#code")[0], {
        mode:         "javascript",
        lineNumbers:  true,
        matchBrackets:true
    });

    $("#save").click(function () {
        storage.save(editor.getValue(), function () {
            $("#message").text("saved").fadeOut(3000);
        });
    });

    storage.load(function (schema) {
        editor.setValue(schema);
    });
});



