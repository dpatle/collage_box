/**
 * Created by durgesh.patle on 26-Mar-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .factory('facebookGraph',facebookGraphFunction);

    facebookGraphFunction.$inject = [];

    function facebookGraphFunction(){
         var sendGenericGraphGetRequest = function(requestURL) {
            var requestPromise = new Promise(function(resolve,reject){
                FB.api(
                    requestURL,
                    function (response) {
                        if (response && !response.error) {
                            resolve(response);
                        }
                        else {
                            reject(response);
                        }
                    }
                );
            });
            return requestPromise;
        };

        var sendGenericGraphPostRequest = function(requestURL,paramObj) {
            var requestPromise = new Promise(function(resolve,reject){
                FB.api(
                    requestURL,
                    'post',
                    paramObj,
                    function(response) {
                    if (!response || response.error) {
                        reject(response);
                    } else {
                        resolve(response);
                    }
                });
            });
            return requestPromise;
        };

        var graphAPIs = {
            getUserInfo : function() {
                var userRequestURL = 'me?fields=name,picture';
                return sendGenericGraphGetRequest(userRequestURL);
            },
            getTileProfilePicture : function() {
                var userPictureRequestURL = 'me?fields=picture.width(320)';
                return sendGenericGraphGetRequest(userPictureRequestURL);
            },
            getUserPhotos : function(after) {
                var userPhotosRequestURL = after ? 'me/photos?fields=images,picture&after='+after+'&limit=25' : 'me/photos?fields=images,picture';
                return sendGenericGraphGetRequest(userPhotosRequestURL);
            },
            getAlbumNames : function () {
                var getAlbumURL = 'me/albums';
                return sendGenericGraphGetRequest(getAlbumURL);
            },
            createNewAlbum : function (albumName) {
                var createAlbumURL = 'me/albums',
                    params = {
                        name : albumName
                    };
                return sendGenericGraphPostRequest(createAlbumURL,params);
            },
            uploadPhotoToAlbum : function(albumId, photoUrl, photoBlobUrl) {
                var uploadPhotoUrl = albumId+'/photos',
                    params = {};
                if(photoUrl) {
                    params.url = photoUrl;
                } else {
                    params.source = photoBlobUrl;
                }
                return sendGenericGraphPostRequest(uploadPhotoUrl,params);
            },
            getAlbumPhotos : function(albumId) {
                var getAlbumPhotoURL = albumId + '?fields=photos.limit(100){images}';
                return sendGenericGraphGetRequest(getAlbumPhotoURL);
            }
        };
        return graphAPIs;
    }
})();