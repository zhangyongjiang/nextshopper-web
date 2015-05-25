'use strict';
angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.load',
        'ui.jq',
        'oc.lazyLoad',
        'pascalprecht.translate'
    ])
    .config(function($httpProvider) {
        // $httpProvider.interceptors.push(nextShopperHttpResponseInterceptor);
        $httpProvider.defaults.withCredentials = true;
    });
