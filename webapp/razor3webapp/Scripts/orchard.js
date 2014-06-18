$(function () {
    // Handler for .ready() called.

    var indicators = $('#why-orchard').find("ol li");

    $('#carousel-why-orchard')
        .on('slide.bs.carousel', function () {
            indicators.removeClass("active");
        }).on('slid.bs.carousel', function () {
            var activeItem,
                activeIndex,
                items;
            items = $(this).find('.item');
            activeItem = $(this).find('.item.active');
            activeIndex = items.index(activeItem);
            indicators.eq(activeIndex).addClass("active");
        });
});