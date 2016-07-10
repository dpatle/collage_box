/**
 * Created by durgesh.patle on 12/7/2015.
 */
(function(){
    'use strict';
    angular.module('app')
        .directive('navigator',['facebookAuth',function(facebookAuth){
            function navigationLinker (scope, elem) {
                scope.doLogout = function(){
                        facebookAuth.doLogout().then(function(data){
                            window.location.href = "#/";
                        },function(data){
                        });
                };
            }

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/layout/navigator.view.html',
                link: navigationLinker
            };
        }]);
})();