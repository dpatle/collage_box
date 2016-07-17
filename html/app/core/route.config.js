/**
 * Created by durgesh.patle on 12/6/2015.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider','$locationProvider'];

    function configureRoutes($routeProvider,$locationProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
       var routes = getRoutes();
        routes.forEach(function(route) {
            $routeProvider.when(route.url, route.config);
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/landing/landing.view.html',
                    controller: 'landingCtrl'
                }
            },
            {
                url: '/Home',
                config: {
                    templateUrl: 'app/home/home.view.html',
                    controller: 'homeCtrl',
                    resolve: {
                        isLoggedIn: function (facebookAuth) {
                            return facebookAuth.isLoggedIn();
                        }
                    }
                }
            },
            {
                url: '/New',
                config: {
                    templateUrl: 'app/new/new.view.html',
                    controller: 'newCtrl',
                    resolve: {
                        isLoggedIn: function (facebookAuth) {
                            return facebookAuth.isLoggedIn();
                        }
                    }
                }
            },
            {
                url: '/History',
                config: {
                    templateUrl: 'app/history/history.view.html',
                    controller: 'historyCtrl',
                    resolve: {
                        isLoggedIn: function (facebookAuth) {
                            return facebookAuth.isLoggedIn();
                        }
                    }
                }
            },
            {
                url: '/About',
                config: {
                    templateUrl: 'app/about/about.view.html',
                    controller: 'aboutCtrl',
                    resolve: {
                        isLoggedIn: function (facebookAuth) {
                            return facebookAuth.isLoggedIn();
                        }
                    }
                }
            },
            {
                url: '/Privacy',
                config: {
                    templateUrl: 'app/privacy/privacy.view.html',
                    controller: 'privacyCtrl'
                }
            }
        ];
    }
})();