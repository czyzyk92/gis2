'use strict';

angular.module('gisApp')
        .controller('olController', function ($scope, toastr, SzkolyService) {
            $scope.tinymceOptions = {
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste"
                ],
                language: 'pl'
            };
            $scope.selectedSzkola;
            $scope.getSzkoly = function () {
                SzkolyService.getAll(function (result) {
                    $scope.szkoly = result;
                    console.log($scope.szkoly);
                });
            };
            $scope.getSzkoly();
            // Tablica z referencjami z której korzysta Smart Table
            $scope.displayedSzkoly = [].concat($scope.szkoly);

            angular.extend($scope, {
                center: {
                    lat: 54.34766,
                    lon: 18.64542,
                    zoom: 10
                },
                szkoly: {},
                defaults: {
                    events: {
                        map: ['singleclick', 'pointermove']
                    }
                },
                projection: 'EPSG:900913'
            });

            $scope.edit = function (szkola) {
                $scope.selectedSzkola = szkola;
                $('#editModal').modal('show');
                console.log($scope.selectedSzkola);
            };
            $scope.save = function () {
                SzkolyService.save($scope.selectedSzkola, function () {
                    toastr.success('Pomyślnie zapisano zmiany!');
                    $('#editModal').modal('hide');
                }, function () {
                    toastr.error('Wystąpił błąd przy zapisie danych');
                });
            };
            
            $scope.delete = function (szkola) {
                $('#confirmDeleteModal').modal('show');
                $scope.removeSzkola = szkola;
            };
            
            $scope.confirmDelete = function () {
                SzkolyService.delete({id: $scope.removeSzkola.id});
                $('#confirmDeleteModal').modal('hide');
            };
        });