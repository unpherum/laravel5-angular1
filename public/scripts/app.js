    (function() {
        'use strict';

        angular
            .module('camsian.app', [
                'ngAnimate',
                'ngTouch',
                'ui.router',
                'mdo-angular-cryptography',
                'frapontillo.bootstrap-switch',
                'datatables',
                'ui.bootstrap.datetimepicker',
                'angularUtils.directives.dirPagination',
                'LocalForageModule',
                'Config-Domain',
                'ui-notification'
            ])
            .config(config)
            .run(run);

        config.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$cryptoProvider', 'uiDatetimePickerConfig'];

        function config($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, $cryptoProvider, uiDatetimePickerConfig) {

            // // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise('./#/login');

            // Now set up the states
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: './scripts/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    resolve: {
                        userDetails: getUserDetails
                    }
                })
                .state('login', {
                    url: "/login",
                    templateUrl: './scripts/auth/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    resolve: {
                    }
                })
                .state('settings', {
                    url: "/settings",
                    templateUrl: './scripts/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    resolve: {
                        userDetails: getUserDetails
                    }
                })
                .state('logout', {
                    url: "/logout",
                    templateUrl: './scripts/auth/logout.html',
                    controller: 'LogoutController',
                    controllerAs: 'vm'
                });

            $httpProvider.interceptors.push('HttpInterceptor');
            // resolve functions to get data through service layer

            getUserDetails.$inject = ['$rootScope', 'AuthService'];

            function getUserDetails($rootScope, AuthService) {
                if (!$rootScope.userDetails) {
                    return AuthService.getDetails(getDetailsComplete, getDetailsFailed);
                }
                function getDetailsComplete(response) {
                    $rootScope.userDetails = response.data;
                    return $rootScope.userDetails;
                }
                
                function getDetailsFailed(error) {
                    return error;
                }
        
            }

            // global config to set angular date time library
            uiDatetimePickerConfig.dateFormat = 'dd/MM/yyyy HH:mm';
            uiDatetimePickerConfig.enableDate = true;
            uiDatetimePickerConfig.enableTime = true;
            uiDatetimePickerConfig.buttonBar.show = false;

            // to overcome IE caching issue
            // See: http://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http

            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }

            //disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        }

        run.$inject = ['$rootScope', '$localForage', '$window', 'CONFIG_DOMAIN', 'CONFIG_LOCAL_DOMAIN', '$state'];

        function run($rootScope, $localForage, $window, CONFIG_DOMAIN, CONFIG_LOCAL_DOMAIN, $state) {
            $rootScope.domain = CONFIG_DOMAIN;
            $rootScope.localDomain = CONFIG_LOCAL_DOMAIN;

            //check if you user has login, otherwise go to login
            if(!$rootScope.userDetails){
                $state.go('login');
            }
        }

    })();
