'use strict';

angular.module('gisApp')
        .config(function ($stateProvider) {
            $stateProvider
            .state('Login', {
                url: '/login',
                templateUrl: "scripts/admin/login.html",
                controller: 'adminController'
            })
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