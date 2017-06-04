(function () {
    'use strict';

    angular
        .module('camsian.app')
        .controller('NameController', NameController);

    NameController.$inject = ['$window', '$rootScope', '$state', 'NameService', '$localForage', '$timeout', 'Notification'];
    function NameController($window, $rootScope, $state, NameService, $localForage, $timeout, Notification) {

        // variable initialisation
        var vm = this;

        vm.lastDateSync = '';

        vm.errorMessage = '';
        vm.infoMessage = '';

        //declare method
        vm.functionName = functionName;

        init();
        function init(){
    
        }

        function functionName(){
            NameService.serviceName(successCallback, errorCallback);
            function successCallback(response){
                vm.errorMessage = '';
                vm.infoMessage = 'Payroll is sync successfully';
                vm.lastDateSync = response.data;

            }
            function errorCallback(error){
                vm.errorMessage = 'Sync Payroll is failed';
                vm.infoMessage = '';
            }
        }

    }

})();