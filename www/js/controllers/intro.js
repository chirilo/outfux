angular.module('starter')

  .controller('IntroCtrl', function ($scope, $state) {

    $scope.data = {};
    $scope.data.items = [
      {
        url: "http://del.h-cdn.co/assets/15/34/480x960/delish-fall-order-panera-pumpkinspicelatte.jpg",
        title: "Discover",
        description: "Find recipes that match your taste & preference"
      },
      {
        url: "http://www.scattidigusto.it/wp-content/uploads/2010/12/K-helvasi.jpg",
        title: "Share",
        description: "Join the recipes Community & share your favorite recipe"
      },
      {
        url: "http://www.juztoday.com/deal/3561/img/5.jpg",
        title: "Enjoy",
        description: "Join the recipes Community & share your favorite recipe"
      }
    ]

    $scope.goLogin = function() {
      $state.go('login')
    }


  });
