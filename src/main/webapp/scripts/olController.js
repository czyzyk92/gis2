'use strict';

gisApp.controller('olController', ['$scope', function ($scope) {
        angular.extend($scope, {
            center: {
                lat: 54.34766,
                lon: 18.64542,
                zoom: 10
            },
            szkoly: {
                source: {
                    type: 'GeoJSON',
                    url: 'json/szkoly.json'
                }
            },
            defaults: {
                events: {
                    map: ['singleclick', 'pointermove']
                }
            },
            mouseposition: {},
            mouseclickposition: {},
            projection: 'EPSG:900913'
        });

        $scope.$on('openlayers.map.pointermove', function (event, coord) {
            $scope.$apply(function () {
                if ($scope.projection === coord.projection) {
                    $scope.mouseposition = coord;
                } else {
                    var p = ol.proj.transform([coord.lon, coord.lat], coord.projection, $scope.projection);
                    $scope.mouseposition = {
                        lat: p[1],
                        lon: p[0],
                        projection: $scope.projection
                    }
                }
            });
        });

        $scope.$on('openlayers.map.singleclick', function (event, coord) {
            $scope.$apply(function () {
                if ($scope.projection === coord.projection) {
                    $scope.mouseclickposition = coord;
                } else {
                    var p = ol.proj.transform([coord.lon, coord.lat], coord.projection, $scope.projection);
                    $scope.mouseclickposition = {
                        lat: p[1],
                        lon: p[0],
                        projection: $scope.projection
                    }
                }
            });
        });
    }]);