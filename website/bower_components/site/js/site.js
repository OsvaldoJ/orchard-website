$(function () {

    // Handler for .ready() called.

    $.get("bower_components/site/ajax/navbar.htm", function (data) {
        $("#navigation").append(data);
    });

    $.get("bower_components/site/ajax/splash.htm", function (data) {
        $("#splash").append(data);
    });

});

