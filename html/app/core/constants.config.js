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
                    name : "Facebook communication error",
                    message : "We are facing problems to get you in using Facebook, Please try again ..!"
                },
                1002 : {
                    name : "Photo selection error",
                    message : "Please select at least 5 photos, and try again ..!"
                },
                1003 : {
                    name : "Facebook communication error",
                    message : "We are facing problems to upload your collage to Facebook, Please try again ..!"
                },
                1004 : {
                    name : "Logout ?",
                    message : "Logging out will also log you out from Facebook !"
                },
                1005 : {
                    name : "Facebook communication error",
                    message : "We are facing dificulties in fetching your information from Facebook!"
                },
                1006 : {
                    name : "Facebook communication error",
                    message : "We are facing dificulties in taking you out from Facebook, Please try again!"
                },
                1007 : {
                    name : "Facebook communication error",
                    message : "We are facing dificulties in fetching photos from Facebook!"
                },
                1008 : {
                    name : "Error reaching server",
                    message : "We are facing dificulties to communicate with server!"
                },
                1009 : {
                    name : "No data found",
                    message : "We could not found your recent creations!"
                },
                1010 : {
                    name : "Creating your collage",
                    message : "This process will take few seconds, Please be patience!"
                },
                1011 : {
                    name : "Done!",
                    message : "Your collage has been posted to Facebook!"
                },
                1012 : {
                    name : "Posting on Facebook",
                    message : "This collage will be posted on Facebook on behalf of you!"
                },
                1013 : {
                    name : "Approve missing permission",
                    message : "In order to perform this action, you need to approve missing permission(s)"
                },
                1014 : {
                    name : "No photos found",
                    message : "You don't found any photos associated with you on Facebook !"
                }
            },
            colorCodes : ["#ee0b41","#CFF09E","#A8DBA8","#000000","#44749D","#C6D4E1","#ff9c00","#FFFFFF"],
            hostName : "http://" + window.location.host + "/",
            apiEndPoint : "http://" + window.location.host + ":8080/",
            facebookAlbumName : "Classic Collage",
            windowWidth : $(window).width(),
            windowHeight : $(window).height(),
            testImage : 'content/images/upload-test-image.jpg',
            testImageSize : 110
        })
})();
