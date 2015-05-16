'use strict';

angular.module('gisApp')
    .factory('AdminService', function ($resource) {
        return $resource('/admin', {}, {
            'isCorrect': { method: 'POST'}
        });
    });