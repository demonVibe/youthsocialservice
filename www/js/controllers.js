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
  .controller('HomeCtrl', function ($scope) {
    var home = angular.extend( this, {
      members:[]
    })
    $scope.myInterval = 3000;
    $scope.slides = [
      {
        image: 'http://lorempixel.com/200/200/'
      },
      {
        image: 'http://lorempixel.com/200/200/food'
      },
      {
        image: 'http://lorempixel.com/200/200/sports'
      },
      {
        image: 'http://lorempixel.com/200/200/people'
      }
    ];
  })
  .controller('CrisisCtrl', function () {
    var crisis = angular.extend( this, {
      edSysLabels : ["Unable", "Able"],
      edSysData : [76,24],
      readLabels : ["Cannot", "Can"],
      readData: [52,48],
      absLabels : ["Absent", "Present"],
      absData: [17,83],
      gtLabels : ["Usable", "Unusable"],
      gtData: [55,45],
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
        // { pictures:["http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg"], title: 't1' },
        // { pictures:["http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg"], title: 't2' },
        // { pictures:[], title: 't3' },
        // { pictures:[], title: 't4' },
        // { pictures:[], title: 't5' },
        // { pictures:[], title: 't6' },
      ]
    });
    mc.events=[
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub: 'This is a <b>subtitle</b>'
      },
      {
        src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
        sub: '' /* Not showed */
      },
      {
        src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
        thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
      }
    ];
    mc.tabs = [
        { title: 'One', content: "Tabs will become paginated if there isn't enough room for them.", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs.", events: [
          {
            src:'http://www.planwallpaper.com/static/images/6783068-cool-wallpapers-hd.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.planwallpaper.com/static/images/cool_eyes_cat_3d_wallpapers_hd.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/cool-hd-apple-desktop-full-hd-city.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element.", events: [
          {
            src:'http://www.planwallpaper.com/static/images/Cool-HD-Wallpapers-1_9j9pfu8.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.planwallpaper.com/static/images/full-hd-tv-882332.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.planwallpaper.com/static/images/eyes-3d-cool-hd-wallpapers-fullscreen-background.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/cool-wallpaper-8.jpg',
            thumb:'http://www.planwallpaper.com/static/images/cool-wallpaper-8.jpg'
          }
        ]},
        { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected.", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Five', content: "If you remove a tab, it will try to select a new one.", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want.", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab.", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs.", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]},
        { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!", events: [
          {
            src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
            sub: 'This is a <b>subtitle</b>'
          },
          {
            src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
            sub: '' /* Not showed */
          },
          {
            src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
            thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
          }
        ]}
      ];
    mc.selectedIndex = 0;
    // $scope.$watch('selectedIndex', function(current, old){
    //   previous = selected;
    //   selected = tabs[current];
    //   if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
    //   if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    // });
    // $scope.addTab = function (title, view) {
    //   view = view || title + " Content View";
    //   tabs.push({ title: title, content: view, disabled: false});
    // };
    // $scope.removeTab = function (tab) {
    //   var index = tabs.indexOf(tab);
    //   tabs.splice(index, 1);
    // };
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
  .controller('AccountsCtrl', function ($log) {
    var ac = angular.extend( this, {
      members:[],
      login:login
    });
    function login() {
      $log.debug("Inside Google");
      document.addEventListener('deviceready', deviceReady, false);

      function deviceReady() {
        // I get called when everything's ready for the plugin to be called!
        console.log('Device is ready!');
        window.plugins.googleplus.trySilentLogin(
          {
            // 'scopes': '... ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            // 'webClientId': '528631628442-bjb7ubb6ds81lb0l7e925p3ovsb46ebr.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            // 'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
          },
          function (obj) {
            alert(JSON.stringify(obj)); // do something useful instead of alerting
            console.log(obj);
          },
          function (msg) {
            alert('error: ' + msg);
          }
        );
      }
    }
  })
  .controller('ContactCtrl', function ($scope, $mdDialog, $timeout) {
    var cc = this;

    cc.hidden = false;
    cc.isOpen = false;
    cc.hover = true;

    // On opening, add a delayed property which shows tooltips after the speed dial has opened
    // so that they have the proper position; if closing, immediately hide the tooltips
    $scope.$watch('demo.isOpen', function(isOpen) {
      if (isOpen) {
        $timeout(function() {
          $scope.tooltipVisible = cc.isOpen;
        }, 600);
      } else {
        $scope.tooltipVisible = cc.isOpen;
      }
    });

    cc.items = [
      { name: "Blog", icon: "img/social-hand-drawn/svg/blogger-drew-logo.svg", direction: "bottom", url: 'https://youthsocialservicesy2s.blogspot.in' },
      { name: "Twitter", icon: "img/social-hand-drawn/svg/twitter-draw-logo.svg", direction: "top", url: 'https://m.facebook.com/y2s2414/' },
      { name: "Instagram", icon: "img/social-hand-drawn/svg/instagram-draw-logo.svg", direction: "bottom", url: 'https://m.facebook.com/y2s2414/' },
      { name: "Facebook", icon: "img/social-hand-drawn/svg/facebook.svg", direction: "top", url: 'https://m.facebook.com/y2s2414/' },
      { name: "Google Plus", icon: "img/social-hand-drawn/svg/google-plus-draw-logo.svg", direction: "bottom", url: 'https://m.facebook.com/y2s2414/' },
    ];
});
