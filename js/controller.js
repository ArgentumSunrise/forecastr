var weatherApp = angular.module('weatherApp', ['ngRoute']);

weatherApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'weatherCtrl',
        templateUrl: '/partials/search.html',
    }).
    when('/forecast', {
        controller: 'weatherCtrl',
        templateUrl: '/partials/forecast.html',
    }).
    otherwise({
        redirectTo: '/',
    });

}]);

weatherApp.controller('weatherCtrl', function ($scope) {
    $scope.type = 'f';
    $scope.switchTo = 'Metric'
    $scope.current = {};
    $scope.cityWeather = cityWeather;

    angular.element(document).ready(function () {
        $scope.cityWeather('New York, NY', '', $scope.type);
    });

    $scope.changeType = function () {
        if ($scope.type == 'f') {
            $scope.type = 'c';
            $scope.switchTo = 'Imperial';
        } else {
            $scope.type = 'f'
            $scope.switchTo = 'Metric';
        }
        console.log($scope.type);
        $scope.cityWeather($scope.current.cityName, '', $scope.type);
    }
});