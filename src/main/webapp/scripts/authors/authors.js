'use strict';

angular.module('gisApp')
        .config(function ($stateProvider) {
            $stateProvider
                    .state('Autorzy', {
                        url: '/authors',
                        templateUrl: "scripts/authors/authors.html"
                    });
        });