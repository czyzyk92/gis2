'use strict';

angular.module('gisApp')
        .controller('olController', function ($scope, SzkolyService) {
    
            $scope.getSzkoly = function () {
                SzkolyService.getAll(function (result) {
                    $scope.szkoly = result;
                    console.log($scope.szkoly);
                });
            };
            $scope.getSzkoly();


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
        });