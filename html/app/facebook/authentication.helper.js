/**
 * Created by durgesh.patle on 12/20/2015.
 */
(function(){
    "use strict";
    angular
        .module('app')
        .factory('facebookAuth',facebookInitializationConstructor);

    //facebookInitializationConstructor.$inject = [];

    function facebookInitializationConstructor(){
        var authFunctions =  {
            init : function(){
                FB.init({
                    appId      : '1646774775580508',
                    cookie     : true,  // enable cookies to allow the server to access
                    // the session
                    xfbml      : true,  // parse social plugins on this page
                    version    : 'v2.5' // use version 2.5
                });
            },
            getLoginStatus : function () {
                var deferred = new Promise(function(resolve,reject){
                    FB.getLoginStatus(function(response) {
                        resolve(response);
                    });
                });
                return deferred;
            },
            isLoggedIn : function(){
                var deferred = new Promise(function(resolve,reject){
                    FB.getLoginStatus(function(response) {
                        if(response.status === "connected"){
                            resolve(response);
                        }
                        else{
                            reject(response);
                        }
                    });
                });
                return deferred;
            },
            doLogin : function(){
                var deferred = new Promise(function(resolve,reject){
                    FB.login(function(response) {
                        resolve(response);
                    },
                        {
                            scope: 'user_photos,publish_actions'
                        });
                });
                return deferred;
            },
            doLogout : function () {
                var deferred = new Promise(function(resolve,reject){
                    FB.logout(function(response) {
                        resolve(response);
                    });
                });
                return deferred;
            }
        };
        return authFunctions;
    }
})();
