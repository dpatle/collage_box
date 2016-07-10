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
            var isLoggedInPromise = facebookAuth.isLoggedIn();
            isLoggedInPromise.then(function(){
                $rootScope.showSpinner = false;
                landingScope.changeView("Home");
                $scope.$apply();
            },function(){
                facebookAuth.doLogin().then(function(response){
                    $rootScope.showSpinner = false;
                    if(response.status === "connected"){
                        landingScope.changeView("Home");
                    }
                    else{
                        popUpFactory.showPopUp(appConfig.errorMessage["1001"].message);
                    }
                    $scope.$apply();
                });
            });
        };

        landingScope.changeView = function(view){
            $location.path(view);
        }
    }
})();