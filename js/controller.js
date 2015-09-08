var weatherApp = angular.module('weatherApp', ['ngRoute']);
var currentCity = "";
var x = 0;

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
    $scope.cityForecast = cityForecast;

    if (currentCity == false || currentCity == undefined) {
        currentCity = "New York";
        if (x == 0) {
            $scope.cityWeather(currentCity, '', $scope.type);
        } else {
            $scope.cityForecast(currentCity, '', $scope.type);
        }

    }

    document.getElementById("searchCity").value = currentCity;

    $scope.citySearch = function () {
        currentCity = document.getElementById("searchCity").value;
        if (x == 0) {
            $scope.cityWeather(currentCity, '', $scope.type);
        } else {
            $scope.cityForecast(currentCity, '', $scope.type);
        }
        console.log(currentCity);
    }

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
        $(this).css({
            'background-color': '#2980b9',
            'color': '#fff'
        });
        $('#forecasted').css({
            'background-color': '#fff',
            'color': '#2c3e50'
        });
        x = 0;
        $scope.citySearch();
    });

    $('#forecasted').click(function () {
        $(this).css({
            'background-color': '#2980b9',
            'color': '#fff'
        });
        $('#current').css({
            'background-color': '#fff',
            'color': '#2c3e50'
        });
        x = 1;
        $scope.citySearch();
    });

    if (x == 0) {
        $('#current').css({
            'background-color': '#2980b9',
            'color': '#fff'
        });
        $('#forecasted').css({
            'background-color': '#fff',
            'color': '#2c3e50'
        });
    } else {
        $('#forecasted').css({
            'background-color': '#2980b9',
            'color': '#fff'
        });
        $('#current').css({
            'background-color': '#fff',
            'color': '#2c3e50'
        });
    }
});