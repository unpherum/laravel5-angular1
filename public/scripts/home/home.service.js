(function () {
    'use strict';

    angular
        .module('camsian.app')
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$http', '$log', '$rootScope', '$localForage'];
    function HomeService($http, $log, $rootScope, $localForage) {

        var service = {
            syncPayroll: syncPayroll
        };

        return service;

        function syncPayroll(successCallback, errorCallback) {
            
            return $http.post($rootScope.domain + '/api/actions/sync/payroll',{
                param:{}
            }).then(successCallback)
            .catch(errorCallback);
            
        }

    }
    
})();