/**
 * Created by durgesh.patle on 04-Jun-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .directive('collageCanvas',canvasCollageFn);

    canvasCollageFn.$inject = [];

    function canvasCollageFn() {
        return {
            restrict : 'E',
            scope : {
                prototypes:"=",
                borderColor:"="

            },
            template : '<canvas id="collage" ng-style="borderColor"></canvas>',
            link : function(scope,element) {
                scope.$on('updateBorderColor',function(){

                });

                function initCollage(){
                    //render
                }

                initCollage();
/*<div id="collage" ng-repeat="prototype in gridPrototypes track by $index" ng-if="prototype.isSelected" ng-style="currentBorderColor">
 <div class="inner-tile" ng-repeat="tile in prototype.tiles" ng-style="tile.style" ondrop="drop(event)" ondragover="allowDrop(event)">
 <div class="tile-picture" ng-style="tile.photoStyle"></div>
 </div>
 </div>*/
            }
        };
    }
})();