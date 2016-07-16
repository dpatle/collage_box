/**
 * Created by durgesh.patle on 30-Jan-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .factory('popUpFactory',popUpFactoryFunction);

    popUpFactoryFunction.$inject = ['$rootScope'];

    function popUpFactoryFunction($rootScope){
        $rootScope.popup = {
            showDialogue : false,
            heading : "Alert",
            message : "Alert box",
            closeWith1 : function (){
                $rootScope.popup.callback1();
                $rootScope.popup.showDialogue = false;
            },
            closeWith2 : function (){
                $rootScope.popup.callback2();
                $rootScope.popup.showDialogue = false;
            },
            callback1 : function() {},
            callback2 : function() {},
            buttonText1 : "OK",
            buttonText2 : "Cancel",
            showButton1 : true,
            showButton2 : true
        };
        var popupBlock = {
            showPopUp : function(dialogueData){
                if(dialogueData.callback1) {
                    $rootScope.popup.callback1 = dialogueData.callback1;
                }
                if(dialogueData.callback2) {
                    $rootScope.popup.callback2 = dialogueData.callback2;
                }
                if(dialogueData.heading) {
                    $rootScope.popup.heading = dialogueData.heading;
                }
                if(dialogueData.message) {
                    $rootScope.popup.message = dialogueData.message;
                }

                if(typeof dialogueData.showButton1 === "boolean") {
                    $rootScope.popup.showButton1 = dialogueData.showButton1;
                }
                if(typeof dialogueData.showButton2 === "boolean") {
                    $rootScope.popup.showButton2 = dialogueData.showButton2;
                }

                if(dialogueData.buttonText1) {
                    $rootScope.popup.buttonText1 = dialogueData.buttonText1;
                }
                if(dialogueData.buttonText2) {
                    $rootScope.popup.buttonText2 = dialogueData.buttonText2;
                }
                $rootScope.showSpinner = false;
                $rootScope.popup.showDialogue = true;
                $rootScope.$apply();

            },
            hidePopUp : function() {
                $rootScope.popup.showDialogue = false;
                $rootScope.popup.callback1 = function () {};
                $rootScope.popup.callback2 = function () {};
                $rootScope.popup.heading = "Alert";
                $rootScope.popup.message = "Alert Box";
                $rootScope.popup.buttonText1 = "OK";
                $rootScope.popup.buttonText2 = "Cancel";
                $rootScope.popup.showButton1 = true;
                $rootScope.popup.showButton2 = true;
                $rootScope.$apply();
            }
        };
        return popupBlock;
    }
})();