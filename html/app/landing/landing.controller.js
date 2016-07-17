/**
 * Created by durgesh.patle on 12/6/2015.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('landingCtrl',landingCtrlConstructor);

    landingCtrlConstructor.$inject = ['facebookAuth','$location','popUpFactory','appConfig','$rootScope','$scope'];

    function landingCtrlConstructor(facebookAuth,$location,popUpFactory,appConfig,$rootScope,$scope){
        var landingScope = this;
        $rootScope.showSpinner = false;
        landingScope.doLogin = function(){
            $rootScope.showSpinner = true;
            facebookAuth.doLogin().then(function(response){
                $rootScope.showSpinner = false;
                if(response.status === "connected"){
                    landingScope.changeView("Home");
                }
                else{
                    popUpFactory.showPopUp({
                        heading : appConfig.errorMessage["1001"].name,
                        message : appConfig.errorMessage["1001"].message,
                        callback1 : function() {},
                        callback2 : function() {},
                        buttonText1 : "Okay",
                        buttonText2 : "",
                        showButton1 : true,
                        showButton2 : false
                    });
                    $rootScope.$apply();
                }
                $scope.$apply();
            });
        };

        landingScope.changeView = function(view){
            $location.path(view);
        }
    }
})();