app.directive('states', function() {
        return {
            restrict: 'E',
            replace: true,
            template: function() {
                return '<input type="text" class="form-control" required>';
            }
        };
    })
    .directive('country', function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: function(ele, attr) {
                if (attr.type == 'list') {
                    return 'tpl/seller/directiveTpl/countryList.html';
                }
                if (attr.type == 'code') {
                    return 'tpl/seller/directiveTpl/countryCode.html';
                }

            }
        };
    });
