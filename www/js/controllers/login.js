angular.module('starter')

  .controller('LoginCtrl', function ($scope, $ionicSlideBoxDelegate, $cordovaOauth, APP_CONFIG, $ionicLoading, $http, localStorageService, $state) {

    $scope.data = {};
    $scope.data.view = 0;
    $scope.data.user = {
      email: '',
      password: ''
    }

    // view = 1: sign in
    // view = 2: sign up
    $scope.slideHasChanged = function (view) {
      $scope.data.view = view
    };

    $scope.nextSlide = function(view) {
      $ionicSlideBoxDelegate.slide(view);
    };

    $scope.login = function () {
      localStorageService.set('chefCurrentUser', {
        gender: 'Male',
        id: 1,
        location: 'New York, USA',
        name: 'Hamza Seedat',
        picture: 'https://d3lut3gzcpx87s.cloudfront.net/res/img/UnknownProfile.png'
      });
      $state.go('app.info')
    };

    $scope.loginFacebook = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      $cordovaOauth.facebook(APP_CONFIG.appFacebookId, ["email", "public_profile"]).then(function(result) {
        $http.get("https://graph.facebook.com/v2.2/me", {
          params: {
            access_token: result.access_token,
            fields: "name,gender,location,picture",
            format: "json"
          }
        }).then(function (result) {
          localStorageService.set('chefCurrentUser', {
            gender: result.data.gender,
            id: result.data.id,
            location: result.data.location.name,
            name: result.data.name,
            picture: result.data.picture.data.url
          });
          $state.go('app.info');
          $ionicLoading.hide();
        }, function (error) {
          $ionicLoading.hide();
        });
      }, function(error) {
        console.log("Error -> " + error);
        $ionicLoading.hide();
      });
    }

    $scope.loginInstagram = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      $cordovaOauth.instagram(APP_CONFIG.appInstagramId, ["basic"]).then(function(result) {
        console.log(result);
        var url = "https://api.instagram.com/v1/users/self?access_token=" + result.access_token;
        console.log(url);
        $http.get(url , {
          params: {
            client_id: APP_CONFIG.appInstagramId
          }
        }).then(function (result) {
          console.log(result);
          localStorageService.set('chefCurrentUser', {
            gender: 'Male',
            id: result.data.data.id,
            location: 'New York, USA',
            name: result.data.data.full_name,
            picture: result.data.data.profile_picture
          });
          $state.go('app.info')
          $ionicLoading.hide();
        }, function (error) {
          $ionicLoading.hide();
        });
        $ionicLoading.hide();
      }, function(error) {
        console.log("Error -> " + error);
        $ionicLoading.hide();
      });
    }

  });
