angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, $timeout, $log, $ionicModal, $ionicSideMenuDelegate) {

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

    $scope.closeSideMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
  })
  .controller('HomeCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
  .controller('CrisisCtrl', function () {
    var crisis = angular.extend( this, {
    })
  })
  .controller('WhatWeDoCtrl', function () {
    var work = angular.extend( this, {
      members:[]
    })
  })
  .controller('OurImpactCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
  .controller('MediaCtrl', function () {
    var mc = angular.extend( this, {
      members:[],
      events:[
        { pictures:[], title: 't1' },
        { pictures:[], title: 't2' },
        { pictures:[], title: 't3' },
        { pictures:[], title: 't4' },
        { pictures:[], title: 't5' },
        { pictures:[], title: 't6' },
      ]
    });
  })
  .controller('DonateCtrl', function ($scope) {
    var home = angular.extend( this, {
      members:[]
    });
    $scope.user = {
          title: 'Developer',
          email: 'ipsum@lorem.com',
          firstName: '',
          lastName: '',
          company: 'Google',
          address: '1600 Amphitheatre Pkwy',
          city: 'Mountain View',
          state: 'CA',
          biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
          postalCode: '94043'
        };

        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
          return {abbrev: state};
        });
  })
  .controller('OurStoryCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
  .controller('JoinCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
  .controller('ShareCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
  .controller('AccountsCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
