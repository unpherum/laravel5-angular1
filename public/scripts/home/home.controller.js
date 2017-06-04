(function () {
    'use strict';

    angular
        .module('camsian.app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$window', '$rootScope', '$state', 'HomeService', '$localForage', '$timeout', 'Notification'];
    function HomeController($window, $rootScope, $state, HomeService, $localForage, $timeout, Notification) {

        // variable initialisation
        var vm = this;

        vm.lastDateSync = '';

        vm.errorMessage = '';
        vm.infoMessage = '';

        //declare method
        vm.syncPayroll = syncPayroll;
        init();
        function init(){
            $localForage.getItem('token').then(function(data) {
                
                if (!data){
                    vm.isRedirect = true;
                    Notification.info({message: "Redirecting page..."});

                    $timeout(function(){
                        $rootScope.token = data;
                        $window.location.href = '/#/login'; 
                    }, 1000);
                }
            });
    
        }

        function syncPayroll(){
            HomeService.syncPayroll(successCallback, errorCallback);
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