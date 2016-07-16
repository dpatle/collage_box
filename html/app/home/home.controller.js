/**
 * Created by durgesh.patle on 31-Jan-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('homeCtrl',homeCtrlFunction);

    homeCtrlFunction.$inject = ['$scope','facebookGraph','$rootScope','appConfig','popUpFactory'];

    function homeCtrlFunction($scope,facebookGraph,$rootScope,appConfig,popUpFactory){
        var homeCtrlScope = $scope;
        $scope.backgroundPictures = [];

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
            });
        };

        var fetchBackgroundPictures = function() {
            facebookGraph.getUserPhotos(null).then(function(response){
                var responseData = response.data,
                    left= -60,
                    top= -20,
                    marginLeft=60,
                    expectedPhotoLength = appConfig.windowWidth/200 * appConfig.windowHeight/200,
                    currentLength = responseData.length;

                for(var i=0;i < expectedPhotoLength/currentLength; i++) {
                    responseData = responseData.concat(responseData);
                }

                for(var i=0;i<responseData.length;i++) {
                    var tileData = {};
                    tileData.id = responseData[i].id;

                    var imageData = responseData[i].images;
                    tileData.url = imageData[imageData.length - 1].source;
                    tileData.picture = responseData[i].picture;
                    tileData.isSelected = false;

                    tileData.urlStyle = {
                        'background-image': 'url(' + tileData.url + ')',
                        'left' : left+'px',
                        'top' : top+"px",
                        'margin-left' : marginLeft+"px"
                    };
                    $scope.backgroundPictures.push(tileData);

                    if(left > 1200 && left > appConfig.windowWidth) {
                        left = 0;
                        top = top + 200;
                        marginLeft = 0;
                    } else {
                        left = left + 200;
                    }
                }
                $rootScope.showSpinner = false;
                $scope.$apply();
            },function(){
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
            });
        }
        var init = function() {
            fetchUserInfo();
            createUserPictureTile();
            fetchBackgroundPictures();
        }

        init();
    }
})();