var SNAKE_CASE_REGEXP = /[A-Z]/g;
function snake_case(name, separator) {
    separator = separator || '-';
    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
    });
}

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
function camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
}

function InjectFakeWidget(widgetContainer) {

    var widgetContainer = $(widgetContainer);
    var classes = widgetContainer.attr('class').split(/\s+/);;
    var widgetClass = classes[1]; // todo Do this more accurately
    var widgetName = camelCase(widgetClass.replace('widget-', ''));

    $.get('bower_components/site/ajax/widgets/' + widgetName + '.html?foo=1', function (data) {
        if (data.length > 0) {
            widgetContainer.append(data);
        }
    });
}

function InjectFakeZone(zoneName, containerId) {

    var container = $('#' + containerId);
    var zone = $('<div>', { 'class': 'zone zone-' + snake_case(zoneName) });

    container.empty();

    $.get('bower_components/site/ajax/' + zoneName + '.html', function (data) {

        if (data.length > 0) {

            container.append(zone);
            zone.append(data);

            zone.find('.widget').each(function () {
                InjectFakeWidget(this);
            });
        }
    });
}

$(function () {

    // Handler for .ready() called.

    InjectFakeZone('Header', 'header');
    InjectFakeZone('Navigation', 'layout-navigation');
    InjectFakeZone('Featured', 'layout-featured');
    InjectFakeZone('BeforeMain', 'layout-before-main');
    InjectFakeZone('AsideFirst', 'aside-first');
    InjectFakeZone('Messages', 'messages');
    InjectFakeZone('BeforeContent', 'before-content');
    InjectFakeZone('Content', 'content');
    InjectFakeZone('AfterContent', 'after-content');
    InjectFakeZone('AsideSecond', 'aside-second');
    InjectFakeZone('AfterMain', 'layout-after-main');
    InjectFakeZone('TripelFirst', 'tripel-first');
    InjectFakeZone('TripelSecond', 'tripel-second');
    InjectFakeZone('TripelThird', 'tripel-third');
    InjectFakeZone('FooterQuadFirst', 'footer-quad-first');
    InjectFakeZone('FooterQuadSecond', 'footer-quad-second');
    InjectFakeZone('FooterQuadThird', 'footer-quad-third');
    InjectFakeZone('FooterQuadFourth', 'footer-quad-fourth');
    InjectFakeZone('Footer', 'footer-sig');

});

