/*global angular*/
"use strict";


/**
 * @ngdoc service
 * @name gaq.ga
 * @version 06.08.23
 * 
 * @author Martin Zaloudek (ZAL.cz, GITHUB.com/ma-zal)
 * @licence MIT
 * 
 * Angular-Google-Analytic-Queue library
 * =====================================
 * 
 * Service for using Google Analytics in Angular JS.
 * 
 * Google Analytics is not possible to use directly by calling `window.ga(...)` because of asynchronous library loading.
 * If you call `window.ga(...)` to earlier, method does not exists because it is not loaded yet.
 * This service creates queue layer. It GA is not ready, commands are stored and sent immediately after library load.
 * 
 */
angular.module('gaq', []).factory('ga', function() {

    var queue = [];
    
    var senderCanceller = null;

    return ga;

    /**
     * @public
     */
    function ga() {
        if (queue.length === 0 && window.ga) {
            // Nothing waiting for send, and library is ready => Send directly.
            window.ga.apply(this, arguments);
        } else {
            // Add to queue (will be send later).
            queue.push(arguments);
            
            if (senderCanceller === null) {
                scheduleLaterSending();
            }
        }
        
    }

    /**
     * @private
     */
    function scheduleLaterSending() {
        senderCanceller = setTimeout(function() {
            senderCanceller = null;
            
            if (!window.ga) {
                // GA library still not loaded
                scheduleLaterSending();
                return;
            }
            
            // Library is ready to work.
            // Send all queued items.
            queue.map(function(qaCallArguments) {
                window.ga.apply(this, qaCallArguments);
            });
            queue = [];
            
        }, 200);
    }

});
