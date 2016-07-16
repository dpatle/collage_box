/**
 * Created by durgesh.patle on 10-Jul-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('historyCtrl',historyCtrlFunction);

    historyCtrlFunction.$inject = ['$scope','facebookGraph','$rootScope','appConfig','popUpFactory'];

    function historyCtrlFunction($scope,facebookGraph,$rootScope,appConfig,popUpFactory){
        $scope.noDataFound = false;
        $scope.collages = [];
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

        var showRecentCollages = function() {

            var albumId = -1;
            $rootScope.showSpinner = true;
            facebookGraph.getAlbumNames().then(function(response){
                var isAlbumAvailable = false;
                for(var i=0;i<response.data.length;i++) {
                    if(response.data[i].name===appConfig.facebookAlbumName) {
                        albumId = response.data[i].id;
                        isAlbumAvailable = true;
                        break;
                    }
                }
                if(isAlbumAvailable) {
                    facebookGraph.getAlbumPhotos(albumId).then(function (response) {
                        var photoData = response.photos ? response.photos.data : null;
                        if(!photoData || photoData.length===0) {
                            $scope.noDataFound = true;
                            $rootScope.showSpinner = false;
                            popUpFactory.showPopUp({
                                heading : appConfig.errorMessage["1009"].name,
                                message : appConfig.errorMessage["1009"].message,
                                callback1 : function() {},
                                callback2 : function() {},
                                buttonText1 : "Okay",
                                buttonText2 : "",
                                showButton1 : true,
                                showButton2 : false
                            });
                            $rootScope.$apply();
                        } else {
                            for(var i=0; i< photoData.length;i++) {
                                var collage = {};
                                collage.url = photoData[i].images[0].source;
                                collage.imageStyle = {
                                    "background-image" : 'url('+collage.url+')'
                                };
                                $scope.collages.push(collage);
                            }
                            $rootScope.showSpinner = false;
                            $rootScope.$apply();
                        }
                    }, function (err) {
                        popUpFactory.showPopUp({
                            heading : appConfig.errorMessage["1009"].name,
                            message : appConfig.errorMessage["1009"].message,
                            callback1 : function() {},
                            callback2 : function() {},
                            buttonText1 : "Okay",
                            buttonText2 : "",
                            showButton1 : true,
                            showButton2 : false
                        });
                        $rootScope.$apply();
                    });
                } else {
                    $scope.noDataFound = true;
                    $rootScope.showSpinner = false;
                    $rootScope.$apply();
                }
            },function(err){
                popUpFactory.showPopUp({
                    heading : appConfig.errorMessage["1009"].name,
                    message : appConfig.errorMessage["1009"].message,
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
            showRecentCollages();
        }

        init();
    }
})();
