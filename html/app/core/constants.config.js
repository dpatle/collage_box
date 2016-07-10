/**
 * Created by durgesh.patle on 12/6/2015.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .constant("appConfig", {
            errorMessage : {
                1001 : {
                    name : "facebook_login_error",
                    message : "We are facing problems to get you in using Facebook, Please try again ..!"
                },
                1002 : {
                    name : "photo_selection_error",
                    message : "Please select at least 5 photos, and try again ..!"
                },
                1003 : {
                    name : "facebook_upload_error",
                    message : "We are facing problems to upload your collage to Facebook, Please try again ..!"
                }
            },
            colorCodes : ["#EDFED2","#CFF09E","#A8DBA8","#000000","#44749D","#C6D4E1","#E5E5E5","#FFFFFF"],
            hostName : "http://" + window.location.host + "/",
            apiEndPoint : "http://" + window.location.host + ":8080/",
            facebookAlbumName : "Test Album",
            windowWidth : $(window).width(),
            windowHeight : $(window).height()
        })
})();
