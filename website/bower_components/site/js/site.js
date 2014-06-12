$(function () {

    // Handler for .ready() called.

    $.get("bower_components/site/ajax/navbar.htm", function (data) {
        $("#navigation").append(data);
    });

    $.get("bower_components/site/ajax/main-content.htm", function (data) {
        $("#main-content").append(data);
    });

});

