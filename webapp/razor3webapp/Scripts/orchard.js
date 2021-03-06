﻿/*global less, window*/

(function (window, less) {

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
    function setupLesscolorPicker(less) {

        var picker,
            key,
            value,
            msg,
            input,
            label,
            span,
            lessVars,
            ul,
            li,
            storageKeyLessVars,
            storageKeyIsOpen,
            controls,
            btnOpen,
            btnClose;

        function getLessVarsFromUI() {
            var lessVars = {};
            $.each(picker.find('input'), function (index, value) {
                key = $(value).attr('name');
                value = $(value).val();
                lessVars[key] = value;
            });
            return lessVars;
        }

        function getDefaultLessVars() {
            var obj = {};
            obj['brand-primary'] = '#428bca';
            obj['brand-success'] = '#5cb85c';
            obj['brand-info'] = '#5bc0de';
            obj['brand-warning'] = '#f0ad4e';
            obj['brand-danger'] = '#d9534f';
            obj['orchard-color-section'] = '#6F7763';
            obj['orchard-color-section-alt'] = '#ffffff';
            obj['orchard-color-footer'] = '#D4D6C9';
            obj['orchard-color-flag'] = '#E87910';
            obj['orchard-color-border'] = '#FFAD3A';
            obj['orchard-color-latest-posts'] = '#39922C';
            obj['body-bg'] = '#ffffff';
            obj['text-color'] = '#000000';
            obj['state-success-text'] = '#3c763d';
            obj['state-success-bg'] = '#dff0d8';
            obj['state-info-text'] = '#31708f';
            obj['state-info-bg'] = '#d9edf7';
            obj['state-warning-text'] = '#8a6d3b';
            obj['state-warning-bg'] = '#fcf8e3';
            obj['state-danger-text'] = '#a94442';
            obj['state-danger-bg'] = '#f2dede';
            /*
             * NOTE WELL:
             * Update the storageKeyLessVars
             * after adding variables to the list.
             * -------------------------------------------
             */
            return obj;
        }

        function getSavedLessVars() {
            var obj;
            if (window.localStorage.getItem(storageKeyLessVars) !== null) {
                // local storage
                obj = JSON.parse(window.localStorage.getItem(storageKeyLessVars));
            } else {
                // defaults
                obj = getDefaultLessVars();
            }
            return obj;
        }

        function appendLessVarsToUI(picker, lessVars) {
            ul = picker.find('ul.less-vars');
            ul.empty();
            for (var property in lessVars) {
                if (lessVars.hasOwnProperty(property)) {
                    key = property;
                    value = lessVars[property];

                    li = $('<li/>');
                    label = $('<label/>', { text: '@' + key + ':' });
                    span = $('<span/>', { text: value + ';' });
                    input = $('<input/>', { type: 'color', value: value, name: key });

                    li.append(label).append(span).append(input);
                    ul.append(li);
                }
            }
        }

        function compileLess(picker) {
            msg.text('Compiling less.');
            msg.show();

            window.setTimeout(function () {
                // compile less with new vars
                less.modifyVars(lessVars);

                // save in session storage - duration of page session
                window.localStorage.setItem(storageKeyLessVars, JSON.stringify(lessVars));

                // save in local storage - accross page sessiosn

                // fade out the user message
                msg.fadeOut('slow');
            }, 500);
        }

        function setupOpenClose(picker, storageKeyIsOpen) {
            controls = picker.find('#controls');
            btnOpen = picker.find('a.btn#open');
            btnClose = picker.find('a.btn#close');

            btnClose.click(function () {
                localStorage.setItem(storageKeyIsOpen, false);
                btnOpen.show();
                controls.hide();
            });

            btnOpen.click(function () {
                localStorage.setItem(storageKeyIsOpen, true);
                btnOpen.hide();
                controls.show();
            });

            if (localStorage.getItem(storageKeyIsOpen) === 'true') {
                btnOpen.click();
            } else {
                btnClose.click();
            }

        }

        // instantiate
        storageKeyLessVars = 'orchard-lessc-variables-08';
        storageKeyIsOpen = 'orchard-lessc-open-close';
        picker = $('#less-color-picker');
        msg = picker.find('span.msg');
        msg.hide();

        // do stuff
        setupOpenClose(picker, storageKeyIsOpen);
        lessVars = getSavedLessVars(picker);
        appendLessVarsToUI(picker, lessVars);
        compileLess(picker);

        // events
        picker.find('a.btn#compile').click(function () {
            lessVars = getLessVarsFromUI();
            appendLessVarsToUI(picker, lessVars);
            compileLess(picker, lessVars);
        });

        picker.find('a.btn#reset').click(function () {
            lessVars = getDefaultLessVars();
            appendLessVarsToUI(picker, lessVars);
            compileLess(picker, lessVars);
        });

    }

    setupWhyOrchardCarousel();
    if (less)
    {
        setupLesscolorPicker(less);
    }    

}(window, less));
