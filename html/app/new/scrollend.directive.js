/**
 * Created by durgesh.patle on 02-Apr-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .directive('scrollEnd',scrollEndHandlerFunction);

    scrollEndHandlerFunction.$inject = ['$timeout'];

    function scrollEndHandlerFunction($timeout) {
        return {
            restrict : 'A',
            scope : {
                onScrollEnd : "&onEnd"
            },
            link : function(scope,element) {
                scope.scrollTimeout = 0;
                scope.currentElement = element[0];

                scope.onscroll = function() {
                    scope.scrollTimeout = 0;
                    scope.scrollTimeout = $timeout(function(){
                        if(scope.currentElement.scrollTop === scope.currentElement.scrollHeight - scope.currentElement.offsetHeight){
                            scope.onScrollEnd();
                        }
                    },100);
                };

                element.bind("scroll", scope.onscroll);
            }
        };
    }
})();