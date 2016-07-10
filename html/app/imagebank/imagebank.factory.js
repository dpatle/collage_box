/**
 * Created by durgesh.patle on 04-Jun-16.
 */
(function(){
    "use strict";
    angular.module('app')
        .factory('imageBank',imageBankFunction);

    imageBankFunction.$inject = ["$http",'appConfig'];

    function imageBankFunction($http,appConfig){
        var imageBankAPI = {};

        imageBankAPI.getHostedURLForImage = function(imageUrl,id) {
            var APIEndPoint = appConfig.hostName+"saveFacebookImage";
            var promise = new Promise(function(resolve,reject) {
                $.get(APIEndPoint,
                    {
                        image : imageUrl,
                        id : id
                    }).done(function (data) {
                        resolve(data);
                    }).fail(function (err) {
                        reject(err);
                    });
            });
            return promise;
            };

        imageBankAPI.getCanvasForCollage = function(source) {
                return new Promise(function(resolve,reject){
                    html2canvas(source, {
                        onrendered: function(canvas) {
                            resolve(canvas);
                        }
                    });
                });
            };

        imageBankAPI.storeBlobToDisk = function(blobURL,id) {
                var APIEndPoint = appConfig.hostName+"saveBlobImage";
                var promise = new Promise(function(resolve,reject) {
                    $.post(APIEndPoint,
                        {
                            blob : blobURL,
                            id : id
                        }).done(function (data) {
                            resolve(data);
                        }).fail(function (err) {
                            reject(err);
                        });
                });
                return promise;
            };

        imageBankAPI.convertImgToDataURLviaCanvas = function(url, callback, outputFormat){
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        }

        return imageBankAPI;
    }
})();