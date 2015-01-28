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
 * @version 2.0.0
 * @see https://github.com/dachcom-digital/jquery-doubleTapToGo
 */
(function ($) {
    'use strict';
    $.widget('dcd.doubleTapToGo', {
        options: {
            automatic: true,
            selectorClass: 'doubletap'
        },

        _currentTap: $(),

        _create: function () {
            if ((window.ontouchstart === undefined) && !window.navigator.msMaxTouchPoints && !window.navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) {
                return false;
            }

            this._on({
                'touchstart .doubletap': '_tap',
                'MSPointerDown .doubletap': '_tap'
            });

            this._addSelectors();
        },

        _addSelectors: function() {
            if (this.options.automatic !== true) {
                return;
            }

            this.element.find('li:has(ul)').addClass(this.options.selectorClass);
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

        }
    });
}(jQuery));
