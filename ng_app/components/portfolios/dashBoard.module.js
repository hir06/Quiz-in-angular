(function() {
    "use strict";

    angular.module('QuizApp.dashBoard', [
            "QuizApp.dashBoard.controllers",
            "QuizApp.dashBoard.services",
        ])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/dashBoard', {
            controller: 'dashBoardController',
            controllerAs: 'dashBoardVM',
            templateUrl: 'ng_app/components/dashBoard/dashBoard.html',
            //resolve: {}
        });
    }

})();