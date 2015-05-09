'use strict';

angular.module('gisApp')
        .controller('adminController', function ($scope, toastr, SzkolyService) {
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
 

            $scope.edit = function (szkola) {
                $scope.selectedSzkola = szkola;
                $('#editModal').modal('show');
                console.log($scope.selectedSzkola);
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