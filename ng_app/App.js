(function() {
    'use strict';
    var QuizApp = angular.module("QuizApp", [
        'ngRoute',
        'QuizApp.dashBoard'
    ])


    QuizApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
        function($routeProvider, $compileProvider, $locationProvider) {
            $routeProvider
                .otherwise({
                    redirectTo: '/dashBoard'
                });
        }
    ]);

    QuizApp.run(function($rootScope, $window) {
        console.log("App started successfully!");
    });

})();