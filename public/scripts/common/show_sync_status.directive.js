/**
    custom directive to show sync status
    possible status:
        "synced" or true,
        "sync_failed" or false,
        "syncing", 
        "sync_off",
        null => not applicable
**/
(function () {
    'use strict';

    angular
        .module('RXIN.app')
        .directive('showSyncStatus', showSyncStatus);

    function showSyncStatus() {
        var directive = {
            restrict: 'E',
            transclude: true,
            templateUrl: './javascripts/common/show_sync_status.html',
            scope: {
                status: '=',
                hideText: '='
            }
        };

        return directive;
    }
})();