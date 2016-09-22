var demoApp = angular.module('demoAppOut', ['ngResource']);


demoApp.controller('LoginCtrl', function ($scope, $http, $window, $location) {

    $scope.isActive = function (route) {
        var path = $location.absUrl().split("/");
        console.log(route === path[path.length - 1]);
        //console.log($location.absUrl());
        //console.log(route === $location.path().toString);
        return route === path[path.length - 1];
    }


    var init = function () {
        $scope.user = {};
        $scope.user.username = "";
        $scope.user.password = "";
        $scope.user.alias = "";
    };


    init();

    $scope.signup = function () {
        console.log("llegamos a esto?");
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: 'POST',
            url: '/signup',
            headers: {'Content-Type': 'application/json'},
            data: $scope.user
        }).success(function (response) {
            console.log('ok' + response);
            init();
            Materialize.toast('New User generated!', 4000) // 4000 is the duration of the toast
        }).error(function (response) {
            console.log("error"); // Getting Error Response in Callback
            Materialize.toast('Problems with the user generation process!', 4000) // 4000 is the duration of the toast
            init();
        });
    };


});