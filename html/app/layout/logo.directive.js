/**
 * Created by durgesh.patle on 25-Mar-16.
 */

(function(){
    'use strict';
    angular.module('app')
        .directive('collageLogo',function(){
            return {
                restrict: 'E',
                replace: true,
                scope :{
                    text : "="
                },
                templateUrl: 'app/layout/logo.view.html'
            };
        });
})();