// useful article: http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
// could potentially use interceptor to measure backend response time.
(function () {
    'use strict';
    
    angular
        .module('RXIN.app')
        .factory('HttpInterceptor', HttpInterceptor);
    
    HttpInterceptor.$inject = [ '$q', '$log', '$rootScope', '$window', '$crypto', '$localForage', '$injector', '$sce']
    function HttpInterceptor($q, $log, $rootScope, $window, $crypto, $localForage, $injector, $sce) {

        return {

            // to intercept for all external requests and add token before sending out
            'request': function(config) {

                var deferred = $q.defer();

                // to wait till the header is successfully modified before sending it out
                if (!$rootScope.token){
                    // if rootScope somehow still doesn't have the token,
                    // get it
                    $localForage.getItem('token').then(function(data) {
                        $rootScope.token = data;
                        modifyHeader(config);
                    });
                }else{
                    modifyHeader(config);
                }

                return deferred.promise
                        .then(function() {
                            return config;
                        })
                        .catch(function(){
                            
                        });

                function modifyHeader(config){
                    // decrypt the token and add it to the header.
                    //config.headers['Authorization'] = "Bearer " + $crypto.decrypt($rootScope.token);
                    config.headers['Authorization'] = "Bearer "+ $rootScope.token;
                    return deferred.resolve();
                }
            },

            // 'requestError': function(response) {
            //     return $q.reject(response);
            // },

            'response': function(response) {
                var Notification = $injector.get('Notification');

                if (response.status === 204){
                    if ((response.config.method === 'POST' ||
                        response.config.method === 'PUT' ) &&
                        response.config.url != $rootScope.domain + '/api/log/user'
                    ){
                        Notification.success({
                            message: "Saved successfully"
                        });
                    }else if (response.config.method === 'PATCH' || 
                        response.config.method === 'PUSH' ){

                        Notification.success({
                            message: "Sync successfully"
                        });
                    }
                }

                return response;
            },

            'responseError': function(response) { 
                var Notification = $injector.get('Notification');

                if (response.status === 401){

                    // user is unauthorised
                    if (!$rootScope.unauthorisedDeferredRequests){
                        $rootScope.unauthorisedDeferredRequests = [];
                    }

                    var $http = $injector.get('$http');
                    var AuthService = $injector.get('AuthService');

                    var deferred = $q.defer();

                    $rootScope.unauthorisedDeferredRequests.push(deferred);

                    // When the session recovered, make the same backend call again and chain the request
                    if ($rootScope.unauthorisedDeferredRequests.length<=1){
                        AuthService.refresh()
                            .then(function(response) {
                                if (response.status===200){
                                    for (var i = 0; i<$rootScope.unauthorisedDeferredRequests.length; i++){
                                        $rootScope.unauthorisedDeferredRequests[i].resolve();
                                    }
                                    $rootScope.unauthorisedDeferredRequests = [];
                                }else{
                                    for (var i = 0; i<$rootScope.unauthorisedDeferredRequests.length; i++){
                                        $rootScope.unauthorisedDeferredRequests[i].reject();
                                    }
                                    $rootScope.token = null;
                                    $localForage.removeItem('token').then(function() {
                                    });
                                    $window.location.href = './';
                                }
                            });
                    }                    
                    
                    return deferred.promise
                        .then(function() {
                            return $http(response.config);
                        })
                        .catch(function(){
                        });
                }else if (response.status===422){
                    if (response.data){
                        if (response.data.errors){
                            for (var i=0 ; i<response.data.errors.length; i++){
                                Notification.error({message: "Error: " + response.data.errors[i][0]});
                            }
                        }
                    }
                    return $q.reject(response);
                }else if (response.status===400||response.status===500){
                    if (response.data.message){
                        Notification.error({message: "Error: " + response.data.message});
                    }
                    return $q.reject(response);
                }
                return $q.reject(response);
            }
        };
    }
    
})();