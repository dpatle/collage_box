/**
 * Created by durgesh.patle on 17-Jul-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('aboutCtrl',aboutCtrlFunction);

    aboutCtrlFunction.$inject = ['$scope','facebookGraph','$rootScope','appConfig','popUpFactory'];

    function aboutCtrlFunction($scope,facebookGraph,$rootScope,appConfig,popUpFactory){
        var fetchUserInfo = function() {
            facebookGraph.getUserInfo().then(function(response){
                $rootScope.userName = response.name;
                $rootScope.userPicture = response.picture.data.url;
                $rootScope.logoutBackground = {
                    "background-image" : "url("+response.picture.data.url+")"
                };
                $rootScope.$apply();
            },function(response){
                popUpFactory.showPopUp({
                    heading : appConfig.errorMessage["1005"].name,
                    message : appConfig.errorMessage["1005"].message,
                    callback1 : function() {},
                    callback2 : function() {},
                    buttonText1 : "Okay",
                    buttonText2 : "",
                    showButton1 : true,
                    showButton2 : false
                });
                $rootScope.$apply();
            });
        };

        var init = function() {
            fetchUserInfo();
        }

        init();
    }
})();
