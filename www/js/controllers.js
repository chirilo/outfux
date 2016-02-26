angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {


  })

  .controller('InfoPageCtrl', function ($scope, $cordovaDevice, localStorageService) {

    document.addEventListener("deviceready", function () {

      var device = $cordovaDevice.getDevice();

      var cordova = $cordovaDevice.getCordova();

      var model = $cordovaDevice.getModel();

      var platform = $cordovaDevice.getPlatform();

      var uuid = $cordovaDevice.getUUID();

      var version = $cordovaDevice.getVersion();

      console.log(device, cordova, model, platform, uuid, version)

    }, false);

    $scope.data = {};
    $scope.data.currentUser = localStorageService.get('chefCurrentUser')

  })
