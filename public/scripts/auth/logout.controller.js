(function () {
    'use strict';

    angular
        .module('RXIN.app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$window', '$timeout', 'AuthService'];
    function LogoutController($window, $timeout, AuthService) {

        // variable initialisation
        var vm = this;

        vm.timeoutPromise = null;

        //method declaration
        vm.clearTimeout = clearTimeout;

        initController();

        function initController(){
            AuthService.logout();
            vm.timeoutPromise = $timeout(function () {
                $window.location.href = '/';
                vm.timeoutPromise = null;
            }, 5000);
        }

        function clearTimeout(){
            if (vm.timeoutPromise){
                $timeout.cancel(vm.timeoutPromise);
            }
        }
    }

})();