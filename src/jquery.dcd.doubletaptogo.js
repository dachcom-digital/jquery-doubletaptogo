/*global jQuery, window, document*/
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
 * @version 2.0.1
 * @see https://github.com/dachcom-digital/jquery-doubleTapToGo
 */
(function ($) {
    'use strict';
    $.widget('dcd.doubleTapToGo', {
        options: {
            automatic: true,
            selectorClass: 'doubletap',
            selectorChain: 'li:has(ul)'
        },

        _currentTap: $(),

        _create: function () {
            var useragent;

            if ((window.ontouchstart === undefined) && !window.navigator.msMaxTouchPoints && !window.navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) {
                return false;
            }

            useragent = window.navigator.userAgent.toLowerCase();

            if (useragent.indexOf('android') > -1) {
                this._on('.' + this.options.selectorClass, {
                    'click': '_tap',
                    'MSPointerDown': '_tap'
                });
            } else {
                this._on('.' + this.options.selectorClass, {
                    'touchstart': '_tap'
                });
            }

            this._addSelectors();

            return true;
        },

        _addSelectors: function () {
            if (this.options.automatic !== true) {
                return;
            }

            this.element.find(this.options.selectorChain).addClass(this.options.selectorClass);
        },

        _tap: function (event) {
            var $target = $(event.target).closest('li');
            if (!$target.hasClass(this.options.selectorClass)) {
                return true;
            }

            if ($target.get(0) === this._currentTap.get(0)) {
                event.stopPropagation();
                return true;
            }

            this._currentTap = $target;
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    });
}(jQuery));