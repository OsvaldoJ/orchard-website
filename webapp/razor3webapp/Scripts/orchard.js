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
    // this is in need of refactoring, because it's too confusing to read
    function setupLessColourPicker() {

        var key, value, obj, msg, input, lessVars, lessVarsList, formControl;

        lessVars = [
            ['brand-primary', '#428bca'],
            ['brand-success', '#5cb85c'],
            ['brand-info', '#5bc0de'],
            ['brand-warning', '#f0ad4e'],
            ['brand-danger', '#d9534f'],
            ['orchard-color-section', '#6F7763'],
            ['orchard-color-section-alt', '#ffffff'],
            ['orchard-color-footer', '#D4D6C9'],
            ['orchard-color-flag', '#E87910'],
            ['orchard-color-border', '#FFAD3A'],
            ['orchard-color-latest-posts', '#39922C']
        ];

        picker = $('#less-colour-picker');

        // append vars to picker ul
        lessVarsList = picker.find('ul.less-vars');
        for (var i = 0; i < lessVars.length; i += 1) {

            key = lessVars[i][0];
            value = lessVars[i][1];

            formControl =
                $('<li><label>@' + key + ': <input name="' + key + '" type="color" value="' + value + '" /> (' + value + ') </label></li>');

            lessVarsList.append(formControl);
        }

        // add change event
        input = picker.find('input');
        msg = picker.find('span.msg');

        input.change(function () {

            msg.text('Compiling less.');
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

    }

    setupWhyOrchardCarousel();
    setupLessColourPicker();

}(window));

