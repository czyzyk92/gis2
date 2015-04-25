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
                    // Konwersja do formatu odpowiedniego dla openlayers-directive
                    angular.forEach($scope.szkoly, function (item) {
                        item.label = {};
                        item.label.message = item.description;
                        item.label.show = false;
                        item.label.showOnMouseOver = true;
                        item.description = {};
                    });

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
            $scope.save = function (szkola) {
                SzkolyService.save(szkola, function () {
                    toastr.success('Pomyślnie zapisano zmiany!');
                    $('#editModal').modal('hide');
                }, function () {
                    toastr.error('Wystąpił błąd przy zapisie danych');
                });
            };

        });