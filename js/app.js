'use strict';
angular.module('app', [
    'ngCookies',
    'ngStorage',
    'pascalprecht.translate'
])
.config(['$logProvider', function($logProvider){
    $logProvider.debugEnabled(true);
}]);

