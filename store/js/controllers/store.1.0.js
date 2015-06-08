app.controller('StoreViewController', ['$scope', 'NextShopperProductservice', function($scope, NextShopperProductservice) {
        $scope.product = false;
        $scope.store = [];
        $scope.products = [];
        $scope.store.id = getParameterByName('storeId');
        $scope.productsParameters = [];
        $scope.productsParameters.search = "";
        $scope.productsParameters.size = 20;
        $scope.productsParameters.offset = 0;
        if (getParameterByName('storeId') == "") {
            window.location = '404.html';
        } else {
            NextShopperProductservice.getStore(getParameterByName('storeId'))
                .success(function(response) {
                    $scope.store = response;
                    $scope.store.id = getParameterByName('storeId');
                    NextShopperProductservice.getStoreProducts($scope.store.id, $scope.productsParameters.search, $scope.productsParameters.size, $scope.productsParameters.offset)
                        .success(function(response) {
                            $scope.products = response.items;
                        })
                })
                .error(function(response) {
                    console.log(response);
                    // console.log('Error');
                    //window.location = '404.html';
                });
        }


        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }])
    .filter('cut', function() {
        return function(value, max, tail) {
            if (!value) return '';
            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;
            value = value.substr(0, max);
            return value + (tail || '…');
        };
    })
    .filter('viewCurrency', ['$filter', function($filter) {
        return function(amount, currencySymbol) {
            var currency = $filter('currency');
            if (angular.isUndefined(amount) || amount == null) {
                return 0;
            }
            if (amount < 0) {
                return (currency(amount.toFixed(2), currencySymbol).replace("(", "-").replace(")", ""));
            }
            if (!angular.isNumber(amount)) {
                amount = parseFloat(amount);
            }

            return currency(amount.toFixed(2), currencySymbol);
        };
    }])
    .filter('productOptions', function($sce) {
        return function(value) {
            var data = [];
            var string = [];
            var option = '<b>';
            if (!value) return '';
            data = value.split(';');
            for (var i = 0; i <= data.length - 1; i++) {
                string.push(data[i].split(":"));
            }
            for (var i = 0; i <= string.length - 1; i++) {
                for (var j = 0; j <= 1; j++) {
                    if (j == 0) {
                        option = option + string[i][j] + ': </b>';
                    } else {
                        option = option + string[i][j];
                    }
                }
                if (i != string.length - 1) {
                    option = option + "</br><b>";
                }
            }
            return $sce.trustAsHtml(option);
        };
    })
    .filter('viewImage', function() {
        return function(value, size) {
            if (!value) return '';
            if (value.indexOf('https://') > -1 || value.indexOf('http://') > -1) {
                return value;
            }
            var resourcePath = "http://api.onsalelocal.com/ws/resource/download?path=";
            var width = size || 100;
            if (!value) return '';
            if (size == 0) {
                resourcePath = resourcePath + value;
            } else {
                resourcePath = resourcePath + value + "&width=" + width;
            }
            return resourcePath;
        };
    })
    .directive('labelColor', function() {
        return function(scope, $el, attrs) {
            $el.css({
                'color': attrs.color
            });
        }
    })
    .filter('propsFilter', function() {
        return function(items, props) {
            var out = [];
            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;
                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }
                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }
            return out;
        };
    });
