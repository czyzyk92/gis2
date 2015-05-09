'use strict';

angular.module('gisApp')
    .factory('SzkolyService', function ($resource) {
        return $resource('/geom/:id', {}, {
            'getAll': { method: 'GET', isArray: true},
            'getOne': { metgod: 'GET'},
            'save': {method: 'PUT'}
        });
    });