var weatherApp = angular.module('weatherApp', ['ngRoute']);
var current = {};
var currentCity = current.cityName;
var first = true;

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
    $scope.cityWeather = cityWeather;
    $scope.curBackground = '#2980b9';
    $scope.curColor = '#fff';
    $scope.fBackground = '#fff';
    $scope.fColor = '#2c3e50';

    angular.element(document).ready(function () {
        var city = document.getElementById('searchCity').value;
        if (city) {
            currentCity = city;
        } else {
            currentCity = 'New York, NY';
        }

        $scope.cityWeather(currentCity, '', $scope.type);
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
        $scope.cityWeather(currentCity, '', $scope.type);
    }
    $('#current').click(function () {
        $scope.curBackground = '#2980b9';
        $scope.curColor = '#fff';
        $scope.fBackground = '#fff';
        $scope.fColor = '#2c3e50';
    });

    $('#forecast').click(function () {
        $scope.fBackground = '#2980b9';
        $scope.fColor = '#fff';
        $scope.curBackground = '#fff';
        $scope.curColor = '#2c3e50';
    });
});