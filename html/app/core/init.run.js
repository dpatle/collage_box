/**
 * Created by durgesh.patle on 12/20/2015.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .run(launchApplicationUtilities);

    launchApplicationUtilities.$inject = ['$rootScope', '$window', 'facebookAuth','$location'];

    function launchApplicationUtilities($rootScope, $window, facebookAuth,$location) {
        $rootScope.user = {};
        facebookAuth.init();
        $rootScope.location = $location.path();

        $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
            var path = "/";
            $location.path(path);
        });

        $rootScope.$on("$routeChangeSuccess",function(){
            $rootScope.location = $location.path();
        });

    }
})();
