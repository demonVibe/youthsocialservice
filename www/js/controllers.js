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
  .controller('HomeCtrl', function ($firebaseArray, events, $timeout) {
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
      pastEvents:[],
      response:response,
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
        $timeout(function () {
          if(!home.upcomingEvents.length)
            home.upcoming=false;
        },10)
      });

      var eventsRef = firebase.database().ref().child('events').child('-KacGWfBZ8nHW3IiJ5Y4');
      // eventsRef.update({
      //   "cover":"",
      //   "title":"Winter Clothes Distribution",
      //   "location":"Sawai Man Singh Hospital, Jaipur, Rajasthan",
      //   "date": new Date("October 24, 2016 20:00:00"),
      //   "description":"आज दिनांक 24/10/2016 को यूथ सोशल सर्विस ऑर्गनायज़ेशन के कार्यकर्ताओं द्वारा सवाई मान सिंह अस्पताल जयपुर के पास बैठे जरूरतमंदो को सर्दियों के कपड़े, कम्बल, टी-शर्ट, शर्ट, जींस,पैंट और महिलाओं को" +
      //   " सूट,स्वेटर व बच्चों के कपड़ों का वितरण किया गया । जिसमें संस्था के अध्यक्ष मनोज कुमार प्रजापत, कोषाध्यक्ष नीरज शर्मा व मंत्री अभिषेक चौहान तथा कार्यकारिणी सदस्य राजकुमार सोनी, नरेश कुमार,निशान्त शर्मा, मनीष कुमार बेहड्डा, " +
      //   "शुभम जयसवाल । संस्था के उपाध्यक्ष महेन्द्र बगरिया तथा सोन प्रकाश शर्मा का विशेष योगदान रहा। तथा हमारे संस्थापक सदस्य श्री साँवरमल जी शर्मा, श्री रोहित जी मीना व श्री विक्रम जी व्यास का सायोगदान रहा तथा विशेस योगदान श्री लक्ष्मण जी बंसल का रहा । " +
      //   "फलस्वरूप बहुत कुछ सीखने को मिला तथा निशक्तो व जरूरतमंदो का अपार प्यार, स्नेह व आशीर्वाद मिला।",
      //   "guests":[
      //     // {'name':'Shri Rahul Kaswan', 'designation':'Member of parliament', 'role': 'Udghatankarta'},
      //     // {'name':'Shri Sushma Pincha', 'designation':'Chairman of Nagar Palika Sardarshahar','role': 'Adhyakshata'},
      //     // {'name':'Shri Laxman Bansal', 'designation':'Social Worker', 'role': 'Bhamashah'},
      //   ],
      //   "signature":"।। जय श्री श्याम ।।",
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
    function response(res) {
      if(!(_.isEmpty(User))){
        if (res==='sure') {
            alert('Thanks');
        } else {
          alert("We'll miss you!")
        }
      }
      else {
        alert("You need to login to respond")
      }
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
  .controller('MediaCtrl', function (events) {
    var mc = angular.extend( this, {
      members:[],
      events:[],
      selectedIndex: 0,
    });
    var currentDate= new Date();
    events.then(function (data) {
      _.forEach(data,function (val) {
        // console.log(new Date(val.date), currentDate)
        if(new Date(val.date)> currentDate){
          // home.upcomingEvents.push(val);
        } else {
          mc.events.push(val);
        }
      });
      console.log(mc.events)
      // {
      //   src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
      //   thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
      //   sub: 'This is a <b>subtitle</b>'
      // }

      // [
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(1).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(1).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(2).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(2).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(3).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(3).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(4).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(4).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(5).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(5).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(6).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(6).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(7).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(7).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(8).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(8).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(9).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(9).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(10).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(10).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(11).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(11).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(12).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(12).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(13).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(13).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(14).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(14).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(15).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(15).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(16).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(16).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(17).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(17).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(18).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(18).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(19).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(19).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(20).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(20).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(21).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(21).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(22).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(22).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(23).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(23).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(24).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(24).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(25).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(25).png?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   }
      // ]
    });
    // mc.tabs = [
    //     { title: 'One', content: "Tabs will become paginated if there isn't enough room for them.", events: [
    //       {
    //         src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
    //         sub: 'This is a <b>subtitle</b>'
    //       },
    //       {
    //         src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
    //         sub: '' /* Not showed */
    //       },
    //       {
    //         src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
    //         thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
    //       }
    //     ]},
    //   ];


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
})
  .controller('AccountsCtrl', AccountsCtrl)
  .controller('PanelCtrl', PanelCtrl);

  function AccountsCtrl ($log, $scope, $rootScope, $ionicLoading, $ionicPopup, $q, User, firebaseDataService,
                         $mdPanel,$timeout, $state, $stateParams, $ionicHistory) {
    var ac = angular.extend( this, {
      email:"",
      password:"",
      loading:false,
    });

    activate();
    function activate() {
      ac._mdPanel = $mdPanel;
    }

    ac.googleLogin = function () {
      $log.debug("Inside Google");
      document.addEventListener('deviceready', deviceReady, false);

      function deviceReady() {
        ac.loading=true;
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
            $timeout(function() {
              ac.loading=false;
            }, 10);
          }
        );
      }
    }
    //This method is executed when the user press the "SignIn with Email" link
    ac.emailLogin = function () {
      // $ionicLoading.show();
      ac.loading=true;
      firebase.auth().signInWithEmailAndPassword(ac.email, ac.password).then(function(response){
        var user = firebase.auth().currentUser;
        if (user != null) {
          if( ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
            User = {
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
            User = {
              'email': user.email,
              'userId': user.uid,
              'name': user.displayName,
              'picture': user.photoURL
            };
          }
        } else {
          $timeout(function() {
            ac.loading=false;
          }, 10);
          // $ionicLoading.hide()
        }
        var newUser = firebaseDataService.getUserDetails(firebase.auth().currentUser.uid);
        if (newUser == null) {
          firebaseDataService.emailSignUp(User.userId, User);
        }
        $rootScope.$broadcast('user: loggedIn');
        localforage.setItem('currentUser', User).then(function () {
          console.log("Saved to LocalForage")
        });
        $timeout(function() {
          ac.loading=false;
        }, 10);
        console.log(User);
        // $ionicLoading.hide();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        if($stateParams.prevState){
          $state.go($stateParams.prevState);
        } else {
          $state.go('app.home')
        }
      },function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
        $timeout(function() {
          ac.loading=false;
        }, 10);
        // $ionicLoading.hide()
      });
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

//This method is executed when the user press the "Dont have an account" link
    ac.createAccount = function () {
      // createPopup();
      // showPanel();
    };
    var createPopup = function() {
      var scope = $scope.$new();
      scope.data = {};
      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/createAccount.html',
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
                  User = {
                    'email': user.email,
                    'userId': user.uid,
                    'name': user.displayName,
                    'picture': user.photoURL,
                    // 'device_token': $rootScope.device_token

                    // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
                  };
                  // var newUser = firebaseDataService.getUserDetails(User.userId);
                  // if(newUser==null){
                  //   firebaseDataService.emailSignUp(User.userId, User);
                  // }
                  // User.SignInData=currentUser;
                  // $rootScope.$broadcast('user: loggedIn');
                  // localStorageService.set('currentUser', User);
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
  }
  AccountsCtrl.prototype.showDialog = function() {
    var position = this._mdPanel.newPanelPosition()
      .absolute()
      // .right()
      // .top('30%')
      // .bottom()
      // .left('5%')

    var animation = this._mdPanel.newPanelAnimation();

    animation.openFrom({
      top: document.documentElement.clientHeight,
      left: document.documentElement.clientWidth / 2 - 250
    });
    animation.closeTo({
      top: document.documentElement.clientHeight,
      left: document.documentElement.clientWidth / 2 - 250
    });
    animation.withAnimation(this._mdPanel.animation.SLIDE);

    var config = {
      animation: animation,
      attachTo: angular.element(document.body),
      controller: PanelCtrl,
      controllerAs: 'pc',
      templateUrl: 'templates/email-signup.html',
      panelClass: 'signup-panel-container',
      position: position,
      trapFocus: true,
      zIndex: 150,
      clickOutsideToClose: false,
      clickEscapeToClose: false,
      hasBackdrop: true,
      fullscreen:true,
    };

    this._mdPanel.open(config);
  };

  function PanelCtrl(mdPanelRef, User, firebaseDataService, $rootScope, $timeout, $stateParams, $state, $scope) {
    var pc = angular.extend( this, {
      email:"",
      password:"",
      // repassword:"",
      loading:false,
    });

    this._mdPanelRef = mdPanelRef;
    pc.closeDialog = function() {
      this._mdPanelRef && this._mdPanelRef.close();
    };
    pc.createAccount=function() {
      pc.loading=true;
      // $ionicLoading.show();
      // var info = $q.defer();
      firebase.auth().createUserWithEmailAndPassword(pc.email, pc.password).then(function (response) {
          // info.resolve(response);
          var user = firebase.auth().currentUser;

          // user.updateProfile({
          //   displayName: scope.data.name,
          //   photoURL: "https://dl.dropbox.com/s/4tdz2fuzfcr29t6/avatar.png?dl=1"
          // }).then(function() {
          //   console.log("Update Successful");
          // Update successful.
          if (user != null) {
            User = {
              'email': user.email,
              'userId': user.uid,
              // 'name': user.displayName,
              'picture': user.photoURL,
              // 'device_token': $rootScope.device_token

              // The user's ID, unique to the Firebase project. Do NOT use
              // this value to authenticate with your backend server, if
              // you have one. Use User.getToken() instead.
            };
            var newUser = firebaseDataService.getUserDetails(User.userId);
            if(newUser==null){
              firebaseDataService.emailSignUp(User.userId, User);
            }
            // User.SignInData=currentUser;
            $rootScope.$broadcast('user: loggedIn');
            // localStorageService.set('currentUser', User);
            // myPopup.close();
            localforage.setItem('currentUser', User).then(function () {
              console.log("Saved to LocalForage",User)
            });
            pc.closeDialog();
            $timeout(function() {
              pc.loading=false;
            }, 10);
            // $ionicLoading.hide();
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            if($stateParams.prevState){
              $state.go($stateParams.prevState);
            } else {
              $state.go('app.home');
            }
            // return scope.data;
          } else {
            console.log("user is null");
            $timeout(function() {
              pc.loading=false;
            }, 10);
          }
        },
        function (error) {
          // info.reject(error);
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("ErrorCode: ",errorCode);
          console.log("ErrorMessage: ", errorMessage);
          // ...
          // $ionicLoading.hide();
          $timeout(function() {
            pc.loading=false;
          }, 10);
          alert(errorMessage);
        }
      );
      // return info.promise;
    };
  }
})();
