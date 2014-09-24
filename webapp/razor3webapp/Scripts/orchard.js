(function (window) {

    function setupWhyOrchardCarousel() {
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
    }

    // see http://lesscss.org/usage/#using-less-in-the-browser
    function setupLessColourPicker() {

        var key, value, obj, msg, input;

        msg = $('#less-colour-picker span.msg');
        input = $('#less-colour-picker input');

        input.change(function () {

            msg.show();

            key = $(this).attr('name');
            value = $(this).val();
            obj = {};
            obj[key] = value;

            window.setTimeout(function () {
                less.modifyVars(obj);
                msg.fadeOut('slow');
            }, 500);

        });

        input.change();
    }

    setupWhyOrchardCarousel();
    setupLessColourPicker();

}(window));

