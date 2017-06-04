(function () {
    'use strict';

    angular
        .module('RXIN.app')
        .factory('SettingsService', SettingsService);

    SettingsService.$inject = ['$http', '$log', '$rootScope', '$localForage'];
    function SettingsService($http, $log, $rootScope, $localForage) {

        var service = {
            save: save
        };

        return service;

        function save(successCallback, errorCallback) {
            
            return $http.post($rootScope.domain + '/api/settings/save',{
                param:{}
            }).then(successCallback)
            .catch(errorCallback);
            
        }

    }
    
})();