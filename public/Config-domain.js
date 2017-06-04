(function () {
    'use strict';

    angular
        .module('Config-Domain', [])
        .constant('CONFIG_DOMAIN', 'http://localhost:8000')
        .constant('CONFIG_LOCAL_DOMAIN', 'http://localhost:8000');
})();
