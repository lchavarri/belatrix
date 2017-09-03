(function() {
    'use strict';
    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['geoService'];
    /* @ngInject */
    function AppCtrl(geoService) {
        var vm = this;
        vm.geoMap = {};
        vm.loadGeo = loadGeo;
        vm.loadMock = loadMock;
        vm.loadedFile = false;
        ////////////////

        function loadGeo (fileObj) {
            geoService.uploadData(fileObj)
            .then(function(geoMap){
               vm.geoMap = geoMap;
               vm.loadedFile = true;
            });
        }

        function loadMock() {
            geoService.loadMock()
            .then(function(geoMap){
                vm.geoMap = geoMap;
                vm.loadedFile = true;
            });
        }
    }
})();