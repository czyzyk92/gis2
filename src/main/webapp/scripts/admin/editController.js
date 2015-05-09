'use strict';

angular.module('gisApp')
        .controller('editController', function ($state, $stateParams, $scope, toastr, SzkolyService) {
            $scope.tinymceOptions = {
                height: 400,
                plugins: "table, code",
                language: 'pl',
                entity_encoding: "raw"
            };
            
            $scope.szkola = {};

            $scope.getSzkola = function () {
                SzkolyService.getOne({id: $stateParams.id}, function (result) {
                    $scope.szkola = result;
                    console.log($scope.szkola);
                });
            };
            $scope.getSzkola();
            
            $scope.save = function () {
                SzkolyService.save($scope.szkola, function () {
                    toastr.success('Pomyślnie zapisano zmiany!');
                    $state.transitionTo('Admin');
                }, function () {
                    toastr.error('Wystąpił błąd przy zapisie danych');
                });
            };

        });