/**
 * Created by durgesh.patle on 30-Jan-16.
 */
(function(){
    'use strict';
    angular.module('app')
        .factory('popUpFactory',popUpFactoryFunction);

    function popUpFactoryFunction(){
        var popupBlock = {
            showPopUp : function(message){
                alert(message);
            }
        };
        return popupBlock;
    }
})();