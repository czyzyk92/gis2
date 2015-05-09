'use strict';

angular.module('gisApp')
        .config(function ($stateProvider) {
            $stateProvider
                    .state('Admin', {
                        url: '/admin',
                        templateUrl: "scripts/admin/admin.html",
                        controller: 'adminController'
                    })
                    .state('Edit', {
                        url: '/admin/edit/:id/',
                        templateUrl: "scripts/admin/edit.html",
                        controller: 'editController'
                    });
        });