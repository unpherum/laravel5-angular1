(function () {
    'use strict';

    angular
        .module('camsian.app')
        .factory('NameService', NameService);

    NameService.$inject = ['$http', '$log', '$rootScope', '$localForage'];
    function NameService($http, $log, $rootScope, $localForage) {

        var service = {
            serviceName: serviceName
        };

        return service;

        function serviceName(successCallback, errorCallback) {
            
            return $http.post($rootScope.domain + '/api/apiname',{
                param:{}
            }).then(successCallback)
            .catch(errorCallback);
            
        }

    }
    
})();