/**
 * Created by durgesh.patle on 31-Jan-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('homeCtrl',homeCtrlFunction);

    homeCtrlFunction.$inject = ['$scope','facebookGraph','$rootScope'];

    function homeCtrlFunction($scope,facebookGraph,$rootScope){
        var homeCtrlScope = $scope;

        var fetchUserInfo = function() {
            facebookGraph.getUserInfo().then(function(response){
                $rootScope.userName = response.name;
                $rootScope.userPicture = response.picture.data.url;
                $rootScope.logoutBackground = {
                    "background-image" : "url("+response.picture.data.url+")"
                };
                $rootScope.$apply();
            },function(response){

            });
        };

        var createUserPictureTile = function() {
            homeCtrlScope.tileBackground = $rootScope.logoutBackground;
            facebookGraph.getTileProfilePicture().then(function(response){
                homeCtrlScope.tileBackground = {
                    "background-image" : "url("+response.picture.data.url+")"
                };
                homeCtrlScope.$apply();
            },function(response){

            });
        };
        var init = function() {
            fetchUserInfo();
            createUserPictureTile();
        }

        init();
    }
})();