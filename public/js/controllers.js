var dephisitApp = angular.module('dephisitApp', ['ngResource']);

dephisitApp.controller('SignalsCtrl', function ($scope, $http, $window, $location) {

    var updateData = function () {
        $http({
            method: 'GET',
            url: '/getallsignals',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (response) {
                $scope.codeStatus = response;
                $scope.signals = response;
                console.log(response);
            }).error(function (response) {  // Getting Error Response in Callback
                console.log("error");
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    };

    /* To refresh data */
    var timer = setInterval(function () {
        $scope.$apply(updateData);
    }, 1000);

    updateData();

    // Demo onClick in angular
    $scope.deletesignal = function (signal) {
        console.log(signal._id);
        $http({
            method: 'POST',
            url: '/deletesignal/' + signal._id,
            headers: {'Content-Type': 'application/json'}
        }).success(function (response) {
                $scope.codeStatus = response;
                console.log(response);
                updateData();
            }).error(function (response) {  // Getting Error Response in Callback
                console.log("error");
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    };

    $scope.printSignal = function(tipo){
        if(tipo === "CRUCE"){
            return  "/images/cross.ico";
        }else if(tipo === "STOP"){
            return  "/images/stop.ico";
        }else if(tipo == "CEDA"){
            return  "/images/yield.ico";
        }
        return  "/images/punto.ico";

    };

    $scope.isActive = function (route) {

        var path = $location.absUrl().split("/");
        console.log(route === path[path.length - 1]);
        //console.log($location.absUrl());
        //console.log(route === $location.path().toString);
        return route === path[path.length - 1];
    }


});



dephisitApp.controller('DoctorCtrl', function ($scope, $http, $window, $location) {

    var init = function () {
        $scope.doctor = {};
        $scope.doctor.name = "";
    };


    init();

    var updateData = function () {
        $http({
            method: 'GET',
            url: '/doctors/all',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (response) {
            $scope.codeStatus = response;
            $scope.doctors = response;
            console.log(response);
        }).error(function (response) {  // Getting Error Response in Callback
            console.log("error");
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });
    };

    updateData();

    $scope.send = function () {
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: 'POST',
            url: '/doctors',
            headers: {'Content-Type': 'application/json'},
            data: $scope.doctor
        }).success(function (response) {
            console.log('ok' + response);
            updateData();
            init();
            Materialize.toast('New doctor generated!', 4000) // 4000 is the duration of the toast
        }).error(function (response) {
            console.log("error"); // Getting Error Response in Callback
        });
    };

    $scope.delete = function (docId) {
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: 'DELETE',
            url: '/doctors/' + docId,
            headers: {'Content-Type': 'application/json'},
            data: $scope.doctor
        }).success(function (response) {
            console.log('ok' + response);
            updateData();
            init();
            Materialize.toast('Doctor deleted!', 4000) // 4000 is the duration of the toast
        }).error(function (response) {
            console.log("error"); // Getting Error Response in Callback
        });
    };


});
