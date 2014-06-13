function InjectPsuedoZone(zoneName, containerId) {

    var container = $('#' + containerId);
    var zone = $('<div>', { 'class': 'zone' });    
    
    container.empty();

    $.get('bower_components/site/ajax/' + zoneName + '.htm', function (data) {
        
        container.append(zone);
        zone.append(data);

    });
}

$(function () {

    // Handler for .ready() called.

    InjectPsuedoZone('Header', 'header');
    InjectPsuedoZone('Navigation', 'layout-navigation');
    InjectPsuedoZone('Featured', 'layout-featured');
    InjectPsuedoZone('BeforeMain', 'layout-before-main');
    InjectPsuedoZone('AsideFirst', 'aside-first');
    InjectPsuedoZone('Messages', 'messages');
    InjectPsuedoZone('BeforeContent', 'before-content');
    InjectPsuedoZone('Content', 'content');
    InjectPsuedoZone('AfterContent', 'after-content');
    InjectPsuedoZone('AsideSecond', 'aside-second');
    InjectPsuedoZone('AfterMain', 'layout-after-main');
    InjectPsuedoZone('TripelFirst', 'tripel-first');
    InjectPsuedoZone('TripelSecond', 'tripel-second');
    InjectPsuedoZone('TripelThird', 'tripel-third');
    InjectPsuedoZone('FooterQuadFirst', 'footer-quad-first');
    InjectPsuedoZone('FooterQuadSecond', 'footer-quad-second');
    InjectPsuedoZone('FooterQuadThird', 'footer-quad-third');
    InjectPsuedoZone('FooterQuadFourth', 'footer-quad-fourth');
    InjectPsuedoZone('Footer', 'footer-sig');


});

