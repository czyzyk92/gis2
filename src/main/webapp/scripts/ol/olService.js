'use strict';

angular.module('gisApp')
    .factory('SzkolyService', function ($resource) {
        return $resource('/geom', {}, {
            'getAll': { method: 'GET', isArray: true},
            'save': {method: 'PUT'}
        });
    });