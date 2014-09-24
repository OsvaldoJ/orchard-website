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
    // this is in need of refactoring
    function setupLessColourPicker() {

        var key, value, msg, input, label, span, lessVars, ul, li, save, storageKey;

        storageKey = 'orchard-lessc-variables';

        picker = $('#less-colour-picker');

        msg = picker.find('span.msg');
        msg.hide();

        if (window.localStorage.getItem(storageKey) !== null) {
            lessVars = JSON.parse(window.localStorage.getItem(storageKey));
        }
        else {
            lessVars = {};
            lessVars['brand-primary'] = '#428bca';
            lessVars['brand-success'] = '#5cb85c';
            lessVars['brand-info'] = '#5bc0de';
            lessVars['brand-warning'] = '#f0ad4e';
            lessVars['brand-danger'] = '#d9534f';
            lessVars['orchard-color-section'] = '#6F7763';
            lessVars['orchard-color-section-alt'] = '#ffffff';
            lessVars['orchard-color-footer'] = '#D4D6C9';
            lessVars['orchard-color-flag'] = '#E87910';
            lessVars['orchard-color-border'] = '#FFAD3A';
            lessVars['orchard-color-latest-posts'] = '#39922C';
        }

        // append vars to picker ul in the UI
        ul = picker.find('ul.less-vars');
        for (var property in lessVars) {
            if (lessVars.hasOwnProperty(property)) {
                key = property;
                value = lessVars[property]

                li = $('<li/>');
                label = $('<label/>', { text: '@' + key + ':' });
                span = $('<span/>', { text: value + ';' });
                input = $('<input/>', { type: 'color', value: value, name: key });

                li.append(label).append(span).append(input);
                ul.append(li);
            }
        }

        function compileLess() {
            msg.text('Compiling less.');
            msg.show();

            $.each(picker.find('input'), function (index, value) {
                key = $(value).attr('name');
                value = $(value).val();
                lessVars[key] = value;
            });

            window.setTimeout(function () {
                // compile less with new vars
                less.modifyVars(lessVars);

                // save in session storage - duration of page session
                var temp = JSON.stringify(lessVars);
                window.localStorage.setItem(storageKey, JSON.stringify(lessVars));

                // save in local storage - accross page sessiosn

                // fade out the user message
                msg.fadeOut('slow');
            }, 500);
        }

        // apply changes        
        picker.find('a.btn-primary').click(function () {

            compileLess();

        });

        compileLess();

    }

    setupWhyOrchardCarousel();
    setupLessColourPicker();

}(window));

