'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window',
        function($scope, $translate, $localStorage, $window) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            $scope.link = "tpl/docs/";
            $scope.loadContents = "";
            $scope.fileName = "";
            $scope.defaultLink = "tpl/docs/en/index.html";
            // angular translate
            $scope.langs = {
                en: 'English',
                cn_CN: '中文'
            };
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
            if(angular.isDefined($translate.proposedLanguage())){
                $scope.defaultLink = "tpl/docs/" + $translate.proposedLanguage() + '/index.html'
                $scope.loadContents = $scope.defaultLink;
            }else{
                $scope.loadContents = $scope.defaultLink;
            }
            $scope.setLang = function(langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.loadContents = "tpl/docs/" + langKey + '/index.html'
            };
            $scope.callMe = function(){
                console.log('testForm');
            }
            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }
        }
    ]);
