'use strict';

/* App Module */

angular.module('gisApp', [
    'openlayers-directive', 'ngResource', 'ui.router', 'smart-table', 'ui.tinymce', 'ngAnimate', 'toastr'

])
    .run(
      ['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        }
      ]
    )
    .config(function ($urlRouterProvider) {

        //Dla każdego nierozpoznanego URL przekierowanie:
        $urlRouterProvider.otherwise("/");
        //Później ustawić na 404.
    });