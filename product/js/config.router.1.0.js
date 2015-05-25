'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', '$localStorage', '$urlRouter',
            function($rootScope, $state, $stateParams, $localStorage, $urlRouter) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $urlRouterProvider
                    .otherwise('error/404');
                $stateProvider
                    .state('product', {
                        abstract: true,
                        url: '/product',
                        templateUrl: 'tpl/app.html',
                        breadcrumb: {
                            displayName: 'Product',
                            proxy: 'product.view'
                        }
                    })
                    .state('product.view', {
                        url: '/:id/:slug',
                        templateUrl: 'tpl/product/viewProduct.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster', 'angularFileUpload']);
                                }
                            ]
                        },
                        breadcrumb: {
                            displayName: 'View Product'
                        }
                    })
                    .state('error', {
                        url: '/error',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>',
                        breadcrumb: {
                            displayName: false
                        }
                    })
                    .state('error.404', {
                        url: '/404',
                        templateUrl: 'tpl/product/page_404.html',
                        breadcrumb: {
                            displayName: false
                        }
                    })
            }
        ]
    );
