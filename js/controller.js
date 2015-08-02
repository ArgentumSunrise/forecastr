var weatherApp = angular.module('weatherApp', []);

weatherApp.controller('weatherCtrl', function ($scope) {
    $scope.type = 'f';
    $scope.switchTo = 'Metric'
    $scope.current = {};
    $scope.cityWeather = cityWeather;
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