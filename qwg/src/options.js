$(document).ready(function () {
    var storage = new ChromeStorage(DefaultData);

    var editor = new CodeMirror($("#code")[0], {
        mode:       "javascript",
        lineNumbers:true
    });

    storage.load(function (schema) {
        editor.setValue(schema);
    });

    $("#save").click(function () {
        storage.save(editor.getValue());
    });
});



