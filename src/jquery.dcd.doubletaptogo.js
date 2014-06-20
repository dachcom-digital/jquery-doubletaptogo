/*global jQuery, window, document, console*/
/*jslint nomen:true, plusplus:true*/

/*
 Original Plugin by Osvaldas Valutis, www.osvaldas.info
 http://osvaldas.info/drop-down-navigation-responsive-and-touch-friendly
 Available for use under the MIT License
 */

/**
 * jquery-doubleTapToGo widget
 * Copyright 2014 DACHCOM.DIGITAL AG
 * @author Marco Rieser
 * @see https://github.com/dachcom-digital/jquery-doubleTapToGo
 */
(function ($) {
    'use strict';
    $.widget('dcd.doubleTapToGo', {
        options: {
            levels: 1
        },

        _create: function () {
            if ((window.ontouchstart === undefined) && !window.navigator.msMaxTouchPoints && !window.navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) {
                return false;
            }

            if ((this.options.levels !== -1)) {
                this._levelLimiter();
            }

            this._curItem = false;
            this._on({
                'click li': '_checkFirstClick'
            });

            this._on(document, {
                'click touchstart MSPointerDown': '_openNavigation'
            });
            return true;
        },

        _levelLimiter: function () {
            var i = 0,
                selector = '';
            for (i; i < this.options.levels; i++) {
                selector += '> ul > li ';
            }
            selector += 'ul';
            this.element.find(selector).addClass('no-doubletapping');
        },

        _checkFirstClick: function (event) {
            var item = $(event.target).closest('li');
            if (!(item.find('ul').length)) {
                return;
            }
            if ((item.parent('ul').hasClass('no-doubletapping'))) {
                return;
            }
            if (item[0] !== this._curItem[0]) {
                event.preventDefault();
                this._curItem = item;
            }
        },

        _openNavigation: function (event) {
            var resetItem = true,
                parents = $(event.target).parents(),
                i = 0;

            for (i; i < parents.length; i++) {
                if (parents[i] === this._curItem[0]) {
                    resetItem = false;
                }
            }

            if (resetItem) {
                this._curItem = false;
            }
        }
    });
}(jQuery));