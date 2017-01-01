// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngMaterial', 'ngMessages', 'starter.controllers', 'firebase', 'ion-gallery'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, ionGalleryConfigProvider) {
  // Configure a dark theme with primary foreground yellow

  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark();

  ionGalleryConfigProvider.setGalleryConfig({
    action_label: 'Close',
    toggle: false,
    row_size: 3,
    fixed_row_size: true
  });

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl as home'
      }
    }
  })
  .state('app.crisis', {
    url: '/crisis',
    views: {
      'menuContent': {
        templateUrl: 'templates/crisis.html',
        controller: 'CrisisCtrl as crisis'
      }
    }
  })
  .state('app.whatwedo', {
    url: '/what_we_do',
    views: {
      'menuContent': {
        templateUrl: 'templates/whatwedo.html',
        controller: 'WhatWeDoCtrl as wc'
      }
    }
  })
  .state('app.ourimpact', {
    url: '/our_impact',
    views: {
      'menuContent': {
        templateUrl: 'templates/ourimpact.html',
        controller: 'OurImpactCtrl as ic'
      }
    }
  })
  .state('app.media', {
    url: '/media',
    views: {
      'menuContent': {
        templateUrl: 'templates/media.html',
        controller: 'MediaCtrl as mc'
      }
    }
  })
  .state('app.donate', {
    url: '/donate',
    views: {
      'menuContent': {
        templateUrl: 'templates/donate.html',
        controller: 'DonateCtrl as dc'
      }
    }
  })
  .state('app.ourstory', {
    url: '/our_story',
    views: {
      'menuContent': {
        templateUrl: 'templates/ourstory.html',
        controller: 'OurStoryCtrl as oc'
      }
    }
  })
  .state('app.join', {
    url: '/join_the_movement',
    views: {
      'menuContent': {
        templateUrl: 'templates/join.html',
        controller: 'JoinCtrl as jc'
      }
    }
  })
  .state('app.share', {
    url: '/share',
    views: {
      'menuContent': {
        templateUrl: 'templates/share.html',
        controller: 'ShareCtrl as sc'
      }
    }
  })
  .state('app.accounts', {
    url: '/your_account',
    views: {
      'menuContent': {
        templateUrl: 'templates/accounts.html',
        controller: 'AccountsCtrl as ac'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
  
.directive('myclick', function() {
  return function(scope, element, attrs) {
    element.bind('touchstart click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.type === 'click') {
        scope.$apply(attrs['myclick']);
      }
    });
  };
});
