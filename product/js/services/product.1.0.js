'use strict';
app
    .factory('NextShopperProductservice', function($http, $localStorage) {
        var nextShopperSellerAPI = {};
        var apiURL = getApiBase() + '/ws/';
        var headers = {
            "Content-Type": "application/json;charset=utf-8"
        };
        nextShopperSellerAPI.getSingleProduct = function(id) {
            return $http({
                method: 'GET',
                url: apiURL + 'product/' + id
            });
        };
        return nextShopperSellerAPI;
    });
