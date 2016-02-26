angular.module('starter.controllers', ['firebase'])

.controller('LoginCtrl', LoginCtrl)

.controller('DashCtrl', DashCtrl)

.controller('ChatsCtrl', ChatsCtrl)

.controller('ChatDetailCtrl', ChatDetailCtrl)

.controller('AccountCtrl', AccountCtrl);

function LoginCtrl(Auth, $state) {

  this.loginWithGoogle = function loginWithGoogle() {
    Auth.$authWithOAuthPopup('google')
      .then(function(authData) {
        $state.go('tab.dash');
      });
  };

  this.loginWithFacebook = function loginWithFacebook() {
    Auth.$authWithOAuthPopup('facebook')
      .then(function(authData) {
          // the access token will allow us to make Open Graph API calls
          console.log(authData.facebook.accessToken);
          $state.go('tab.dash');
      }, {
        scope: "email,user_likes" // the permissions requested
      });
  };

  /*this.loginWithFacebook = function loginWithFacebook(){
    Auth.$authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // the access token will allow us to make Open Graph API calls
        console.log(authData.facebook.accessToken);
      }
    }, {
      scope: "email,user_likes" // the permissions requested
    });
  }*/

}
LoginCtrl.$inject = ['Auth', '$state'];

function DashCtrl() {}

function ChatsCtrl($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
}
ChatsCtrl.$inject = ['$scope', 'Chats'];

function ChatDetailCtrl($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}
ChatDetailCtrl.$inject = ['$scope', '$stateParams', 'Chats'];

function AccountCtrl($scope) {
  $scope.settings = {
    enableFriends: true
  };
}
AccountCtrl.$inject = ['$scope'];
