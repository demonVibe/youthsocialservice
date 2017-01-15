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
  .controller('HomeCtrl', function ($firebaseArray, events) {
    var home = angular.extend( this, {
      members:[
        {
          image: 'http://lorempixel.com/200/200/people'
        },
        {
          image: 'http://lorempixel.com/200/200/food'
        },
        {
          image: 'http://lorempixel.com/200/200/sports'
        },
        {
          image: 'http://lorempixel.com/200/200/'
        }
      ],
      founders:[
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
      ],
      upcoming: true,
      showUpcomingBlock: showUpcomingBlock,
      showPastBlock: showPastBlock,
      events:[],
      upcomingEvents:[],
      pastEvents:[]
    });
    var currentDate=new Date();
    activate();

    function activate() {
      events.then(function (data) {
        home.events=data;
        _.forEach(data,function (val) {
          // console.log(new Date(val.date), currentDate)
          if(new Date(val.date)> currentDate){
            home.upcomingEvents.push(val);
          } else {
            home.pastEvents.push(val);
          }
        });
      });

      // var eventsRef = firebase.database().ref().child('events').child('-KaTrXP9bbCEJbgh0fwR');
      // eventsRef.update({
      //   "cover":"",
      //   "title":"Opening Ceremony - Digital classroom",
      //   "location":"Rajkiya Madhyamik Vidyalaya, Ward No. 5, Sardarsahar (Churu), Rajasthan",
      //   "date": new Date("January 17, 2017 09:15:00"),
      //   "description":"Introducing the LAHAR KAKSH That room is student friendly and improving the digital life of students " +
      //   "and digital classes running on that LAHAR KAKSH (digital room ) in this room one 40 inch led tv and video player and playing " +
      //   "instruments and learning toys.",
      //   "guests":[
      //     {'name':'Shri Rahul Kaswan', 'designation':'Member of parliament', 'role': 'Udghatankarta'},
      //     {'name':'Shri Sushma Pincha', 'designation':'Chairman of Nagar Palika Sardarshahar','role': 'Adhyakshata'},
      //     {'name':'Shri Laxman Bansal', 'designation':'Social Worker', 'role': 'Bhamashah'},
      //   ],
      //   "responded": 'false'
      // });


      // var list = $firebaseArray(eventsRef);
      // list.$add({ foo: "bar" }).then(function(ref) {
      //   var id = ref.key;
      //   console.log("added record with id " + id);
      //   list.$indexFor(id); // returns location in the array
      // });
    }
    function showUpcomingBlock() {
      home.upcoming=true;
    }
    function showPastBlock() {
      home.upcoming=false;
    }

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
    var ww = angular.extend( this, {
      members:[],
      slides: [
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/WhatWeDo%2F2017-01-08-PHOTO-00000082.png?alt=media&token=c3c014cb-8bdd-4a24-8ee5-e70bfe0bcf16'
        },
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/WhatWeDo%2F2017-01-08-PHOTO-00000083.png?alt=media&token=da809b4e-d6fc-4775-9a29-7fe05375a769'
        },
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/WhatWeDo%2F2017-01-08-PHOTO-00000084.png?alt=media&token=9a362a80-98e3-47ee-a55a-dfe1dcdcf8cb'
        },
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/WhatWeDo%2F2017-01-08-PHOTO-00000085.png?alt=media&token=255ef7ce-1f76-4529-aabd-eec6a3b4a6e9'
        },
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/WhatWeDo%2F2017-01-08-PHOTO-00000090.png?alt=media&token=9e445918-fc91-49dc-b62b-7431d8953e2c'
        },
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/WhatWeDo%2F2017-01-08-PHOTO-00000151.png?alt=media&token=e8437ad0-e94a-4c20-9b47-fce2d33e8cf5'
        }
      ]
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
    var os = angular.extend( this, {
      members:[],
      cover:'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Common%2FOurStoryCover.jpeg?alt=media&token=fbb48f2d-6d0a-4d19-9364-6b84584a8341'
    })
  })
  .controller('JoinCtrl', function ($scope) {
    var home = angular.extend( this, {
      members:[]
    });
    $scope.user = {
      name: 'Manoj Kr Prajapat',
      email: 'manojkrbhatiwal@gmail.com',
      phone: '',
      address: 'Jaipur',
      donation: 19.99
    };
  })
  .controller('ShareCtrl', function () {
    var home = angular.extend( this, {
      members:[]
    })
  })
  .controller('AccountsCtrl', function ($log, $scope, $ionicLoading, $ionicPopup, $q) {
    var ac = angular.extend( this, {
      members:[],
      login:login,
      user:{}
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
    //This method is executed when the user press the "SignIn with Email" link
    ac.emailSignIn = function () {
      var loggedInUser={};
      // 	signInPopup();
      // };
      //
      // var signInPopup = function() {
      // 	var scope = $scope.$new();
      // 	scope.data = {};
      // 	var myPopup = $ionicPopup.show({
      // 		templateUrl: 'scripts/login/emailLogin.html',
      // 		title: 'Login using your Email',
      // 		subTitle: 'Login',
      // 		scope: scope,
      // 		buttons: [{
      // 			text: 'Cancel',
      // 			onTap: function (e) {
      // 				scope.data.canceled = true;
      // 				return scope.data;
      // 			}
      // 		}, {
      // 			text: '<b>Log In</b>',
      // 			type: 'button-positive',
      // 			onTap: function (e) {
      // 				var email = scope.data.email;
      // 				if (email && email.length > 3) {
      // 					return scope.data;
      // 				} else {
      // 					alert('Enter correct email');
      // 					e.preventDefault();
      // 				}
      // 				var pass = scope.data.password;
      // 				if (pass && pass.length > 5) {
      // 					return scope.data;
      // 				} else {
      // 					alert('Min length of password is 6');
      // 					e.preventDefault();
      // 				}
      // 			}
      // 		}]
      // 	});
      // myPopup.then(function(res) {
      // 	console.log(res);
      // });
      // myPopup.then(function (result) {
      // 	if (result.canceled) {
      // 		return;
      // 	}
      // 	$ionicLoading.show({
      // 		template: 'Logging In...'
      // 	});
      var signInDetails = {
        email: ac.user.email,
        password: ac.user.password
      };
      firebase.auth().signInWithEmailAndPassword(signInDetails.email, signInDetails.password).then(function(response){
        var user = firebase.auth().currentUser;

        if (user != null) {
          if( ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
            loggedInUser = {
              'email': user.email,
              'userId': user.uid,
              'name': user.displayName,
              'picture': user.photoURL,
              // 'device_token': $rootScope.device_token

              // The user's ID, unique to the Firebase project. Do NOT use
              // this value to authenticate with your backend server, if
              // you have one. Use User.getToken() instead.
            };
          }
          else {
            loggedInUser = {
              'email': user.email,
              'userId': user.uid,
              'name': user.displayName,
              'picture': user.photoURL
            };
          }
        }
        // var newUser = dataService.getUserDetails(loggedInUser.userId);
        // if (newUser == null) {
        //   dataService.emailSignUp(loggedInUser.userId, loggedInUser);
        // }

        // loggedIn.signInData = loggedInUser;

        // $rootScope.$broadcast('user: loggedIn');

        // localStorageService.set('loggedInUser', loggedInUser);

        // console.log(loggedInUser);
        // $ionicLoading.hide();
        // if($stateParams.prevState){
        //   $state.go($stateParams.prevState);
        // }
      },function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
      // });
    };

//This method is executed when the user press the "forgot password" link
    ac.resetPassword =function () {
      console.log("clicked");
      $scope.showPopup();
    };
    $scope.showPopup = function() {
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="email" ng-model="data.email">',
        title: 'Reset Password',
        subTitle: 'Enter your email id',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Send</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.email) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                $ionicLoading.show({
                  template: 'Sending a password reset link...'
                });
                return $scope.data.email;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        var auth = firebase.auth();
        var emailAddress = res;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
          $ionicLoading.hide();
          console.log("email sent");
        }, function(error) {
          $ionicLoading.hide();
          console.log("error",error);
          // An error happened.
        });
      });
    };

    // A confirm dialog
    // $scope.showConfirm = function() {
    // 	var confirmPopup = $ionicPopup.confirm({
    // 		title: 'Create a new Password',
    // 		template: 'Are you sure you want to eat this ice cream?'
    // 	});
    //
    // 	confirmPopup.then(function(res) {
    // 		if(res) {
    // 			console.log('You are sure');
    // 		} else {
    // 			console.log('You are not sure');
    // 		}
    // 	});
    // };
    //
    // An alert dialog
    // $scope.showAlert = function() {
    // 	var alertPopup = $ionicPopup.alert({
    // 		title: 'Don\'t eat that!',
    // 		template: 'It might taste good'
    // 	});
    //
    // 	alertPopup.then(function(res) {
    // 		console.log('Thank you for not eating my delicious ice cream cone');
    // 	});
    // };

//This method is executed when the user press the "Dont have an account" link
    ac.createAccount = function () {
      createPopup();
    };
    var createPopup = function() {
      var scope = $scope.$new();
      scope.data = {};
      var myPopup = $ionicPopup.show({
        templateUrl: 'scripts/login/createAccount.html',
        title: 'Create a new account',
        subTitle: 'Signup',
        scope: scope,
        buttons: [{
          text: 'Cancel',
          onTap: function(e) {
            scope.data.canceled = true;
            return scope.data;
          }
        }, {
          text: '<b>Sign Up</b>',
          type: 'button-positive',
          onTap: function(e) {
            var email = scope.data.email;
            var password = scope.data.password;
            var name = scope.data.name;
            if (email && email.length > 3) {
            } else {
              alert('Enter correct email');
              e.preventDefault();
            }
            $ionicLoading.show({
              template: 'Creating your account...'
            });
            var createUserId = function () {
              var info = $q.defer();
              firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {
                  info.resolve(response);
                },
                function (error) {
                  info.reject(error);
                }
              );
              return info.promise;
            };
            createUserId().then(function () {
              var user = firebase.auth().currentUser;

              user.updateProfile({
                displayName: scope.data.name,
                photoURL: "https://dl.dropbox.com/s/4tdz2fuzfcr29t6/avatar.png?dl=1"
              }).then(function() {
                console.log("Update Successful");
                // Update successful.
                if (user != null) {
                  loggedInUser = {
                    'email': user.email,
                    'userId': user.uid,
                    'name': user.displayName,
                    'picture': user.photoURL,
                    // 'device_token': $rootScope.device_token

                    // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
                  };
                  // var newUser = dataService.getUserDetails(loggedInUser.userId);
                  // if(newUser==null){
                  //   dataService.emailSignUp(loggedInUser.userId, loggedInUser);
                  // }
                  // loggedIn.signInData=loggedInUser;
                  // $rootScope.$broadcast('user: loggedIn');
                  // localStorageService.set('loggedInUser', loggedInUser);
                  myPopup.close();
                  $ionicLoading.hide();
                  // if($stateParams.prevState){
                  //   $state.go($stateParams.prevState);
                  // }
                  return scope.data;
                } else {
                  console.log("user is null");
                }
              }, function(error) {
                console.log("Account Created but update was unsuccessful", error);
                // An error happened.
              });
            }, function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("ErrorCode: ",errorCode);
              console.log("ErrorMessage: ", errorMessage);
              // ...
              $ionicLoading.hide();
              alert(errorMessage);
            });
            e.preventDefault();
          }
        }]
      });
      myPopup.then(function() {
        $ionicLoading.hide();
      });
    };
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
