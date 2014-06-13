function InjectFakeWidget(widgetName, containerId)
{

}

function InjectFakeZone(zoneName, containerId) {

    var container = $('#' + containerId);
    var zone = $('<div>', { 'class': 'zone' });    
    
    container.empty();

    $.get('bower_components/site/ajax/' + zoneName + '.html', function (data) {
        
        if (data.length > 0)
        {
            container.append(zone);
            zone.append(data);
            console.debug('appending ' + zoneName);
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

