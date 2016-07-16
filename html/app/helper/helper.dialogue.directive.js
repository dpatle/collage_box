/**
 * Created by durgesh.patle on 16-Jul-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .directive('dialogueBox',function(){
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/helper/helper.dialogue.view.html'
            };
        });
})();