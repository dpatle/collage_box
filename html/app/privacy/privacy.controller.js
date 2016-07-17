/**
 * Created by durgesh.patle on 17-Jul-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('privacyCtrl',privacyCtrlFunction);

    privacyCtrlFunction.$inject = ['$scope','facebookGraph','$rootScope','appConfig','popUpFactory'];

    function privacyCtrlFunction($scope,facebookGraph,$rootScope,appConfig,popUpFactory){
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

        var init = function() {
            fetchUserInfo();
        }

        init();
    }
})();