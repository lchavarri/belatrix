(function() {
    'use strict';

    angular
        .module('app')
        .directive('geoDetail', geoDetail);

    geoDetail.$inject = [];

    /* @ngInject */
    function geoDetail() {
        var directive = {
            templateUrl: 'geo-detail.tpl.html',
            bindToController: true,
            controller: GeoDetailController,
            controllerAs: '$ctrl',
            restrict: 'E',
            scope: {
              rows: '=',
              title: '@'
            }
        };
        return directive;
    }

    /* @ngInject */
    function GeoDetailController() {

    }
})();