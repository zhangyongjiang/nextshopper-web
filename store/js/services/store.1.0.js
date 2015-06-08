'use strict';
app
    .factory('NextShopperProductservice', function($http, $localStorage) {
        var nextShopperSellerAPI = {};
        var apiURL = getApiBase() + '/ws/';
        var headers = {
            "Content-Type": "application/json;charset=utf-8"
        };
        nextShopperSellerAPI.getStore = function(storeId) {
            return $http({
                method: 'GET',
                url: apiURL + 'store/store-basic-info?storeId=' + storeId
            });
        };
        nextShopperSellerAPI.getStoreProducts = function(storeId, search, size, offset) {
            search = search || "";
            offset = offset || 0;
            size = size || 20;
            return $http({
                method: 'GET',
                url: apiURL + 'product/search?storeId=' + storeId + '&keywords=' + search + '&offset=' + offset + '&size=' + size
            });
        };
        return nextShopperSellerAPI;
    });
