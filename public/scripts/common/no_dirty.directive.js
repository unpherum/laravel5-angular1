(function () {
    'use strict';

    angular
        .module('RXIN.app')
        .directive('noDirty', noDirty);

    function noDirty() {
        var directive = {
            require: 'ngModel',
			link: function (scope, element, attrs, ngModelCtrl) {
				// override the $setDirty method on ngModelController
				ngModelCtrl.$setDirty = angular.noop;
			}
        };
        return directive;
    }
})();