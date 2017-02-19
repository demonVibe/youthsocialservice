(function() {
  'use strict';

  angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, $timeout, $log, $ionicModal, $ionicSideMenuDelegate, User) {

    var app = angular.extend( this, {
      userLoggedIn: false,
      userInfo:{}
    });
    activate();

    function activate() {
      console.log('here');
      if(window.cordova){
        document.addEventListener("deviceready", onDeviceReady, false);
        //noinspection JSAnnotator
        function onDeviceReady() {
          navigator.splashscreen.hide();
        }
      }
      localforage.getItem('currentUser').then(function (data) {
        if (data) {
          User=data;
        } else {
          User={}
        }
        if(!(_.isEmpty(User))){
          console.log("Not Empty");
          $timeout(function() {
            app.userLoggedIn=true;
            app.userInfo=User
          }, 10);
        }
        else {
          console.log("not logged In");
        }
      }).catch(function (err) {
        console.log(err)
      });
    }

    $scope.$on('user: loggedIn', function() {
      console.log('got it');
      app.userLoggedIn=true;
      app.userInfo=User;
    });
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.closeApp=function() {
      ionic.Platform.exitApp();
      $log.debug("app closed");
    };

    $scope.closeSideMenu = function (data) {
      $ionicSideMenuDelegate.toggleLeft();
      if(data==='logout'){
        console.log('logout')
      }
    }
  })

})();
