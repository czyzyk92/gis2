'use strict';

angular.module('gisApp')
        .config(function ($stateProvider) {
            $stateProvider
                    .state('Strona Główna', {
                        url: '/',
                        templateUrl: "scripts/ol/ol.html",
                        controller: 'olController'
                    });
        });