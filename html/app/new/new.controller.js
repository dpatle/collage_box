/**
 * Created by durgesh.patle on 27-Mar-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('newCtrl',newCtrlFunction);

    newCtrlFunction.$inject = ['$scope','facebookGraph','$rootScope','appConfig','popUpFactory','imageBank','$timeout','$q'];

    function newCtrlFunction($scope,facebookGraph,$rootScope,appConfig,popUpFactory,imageBank,$timeout,$q){
        $rootScope.showSpinner = false;
        $scope.selectivePhotos = [];
        $scope.nextPhotosPage = null;
        $scope.currentSlideView = 1;
        $scope.slidePosition = {
            'left' : (0 - ( $scope.currentSlideView - 1 ) * 100) +"%"
        };

        //First slide code here

        var fetchedPhotos = [];

        $scope.$watch("currentSlideView",function(newVal,oldVal){
            $scope.slidePosition = {
                'left' : (0 - ( newVal - 1 ) * 100) +"%"
            };
        });

        $scope.switchSlideView = function(toView) {
            var  canMoveToOtherView = false
            if($scope.currentSlideView === 1 && toView===2){
                var selectedPhotoCount = 0;
                for(var i=0;i<$scope.selectivePhotos.length;i++){
                    if($scope.selectivePhotos[i].isSelected) {
                        selectedPhotoCount++;
                    }
                    if(selectedPhotoCount>=5){
                        canMoveToOtherView = true;
                        break;
                    }
                }

                if(!canMoveToOtherView){
                    popUpFactory.showPopUp(appConfig.errorMessage["1002"].message);
                    return;
                } else {
                    $scope.currentSlideView = toView;
                }
            } else if($scope.currentSlideView === 3 && toView===2) {
                $scope.currentSlideView = toView;
            } else if(toView === 1) {
                $scope.currentSlideView = toView;
            } else if ($scope.currentSlideView === 2 && toView===3) {
                createFinalCollageToShare();
            }


        };

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

        $scope.appendSelectivePhotos = function() {
            if(!$scope.nextPhotosPage && $scope.selectivePhotos.length>0)
                return;
            $rootScope.showSpinner = true;
            facebookGraph.getUserPhotos($scope.nextPhotosPage).then(function(response){
                var responseData = response.data;
                for(var i=0;i<responseData.length;i++){
                    var tileData = {};
                    tileData.id = responseData[i].id;

                    if(fetchedPhotos.indexOf(tileData.id)!==-1) {
                        continue;
                    }

                    fetchedPhotos.push(tileData.id);

                    var imageData = responseData[i].images;
                    for(var j=imageData.length-1;j>=0;j--){
                        if((imageData[j].width > 300 && imageData[j].height > 300) || j===imageData.length-1){
                            tileData.url = imageData[j].source;
                            break;
                        }
                    }
                    tileData.picture = responseData[i].picture;
                    tileData.isSelected = false;
                    tileData.urlStyle = { 'background-image' : 'url('+tileData.url+')' };
                    $scope.selectivePhotos.push(tileData);
                    $rootScope.showSpinner = false;
                    $scope.$apply();
                }
                $scope.nextPhotosPage = response.paging.next ? response.paging.cursors.after : null;
            },function(response){

            });
        };


        // first slide page ends here

        // second slide code
        $scope.gridPrototypes = [
            {
                style : {
                    "background-position-x" : "0px"
                },
                id : "proto_1",
                isSelected : true,
                tiles : [{
                    style: {
                        left : "0px",
                        top : "0px",
                        height : "100%",
                        width : "50%"
                    },
                    photoURL : ""
                },
                    {
                        style: {
                            left : "50%",
                            top : "0px",
                            height : "50%",
                            width : "50%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "50%",
                            top : "50%",
                            height : "50%",
                            width : "50%"
                        },
                        photoURL : ""
                    }]
            },
            {
                style : {
                    "background-position-x" : "-62px"
                },
                id : "proto_2",
                isSelected : false,
                tiles : [{
                    style: {
                        left : "0px",
                        top : "0px",
                        height : "50%",
                        width : "33.33%"
                    },
                    photoURL : ""
                },
                    {
                        style: {
                            left : "33.33%",
                            top : "0px",
                            height : "50%",
                            width : "66.66%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "0px",
                            top : "50%",
                            height : "50%",
                            width : "66.66%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "66.66%",
                            top : "50%",
                            height : "50%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    }]
            },
            {
                style : {
                    "background-position-x" : "-121px"
                },
                id : "proto_3",
                isSelected : false,
                tiles : [{
                    style: {
                        left : "0px",
                        top : "0px",
                        height : "33.33%",
                        width : "33.33%"
                    },
                    photoURL : ""
                },
                    {
                        style: {
                            left : "0px",
                            top : "33.33%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "33.33%",
                            top : "0px",
                            height : "66.66%",
                            width : "66.66%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "0px",
                            top : "66.66%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "33.33%",
                            top : "66.66%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "66.66%",
                            top : "66.66%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    }]
            },
            {
                style : {
                    "background-position-x" : "100%"
                },
                id : "proto_4",
                isSelected : false,
                tiles : [{
                    style: {
                        left : "0px",
                        top : "0px",
                        height : "33.33%",
                        width : "33.33%"
                    },
                    photoURL : ""
                },
                    {
                        style: {
                            left : "33.33%",
                            top : "0px",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "66.66%",
                            top : "0px",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "0px",
                            top : "33.33%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "33.33%",
                            top : "33.33%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "66.66%",
                            top : "33.33%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "0px",
                            top : "66.66%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "33.33%",
                            top : "66.66%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    },
                    {
                        style: {
                            left : "66.66%",
                            top : "66.66%",
                            height : "33.33%",
                            width : "33.33%"
                        },
                        photoURL : ""
                    }]
            }];

        $scope.colorCubes = [];
        $scope.currentBorderColor = {
                "background-color" : "#FFFFFF",
                "border-color" : "#FFFFFF"
            };
        $scope.collageURLToShare;
        var hostedImageArray=[];

        var createColorCubes = function() {
            var cubeWidthHeight = 32;
            for(var i=0;i<appConfig.colorCodes.length;i++) {
                var currentColumn = (i*cubeWidthHeight)+'px',
                    colorCubeObj = {
                    color : appConfig.colorCodes[i],
                    isSelected : (appConfig.colorCodes[i] === '#FFFFFF'),
                    style : {
                        'left' : currentColumn,
                        'background-color' : appConfig.colorCodes[i]
                    }
                };
                $scope.colorCubes.push(colorCubeObj);
            }
        }

        $scope.selectGridPrototype = function(index) {
            for(var i=0;i<$scope.gridPrototypes.length;i++){
                if(index === i) {
                    $scope.gridPrototypes[i].isSelected = true;
                } else {
                    $scope.gridPrototypes[i].isSelected = false;
                }
            }
        };

        $scope.selectColorPalate = function(index) {
          for(var i = 0; i<$scope.colorCubes.length;i++){
              if(index === i) {
                  $scope.colorCubes[i].isSelected = true;
                  $scope.currentBorderColor = {
                      "background-color" : $scope.colorCubes[i].color,
                      "border-color" : $scope.colorCubes[i].color
              }
              } else {
                  $scope.colorCubes[i].isSelected = false;
              }
          }
        };

       $scope.onPhotoDrop = function(elementIndex,backgroundProperty) {
           $scope.$apply(function () {
               for(var i=0;i<$scope.gridPrototypes.length;i++){
                   if($scope.gridPrototypes[i].isSelected) {
                       for(var j=0;j<$scope.gridPrototypes[i].tiles.length;j++) {
                           if(j===elementIndex) {
                               $scope.gridPrototypes[i].tiles[j].photoURL = backgroundProperty;
                           }
                       }
                   }
               }
           });

       }

        //Second slide code ends here

        //Third slide starts here
        var hostedImagePromises = [],
            albumId=-1;
        function getPromisesToLoadHostedImages(newImageArray) {
            hostedImagePromises = [];
            for(var i=0;i<newImageArray.length;i++) {
                var tempPromise = new Promise(function(resolve,reject){
                    var imageObj = new Image();
                    imageObj.src = newImageArray[i];
                    imageObj.onload = function(){
                        resolve(newImageArray[i]);
                    };
                });
                hostedImagePromises.push(tempPromise);
            }
            return hostedImagePromises;
        }

        function createFinalCollageToShare() {
            $rootScope.showSpinner = true;
            var deferArray = [];
            for(var i=0;i<$scope.gridPrototypes.length;i++){
                if($scope.gridPrototypes[i].isSelected) {
                    for(var j=0;j<$scope.gridPrototypes[i].tiles.length;j++) {
                        var currentImage= $scope.gridPrototypes[i].tiles[j].photoURL;
                        var splitArray = currentImage.split("?")[0].split('/');
                        var imageId = "content/images/photo_library/"+splitArray[splitArray.length-1];
                        deferArray.push(imageBank.getHostedURLForImage(currentImage,imageId));
                    }
                }
            }

            $q.all(deferArray).then(function(newImageArray){
                    for(var i=0;i<$scope.gridPrototypes.length;i++){
                        if($scope.gridPrototypes[i].isSelected) {
                            var imageElements = $(".tile-picture img");
                            for(var j=0;j<$scope.gridPrototypes[i].tiles.length;j++) {
                                $scope.gridPrototypes[i].tiles[j].photoURL = newImageArray[j];
                                $(imageElements[j]).attr('src',newImageArray[j]);
                                hostedImageArray.push(newImageArray[j]);
                            }
                        }
                    }

                $q.all(getPromisesToLoadHostedImages(newImageArray)).then(function(){
                    var collageElement = document.getElementById("collage");
                    imageBank.getCanvasForCollage(collageElement).then(function(canvas){
                        var shareContainer = document.getElementById('collage-share-container');
                        shareContainer.appendChild(canvas);
                        var blobURL = canvas.toDataURL();
                        var blobId =  "content/images/photo_library/collage_image_" + new Date().getTime()+".jpeg";
                        imageBank.storeBlobToDisk(blobURL,blobId).then(function(actualURL){
                            $scope.collageURLToShare = actualURL;
                            $rootScope.$apply(function(){
                                $scope.currentSlideView = 3;
                                $rootScope.showSpinner = false;
                            });

                        }, function (err) {

                        });
                    }, function(err){

                    });
                },function(err){

                });
            },function(err){

            });


        }

        $scope.postCollageOnFacebook = function() {
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
                  facebookGraph.uploadPhotoToAlbum(albumId, $scope.collageURLToShare, null).then(function (data) {
                      $rootScope.showSpinner = false;
                  }, function (err) {
                      popUpFactory.showPopup(appConfig.errorMessage["1003"].message);
                  });
              } else {
                  facebookGraph.createNewAlbum(appConfig.facebookAlbumName).then(function(data){
                      albumId = data.id;
                      facebookGraph.uploadPhotoToAlbum(albumId, $scope.collageURLToShare, null).then(function (data) {
                          $rootScope.showSpinner = false;
                      }, function (err) {
                          popUpFactory.showPopup(appConfig.errorMessage["1003"].message);
                      });
                  },function(err){

                  });
              }

          },function(err){

          });
        };

        //Third slide ends here


        var init = function() {
            fetchUserInfo();
            $scope.appendSelectivePhotos();
            createColorCubes();
        }

        init();
    }
})();