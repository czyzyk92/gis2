'use strict'

angular.module('gisApp')
        .controller('loginController',
                function ($scope, $state, AdminService, toastr) {
                    $scope.userData = {};
                    $scope.isCorrect = function () {
                        AdminService.isCorrect($scope.userData, function () {
                            toastr.success('Pomyślnie zalogowano!');
                            $state.transitionTo('Admin');
                        }, function () {
                            toastr.error('Wystąpił błąd przy logowaniu');
                        });
                    };
                });