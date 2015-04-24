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
 * @author Volker Andres
 * @version 2.0.2
 * @see https://github.com/dachcom-digital/jquery-doubleTapToGo
 */
(function ($) {
    'use strict';

    var options = {},
        currentTap = $(),
        preventClick = false,
        tapEvent = function (event) {
            var $target = $(event.target).closest('li');
            if (!$target.hasClass(options.selectorClass)) {
                preventClick = false;
                return;
            }

            if ($target.get(0) === currentTap.get(0)) {
                preventClick = false;
                return;
            }

            preventClick = true;
            currentTap = $target;
            event.stopPropagation();
        };

    $.widget('dcd.doubleTapToGo', {
        options: {
            automatic: true,
            selectorClass: 'doubletap',
            selectorChain: 'li:has(ul)'
        },

        _create: function () {
            var self = this;

            if (window.ontouchstart === undefined && !window.navigator.msMaxTouchPoints && !window.navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) {
                return;
            }

            options = this.options;

            if (window.navigator.msPointerEnabled) {
                this.element.get(0).addEventListener('MSPointerDown', tapEvent, false);
            } else if (window.navigator.pointerEnabled) {
                this.element.get(0).addEventListener('pointerdown', tapEvent, false);
            }

            this.element.on('click', '.' + this.options.selectorClass, function (event) {
                return self._click(event);
            }).on('touchstart', '.' + this.options.selectorClass, function (event) {
                return self._tap(event);
            });

            this._addSelectors();
        },

        _init: function () {
            currentTap = $();
            preventClick = false;
        },

        _addSelectors: function () {
            if (this.options.automatic !== true) {
                return;
            }

            this.element.find(this.options.selectorChain).addClass(this.options.selectorClass);
        },

        _click: function (event) {
            if (preventClick) {
                event.preventDefault();
            } else {
                currentTap = $();
            }
        },

        _tap: tapEvent,

        _destroy: function () {
            this.element.off();

            if (window.navigator.msPointerEnabled) {
                this.element.get(0).removeEventListener('MSPointerDown', tapEvent);
            }

            if (window.navigator.pointerEnabled) {
                this.element.get(0).removeEventListener('pointerdown', tapEvent);
            }
        }
    });
}(jQuery));
