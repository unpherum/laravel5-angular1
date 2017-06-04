(function() {
    'use strict';

    angular
        .module('camsian.app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$q', '$log', '$localForage', '$crypto', '$rootScope', '$state']

    function AuthService($http, $q, $log, $localForage, $crypto, $rootScope, $state) {

        var service = {

            login: login,
            getDetails: getDetails,
            refresh: refresh,
            logout: logout,
            recoverPassword: recoverPassword,
            resetRecoverPassword: resetRecoverPassword,
            signUp: signUp

        };

        return service;

        function login(email, password) {
            return $http.post($rootScope.domain + '/api/authenticate', {
                email: email,
                password: password
            });
        }

        function getDetails(successCallback, errorCallback) {

                    return $http.get($rootScope.domain + '/api/auth/details')
                    .then(successCallback)
                    .catch(errorCallback);
            
        }

        function refresh() {
            return $http.post($rootScope.domain + '/api/auth/refresh')
                .then(refreshComplete)
                .catch(refreshFailed);

            function refreshComplete(response) {
                if (response.data.token) {
                    $rootScope.token = $crypto.encrypt(response.data.token);
                    $localForage.setItem('token', $crypto.encrypt(response.data.token)).then(function() {});
                }
                return response;
            }

            function refreshFailed(error) {
                return error;
            }
        }

        function logout() {
            $localForage.removeItem('token').then(function() {});
        }

        function recoverPassword(email, uri) {
            return $http.post($rootScope.domain + '/api/auth/recovery', {
                    email: email,
                    uri: uri
                })
                .then(recoverPasswordComplete)
                .catch(recoverPasswordFailed);

            function recoverPasswordComplete(response) {
                $log.debug(response.data);
                return response;
            }

            function recoverPasswordFailed(error) {
                $log.error(error);
                return error;
            }
        }

        function resetRecoverPassword(email, token, password, confirmPassword) {
            return $http.post($rootScope.domain + '/api/auth/reset', {
                    email: email,
                    token: token,
                    password: password,
                    password_confirmation: confirmPassword
                })
                .then(resetRecoverPasswordComplete)
                .catch(resetRecoverPasswordFailed);

            // if password reset is successful, store the user token
            function resetRecoverPasswordComplete(response) {
                $log.debug(response.data);
                if (response.data) {
                    if (response.data.token) {
                        $localForage.setItem('token', $crypto.encrypt(response.data.token)).then(function() {});
                    }
                }
                return response;
            }

            function resetRecoverPasswordFailed(error) {
                $log.error(error);
                return error;
            }
        }

        function signUp(email, name, password, confirmPassword, location) {
            return $http.post($rootScope.domain + '/api/auth/signup', {
                    email: email,
                    name: name, 
                    password: password,
                    password_confirmation: confirmPassword,
                    location: location
                })
                .then(signUpComplete)
                .catch(signUpFailed);

            // if password reset is successful, store the user token
            function signUpComplete(response) {
                $log.debug(response.data);
                if (response.data) {
                    if (response.data.token) {
                        $localForage.setItem('token', $crypto.encrypt(response.data.token)).then(function() {});
                    }
                }
                return response;
            }

            function signUpFailed(error) {
                $log.error(error);
                return error;
            }
        }

    }

})();