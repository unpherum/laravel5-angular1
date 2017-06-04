(function () {
    'use strict';

    angular
        .module('RXIN.app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$window', '$rootScope', '$state', 'SettingsService', '$localForage', '$timeout', 'Notification'];
    function SettingsController($window, $rootScope, $state, SettingsService, $localForage, $timeout, Notification) {

        // variable initialisation
        var vm = this;

        //declare method
        vm.save = save;

        init();
        function init(){
    
        }

        function save(){
            SettingsService.save(successCallback, errorCallback);
            function successCallback(response){
                if(response.data){
                    alert('Saved');
                }

            }
            function errorCallback(error){
                vm.errorMessage = 'Sync Payroll is failed';
                vm.infoMessage = '';
            }
        }

    }

})();