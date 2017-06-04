(function () {
    'use strict';

    angular
        .module('camsian.app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$localForage', '$state', '$window', '$timeout', '$scope', 'AuthService', 'Notification', '$crypto', '$log'];
    function LoginController($rootScope, $localForage, $state, $window, $timeout, $scope, AuthService, Notification, $crypto, $log) {

        // variable initialisation
        var vm = this;

        vm.form = null;
        vm.errorMessage = "";
        //vm.infoMessage = message;

        vm.dataLoading = false;

        vm.login = login;

        initController();

        function initController(){
            
            $localForage.getItem('token').then(function(data) {
                if (data){
                    $timeout(function(){
                        $rootScope.token = data;
                        $window.location.href = './#/'; 
                    }, 1000);
                }
            });
            
        }

        function login(){
            authLogin(vm.email, vm.password);
        }

        function authLogin(email, password){
            vm.dataLoading = true;
            var authLoginPromise =  AuthService.login(email, password).then(loginComplete, loginFailed);

            function loginComplete(response) {
                if (response.data.token){
                    $localForage.setItem('token', response.data.token).then(function() {
                        vm.dataLoading = false;
                        $rootScope.token = response.data.token;
                        $window.location.href = './#/'; 
                    });
                }
            }

            function loginFailed(error) {
                $log.error(error);
                vm.dataLoading = false;
                vm.errorMessage = "Something went wrong. Please try again later.";
                vm.infoMessage = "";
                return error;
            }

            return authLoginPromise;
        }

    }

})();