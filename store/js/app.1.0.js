'use strict';
angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.bootstrap',
        'pascalprecht.translate'
    ])
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    });
