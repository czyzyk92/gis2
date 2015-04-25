'use strict';

angular.module('gisApp')
        .controller('olController', function ($scope, toastr, SzkolyService) {
            $scope.selectedSzkola = {};
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
                    zoom: 10,
                    centerUrlHash: true
                },
                szkoly: {},
                defaults: {
                    events: {
                        map: ['singleclick', 'pointermove']
                    }
                },
                projection: 'EPSG:900913'
            });

            $scope.$on('openlayers.layers.geojson.singleclick', function (event, feature) {
                $scope.$apply(function (scope) {
                    if (feature) {
                        $scope.mouseClickCountry = feature ? $scope.countries[feature.getId()].name : '';
                    }
                });
            });

            $scope.selectSzkola = function (szkola) {
                $scope.selectedSzkola = szkola;
                console.log("Zaznaczona szkola:", $scope.selectedSzkola);
            }
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
                SzkolyService.delete({id: $scope.removeSzkola.id}, function () {
                    toastr.success('Pomyślnie usunięto szkołę!');
                    $('#confirmDeleteModal').modal('hide');
                    $scope.getSzkoly();
                }, function () {
                    toastr.error('Wystąpił błąd podczas usuwania szkoły');
                });

            };
        });