/**
 * Created by durgesh.patle on 12/6/2015.
 */
(function(){
    'use strict';
    angular.module('app')
        .controller('applicationCtrl',['$rootScope',function($rootScope){
            var applicationCtrlScope = this;
            $rootScope.showSpinner = false;
        }]);
})();