/**
 * Created by durgesh.patle on 12/7/2015.
 */
(function(){
    'use strict';
    angular.module('app')
        .directive('background',function(){
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/layout/background.view.html'
            };
        });
})();