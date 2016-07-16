/**
 * Created by durgesh.patle on 12/7/2015.
 */
(function(){
    'use strict';
    angular.module('app')
        .directive('navigator',['facebookAuth','popUpFactory','appConfig',function(facebookAuth,popUpFactory,appConfig){
            function navigationLinker (scope, elem) {
                scope.doLogout = function(){
                    popUpFactory.showPopUp({
                        heading : appConfig.errorMessage["1004"].name,
                        message : appConfig.errorMessage["1004"].message,
                        callback1 : function() {
                            facebookAuth.doLogout().then(function(data){
                                window.location.href = "#/";
                            },function(data){
                                popUpFactory.showPopUp({
                                    heading : appConfig.errorMessage["1006"].name,
                                    message : appConfig.errorMessage["1006"].message,
                                    callback1 : function() {},
                                    callback2 : function() {},
                                    buttonText1 : "Okay",
                                    buttonText2 : "",
                                    showButton1 : true,
                                    showButton2 : false
                                });
                            });
                        },
                        callback2 : function() {},
                        buttonText1 : "Logout",
                        buttonText2 : "Stay logged in",
                        showButton1 : true,
                        showButton2 : true
                    });

                };
            }
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/layout/navigator.view.html',
                link: navigationLinker
            };
        }]);
})();