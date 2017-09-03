(function() {
    'use strict';

    angular
        .module('app')
        .directive('filePicker', filePicker);

    filePicker.$inject = [];

    /* @ngInject */
    function filePicker() {
        var directive = {
            templateUrl: 'file-picker.tpl.html',
            restrict: 'E',
            scope: {
                'onFileUpload': '='
            },
            link: function(scope, elm){
                var input = elm.find('input');
                if(input && input[0]){                    
                    scope.openFileBrowser = function(){
                        input[0].click();
                    };
                    scope.handleFiles = function(ev){
                        scope.onFileUpload(this.files[0]);
                    };
                    input[0].addEventListener("change", scope.handleFiles, false);
                }
            }
        };
        return directive;
    }
})();