(function () {
  'use strict';

  angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($rootScope, $scope, $timeout, $log, $ionicModal, $ionicSideMenuDelegate, firebaseDataService, currentUser, $state) {

      var app = angular.extend(this, {
        userLoggedIn: false,
        userInfo: {}
      });

      activate();
      function activate() {
        if (window.cordova) {
          document.addEventListener("deviceready", onDeviceReady, false);
          //noinspection JSAnnotator
          function onDeviceReady() {
            navigator.splashscreen.hide();

            FCMPlugin.onTokenRefresh(function (token) {
              $rootScope.deviceToken = token;
              $rootScope.$broadcast('token updated');
            });

            FCMPlugin.getToken(function (token) {
              $rootScope.deviceToken = token;
              console.log(token);
            });
          }
        }

        $scope.$on('token updated', function () {
          if (!(_.isEmpty(currentUser.details))) {
            firebaseDataService.updateToken(currentUser.details.userId, $rootScope.deviceToken);
          }
        });
        $scope.$on('loggedIn', function () {
          firebaseDataService.updateToken(currentUser.details.userId, $rootScope.deviceToken);
        });

        localforage.getItem('currentUser').then(function (data) {
          if (data) {
            currentUser.details = data;
          } else {
            currentUser.details = {}
          }
          if (!(_.isEmpty(currentUser.details))) {
            console.log("Not Empty");
            $timeout(function () {
              app.userLoggedIn = true;
              app.userInfo = currentUser.details
            }, 10);
          }
          else {
            console.log("not logged In");
          }
        }).catch(function (err) {
          console.log(err)
        });
      }

      $scope.$on('user: loggedIn', function () {
        console.log('got it');
        app.userLoggedIn = true;
        app.userInfo = currentUser.details;
      });
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      $scope.closeApp = function () {
        ionic.Platform.exitApp();
        $log.debug("app closed");
      };

      $scope.closeSideMenu = function (data) {
        $ionicSideMenuDelegate.toggleLeft();
        if (data === 'logout') {
          app.userLoggedIn=false;
          localforage.setItem('currentUser', {}).then(function () {
          });
          Object.keys(currentUser).forEach(function (key) {
            delete currentUser[key];
          });
          console.log("All Local Data cleared");
          firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Email Sign-out successful.");
          }, function (error) {
            // An error happened.
            console.log("An error happened.", error);
          });
          $state.go('app.home');
        }
      }
    })

})();
