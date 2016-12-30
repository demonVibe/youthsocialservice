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
  .controller('MediaCtrl', function ($scope) {
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
        { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element.", events: [
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
      ]
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
  .controller('AccountsCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
