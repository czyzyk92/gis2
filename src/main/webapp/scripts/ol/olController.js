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
                controls: [
//                    {name: 'LayerSwitcher', active: true},
                    {name: 'zoom', active: true},
                    {name: 'scaleline', active: true},
                ],
                defaults: {
                    events: {
                        map: ['singleclick', 'pointermove']
                    },
                    interactions: {
                        mouseWheelZoom: true
                    }
                },
                layers: [
                    {
                        name: 'Zabudowa',
                        active: true,
                        source: {
                            type: 'OSM'
                        }
                    },
                    {
                        name: 'Drogi',
                        active: false,
                        source: {
                            type: 'OSM',
                            url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                            attribution: 'All maps &copy; <a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
                        }
                    },
                    {
                        name: 'Teren',
                        active: false,
                        source: {
                            type: 'TileJSON',
                            url: 'https://api.tiles.mapbox.com/v3/examples.map-i86nkdio.jsonp'
                        }
                    }
                ],
                changeLayer: function(layer) {
                    $scope.layers.map(function(l) {
                        l.active = (l === layer);
                    });
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
            };
            $scope.setCenter = function (szkola) {
                $scope.center.lat = szkola.lat;
                $scope.center.lon = szkola.lon;
            };

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

            //Funkcja odpowiadająca za zmiany markerów na mapie zgodnie z wynikami wyszukiwania
            $scope.$watch('displayedSzkoly', function () {
                $scope.olSzkoly = angular.copy($scope.displayedSzkoly);
            });
            $scope.getSzkolyFromCity = function(city){
                  if(city == 'Wszystkie'){
                      $scope.displayedSzkoly = angular.copy($scope.szkoly);
                      return;
                  }
                $scope.displayedSzkoly= [];
                $scope.szkoly.forEach(function(szkola){
                if(city == szkola.miejscowosc){
                    $scope.displayedSzkoly.push(szkola);
                  
                  }
                
              });
            };
            
            $scope.selectSchool = function (szkola) {
                if (szkola.selected == true)
                    console.log("Zaznaczono szkołę:", szkola);
                else 
                    console.log("Odznaczono szkołę:", szkola);
            }
        });