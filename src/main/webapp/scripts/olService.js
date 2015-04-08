'use strict';

angular.module('gisApp')
    .factory('SzkolyService', function ($resource) {
        return $resource('json/szkoly.json', {}, {
            'getAll': { method: 'GET', isArray: true}
        });
    });