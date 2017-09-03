(function() {
    'use strict';

    angular
        .module('app')
        .factory('geoService', geoService);

    geoService.$inject = ['$q'];

    /* @ngInject */
    function geoService($q) {
        var geoMap = {
            'departments': {},
            'provinces': {},
            'districts': {}
        };
        var service = {
            uploadData: uploadData,
            loadMock: loadMock,
            resetGeoMap: resetGeoMap
        };
        return service;

        ////////////////
        function GeoDetail(code, name, parent){
            var self = this;
            self.code = code;
            self.name = name;
            self.parentCode = parent ? parent.code : null;
            self.parentName = parent ? parent.name : null;
        }

        function loadMock(){
            fillGeoMap(getMock());
            return $q.when(geoMap);
        }

        function uploadData(fileObj) {
            var deferred = $q.defer();
            var fileReader = new FileReader(fileObj);
            fileReader.readAsText(fileObj);
            fileReader.onloadend = function(){
                if(typeof fileReader.result !== 'string' || !fileReader.result.length){
                    return deferred.reject();
                }
                var data = fileReader.result.split('\n');
                fillGeoMap(data);
                deferred.resolve(geoMap);
            };            
            return deferred.promise;
        }

        function fillGeoMap (data) {
            resetGeoMap();
            data.forEach(function(row){
                var parts = row.split('/');

                var department = splitGeoPart(parts[0]);
                addGeoDetail(department, 'departments', null);

                var province = splitGeoPart(parts[1]);
                addGeoDetail(province, 'provinces', department);

                var district = splitGeoPart(parts[2]);
                addGeoDetail(district, 'districts', province);
            });
        }

        function splitGeoPart (part) {
            part = part.trim();
            if(!part){
                return null;
            }
            var codeIndex = part.indexOf(' ');
            return {
                'code': part.substring(0, codeIndex),
                'name': part.substring(codeIndex+1, part.length)
            };
        }

        function addGeoDetail(geoPart, key, parent){
            if(!geoPart || geoMap[key][geoPart.code]){
              return;   
            }
            geoMap[key][geoPart.code] = new GeoDetail(geoPart.code, geoPart.name, parent);
        }

        function getMock () {
            return [
                "01 Lima /  / ",
                "01 Lima / 50 Lima / ",
                "01 Lima / 51 Barranca / ",
                "01 Lima / 50 Lima / 202 La Molina",
                "01 Lima / 50 Lima / 203 San Isidro",
                "02 Arequipa /  / ",
                "02 Arequipa / 63 Arequipa / ",
                "02 Arequipa / 64 Caylloma / ",
                "02 Arequipa / 63 Arequipa / 267 Cercado"
            ];
        }

        function resetGeoMap(){
            geoMap.departments = {};
            geoMap.provinces = {};
            geoMap.districts = {};
        }
    }
})();