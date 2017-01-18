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
      // console.log(mc.events)
      // {
      //   src:'http://www.planwallpaper.com/static/images/bicycle-1280x720.jpg',
      //   thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
      //   sub: 'This is a <b>subtitle</b>'
      // }
      // [
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(1).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(1).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(2).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(2).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(3).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(3).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(4).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(4).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(5).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(5).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(6).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(6).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(7).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(7).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(8).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(8).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(9).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(9).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(10).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(10).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(11).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(11).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(12).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(12).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(13).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(13).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(14).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(14).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(15).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(15).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(16).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(16).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(17).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(17).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(18).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(18).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(19).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(19).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(20).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(20).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(21).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(21).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(22).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(22).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(23).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(23).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(24).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(24).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     sub:""
      //   },
      //   {
      //     src:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_picture%20(25).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
      //     thumb:"https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/Events%2FPictures%2Fgallery%2F241016_thumb%20(25).jpg?alt=media&token=62447bd7-8544-46f7-a5c2-d755381e8b93",
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

  function PanelCtrl(mdPanelRef, User, firebaseDataService, $rootScope, $timeout, $stateParams, $state) {
    var pc = angular.extend( this, {
      email:"",
      password:"",
      // repassword:"",
      loading:false,
      cities: [
        {
          "id": "1",
          "name": "Mumbai",
          "state": "Maharashtra"
        },
        {
          "id": "2",
          "name": "Delhi",
          "state": "Delhi"
        },
        {
          "id": "3",
          "name": "Bengaluru",
          "state": "Karnataka"
        },
        {
          "id": "4",
          "name": "Ahmedabad",
          "state": "Gujarat"
        },
        {
          "id": "5",
          "name": "Hyderabad",
          "state": "Telangana"
        },
        {
          "id": "6",
          "name": "Chennai",
          "state": "Tamil Nadu"
        },
        {
          "id": "7",
          "name": "Kolkata",
          "state": "West Bengal"
        },
        {
          "id": "8",
          "name": "Pune",
          "state": "Maharashtra"
        },
        {
          "id": "9",
          "name": "Jaipur",
          "state": "Rajasthan"
        },
        {
          "id": "10",
          "name": "Surat",
          "state": "Gujarat"
        },
        {
          "id": "11",
          "name": "Lucknow",
          "state": "Uttar Pradesh"
        },
        {
          "id": "12",
          "name": "Kanpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "13",
          "name": "Nagpur",
          "state": "Maharashtra"
        },
        {
          "id": "14",
          "name": "Patna",
          "state": "Bihar"
        },
        {
          "id": "15",
          "name": "Indore",
          "state": "Madhya Pradesh"
        },
        {
          "id": "16",
          "name": "Thane",
          "state": "Maharashtra"
        },
        {
          "id": "17",
          "name": "Bhopal",
          "state": "Madhya Pradesh"
        },
        {
          "id": "18",
          "name": "Visakhapatnam",
          "state": "Andhra Pradesh"
        },
        {
          "id": "19",
          "name": "Vadodara",
          "state": "Gujarat"
        },
        {
          "id": "20",
          "name": "Firozabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "21",
          "name": "Ludhiana",
          "state": "Punjab"
        },
        {
          "id": "22",
          "name": "Rajkot",
          "state": "Gujarat"
        },
        {
          "id": "23",
          "name": "Agra",
          "state": "Uttar Pradesh"
        },
        {
          "id": "24",
          "name": "Siliguri",
          "state": "West Bengal"
        },
        {
          "id": "25",
          "name": "Nashik",
          "state": "Maharashtra"
        },
        {
          "id": "26",
          "name": "Faridabad",
          "state": "Haryana"
        },
        {
          "id": "27",
          "name": "Patiala",
          "state": "Punjab"
        },
        {
          "id": "28",
          "name": "Meerut",
          "state": "Uttar Pradesh"
        },
        {
          "id": "29",
          "name": "Kalyan-Dombivali",
          "state": "Maharashtra"
        },
        {
          "id": "30",
          "name": "Vasai-Virar",
          "state": "Maharashtra"
        },
        {
          "id": "31",
          "name": "Varanasi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "32",
          "name": "Srinagar",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "33",
          "name": "Dhanbad",
          "state": "Jharkhand"
        },
        {
          "id": "34",
          "name": "Jodhpur",
          "state": "Rajasthan"
        },
        {
          "id": "35",
          "name": "Amritsar",
          "state": "Punjab"
        },
        {
          "id": "36",
          "name": "Raipur",
          "state": "Chhattisgarh"
        },
        {
          "id": "37",
          "name": "Allahabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "38",
          "name": "Coimbatore",
          "state": "Tamil Nadu"
        },
        {
          "id": "39",
          "name": "Jabalpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "40",
          "name": "Gwalior",
          "state": "Madhya Pradesh"
        },
        {
          "id": "41",
          "name": "Vijayawada",
          "state": "Andhra Pradesh"
        },
        {
          "id": "42",
          "name": "Madurai",
          "state": "Tamil Nadu"
        },
        {
          "id": "43",
          "name": "Guwahati",
          "state": "Assam"
        },
        {
          "id": "44",
          "name": "Chandigarh",
          "state": "Chandigarh"
        },
        {
          "id": "45",
          "name": "Hubli-Dharwad",
          "state": "Karnataka"
        },
        {
          "id": "46",
          "name": "Amroha",
          "state": "Uttar Pradesh"
        },
        {
          "id": "47",
          "name": "Moradabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "48",
          "name": "Gurgaon",
          "state": "Haryana"
        },
        {
          "id": "49",
          "name": "Aligarh",
          "state": "Uttar Pradesh"
        },
        {
          "id": "50",
          "name": "Solapur",
          "state": "Maharashtra"
        },
        {
          "id": "51",
          "name": "Ranchi",
          "state": "Jharkhand"
        },
        {
          "id": "52",
          "name": "Jalandhar",
          "state": "Punjab"
        },
        {
          "id": "53",
          "name": "Tiruchirappalli",
          "state": "Tamil Nadu"
        },
        {
          "id": "54",
          "name": "Bhubaneswar",
          "state": "Odisha"
        },
        {
          "id": "55",
          "name": "Salem",
          "state": "Tamil Nadu"
        },
        {
          "id": "56",
          "name": "Warangal",
          "state": "Telangana"
        },
        {
          "id": "57",
          "name": "Mira-Bhayandar",
          "state": "Maharashtra"
        },
        {
          "id": "58",
          "name": "Thiruvananthapuram",
          "state": "Kerala"
        },
        {
          "id": "59",
          "name": "Bhiwandi",
          "state": "Maharashtra"
        },
        {
          "id": "60",
          "name": "Saharanpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "61",
          "name": "Guntur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "62",
          "name": "Amravati",
          "state": "Maharashtra"
        },
        {
          "id": "63",
          "name": "Bikaner",
          "state": "Rajasthan"
        },
        {
          "id": "64",
          "name": "Noida",
          "state": "Uttar Pradesh"
        },
        {
          "id": "65",
          "name": "Jamshedpur",
          "state": "Jharkhand"
        },
        {
          "id": "66",
          "name": "Bhilai Nagar",
          "state": "Chhattisgarh"
        },
        {
          "id": "67",
          "name": "Cuttack",
          "state": "Odisha"
        },
        {
          "id": "68",
          "name": "Kochi",
          "state": "Kerala"
        },
        {
          "id": "69",
          "name": "Udaipur",
          "state": "Rajasthan"
        },
        {
          "id": "70",
          "name": "Bhavnagar",
          "state": "Gujarat"
        },
        {
          "id": "71",
          "name": "Dehradun",
          "state": "Uttarakhand"
        },
        {
          "id": "72",
          "name": "Asansol",
          "state": "West Bengal"
        },
        {
          "id": "73",
          "name": "Nanded-Waghala",
          "state": "Maharashtra"
        },
        {
          "id": "74",
          "name": "Ajmer",
          "state": "Rajasthan"
        },
        {
          "id": "75",
          "name": "Jamnagar",
          "state": "Gujarat"
        },
        {
          "id": "76",
          "name": "Ujjain",
          "state": "Madhya Pradesh"
        },
        {
          "id": "77",
          "name": "Sangli",
          "state": "Maharashtra"
        },
        {
          "id": "78",
          "name": "Loni",
          "state": "Uttar Pradesh"
        },
        {
          "id": "79",
          "name": "Jhansi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "80",
          "name": "Pondicherry",
          "state": "Puducherry"
        },
        {
          "id": "81",
          "name": "Nellore",
          "state": "Andhra Pradesh"
        },
        {
          "id": "82",
          "name": "Jammu",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "83",
          "name": "Belagavi",
          "state": "Karnataka"
        },
        {
          "id": "84",
          "name": "Raurkela",
          "state": "Odisha"
        },
        {
          "id": "85",
          "name": "Mangaluru",
          "state": "Karnataka"
        },
        {
          "id": "86",
          "name": "Tirunelveli",
          "state": "Tamil Nadu"
        },
        {
          "id": "87",
          "name": "Malegaon",
          "state": "Maharashtra"
        },
        {
          "id": "88",
          "name": "Gaya",
          "state": "Bihar"
        },
        {
          "id": "89",
          "name": "Tiruppur",
          "state": "Tamil Nadu"
        },
        {
          "id": "90",
          "name": "Davanagere",
          "state": "Karnataka"
        },
        {
          "id": "91",
          "name": "Kozhikode",
          "state": "Kerala"
        },
        {
          "id": "92",
          "name": "Akola",
          "state": "Maharashtra"
        },
        {
          "id": "93",
          "name": "Kurnool",
          "state": "Andhra Pradesh"
        },
        {
          "id": "94",
          "name": "Bokaro Steel City",
          "state": "Jharkhand"
        },
        {
          "id": "95",
          "name": "Rajahmundry",
          "state": "Andhra Pradesh"
        },
        {
          "id": "96",
          "name": "Ballari",
          "state": "Karnataka"
        },
        {
          "id": "97",
          "name": "Agartala",
          "state": "Tripura"
        },
        {
          "id": "98",
          "name": "Bhagalpur",
          "state": "Bihar"
        },
        {
          "id": "99",
          "name": "Latur",
          "state": "Maharashtra"
        },
        {
          "id": "100",
          "name": "Dhule",
          "state": "Maharashtra"
        },
        {
          "id": "101",
          "name": "Korba",
          "state": "Chhattisgarh"
        },
        {
          "id": "102",
          "name": "Bhilwara",
          "state": "Rajasthan"
        },
        {
          "id": "103",
          "name": "Brahmapur",
          "state": "Odisha"
        },
        {
          "id": "104",
          "name": "Mysore",
          "state": "Karnataka"
        },
        {
          "id": "105",
          "name": "Muzaffarpur",
          "state": "Bihar"
        },
        {
          "id": "106",
          "name": "Ahmednagar",
          "state": "Maharashtra"
        },
        {
          "id": "107",
          "name": "Kollam",
          "state": "Kerala"
        },
        {
          "id": "108",
          "name": "Raghunathganj",
          "state": "West Bengal"
        },
        {
          "id": "109",
          "name": "Bilaspur",
          "state": "Chhattisgarh"
        },
        {
          "id": "110",
          "name": "Shahjahanpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "111",
          "name": "Thrissur",
          "state": "Kerala"
        },
        {
          "id": "112",
          "name": "Alwar",
          "state": "Rajasthan"
        },
        {
          "id": "113",
          "name": "Kakinada",
          "state": "Andhra Pradesh"
        },
        {
          "id": "114",
          "name": "Nizamabad",
          "state": "Telangana"
        },
        {
          "id": "115",
          "name": "Sagar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "116",
          "name": "Tumkur",
          "state": "Karnataka"
        },
        {
          "id": "117",
          "name": "Hisar",
          "state": "Haryana"
        },
        {
          "id": "118",
          "name": "Rohtak",
          "state": "Haryana"
        },
        {
          "id": "119",
          "name": "Panipat",
          "state": "Haryana"
        },
        {
          "id": "120",
          "name": "Darbhanga",
          "state": "Bihar"
        },
        {
          "id": "121",
          "name": "Kharagpur",
          "state": "West Bengal"
        },
        {
          "id": "122",
          "name": "Aizawl",
          "state": "Mizoram"
        },
        {
          "id": "123",
          "name": "Ichalkaranji",
          "state": "Maharashtra"
        },
        {
          "id": "124",
          "name": "Tirupati",
          "state": "Andhra Pradesh"
        },
        {
          "id": "125",
          "name": "Karnal",
          "state": "Haryana"
        },
        {
          "id": "126",
          "name": "Bathinda",
          "state": "Punjab"
        },
        {
          "id": "127",
          "name": "Rampur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "128",
          "name": "Shivamogga",
          "state": "Karnataka"
        },
        {
          "id": "129",
          "name": "Ratlam",
          "state": "Madhya Pradesh"
        },
        {
          "id": "130",
          "name": "Modinagar",
          "state": "Uttar Pradesh"
        },
        {
          "id": "131",
          "name": "Durg",
          "state": "Chhattisgarh"
        },
        {
          "id": "132",
          "name": "Shillong",
          "state": "Meghalaya"
        },
        {
          "id": "133",
          "name": "Imphal",
          "state": "Manipur"
        },
        {
          "id": "134",
          "name": "Hapur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "135",
          "name": "Ranipet",
          "state": "Tamil Nadu"
        },
        {
          "id": "136",
          "name": "Anantapur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "137",
          "name": "Arrah",
          "state": "Bihar"
        },
        {
          "id": "138",
          "name": "Karimnagar",
          "state": "Telangana"
        },
        {
          "id": "139",
          "name": "Parbhani",
          "state": "Maharashtra"
        },
        {
          "id": "140",
          "name": "Etawah",
          "state": "Uttar Pradesh"
        },
        {
          "id": "141",
          "name": "Bharatpur",
          "state": "Rajasthan"
        },
        {
          "id": "142",
          "name": "Begusarai",
          "state": "Bihar"
        },
        {
          "id": "143",
          "name": "New Delhi",
          "state": "Delhi"
        },
        {
          "id": "144",
          "name": "Chhapra",
          "state": "Bihar"
        },
        {
          "id": "145",
          "name": "Kadapa",
          "state": "Andhra Pradesh"
        },
        {
          "id": "146",
          "name": "Ramagundam",
          "state": "Telangana"
        },
        {
          "id": "147",
          "name": "Pali",
          "state": "Rajasthan"
        },
        {
          "id": "148",
          "name": "Satna",
          "state": "Madhya Pradesh"
        },
        {
          "id": "149",
          "name": "Vizianagaram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "150",
          "name": "Katihar",
          "state": "Bihar"
        },
        {
          "id": "151",
          "name": "Hardwar",
          "state": "Uttarakhand"
        },
        {
          "id": "152",
          "name": "Sonipat",
          "state": "Haryana"
        },
        {
          "id": "153",
          "name": "Nagercoil",
          "state": "Tamil Nadu"
        },
        {
          "id": "154",
          "name": "Thanjavur",
          "state": "Tamil Nadu"
        },
        {
          "id": "155",
          "name": "Murwara (Katni)",
          "state": "Madhya Pradesh"
        },
        {
          "id": "156",
          "name": "Naihati",
          "state": "West Bengal"
        },
        {
          "id": "157",
          "name": "Sambhal",
          "state": "Uttar Pradesh"
        },
        {
          "id": "158",
          "name": "Nadiad",
          "state": "Gujarat"
        },
        {
          "id": "159",
          "name": "Yamunanagar",
          "state": "Haryana"
        },
        {
          "id": "160",
          "name": "English Bazar",
          "state": "West Bengal"
        },
        {
          "id": "161",
          "name": "Eluru",
          "state": "Andhra Pradesh"
        },
        {
          "id": "162",
          "name": "Munger",
          "state": "Bihar"
        },
        {
          "id": "163",
          "name": "Panchkula",
          "state": "Haryana"
        },
        {
          "id": "164",
          "name": "Raayachuru",
          "state": "Karnataka"
        },
        {
          "id": "165",
          "name": "Panvel",
          "state": "Maharashtra"
        },
        {
          "id": "166",
          "name": "Deoghar",
          "state": "Jharkhand"
        },
        {
          "id": "167",
          "name": "Ongole",
          "state": "Andhra Pradesh"
        },
        {
          "id": "168",
          "name": "Nandyal",
          "state": "Andhra Pradesh"
        },
        {
          "id": "169",
          "name": "Morena",
          "state": "Madhya Pradesh"
        },
        {
          "id": "170",
          "name": "Bhiwani",
          "state": "Haryana"
        },
        {
          "id": "171",
          "name": "Porbandar",
          "state": "Gujarat"
        },
        {
          "id": "172",
          "name": "Palakkad",
          "state": "Kerala"
        },
        {
          "id": "173",
          "name": "Anand",
          "state": "Gujarat"
        },
        {
          "id": "174",
          "name": "Purnia",
          "state": "Bihar"
        },
        {
          "id": "175",
          "name": "Baharampur",
          "state": "West Bengal"
        },
        {
          "id": "176",
          "name": "Barmer",
          "state": "Rajasthan"
        },
        {
          "id": "177",
          "name": "Morvi",
          "state": "Gujarat"
        },
        {
          "id": "178",
          "name": "Orai",
          "state": "Uttar Pradesh"
        },
        {
          "id": "179",
          "name": "Bahraich",
          "state": "Uttar Pradesh"
        },
        {
          "id": "180",
          "name": "Sikar",
          "state": "Rajasthan"
        },
        {
          "id": "181",
          "name": "Vellore",
          "state": "Tamil Nadu"
        },
        {
          "id": "182",
          "name": "Singrauli",
          "state": "Madhya Pradesh"
        },
        {
          "id": "183",
          "name": "Khammam",
          "state": "Telangana"
        },
        {
          "id": "184",
          "name": "Mahesana",
          "state": "Gujarat"
        },
        {
          "id": "185",
          "name": "Silchar",
          "state": "Assam"
        },
        {
          "id": "186",
          "name": "Sambalpur",
          "state": "Odisha"
        },
        {
          "id": "187",
          "name": "Rewa",
          "state": "Madhya Pradesh"
        },
        {
          "id": "188",
          "name": "Unnao",
          "state": "Uttar Pradesh"
        },
        {
          "id": "189",
          "name": "Hugli-Chinsurah",
          "state": "West Bengal"
        },
        {
          "id": "190",
          "name": "Raiganj",
          "state": "West Bengal"
        },
        {
          "id": "191",
          "name": "Phusro",
          "state": "Jharkhand"
        },
        {
          "id": "192",
          "name": "Adityapur",
          "state": "Jharkhand"
        },
        {
          "id": "193",
          "name": "Alappuzha",
          "state": "Kerala"
        },
        {
          "id": "194",
          "name": "Bahadurgarh",
          "state": "Haryana"
        },
        {
          "id": "195",
          "name": "Machilipatnam",
          "state": "Andhra Pradesh"
        },
        {
          "id": "196",
          "name": "Rae Bareli",
          "state": "Uttar Pradesh"
        },
        {
          "id": "197",
          "name": "Jalpaiguri",
          "state": "West Bengal"
        },
        {
          "id": "198",
          "name": "Bharuch",
          "state": "Gujarat"
        },
        {
          "id": "199",
          "name": "Pathankot",
          "state": "Punjab"
        },
        {
          "id": "200",
          "name": "Hoshiarpur",
          "state": "Punjab"
        },
        {
          "id": "201",
          "name": "Baramula",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "202",
          "name": "Adoni",
          "state": "Andhra Pradesh"
        },
        {
          "id": "203",
          "name": "Jind",
          "state": "Haryana"
        },
        {
          "id": "204",
          "name": "Tonk",
          "state": "Rajasthan"
        },
        {
          "id": "205",
          "name": "Tenali",
          "state": "Andhra Pradesh"
        },
        {
          "id": "206",
          "name": "Kancheepuram",
          "state": "Tamil Nadu"
        },
        {
          "id": "207",
          "name": "Vapi",
          "state": "Gujarat"
        },
        {
          "id": "208",
          "name": "Sirsa",
          "state": "Haryana"
        },
        {
          "id": "209",
          "name": "Navsari",
          "state": "Gujarat"
        },
        {
          "id": "210",
          "name": "Mahbubnagar",
          "state": "Telangana"
        },
        {
          "id": "211",
          "name": "Puri",
          "state": "Odisha"
        },
        {
          "id": "212",
          "name": "Robertson Pet",
          "state": "Karnataka"
        },
        {
          "id": "213",
          "name": "Erode",
          "state": "Tamil Nadu"
        },
        {
          "id": "214",
          "name": "Batala",
          "state": "Punjab"
        },
        {
          "id": "215",
          "name": "Haldwani-cum-Kathgodam",
          "state": "Uttarakhand"
        },
        {
          "id": "216",
          "name": "Vidisha",
          "state": "Madhya Pradesh"
        },
        {
          "id": "217",
          "name": "Saharsa",
          "state": "Bihar"
        },
        {
          "id": "218",
          "name": "Thanesar",
          "state": "Haryana"
        },
        {
          "id": "219",
          "name": "Chittoor",
          "state": "Andhra Pradesh"
        },
        {
          "id": "220",
          "name": "Veraval",
          "state": "Gujarat"
        },
        {
          "id": "221",
          "name": "Lakhimpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "222",
          "name": "Sitapur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "223",
          "name": "Hindupur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "224",
          "name": "Santipur",
          "state": "West Bengal"
        },
        {
          "id": "225",
          "name": "Balurghat",
          "state": "West Bengal"
        },
        {
          "id": "226",
          "name": "Ganjbasoda",
          "state": "Madhya Pradesh"
        },
        {
          "id": "227",
          "name": "Moga",
          "state": "Punjab"
        },
        {
          "id": "228",
          "name": "Proddatur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "229",
          "name": "Srinagar",
          "state": "Uttarakhand"
        },
        {
          "id": "230",
          "name": "Medinipur",
          "state": "West Bengal"
        },
        {
          "id": "231",
          "name": "Habra",
          "state": "West Bengal"
        },
        {
          "id": "232",
          "name": "Sasaram",
          "state": "Bihar"
        },
        {
          "id": "233",
          "name": "Hajipur",
          "state": "Bihar"
        },
        {
          "id": "234",
          "name": "Bhuj",
          "state": "Gujarat"
        },
        {
          "id": "235",
          "name": "Shivpuri",
          "state": "Madhya Pradesh"
        },
        {
          "id": "236",
          "name": "Ranaghat",
          "state": "West Bengal"
        },
        {
          "id": "237",
          "name": "Shimla",
          "state": "Himachal Pradesh"
        },
        {
          "id": "238",
          "name": "Tiruvannamalai",
          "state": "Tamil Nadu"
        },
        {
          "id": "239",
          "name": "Kaithal",
          "state": "Haryana"
        },
        {
          "id": "240",
          "name": "Rajnandgaon",
          "state": "Chhattisgarh"
        },
        {
          "id": "241",
          "name": "Godhra",
          "state": "Gujarat"
        },
        {
          "id": "242",
          "name": "Hazaribag",
          "state": "Jharkhand"
        },
        {
          "id": "243",
          "name": "Bhimavaram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "244",
          "name": "Mandsaur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "245",
          "name": "Dibrugarh",
          "state": "Assam"
        },
        {
          "id": "246",
          "name": "Kolar",
          "state": "Karnataka"
        },
        {
          "id": "247",
          "name": "Bankura",
          "state": "West Bengal"
        },
        {
          "id": "248",
          "name": "Mandya",
          "state": "Karnataka"
        },
        {
          "id": "249",
          "name": "Dehri-on-Sone",
          "state": "Bihar"
        },
        {
          "id": "250",
          "name": "Madanapalle",
          "state": "Andhra Pradesh"
        },
        {
          "id": "251",
          "name": "Malerkotla",
          "state": "Punjab"
        },
        {
          "id": "252",
          "name": "Lalitpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "253",
          "name": "Bettiah",
          "state": "Bihar"
        },
        {
          "id": "254",
          "name": "Pollachi",
          "state": "Tamil Nadu"
        },
        {
          "id": "255",
          "name": "Khanna",
          "state": "Punjab"
        },
        {
          "id": "256",
          "name": "Neemuch",
          "state": "Madhya Pradesh"
        },
        {
          "id": "257",
          "name": "Palwal",
          "state": "Haryana"
        },
        {
          "id": "258",
          "name": "Palanpur",
          "state": "Gujarat"
        },
        {
          "id": "259",
          "name": "Guntakal",
          "state": "Andhra Pradesh"
        },
        {
          "id": "260",
          "name": "Nabadwip",
          "state": "West Bengal"
        },
        {
          "id": "261",
          "name": "Udupi",
          "state": "Karnataka"
        },
        {
          "id": "262",
          "name": "Jagdalpur",
          "state": "Chhattisgarh"
        },
        {
          "id": "263",
          "name": "Motihari",
          "state": "Bihar"
        },
        {
          "id": "264",
          "name": "Pilibhit",
          "state": "Uttar Pradesh"
        },
        {
          "id": "265",
          "name": "Dimapur",
          "state": "Nagaland"
        },
        {
          "id": "266",
          "name": "Mohali",
          "state": "Punjab"
        },
        {
          "id": "267",
          "name": "Sadulpur",
          "state": "Rajasthan"
        },
        {
          "id": "268",
          "name": "Rajapalayam",
          "state": "Tamil Nadu"
        },
        {
          "id": "269",
          "name": "Dharmavaram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "270",
          "name": "Kashipur",
          "state": "Uttarakhand"
        },
        {
          "id": "271",
          "name": "Sivakasi",
          "state": "Tamil Nadu"
        },
        {
          "id": "272",
          "name": "Darjiling",
          "state": "West Bengal"
        },
        {
          "id": "273",
          "name": "Chikkamagaluru",
          "state": "Karnataka"
        },
        {
          "id": "274",
          "name": "Gudivada",
          "state": "Andhra Pradesh"
        },
        {
          "id": "275",
          "name": "Baleshwar Town",
          "state": "Odisha"
        },
        {
          "id": "276",
          "name": "Mancherial",
          "state": "Telangana"
        },
        {
          "id": "277",
          "name": "Srikakulam",
          "state": "Andhra Pradesh"
        },
        {
          "id": "278",
          "name": "Adilabad",
          "state": "Telangana"
        },
        {
          "id": "279",
          "name": "Yavatmal",
          "state": "Maharashtra"
        },
        {
          "id": "280",
          "name": "Barnala",
          "state": "Punjab"
        },
        {
          "id": "281",
          "name": "Nagaon",
          "state": "Assam"
        },
        {
          "id": "282",
          "name": "Narasaraopet",
          "state": "Andhra Pradesh"
        },
        {
          "id": "283",
          "name": "Raigarh",
          "state": "Chhattisgarh"
        },
        {
          "id": "284",
          "name": "Roorkee",
          "state": "Uttarakhand"
        },
        {
          "id": "285",
          "name": "Valsad",
          "state": "Gujarat"
        },
        {
          "id": "286",
          "name": "Ambikapur",
          "state": "Chhattisgarh"
        },
        {
          "id": "287",
          "name": "Giridih",
          "state": "Jharkhand"
        },
        {
          "id": "288",
          "name": "Chandausi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "289",
          "name": "Purulia",
          "state": "West Bengal"
        },
        {
          "id": "290",
          "name": "Patan",
          "state": "Gujarat"
        },
        {
          "id": "291",
          "name": "Bagaha",
          "state": "Bihar"
        },
        {
          "id": "292",
          "name": "Hardoi ",
          "state": "Uttar Pradesh"
        },
        {
          "id": "293",
          "name": "Achalpur",
          "state": "Maharashtra"
        },
        {
          "id": "294",
          "name": "Osmanabad",
          "state": "Maharashtra"
        },
        {
          "id": "295",
          "name": "Deesa",
          "state": "Gujarat"
        },
        {
          "id": "296",
          "name": "Nandurbar",
          "state": "Maharashtra"
        },
        {
          "id": "297",
          "name": "Azamgarh",
          "state": "Uttar Pradesh"
        },
        {
          "id": "298",
          "name": "Ramgarh",
          "state": "Jharkhand"
        },
        {
          "id": "299",
          "name": "Firozpur",
          "state": "Punjab"
        },
        {
          "id": "300",
          "name": "Baripada Town",
          "state": "Odisha"
        },
        {
          "id": "301",
          "name": "Karwar",
          "state": "Karnataka"
        },
        {
          "id": "302",
          "name": "Siwan",
          "state": "Bihar"
        },
        {
          "id": "303",
          "name": "Rajampet",
          "state": "Andhra Pradesh"
        },
        {
          "id": "304",
          "name": "Pudukkottai",
          "state": "Tamil Nadu"
        },
        {
          "id": "305",
          "name": "Anantnag",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "306",
          "name": "Tadpatri",
          "state": "Andhra Pradesh"
        },
        {
          "id": "307",
          "name": "Satara",
          "state": "Maharashtra"
        },
        {
          "id": "308",
          "name": "Bhadrak",
          "state": "Odisha"
        },
        {
          "id": "309",
          "name": "Kishanganj",
          "state": "Bihar"
        },
        {
          "id": "310",
          "name": "Suryapet",
          "state": "Telangana"
        },
        {
          "id": "311",
          "name": "Wardha",
          "state": "Maharashtra"
        },
        {
          "id": "312",
          "name": "Ranebennuru",
          "state": "Karnataka"
        },
        {
          "id": "313",
          "name": "Amreli",
          "state": "Gujarat"
        },
        {
          "id": "314",
          "name": "Neyveli (TS)",
          "state": "Tamil Nadu"
        },
        {
          "id": "315",
          "name": "Jamalpur",
          "state": "Bihar"
        },
        {
          "id": "316",
          "name": "Marmagao",
          "state": "Goa"
        },
        {
          "id": "317",
          "name": "Udgir",
          "state": "Maharashtra"
        },
        {
          "id": "318",
          "name": "Tadepalligudem",
          "state": "Andhra Pradesh"
        },
        {
          "id": "319",
          "name": "Nagapattinam",
          "state": "Tamil Nadu"
        },
        {
          "id": "320",
          "name": "Buxar",
          "state": "Bihar"
        },
        {
          "id": "321",
          "name": "Aurangabad",
          "state": "Maharashtra"
        },
        {
          "id": "322",
          "name": "Jehanabad",
          "state": "Bihar"
        },
        {
          "id": "323",
          "name": "Phagwara",
          "state": "Punjab"
        },
        {
          "id": "324",
          "name": "Khair",
          "state": "Uttar Pradesh"
        },
        {
          "id": "325",
          "name": "Sawai Madhopur",
          "state": "Rajasthan"
        },
        {
          "id": "326",
          "name": "Kapurthala",
          "state": "Punjab"
        },
        {
          "id": "327",
          "name": "Chilakaluripet",
          "state": "Andhra Pradesh"
        },
        {
          "id": "328",
          "name": "Aurangabad",
          "state": "Bihar"
        },
        {
          "id": "329",
          "name": "Malappuram",
          "state": "Kerala"
        },
        {
          "id": "330",
          "name": "Rewari",
          "state": "Haryana"
        },
        {
          "id": "331",
          "name": "Nagaur",
          "state": "Rajasthan"
        },
        {
          "id": "332",
          "name": "Sultanpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "333",
          "name": "Nagda",
          "state": "Madhya Pradesh"
        },
        {
          "id": "334",
          "name": "Port Blair",
          "state": "Andaman and Nicobar Islands"
        },
        {
          "id": "335",
          "name": "Lakhisarai",
          "state": "Bihar"
        },
        {
          "id": "336",
          "name": "Panaji",
          "state": "Goa"
        },
        {
          "id": "337",
          "name": "Tinsukia",
          "state": "Assam"
        },
        {
          "id": "338",
          "name": "Itarsi",
          "state": "Madhya Pradesh"
        },
        {
          "id": "339",
          "name": "Kohima",
          "state": "Nagaland"
        },
        {
          "id": "340",
          "name": "Balangir",
          "state": "Odisha"
        },
        {
          "id": "341",
          "name": "Nawada",
          "state": "Bihar"
        },
        {
          "id": "342",
          "name": "Jharsuguda",
          "state": "Odisha"
        },
        {
          "id": "343",
          "name": "Jagtial",
          "state": "Telangana"
        },
        {
          "id": "344",
          "name": "Viluppuram",
          "state": "Tamil Nadu"
        },
        {
          "id": "345",
          "name": "Amalner",
          "state": "Maharashtra"
        },
        {
          "id": "346",
          "name": "Zirakpur",
          "state": "Punjab"
        },
        {
          "id": "347",
          "name": "Tanda",
          "state": "Uttar Pradesh"
        },
        {
          "id": "348",
          "name": "Tiruchengode",
          "state": "Tamil Nadu"
        },
        {
          "id": "349",
          "name": "Nagina",
          "state": "Uttar Pradesh"
        },
        {
          "id": "350",
          "name": "Yemmiganur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "351",
          "name": "Vaniyambadi",
          "state": "Tamil Nadu"
        },
        {
          "id": "352",
          "name": "Sarni",
          "state": "Madhya Pradesh"
        },
        {
          "id": "353",
          "name": "Theni Allinagaram",
          "state": "Tamil Nadu"
        },
        {
          "id": "354",
          "name": "Margao",
          "state": "Goa"
        },
        {
          "id": "355",
          "name": "Akot",
          "state": "Maharashtra"
        },
        {
          "id": "356",
          "name": "Sehore",
          "state": "Madhya Pradesh"
        },
        {
          "id": "357",
          "name": "Mhow Cantonment",
          "state": "Madhya Pradesh"
        },
        {
          "id": "358",
          "name": "Kot Kapura",
          "state": "Punjab"
        },
        {
          "id": "359",
          "name": "Makrana",
          "state": "Rajasthan"
        },
        {
          "id": "360",
          "name": "Pandharpur",
          "state": "Maharashtra"
        },
        {
          "id": "361",
          "name": "Miryalaguda",
          "state": "Telangana"
        },
        {
          "id": "362",
          "name": "Shamli",
          "state": "Uttar Pradesh"
        },
        {
          "id": "363",
          "name": "Seoni",
          "state": "Madhya Pradesh"
        },
        {
          "id": "364",
          "name": "Ranibennur",
          "state": "Karnataka"
        },
        {
          "id": "365",
          "name": "Kadiri",
          "state": "Andhra Pradesh"
        },
        {
          "id": "366",
          "name": "Shrirampur",
          "state": "Maharashtra"
        },
        {
          "id": "367",
          "name": "Rudrapur",
          "state": "Uttarakhand"
        },
        {
          "id": "368",
          "name": "Parli",
          "state": "Maharashtra"
        },
        {
          "id": "369",
          "name": "Najibabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "370",
          "name": "Nirmal",
          "state": "Telangana"
        },
        {
          "id": "371",
          "name": "Udhagamandalam",
          "state": "Tamil Nadu"
        },
        {
          "id": "372",
          "name": "Shikohabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "373",
          "name": "Jhumri Tilaiya",
          "state": "Jharkhand"
        },
        {
          "id": "374",
          "name": "Aruppukkottai",
          "state": "Tamil Nadu"
        },
        {
          "id": "375",
          "name": "Ponnani",
          "state": "Kerala"
        },
        {
          "id": "376",
          "name": "Jamui",
          "state": "Bihar"
        },
        {
          "id": "377",
          "name": "Sitamarhi",
          "state": "Bihar"
        },
        {
          "id": "378",
          "name": "Chirala",
          "state": "Andhra Pradesh"
        },
        {
          "id": "379",
          "name": "Anjar",
          "state": "Gujarat"
        },
        {
          "id": "380",
          "name": "Karaikal",
          "state": "Puducherry"
        },
        {
          "id": "381",
          "name": "Hansi",
          "state": "Haryana"
        },
        {
          "id": "382",
          "name": "Anakapalle",
          "state": "Andhra Pradesh"
        },
        {
          "id": "383",
          "name": "Mahasamund",
          "state": "Chhattisgarh"
        },
        {
          "id": "384",
          "name": "Faridkot",
          "state": "Punjab"
        },
        {
          "id": "385",
          "name": "Saunda",
          "state": "Jharkhand"
        },
        {
          "id": "386",
          "name": "Dhoraji",
          "state": "Gujarat"
        },
        {
          "id": "387",
          "name": "Paramakudi",
          "state": "Tamil Nadu"
        },
        {
          "id": "388",
          "name": "Balaghat",
          "state": "Madhya Pradesh"
        },
        {
          "id": "389",
          "name": "Sujangarh",
          "state": "Rajasthan"
        },
        {
          "id": "390",
          "name": "Khambhat",
          "state": "Gujarat"
        },
        {
          "id": "391",
          "name": "Muktsar",
          "state": "Punjab"
        },
        {
          "id": "392",
          "name": "Rajpura",
          "state": "Punjab"
        },
        {
          "id": "393",
          "name": "Kavali",
          "state": "Andhra Pradesh"
        },
        {
          "id": "394",
          "name": "Dhamtari",
          "state": "Chhattisgarh"
        },
        {
          "id": "395",
          "name": "Ashok Nagar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "396",
          "name": "Sardarshahar",
          "state": "Rajasthan"
        },
        {
          "id": "397",
          "name": "Mahuva",
          "state": "Gujarat"
        },
        {
          "id": "398",
          "name": "Bargarh",
          "state": "Odisha"
        },
        {
          "id": "399",
          "name": "Kamareddy",
          "state": "Telangana"
        },
        {
          "id": "400",
          "name": "Sahibganj",
          "state": "Jharkhand"
        },
        {
          "id": "401",
          "name": "Kothagudem",
          "state": "Telangana"
        },
        {
          "id": "402",
          "name": "Ramanagaram",
          "state": "Karnataka"
        },
        {
          "id": "403",
          "name": "Gokak",
          "state": "Karnataka"
        },
        {
          "id": "404",
          "name": "Tikamgarh",
          "state": "Madhya Pradesh"
        },
        {
          "id": "405",
          "name": "Araria",
          "state": "Bihar"
        },
        {
          "id": "406",
          "name": "Rishikesh",
          "state": "Uttarakhand"
        },
        {
          "id": "407",
          "name": "Shahdol",
          "state": "Madhya Pradesh"
        },
        {
          "id": "408",
          "name": "Medininagar (Daltonganj)",
          "state": "Jharkhand"
        },
        {
          "id": "409",
          "name": "Arakkonam",
          "state": "Tamil Nadu"
        },
        {
          "id": "410",
          "name": "Washim",
          "state": "Maharashtra"
        },
        {
          "id": "411",
          "name": "Sangrur",
          "state": "Punjab"
        },
        {
          "id": "412",
          "name": "Bodhan",
          "state": "Telangana"
        },
        {
          "id": "413",
          "name": "Fazilka",
          "state": "Punjab"
        },
        {
          "id": "414",
          "name": "Palacole",
          "state": "Andhra Pradesh"
        },
        {
          "id": "415",
          "name": "Keshod",
          "state": "Gujarat"
        },
        {
          "id": "416",
          "name": "Sullurpeta",
          "state": "Andhra Pradesh"
        },
        {
          "id": "417",
          "name": "Wadhwan",
          "state": "Gujarat"
        },
        {
          "id": "418",
          "name": "Gurdaspur",
          "state": "Punjab"
        },
        {
          "id": "419",
          "name": "Vatakara",
          "state": "Kerala"
        },
        {
          "id": "420",
          "name": "Tura",
          "state": "Meghalaya"
        },
        {
          "id": "421",
          "name": "Narnaul",
          "state": "Haryana"
        },
        {
          "id": "422",
          "name": "Kharar",
          "state": "Punjab"
        },
        {
          "id": "423",
          "name": "Yadgir",
          "state": "Karnataka"
        },
        {
          "id": "424",
          "name": "Ambejogai",
          "state": "Maharashtra"
        },
        {
          "id": "425",
          "name": "Ankleshwar",
          "state": "Gujarat"
        },
        {
          "id": "426",
          "name": "Savarkundla",
          "state": "Gujarat"
        },
        {
          "id": "427",
          "name": "Paradip",
          "state": "Odisha"
        },
        {
          "id": "428",
          "name": "Virudhachalam",
          "state": "Tamil Nadu"
        },
        {
          "id": "429",
          "name": "Kanhangad",
          "state": "Kerala"
        },
        {
          "id": "430",
          "name": "Kadi",
          "state": "Gujarat"
        },
        {
          "id": "431",
          "name": "Srivilliputhur",
          "state": "Tamil Nadu"
        },
        {
          "id": "432",
          "name": "Gobindgarh",
          "state": "Punjab"
        },
        {
          "id": "433",
          "name": "Tindivanam",
          "state": "Tamil Nadu"
        },
        {
          "id": "434",
          "name": "Mansa",
          "state": "Punjab"
        },
        {
          "id": "435",
          "name": "Taliparamba",
          "state": "Kerala"
        },
        {
          "id": "436",
          "name": "Manmad",
          "state": "Maharashtra"
        },
        {
          "id": "437",
          "name": "Tanuku",
          "state": "Andhra Pradesh"
        },
        {
          "id": "438",
          "name": "Rayachoti",
          "state": "Andhra Pradesh"
        },
        {
          "id": "439",
          "name": "Virudhunagar",
          "state": "Tamil Nadu"
        },
        {
          "id": "440",
          "name": "Koyilandy",
          "state": "Kerala"
        },
        {
          "id": "441",
          "name": "Jorhat",
          "state": "Assam"
        },
        {
          "id": "442",
          "name": "Karur",
          "state": "Tamil Nadu"
        },
        {
          "id": "443",
          "name": "Valparai",
          "state": "Tamil Nadu"
        },
        {
          "id": "444",
          "name": "Srikalahasti",
          "state": "Andhra Pradesh"
        },
        {
          "id": "445",
          "name": "Neyyattinkara",
          "state": "Kerala"
        },
        {
          "id": "446",
          "name": "Bapatla",
          "state": "Andhra Pradesh"
        },
        {
          "id": "447",
          "name": "Fatehabad",
          "state": "Haryana"
        },
        {
          "id": "448",
          "name": "Malout",
          "state": "Punjab"
        },
        {
          "id": "449",
          "name": "Sankarankovil",
          "state": "Tamil Nadu"
        },
        {
          "id": "450",
          "name": "Tenkasi",
          "state": "Tamil Nadu"
        },
        {
          "id": "451",
          "name": "Ratnagiri",
          "state": "Maharashtra"
        },
        {
          "id": "452",
          "name": "Rabkavi Banhatti",
          "state": "Karnataka"
        },
        {
          "id": "453",
          "name": "Sikandrabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "454",
          "name": "Chaibasa",
          "state": "Jharkhand"
        },
        {
          "id": "455",
          "name": "Chirmiri",
          "state": "Chhattisgarh"
        },
        {
          "id": "456",
          "name": "Palwancha",
          "state": "Telangana"
        },
        {
          "id": "457",
          "name": "Bhawanipatna",
          "state": "Odisha"
        },
        {
          "id": "458",
          "name": "Kayamkulam",
          "state": "Kerala"
        },
        {
          "id": "459",
          "name": "Pithampur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "460",
          "name": "Nabha",
          "state": "Punjab"
        },
        {
          "id": "461",
          "name": "Shahabad, Hardoi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "462",
          "name": "Dhenkanal",
          "state": "Odisha"
        },
        {
          "id": "463",
          "name": "Uran Islampur",
          "state": "Maharashtra"
        },
        {
          "id": "464",
          "name": "Gopalganj",
          "state": "Bihar"
        },
        {
          "id": "465",
          "name": "Bongaigaon City",
          "state": "Assam"
        },
        {
          "id": "466",
          "name": "Palani",
          "state": "Tamil Nadu"
        },
        {
          "id": "467",
          "name": "Pusad",
          "state": "Maharashtra"
        },
        {
          "id": "468",
          "name": "Sopore",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "469",
          "name": "Pilkhuwa",
          "state": "Uttar Pradesh"
        },
        {
          "id": "470",
          "name": "Tarn Taran",
          "state": "Punjab"
        },
        {
          "id": "471",
          "name": "Renukoot",
          "state": "Uttar Pradesh"
        },
        {
          "id": "472",
          "name": "Mandamarri",
          "state": "Telangana"
        },
        {
          "id": "473",
          "name": "Shahabad",
          "state": "Karnataka"
        },
        {
          "id": "474",
          "name": "Barbil",
          "state": "Odisha"
        },
        {
          "id": "475",
          "name": "Koratla",
          "state": "Telangana"
        },
        {
          "id": "476",
          "name": "Madhubani",
          "state": "Bihar"
        },
        {
          "id": "477",
          "name": "Arambagh",
          "state": "West Bengal"
        },
        {
          "id": "478",
          "name": "Gohana",
          "state": "Haryana"
        },
        {
          "id": "479",
          "name": "Ladnu",
          "state": "Rajasthan"
        },
        {
          "id": "480",
          "name": "Pattukkottai",
          "state": "Tamil Nadu"
        },
        {
          "id": "481",
          "name": "Sirsi",
          "state": "Karnataka"
        },
        {
          "id": "482",
          "name": "Sircilla",
          "state": "Telangana"
        },
        {
          "id": "483",
          "name": "Tamluk",
          "state": "West Bengal"
        },
        {
          "id": "484",
          "name": "Jagraon",
          "state": "Punjab"
        },
        {
          "id": "485",
          "name": "AlipurdUrban Agglomerationr",
          "state": "West Bengal"
        },
        {
          "id": "486",
          "name": "Alirajpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "487",
          "name": "Tandur",
          "state": "Telangana"
        },
        {
          "id": "488",
          "name": "Naidupet",
          "state": "Andhra Pradesh"
        },
        {
          "id": "489",
          "name": "Tirupathur",
          "state": "Tamil Nadu"
        },
        {
          "id": "490",
          "name": "Tohana",
          "state": "Haryana"
        },
        {
          "id": "491",
          "name": "Ratangarh",
          "state": "Rajasthan"
        },
        {
          "id": "492",
          "name": "Dhubri",
          "state": "Assam"
        },
        {
          "id": "493",
          "name": "Masaurhi",
          "state": "Bihar"
        },
        {
          "id": "494",
          "name": "Visnagar",
          "state": "Gujarat"
        },
        {
          "id": "495",
          "name": "Vrindavan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "496",
          "name": "Nokha",
          "state": "Rajasthan"
        },
        {
          "id": "497",
          "name": "Nagari",
          "state": "Andhra Pradesh"
        },
        {
          "id": "498",
          "name": "Narwana",
          "state": "Haryana"
        },
        {
          "id": "499",
          "name": "Ramanathapuram",
          "state": "Tamil Nadu"
        },
        {
          "id": "500",
          "name": "Ujhani",
          "state": "Uttar Pradesh"
        },
        {
          "id": "501",
          "name": "Samastipur",
          "state": "Bihar"
        },
        {
          "id": "502",
          "name": "Laharpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "503",
          "name": "Sangamner",
          "state": "Maharashtra"
        },
        {
          "id": "504",
          "name": "Nimbahera",
          "state": "Rajasthan"
        },
        {
          "id": "505",
          "name": "Siddipet",
          "state": "Telangana"
        },
        {
          "id": "506",
          "name": "Suri",
          "state": "West Bengal"
        },
        {
          "id": "507",
          "name": "Diphu",
          "state": "Assam"
        },
        {
          "id": "508",
          "name": "Jhargram",
          "state": "West Bengal"
        },
        {
          "id": "509",
          "name": "Shirpur-Warwade",
          "state": "Maharashtra"
        },
        {
          "id": "510",
          "name": "Tilhar",
          "state": "Uttar Pradesh"
        },
        {
          "id": "511",
          "name": "Sindhnur",
          "state": "Karnataka"
        },
        {
          "id": "512",
          "name": "Udumalaipettai",
          "state": "Tamil Nadu"
        },
        {
          "id": "513",
          "name": "Malkapur",
          "state": "Maharashtra"
        },
        {
          "id": "514",
          "name": "Wanaparthy",
          "state": "Telangana"
        },
        {
          "id": "515",
          "name": "Gudur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "516",
          "name": "Kendujhar",
          "state": "Odisha"
        },
        {
          "id": "517",
          "name": "Mandla",
          "state": "Madhya Pradesh"
        },
        {
          "id": "518",
          "name": "Mandi",
          "state": "Himachal Pradesh"
        },
        {
          "id": "519",
          "name": "Nedumangad",
          "state": "Kerala"
        },
        {
          "id": "520",
          "name": "North Lakhimpur",
          "state": "Assam"
        },
        {
          "id": "521",
          "name": "Vinukonda",
          "state": "Andhra Pradesh"
        },
        {
          "id": "522",
          "name": "Tiptur",
          "state": "Karnataka"
        },
        {
          "id": "523",
          "name": "Gobichettipalayam",
          "state": "Tamil Nadu"
        },
        {
          "id": "524",
          "name": "Sunabeda",
          "state": "Odisha"
        },
        {
          "id": "525",
          "name": "Wani",
          "state": "Maharashtra"
        },
        {
          "id": "526",
          "name": "Upleta",
          "state": "Gujarat"
        },
        {
          "id": "527",
          "name": "Narasapuram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "528",
          "name": "Nuzvid",
          "state": "Andhra Pradesh"
        },
        {
          "id": "529",
          "name": "Tezpur",
          "state": "Assam"
        },
        {
          "id": "530",
          "name": "Una",
          "state": "Gujarat"
        },
        {
          "id": "531",
          "name": "Markapur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "532",
          "name": "Sheopur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "533",
          "name": "Thiruvarur",
          "state": "Tamil Nadu"
        },
        {
          "id": "534",
          "name": "Sidhpur",
          "state": "Gujarat"
        },
        {
          "id": "535",
          "name": "Sahaswan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "536",
          "name": "Suratgarh",
          "state": "Rajasthan"
        },
        {
          "id": "537",
          "name": "Shajapur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "538",
          "name": "Rayagada",
          "state": "Odisha"
        },
        {
          "id": "539",
          "name": "Lonavla",
          "state": "Maharashtra"
        },
        {
          "id": "540",
          "name": "Ponnur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "541",
          "name": "Kagaznagar",
          "state": "Telangana"
        },
        {
          "id": "542",
          "name": "Gadwal",
          "state": "Telangana"
        },
        {
          "id": "543",
          "name": "Bhatapara",
          "state": "Chhattisgarh"
        },
        {
          "id": "544",
          "name": "Kandukur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "545",
          "name": "Sangareddy",
          "state": "Telangana"
        },
        {
          "id": "546",
          "name": "Unjha",
          "state": "Gujarat"
        },
        {
          "id": "547",
          "name": "Lunglei",
          "state": "Mizoram"
        },
        {
          "id": "548",
          "name": "Karimganj",
          "state": "Assam"
        },
        {
          "id": "549",
          "name": "Kannur",
          "state": "Kerala"
        },
        {
          "id": "550",
          "name": "Bobbili",
          "state": "Andhra Pradesh"
        },
        {
          "id": "551",
          "name": "Mokameh",
          "state": "Bihar"
        },
        {
          "id": "552",
          "name": "Talegaon Dabhade",
          "state": "Maharashtra"
        },
        {
          "id": "553",
          "name": "Anjangaon",
          "state": "Maharashtra"
        },
        {
          "id": "554",
          "name": "Mangrol",
          "state": "Gujarat"
        },
        {
          "id": "555",
          "name": "Sunam",
          "state": "Punjab"
        },
        {
          "id": "556",
          "name": "Gangarampur",
          "state": "West Bengal"
        },
        {
          "id": "557",
          "name": "Thiruvallur",
          "state": "Tamil Nadu"
        },
        {
          "id": "558",
          "name": "Tirur",
          "state": "Kerala"
        },
        {
          "id": "559",
          "name": "Rath",
          "state": "Uttar Pradesh"
        },
        {
          "id": "560",
          "name": "Jatani",
          "state": "Odisha"
        },
        {
          "id": "561",
          "name": "Viramgam",
          "state": "Gujarat"
        },
        {
          "id": "562",
          "name": "Rajsamand",
          "state": "Rajasthan"
        },
        {
          "id": "563",
          "name": "Yanam",
          "state": "Puducherry"
        },
        {
          "id": "564",
          "name": "Kottayam",
          "state": "Kerala"
        },
        {
          "id": "565",
          "name": "Panruti",
          "state": "Tamil Nadu"
        },
        {
          "id": "566",
          "name": "Dhuri",
          "state": "Punjab"
        },
        {
          "id": "567",
          "name": "Namakkal",
          "state": "Tamil Nadu"
        },
        {
          "id": "568",
          "name": "Kasaragod",
          "state": "Kerala"
        },
        {
          "id": "569",
          "name": "Modasa",
          "state": "Gujarat"
        },
        {
          "id": "570",
          "name": "Rayadurg",
          "state": "Andhra Pradesh"
        },
        {
          "id": "571",
          "name": "Supaul",
          "state": "Bihar"
        },
        {
          "id": "572",
          "name": "Kunnamkulam",
          "state": "Kerala"
        },
        {
          "id": "573",
          "name": "Umred",
          "state": "Maharashtra"
        },
        {
          "id": "574",
          "name": "Bellampalle",
          "state": "Telangana"
        },
        {
          "id": "575",
          "name": "Sibsagar",
          "state": "Assam"
        },
        {
          "id": "576",
          "name": "Mandi Dabwali",
          "state": "Haryana"
        },
        {
          "id": "577",
          "name": "Ottappalam",
          "state": "Kerala"
        },
        {
          "id": "578",
          "name": "Dumraon",
          "state": "Bihar"
        },
        {
          "id": "579",
          "name": "Samalkot",
          "state": "Andhra Pradesh"
        },
        {
          "id": "580",
          "name": "Jaggaiahpet",
          "state": "Andhra Pradesh"
        },
        {
          "id": "581",
          "name": "Goalpara",
          "state": "Assam"
        },
        {
          "id": "582",
          "name": "Tuni",
          "state": "Andhra Pradesh"
        },
        {
          "id": "583",
          "name": "Lachhmangarh",
          "state": "Rajasthan"
        },
        {
          "id": "584",
          "name": "Bhongir",
          "state": "Telangana"
        },
        {
          "id": "585",
          "name": "Amalapuram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "586",
          "name": "Firozpur Cantt.",
          "state": "Punjab"
        },
        {
          "id": "587",
          "name": "Vikarabad",
          "state": "Telangana"
        },
        {
          "id": "588",
          "name": "Thiruvalla",
          "state": "Kerala"
        },
        {
          "id": "589",
          "name": "Sherkot",
          "state": "Uttar Pradesh"
        },
        {
          "id": "590",
          "name": "Palghar",
          "state": "Maharashtra"
        },
        {
          "id": "591",
          "name": "Shegaon",
          "state": "Maharashtra"
        },
        {
          "id": "592",
          "name": "Jangaon",
          "state": "Telangana"
        },
        {
          "id": "593",
          "name": "Bheemunipatnam",
          "state": "Andhra Pradesh"
        },
        {
          "id": "594",
          "name": "Panna",
          "state": "Madhya Pradesh"
        },
        {
          "id": "595",
          "name": "Thodupuzha",
          "state": "Kerala"
        },
        {
          "id": "596",
          "name": "KathUrban Agglomeration",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "597",
          "name": "Palitana",
          "state": "Gujarat"
        },
        {
          "id": "598",
          "name": "Arwal",
          "state": "Bihar"
        },
        {
          "id": "599",
          "name": "Venkatagiri",
          "state": "Andhra Pradesh"
        },
        {
          "id": "600",
          "name": "Kalpi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "601",
          "name": "Rajgarh (Churu)",
          "state": "Rajasthan"
        },
        {
          "id": "602",
          "name": "Sattenapalle",
          "state": "Andhra Pradesh"
        },
        {
          "id": "603",
          "name": "Arsikere",
          "state": "Karnataka"
        },
        {
          "id": "604",
          "name": "Ozar",
          "state": "Maharashtra"
        },
        {
          "id": "605",
          "name": "Thirumangalam",
          "state": "Tamil Nadu"
        },
        {
          "id": "606",
          "name": "Petlad",
          "state": "Gujarat"
        },
        {
          "id": "607",
          "name": "Nasirabad",
          "state": "Rajasthan"
        },
        {
          "id": "608",
          "name": "Phaltan",
          "state": "Maharashtra"
        },
        {
          "id": "609",
          "name": "Rampurhat",
          "state": "West Bengal"
        },
        {
          "id": "610",
          "name": "Nanjangud",
          "state": "Karnataka"
        },
        {
          "id": "611",
          "name": "Forbesganj",
          "state": "Bihar"
        },
        {
          "id": "612",
          "name": "Tundla",
          "state": "Uttar Pradesh"
        },
        {
          "id": "613",
          "name": "BhabUrban Agglomeration",
          "state": "Bihar"
        },
        {
          "id": "614",
          "name": "Sagara",
          "state": "Karnataka"
        },
        {
          "id": "615",
          "name": "Pithapuram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "616",
          "name": "Sira",
          "state": "Karnataka"
        },
        {
          "id": "617",
          "name": "Bhadrachalam",
          "state": "Telangana"
        },
        {
          "id": "618",
          "name": "Charkhi Dadri",
          "state": "Haryana"
        },
        {
          "id": "619",
          "name": "Chatra",
          "state": "Jharkhand"
        },
        {
          "id": "620",
          "name": "Palasa Kasibugga",
          "state": "Andhra Pradesh"
        },
        {
          "id": "621",
          "name": "Nohar",
          "state": "Rajasthan"
        },
        {
          "id": "622",
          "name": "Yevla",
          "state": "Maharashtra"
        },
        {
          "id": "623",
          "name": "Sirhind Fatehgarh Sahib",
          "state": "Punjab"
        },
        {
          "id": "624",
          "name": "Bhainsa",
          "state": "Telangana"
        },
        {
          "id": "625",
          "name": "Parvathipuram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "626",
          "name": "Shahade",
          "state": "Maharashtra"
        },
        {
          "id": "627",
          "name": "Chalakudy",
          "state": "Kerala"
        },
        {
          "id": "628",
          "name": "Narkatiaganj",
          "state": "Bihar"
        },
        {
          "id": "629",
          "name": "Kapadvanj",
          "state": "Gujarat"
        },
        {
          "id": "630",
          "name": "Macherla",
          "state": "Andhra Pradesh"
        },
        {
          "id": "631",
          "name": "Raghogarh-Vijaypur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "632",
          "name": "Rupnagar",
          "state": "Punjab"
        },
        {
          "id": "633",
          "name": "Naugachhia",
          "state": "Bihar"
        },
        {
          "id": "634",
          "name": "Sendhwa",
          "state": "Madhya Pradesh"
        },
        {
          "id": "635",
          "name": "Byasanagar",
          "state": "Odisha"
        },
        {
          "id": "636",
          "name": "Sandila",
          "state": "Uttar Pradesh"
        },
        {
          "id": "637",
          "name": "Gooty",
          "state": "Andhra Pradesh"
        },
        {
          "id": "638",
          "name": "Salur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "639",
          "name": "Nanpara",
          "state": "Uttar Pradesh"
        },
        {
          "id": "640",
          "name": "Sardhana",
          "state": "Uttar Pradesh"
        },
        {
          "id": "641",
          "name": "Vita",
          "state": "Maharashtra"
        },
        {
          "id": "642",
          "name": "Gumia",
          "state": "Jharkhand"
        },
        {
          "id": "643",
          "name": "Puttur",
          "state": "Karnataka"
        },
        {
          "id": "644",
          "name": "Jalandhar Cantt.",
          "state": "Punjab"
        },
        {
          "id": "645",
          "name": "Nehtaur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "646",
          "name": "Changanassery",
          "state": "Kerala"
        },
        {
          "id": "647",
          "name": "Mandapeta",
          "state": "Andhra Pradesh"
        },
        {
          "id": "648",
          "name": "Dumka",
          "state": "Jharkhand"
        },
        {
          "id": "649",
          "name": "Seohara",
          "state": "Uttar Pradesh"
        },
        {
          "id": "650",
          "name": "Umarkhed",
          "state": "Maharashtra"
        },
        {
          "id": "651",
          "name": "Madhupur",
          "state": "Jharkhand"
        },
        {
          "id": "652",
          "name": "Vikramasingapuram",
          "state": "Tamil Nadu"
        },
        {
          "id": "653",
          "name": "Punalur",
          "state": "Kerala"
        },
        {
          "id": "654",
          "name": "Kendrapara",
          "state": "Odisha"
        },
        {
          "id": "655",
          "name": "Sihor",
          "state": "Gujarat"
        },
        {
          "id": "656",
          "name": "Nellikuppam",
          "state": "Tamil Nadu"
        },
        {
          "id": "657",
          "name": "Samana",
          "state": "Punjab"
        },
        {
          "id": "658",
          "name": "Warora",
          "state": "Maharashtra"
        },
        {
          "id": "659",
          "name": "Nilambur",
          "state": "Kerala"
        },
        {
          "id": "660",
          "name": "Rasipuram",
          "state": "Tamil Nadu"
        },
        {
          "id": "661",
          "name": "Ramnagar",
          "state": "Uttarakhand"
        },
        {
          "id": "662",
          "name": "Jammalamadugu",
          "state": "Andhra Pradesh"
        },
        {
          "id": "663",
          "name": "Nawanshahr",
          "state": "Punjab"
        },
        {
          "id": "664",
          "name": "Thoubal",
          "state": "Manipur"
        },
        {
          "id": "665",
          "name": "Athni",
          "state": "Karnataka"
        },
        {
          "id": "666",
          "name": "Cherthala",
          "state": "Kerala"
        },
        {
          "id": "667",
          "name": "Sidhi",
          "state": "Madhya Pradesh"
        },
        {
          "id": "668",
          "name": "Farooqnagar",
          "state": "Telangana"
        },
        {
          "id": "669",
          "name": "Peddapuram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "670",
          "name": "Chirkunda",
          "state": "Jharkhand"
        },
        {
          "id": "671",
          "name": "Pachora",
          "state": "Maharashtra"
        },
        {
          "id": "672",
          "name": "Madhepura",
          "state": "Bihar"
        },
        {
          "id": "673",
          "name": "Pithoragarh",
          "state": "Uttarakhand"
        },
        {
          "id": "674",
          "name": "Tumsar",
          "state": "Maharashtra"
        },
        {
          "id": "675",
          "name": "Phalodi",
          "state": "Rajasthan"
        },
        {
          "id": "676",
          "name": "Tiruttani",
          "state": "Tamil Nadu"
        },
        {
          "id": "677",
          "name": "Rampura Phul",
          "state": "Punjab"
        },
        {
          "id": "678",
          "name": "Perinthalmanna",
          "state": "Kerala"
        },
        {
          "id": "679",
          "name": "Padrauna",
          "state": "Uttar Pradesh"
        },
        {
          "id": "680",
          "name": "Pipariya",
          "state": "Madhya Pradesh"
        },
        {
          "id": "681",
          "name": "Dalli-Rajhara",
          "state": "Chhattisgarh"
        },
        {
          "id": "682",
          "name": "Punganur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "683",
          "name": "Mattannur",
          "state": "Kerala"
        },
        {
          "id": "684",
          "name": "Mathura",
          "state": "Uttar Pradesh"
        },
        {
          "id": "685",
          "name": "Thakurdwara",
          "state": "Uttar Pradesh"
        },
        {
          "id": "686",
          "name": "Nandivaram-Guduvancheri",
          "state": "Tamil Nadu"
        },
        {
          "id": "687",
          "name": "Mulbagal",
          "state": "Karnataka"
        },
        {
          "id": "688",
          "name": "Manjlegaon",
          "state": "Maharashtra"
        },
        {
          "id": "689",
          "name": "Wankaner",
          "state": "Gujarat"
        },
        {
          "id": "690",
          "name": "Sillod",
          "state": "Maharashtra"
        },
        {
          "id": "691",
          "name": "Nidadavole",
          "state": "Andhra Pradesh"
        },
        {
          "id": "692",
          "name": "Surapura",
          "state": "Karnataka"
        },
        {
          "id": "693",
          "name": "Rajagangapur",
          "state": "Odisha"
        },
        {
          "id": "694",
          "name": "Sheikhpura",
          "state": "Bihar"
        },
        {
          "id": "695",
          "name": "Parlakhemundi",
          "state": "Odisha"
        },
        {
          "id": "696",
          "name": "Kalimpong",
          "state": "West Bengal"
        },
        {
          "id": "697",
          "name": "Siruguppa",
          "state": "Karnataka"
        },
        {
          "id": "698",
          "name": "Arvi",
          "state": "Maharashtra"
        },
        {
          "id": "699",
          "name": "Limbdi",
          "state": "Gujarat"
        },
        {
          "id": "700",
          "name": "Barpeta",
          "state": "Assam"
        },
        {
          "id": "701",
          "name": "Manglaur",
          "state": "Uttarakhand"
        },
        {
          "id": "702",
          "name": "Repalle",
          "state": "Andhra Pradesh"
        },
        {
          "id": "703",
          "name": "Mudhol",
          "state": "Karnataka"
        },
        {
          "id": "704",
          "name": "Shujalpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "705",
          "name": "Mandvi",
          "state": "Gujarat"
        },
        {
          "id": "706",
          "name": "Thangadh",
          "state": "Gujarat"
        },
        {
          "id": "707",
          "name": "Sironj",
          "state": "Madhya Pradesh"
        },
        {
          "id": "708",
          "name": "Nandura",
          "state": "Maharashtra"
        },
        {
          "id": "709",
          "name": "Shoranur",
          "state": "Kerala"
        },
        {
          "id": "710",
          "name": "Nathdwara",
          "state": "Rajasthan"
        },
        {
          "id": "711",
          "name": "Periyakulam",
          "state": "Tamil Nadu"
        },
        {
          "id": "712",
          "name": "Sultanganj",
          "state": "Bihar"
        },
        {
          "id": "713",
          "name": "Medak",
          "state": "Telangana"
        },
        {
          "id": "714",
          "name": "Narayanpet",
          "state": "Telangana"
        },
        {
          "id": "715",
          "name": "Raxaul Bazar",
          "state": "Bihar"
        },
        {
          "id": "716",
          "name": "Rajauri",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "717",
          "name": "Pernampattu",
          "state": "Tamil Nadu"
        },
        {
          "id": "718",
          "name": "Nainital",
          "state": "Uttarakhand"
        },
        {
          "id": "719",
          "name": "Ramachandrapuram",
          "state": "Andhra Pradesh"
        },
        {
          "id": "720",
          "name": "Vaijapur",
          "state": "Maharashtra"
        },
        {
          "id": "721",
          "name": "Nangal",
          "state": "Punjab"
        },
        {
          "id": "722",
          "name": "Sidlaghatta",
          "state": "Karnataka"
        },
        {
          "id": "723",
          "name": "Punch",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "724",
          "name": "Pandhurna",
          "state": "Madhya Pradesh"
        },
        {
          "id": "725",
          "name": "Wadgaon Road",
          "state": "Maharashtra"
        },
        {
          "id": "726",
          "name": "Talcher",
          "state": "Odisha"
        },
        {
          "id": "727",
          "name": "Varkala",
          "state": "Kerala"
        },
        {
          "id": "728",
          "name": "Pilani",
          "state": "Rajasthan"
        },
        {
          "id": "729",
          "name": "Nowgong",
          "state": "Madhya Pradesh"
        },
        {
          "id": "730",
          "name": "Naila Janjgir",
          "state": "Chhattisgarh"
        },
        {
          "id": "731",
          "name": "Mapusa",
          "state": "Goa"
        },
        {
          "id": "732",
          "name": "Vellakoil",
          "state": "Tamil Nadu"
        },
        {
          "id": "733",
          "name": "Merta City",
          "state": "Rajasthan"
        },
        {
          "id": "734",
          "name": "Sivaganga",
          "state": "Tamil Nadu"
        },
        {
          "id": "735",
          "name": "Mandideep",
          "state": "Madhya Pradesh"
        },
        {
          "id": "736",
          "name": "Sailu",
          "state": "Maharashtra"
        },
        {
          "id": "737",
          "name": "Vyara",
          "state": "Gujarat"
        },
        {
          "id": "738",
          "name": "Kovvur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "739",
          "name": "Vadalur",
          "state": "Tamil Nadu"
        },
        {
          "id": "740",
          "name": "Nawabganj",
          "state": "Uttar Pradesh"
        },
        {
          "id": "741",
          "name": "Padra",
          "state": "Gujarat"
        },
        {
          "id": "742",
          "name": "Sainthia",
          "state": "West Bengal"
        },
        {
          "id": "743",
          "name": "Siana",
          "state": "Uttar Pradesh"
        },
        {
          "id": "744",
          "name": "Shahpur",
          "state": "Karnataka"
        },
        {
          "id": "745",
          "name": "Sojat",
          "state": "Rajasthan"
        },
        {
          "id": "746",
          "name": "Noorpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "747",
          "name": "Paravoor",
          "state": "Kerala"
        },
        {
          "id": "748",
          "name": "Murtijapur",
          "state": "Maharashtra"
        },
        {
          "id": "749",
          "name": "Ramnagar",
          "state": "Bihar"
        },
        {
          "id": "750",
          "name": "Sundargarh",
          "state": "Odisha"
        },
        {
          "id": "751",
          "name": "Taki",
          "state": "West Bengal"
        },
        {
          "id": "752",
          "name": "Saundatti-Yellamma",
          "state": "Karnataka"
        },
        {
          "id": "753",
          "name": "Pathanamthitta",
          "state": "Kerala"
        },
        {
          "id": "754",
          "name": "Wadi",
          "state": "Karnataka"
        },
        {
          "id": "755",
          "name": "Rameshwaram",
          "state": "Tamil Nadu"
        },
        {
          "id": "756",
          "name": "Tasgaon",
          "state": "Maharashtra"
        },
        {
          "id": "757",
          "name": "Sikandra Rao",
          "state": "Uttar Pradesh"
        },
        {
          "id": "758",
          "name": "Sihora",
          "state": "Madhya Pradesh"
        },
        {
          "id": "759",
          "name": "Tiruvethipuram",
          "state": "Tamil Nadu"
        },
        {
          "id": "760",
          "name": "Tiruvuru",
          "state": "Andhra Pradesh"
        },
        {
          "id": "761",
          "name": "Mehkar",
          "state": "Maharashtra"
        },
        {
          "id": "762",
          "name": "Peringathur",
          "state": "Kerala"
        },
        {
          "id": "763",
          "name": "Perambalur",
          "state": "Tamil Nadu"
        },
        {
          "id": "764",
          "name": "Manvi",
          "state": "Karnataka"
        },
        {
          "id": "765",
          "name": "Zunheboto",
          "state": "Nagaland"
        },
        {
          "id": "766",
          "name": "Mahnar Bazar",
          "state": "Bihar"
        },
        {
          "id": "767",
          "name": "Attingal",
          "state": "Kerala"
        },
        {
          "id": "768",
          "name": "Shahbad",
          "state": "Haryana"
        },
        {
          "id": "769",
          "name": "Puranpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "770",
          "name": "Nelamangala",
          "state": "Karnataka"
        },
        {
          "id": "771",
          "name": "Nakodar",
          "state": "Punjab"
        },
        {
          "id": "772",
          "name": "Lunawada",
          "state": "Gujarat"
        },
        {
          "id": "773",
          "name": "Murshidabad",
          "state": "West Bengal"
        },
        {
          "id": "774",
          "name": "Mahe",
          "state": "Puducherry"
        },
        {
          "id": "775",
          "name": "Lanka",
          "state": "Assam"
        },
        {
          "id": "776",
          "name": "Rudauli",
          "state": "Uttar Pradesh"
        },
        {
          "id": "777",
          "name": "Tuensang",
          "state": "Nagaland"
        },
        {
          "id": "778",
          "name": "Lakshmeshwar",
          "state": "Karnataka"
        },
        {
          "id": "779",
          "name": "Zira",
          "state": "Punjab"
        },
        {
          "id": "780",
          "name": "Yawal",
          "state": "Maharashtra"
        },
        {
          "id": "781",
          "name": "Thana Bhawan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "782",
          "name": "Ramdurg",
          "state": "Karnataka"
        },
        {
          "id": "783",
          "name": "Pulgaon",
          "state": "Maharashtra"
        },
        {
          "id": "784",
          "name": "Sadasivpet",
          "state": "Telangana"
        },
        {
          "id": "785",
          "name": "Nargund",
          "state": "Karnataka"
        },
        {
          "id": "786",
          "name": "Neem-Ka-Thana",
          "state": "Rajasthan"
        },
        {
          "id": "787",
          "name": "Memari",
          "state": "West Bengal"
        },
        {
          "id": "788",
          "name": "Nilanga",
          "state": "Maharashtra"
        },
        {
          "id": "789",
          "name": "Naharlagun",
          "state": "Arunachal Pradesh"
        },
        {
          "id": "790",
          "name": "Pakaur",
          "state": "Jharkhand"
        },
        {
          "id": "791",
          "name": "Wai",
          "state": "Maharashtra"
        },
        {
          "id": "792",
          "name": "Tarikere",
          "state": "Karnataka"
        },
        {
          "id": "793",
          "name": "Malavalli",
          "state": "Karnataka"
        },
        {
          "id": "794",
          "name": "Raisen",
          "state": "Madhya Pradesh"
        },
        {
          "id": "795",
          "name": "Lahar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "796",
          "name": "Uravakonda",
          "state": "Andhra Pradesh"
        },
        {
          "id": "797",
          "name": "Savanur",
          "state": "Karnataka"
        },
        {
          "id": "798",
          "name": "Sirohi",
          "state": "Rajasthan"
        },
        {
          "id": "799",
          "name": "Udhampur",
          "state": "Jammu and Kashmir"
        },
        {
          "id": "800",
          "name": "Umarga",
          "state": "Maharashtra"
        },
        {
          "id": "801",
          "name": "Pratapgarh",
          "state": "Rajasthan"
        },
        {
          "id": "802",
          "name": "Lingsugur",
          "state": "Karnataka"
        },
        {
          "id": "803",
          "name": "Usilampatti",
          "state": "Tamil Nadu"
        },
        {
          "id": "804",
          "name": "Palia Kalan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "805",
          "name": "Wokha",
          "state": "Nagaland"
        },
        {
          "id": "806",
          "name": "Rajpipla",
          "state": "Gujarat"
        },
        {
          "id": "807",
          "name": "Vijayapura",
          "state": "Karnataka"
        },
        {
          "id": "808",
          "name": "Rawatbhata",
          "state": "Rajasthan"
        },
        {
          "id": "809",
          "name": "Sangaria",
          "state": "Rajasthan"
        },
        {
          "id": "810",
          "name": "Paithan",
          "state": "Maharashtra"
        },
        {
          "id": "811",
          "name": "Rahuri",
          "state": "Maharashtra"
        },
        {
          "id": "812",
          "name": "Patti",
          "state": "Punjab"
        },
        {
          "id": "813",
          "name": "Zaidpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "814",
          "name": "Lalsot",
          "state": "Rajasthan"
        },
        {
          "id": "815",
          "name": "Maihar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "816",
          "name": "Vedaranyam",
          "state": "Tamil Nadu"
        },
        {
          "id": "817",
          "name": "Nawapur",
          "state": "Maharashtra"
        },
        {
          "id": "818",
          "name": "Solan",
          "state": "Himachal Pradesh"
        },
        {
          "id": "819",
          "name": "Vapi",
          "state": "Gujarat"
        },
        {
          "id": "820",
          "name": "Sanawad",
          "state": "Madhya Pradesh"
        },
        {
          "id": "821",
          "name": "Warisaliganj",
          "state": "Bihar"
        },
        {
          "id": "822",
          "name": "Revelganj",
          "state": "Bihar"
        },
        {
          "id": "823",
          "name": "Sabalgarh",
          "state": "Madhya Pradesh"
        },
        {
          "id": "824",
          "name": "Tuljapur",
          "state": "Maharashtra"
        },
        {
          "id": "825",
          "name": "Simdega",
          "state": "Jharkhand"
        },
        {
          "id": "826",
          "name": "Musabani",
          "state": "Jharkhand"
        },
        {
          "id": "827",
          "name": "Kodungallur",
          "state": "Kerala"
        },
        {
          "id": "828",
          "name": "Phulabani",
          "state": "Odisha"
        },
        {
          "id": "829",
          "name": "Umreth",
          "state": "Gujarat"
        },
        {
          "id": "830",
          "name": "Narsipatnam",
          "state": "Andhra Pradesh"
        },
        {
          "id": "831",
          "name": "Nautanwa",
          "state": "Uttar Pradesh"
        },
        {
          "id": "832",
          "name": "Rajgir",
          "state": "Bihar"
        },
        {
          "id": "833",
          "name": "Yellandu",
          "state": "Telangana"
        },
        {
          "id": "834",
          "name": "Sathyamangalam",
          "state": "Tamil Nadu"
        },
        {
          "id": "835",
          "name": "Pilibanga",
          "state": "Rajasthan"
        },
        {
          "id": "836",
          "name": "Morshi",
          "state": "Maharashtra"
        },
        {
          "id": "837",
          "name": "Pehowa",
          "state": "Haryana"
        },
        {
          "id": "838",
          "name": "Sonepur",
          "state": "Bihar"
        },
        {
          "id": "839",
          "name": "Pappinisseri",
          "state": "Kerala"
        },
        {
          "id": "840",
          "name": "Zamania",
          "state": "Uttar Pradesh"
        },
        {
          "id": "841",
          "name": "Mihijam",
          "state": "Jharkhand"
        },
        {
          "id": "842",
          "name": "Purna",
          "state": "Maharashtra"
        },
        {
          "id": "843",
          "name": "Puliyankudi",
          "state": "Tamil Nadu"
        },
        {
          "id": "844",
          "name": "Shikarpur, Bulandshahr",
          "state": "Uttar Pradesh"
        },
        {
          "id": "845",
          "name": "Umaria",
          "state": "Madhya Pradesh"
        },
        {
          "id": "846",
          "name": "Porsa",
          "state": "Madhya Pradesh"
        },
        {
          "id": "847",
          "name": "Naugawan Sadat",
          "state": "Uttar Pradesh"
        },
        {
          "id": "848",
          "name": "Fatehpur Sikri",
          "state": "Uttar Pradesh"
        },
        {
          "id": "849",
          "name": "Manuguru",
          "state": "Telangana"
        },
        {
          "id": "850",
          "name": "Udaipur",
          "state": "Tripura"
        },
        {
          "id": "851",
          "name": "Pipar City",
          "state": "Rajasthan"
        },
        {
          "id": "852",
          "name": "Pattamundai",
          "state": "Odisha"
        },
        {
          "id": "853",
          "name": "Nanjikottai",
          "state": "Tamil Nadu"
        },
        {
          "id": "854",
          "name": "Taranagar",
          "state": "Rajasthan"
        },
        {
          "id": "855",
          "name": "Yerraguntla",
          "state": "Andhra Pradesh"
        },
        {
          "id": "856",
          "name": "Satana",
          "state": "Maharashtra"
        },
        {
          "id": "857",
          "name": "Sherghati",
          "state": "Bihar"
        },
        {
          "id": "858",
          "name": "Sankeshwara",
          "state": "Karnataka"
        },
        {
          "id": "859",
          "name": "Madikeri",
          "state": "Karnataka"
        },
        {
          "id": "860",
          "name": "Thuraiyur",
          "state": "Tamil Nadu"
        },
        {
          "id": "861",
          "name": "Sanand",
          "state": "Gujarat"
        },
        {
          "id": "862",
          "name": "Rajula",
          "state": "Gujarat"
        },
        {
          "id": "863",
          "name": "Kyathampalle",
          "state": "Telangana"
        },
        {
          "id": "864",
          "name": "Shahabad, Rampur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "865",
          "name": "Tilda Newra",
          "state": "Chhattisgarh"
        },
        {
          "id": "866",
          "name": "Narsinghgarh",
          "state": "Madhya Pradesh"
        },
        {
          "id": "867",
          "name": "Chittur-Thathamangalam",
          "state": "Kerala"
        },
        {
          "id": "868",
          "name": "Malaj Khand",
          "state": "Madhya Pradesh"
        },
        {
          "id": "869",
          "name": "Sarangpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "870",
          "name": "Robertsganj",
          "state": "Uttar Pradesh"
        },
        {
          "id": "871",
          "name": "Sirkali",
          "state": "Tamil Nadu"
        },
        {
          "id": "872",
          "name": "Radhanpur",
          "state": "Gujarat"
        },
        {
          "id": "873",
          "name": "Tiruchendur",
          "state": "Tamil Nadu"
        },
        {
          "id": "874",
          "name": "Utraula",
          "state": "Uttar Pradesh"
        },
        {
          "id": "875",
          "name": "Patratu",
          "state": "Jharkhand"
        },
        {
          "id": "876",
          "name": "Vijainagar, Ajmer",
          "state": "Rajasthan"
        },
        {
          "id": "877",
          "name": "Periyasemur",
          "state": "Tamil Nadu"
        },
        {
          "id": "878",
          "name": "Pathri",
          "state": "Maharashtra"
        },
        {
          "id": "879",
          "name": "Sadabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "880",
          "name": "Talikota",
          "state": "Karnataka"
        },
        {
          "id": "881",
          "name": "Sinnar",
          "state": "Maharashtra"
        },
        {
          "id": "882",
          "name": "Mungeli",
          "state": "Chhattisgarh"
        },
        {
          "id": "883",
          "name": "Sedam",
          "state": "Karnataka"
        },
        {
          "id": "884",
          "name": "Shikaripur",
          "state": "Karnataka"
        },
        {
          "id": "885",
          "name": "Sumerpur",
          "state": "Rajasthan"
        },
        {
          "id": "886",
          "name": "Sattur",
          "state": "Tamil Nadu"
        },
        {
          "id": "887",
          "name": "Sugauli",
          "state": "Bihar"
        },
        {
          "id": "888",
          "name": "Lumding",
          "state": "Assam"
        },
        {
          "id": "889",
          "name": "Vandavasi",
          "state": "Tamil Nadu"
        },
        {
          "id": "890",
          "name": "Titlagarh",
          "state": "Odisha"
        },
        {
          "id": "891",
          "name": "Uchgaon",
          "state": "Maharashtra"
        },
        {
          "id": "892",
          "name": "Mokokchung",
          "state": "Nagaland"
        },
        {
          "id": "893",
          "name": "Paschim Punropara",
          "state": "West Bengal"
        },
        {
          "id": "894",
          "name": "Sagwara",
          "state": "Rajasthan"
        },
        {
          "id": "895",
          "name": "Ramganj Mandi",
          "state": "Rajasthan"
        },
        {
          "id": "896",
          "name": "Tarakeswar",
          "state": "West Bengal"
        },
        {
          "id": "897",
          "name": "Mahalingapura",
          "state": "Karnataka"
        },
        {
          "id": "898",
          "name": "Dharmanagar",
          "state": "Tripura"
        },
        {
          "id": "899",
          "name": "Mahemdabad",
          "state": "Gujarat"
        },
        {
          "id": "900",
          "name": "Manendragarh",
          "state": "Chhattisgarh"
        },
        {
          "id": "901",
          "name": "Uran",
          "state": "Maharashtra"
        },
        {
          "id": "902",
          "name": "Tharamangalam",
          "state": "Tamil Nadu"
        },
        {
          "id": "903",
          "name": "Tirukkoyilur",
          "state": "Tamil Nadu"
        },
        {
          "id": "904",
          "name": "Pen",
          "state": "Maharashtra"
        },
        {
          "id": "905",
          "name": "Makhdumpur",
          "state": "Bihar"
        },
        {
          "id": "906",
          "name": "Maner",
          "state": "Bihar"
        },
        {
          "id": "907",
          "name": "Oddanchatram",
          "state": "Tamil Nadu"
        },
        {
          "id": "908",
          "name": "Palladam",
          "state": "Tamil Nadu"
        },
        {
          "id": "909",
          "name": "Mundi",
          "state": "Madhya Pradesh"
        },
        {
          "id": "910",
          "name": "Nabarangapur",
          "state": "Odisha"
        },
        {
          "id": "911",
          "name": "Mudalagi",
          "state": "Karnataka"
        },
        {
          "id": "912",
          "name": "Samalkha",
          "state": "Haryana"
        },
        {
          "id": "913",
          "name": "Nepanagar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "914",
          "name": "Karjat",
          "state": "Maharashtra"
        },
        {
          "id": "915",
          "name": "Ranavav",
          "state": "Gujarat"
        },
        {
          "id": "916",
          "name": "Pedana",
          "state": "Andhra Pradesh"
        },
        {
          "id": "917",
          "name": "Pinjore",
          "state": "Haryana"
        },
        {
          "id": "918",
          "name": "Lakheri",
          "state": "Rajasthan"
        },
        {
          "id": "919",
          "name": "Pasan",
          "state": "Madhya Pradesh"
        },
        {
          "id": "920",
          "name": "Puttur",
          "state": "Andhra Pradesh"
        },
        {
          "id": "921",
          "name": "Vadakkuvalliyur",
          "state": "Tamil Nadu"
        },
        {
          "id": "922",
          "name": "Tirukalukundram",
          "state": "Tamil Nadu"
        },
        {
          "id": "923",
          "name": "Mahidpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "924",
          "name": "Mussoorie",
          "state": "Uttarakhand"
        },
        {
          "id": "925",
          "name": "Muvattupuzha",
          "state": "Kerala"
        },
        {
          "id": "926",
          "name": "Rasra",
          "state": "Uttar Pradesh"
        },
        {
          "id": "927",
          "name": "Udaipurwati",
          "state": "Rajasthan"
        },
        {
          "id": "928",
          "name": "Manwath",
          "state": "Maharashtra"
        },
        {
          "id": "929",
          "name": "Adoor",
          "state": "Kerala"
        },
        {
          "id": "930",
          "name": "Uthamapalayam",
          "state": "Tamil Nadu"
        },
        {
          "id": "931",
          "name": "Partur",
          "state": "Maharashtra"
        },
        {
          "id": "932",
          "name": "Nahan",
          "state": "Himachal Pradesh"
        },
        {
          "id": "933",
          "name": "Ladwa",
          "state": "Haryana"
        },
        {
          "id": "934",
          "name": "Mankachar",
          "state": "Assam"
        },
        {
          "id": "935",
          "name": "Nongstoin",
          "state": "Meghalaya"
        },
        {
          "id": "936",
          "name": "Losal",
          "state": "Rajasthan"
        },
        {
          "id": "937",
          "name": "Sri Madhopur",
          "state": "Rajasthan"
        },
        {
          "id": "938",
          "name": "Ramngarh",
          "state": "Rajasthan"
        },
        {
          "id": "939",
          "name": "Mavelikkara",
          "state": "Kerala"
        },
        {
          "id": "940",
          "name": "Rawatsar",
          "state": "Rajasthan"
        },
        {
          "id": "941",
          "name": "Rajakhera",
          "state": "Rajasthan"
        },
        {
          "id": "942",
          "name": "Lar",
          "state": "Uttar Pradesh"
        },
        {
          "id": "943",
          "name": "Lal Gopalganj Nindaura",
          "state": "Uttar Pradesh"
        },
        {
          "id": "944",
          "name": "Muddebihal",
          "state": "Karnataka"
        },
        {
          "id": "945",
          "name": "Sirsaganj",
          "state": "Uttar Pradesh"
        },
        {
          "id": "946",
          "name": "Shahpura",
          "state": "Rajasthan"
        },
        {
          "id": "947",
          "name": "Surandai",
          "state": "Tamil Nadu"
        },
        {
          "id": "948",
          "name": "Sangole",
          "state": "Maharashtra"
        },
        {
          "id": "949",
          "name": "Pavagada",
          "state": "Karnataka"
        },
        {
          "id": "950",
          "name": "Tharad",
          "state": "Gujarat"
        },
        {
          "id": "951",
          "name": "Mansa",
          "state": "Gujarat"
        },
        {
          "id": "952",
          "name": "Umbergaon",
          "state": "Gujarat"
        },
        {
          "id": "953",
          "name": "Mavoor",
          "state": "Kerala"
        },
        {
          "id": "954",
          "name": "Nalbari",
          "state": "Assam"
        },
        {
          "id": "955",
          "name": "Talaja",
          "state": "Gujarat"
        },
        {
          "id": "956",
          "name": "Malur",
          "state": "Karnataka"
        },
        {
          "id": "957",
          "name": "Mangrulpir",
          "state": "Maharashtra"
        },
        {
          "id": "958",
          "name": "Soro",
          "state": "Odisha"
        },
        {
          "id": "959",
          "name": "Shahpura",
          "state": "Rajasthan"
        },
        {
          "id": "960",
          "name": "Vadnagar",
          "state": "Gujarat"
        },
        {
          "id": "961",
          "name": "Raisinghnagar",
          "state": "Rajasthan"
        },
        {
          "id": "962",
          "name": "Sindhagi",
          "state": "Karnataka"
        },
        {
          "id": "963",
          "name": "Sanduru",
          "state": "Karnataka"
        },
        {
          "id": "964",
          "name": "Sohna",
          "state": "Haryana"
        },
        {
          "id": "965",
          "name": "Manavadar",
          "state": "Gujarat"
        },
        {
          "id": "966",
          "name": "Pihani",
          "state": "Uttar Pradesh"
        },
        {
          "id": "967",
          "name": "Safidon",
          "state": "Haryana"
        },
        {
          "id": "968",
          "name": "Risod",
          "state": "Maharashtra"
        },
        {
          "id": "969",
          "name": "Rosera",
          "state": "Bihar"
        },
        {
          "id": "970",
          "name": "Sankari",
          "state": "Tamil Nadu"
        },
        {
          "id": "971",
          "name": "Malpura",
          "state": "Rajasthan"
        },
        {
          "id": "972",
          "name": "Sonamukhi",
          "state": "West Bengal"
        },
        {
          "id": "973",
          "name": "Shamsabad, Agra",
          "state": "Uttar Pradesh"
        },
        {
          "id": "974",
          "name": "Nokha",
          "state": "Bihar"
        },
        {
          "id": "975",
          "name": "PandUrban Agglomeration",
          "state": "West Bengal"
        },
        {
          "id": "976",
          "name": "Mainaguri",
          "state": "West Bengal"
        },
        {
          "id": "977",
          "name": "Afzalpur",
          "state": "Karnataka"
        },
        {
          "id": "978",
          "name": "Shirur",
          "state": "Maharashtra"
        },
        {
          "id": "979",
          "name": "Salaya",
          "state": "Gujarat"
        },
        {
          "id": "980",
          "name": "Shenkottai",
          "state": "Tamil Nadu"
        },
        {
          "id": "981",
          "name": "Pratapgarh",
          "state": "Tripura"
        },
        {
          "id": "982",
          "name": "Vadipatti",
          "state": "Tamil Nadu"
        },
        {
          "id": "983",
          "name": "Nagarkurnool",
          "state": "Telangana"
        },
        {
          "id": "984",
          "name": "Savner",
          "state": "Maharashtra"
        },
        {
          "id": "985",
          "name": "Sasvad",
          "state": "Maharashtra"
        },
        {
          "id": "986",
          "name": "Rudrapur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "987",
          "name": "Soron",
          "state": "Uttar Pradesh"
        },
        {
          "id": "988",
          "name": "Sholingur",
          "state": "Tamil Nadu"
        },
        {
          "id": "989",
          "name": "Pandharkaoda",
          "state": "Maharashtra"
        },
        {
          "id": "990",
          "name": "Perumbavoor",
          "state": "Kerala"
        },
        {
          "id": "991",
          "name": "Maddur",
          "state": "Karnataka"
        },
        {
          "id": "992",
          "name": "Nadbai",
          "state": "Rajasthan"
        },
        {
          "id": "993",
          "name": "Talode",
          "state": "Maharashtra"
        },
        {
          "id": "994",
          "name": "Shrigonda",
          "state": "Maharashtra"
        },
        {
          "id": "995",
          "name": "Madhugiri",
          "state": "Karnataka"
        },
        {
          "id": "996",
          "name": "Tekkalakote",
          "state": "Karnataka"
        },
        {
          "id": "997",
          "name": "Seoni-Malwa",
          "state": "Madhya Pradesh"
        },
        {
          "id": "998",
          "name": "Shirdi",
          "state": "Maharashtra"
        },
        {
          "id": "999",
          "name": "SUrban Agglomerationr",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1000",
          "name": "Terdal",
          "state": "Karnataka"
        },
        {
          "id": "1001",
          "name": "Raver",
          "state": "Maharashtra"
        },
        {
          "id": "1002",
          "name": "Tirupathur",
          "state": "Tamil Nadu"
        },
        {
          "id": "1003",
          "name": "Taraori",
          "state": "Haryana"
        },
        {
          "id": "1004",
          "name": "Mukhed",
          "state": "Maharashtra"
        },
        {
          "id": "1005",
          "name": "Manachanallur",
          "state": "Tamil Nadu"
        },
        {
          "id": "1006",
          "name": "Rehli",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1007",
          "name": "Sanchore",
          "state": "Rajasthan"
        },
        {
          "id": "1008",
          "name": "Rajura",
          "state": "Maharashtra"
        },
        {
          "id": "1009",
          "name": "Piro",
          "state": "Bihar"
        },
        {
          "id": "1010",
          "name": "Mudabidri",
          "state": "Karnataka"
        },
        {
          "id": "1011",
          "name": "Vadgaon Kasba",
          "state": "Maharashtra"
        },
        {
          "id": "1012",
          "name": "Nagar",
          "state": "Rajasthan"
        },
        {
          "id": "1013",
          "name": "Vijapur",
          "state": "Gujarat"
        },
        {
          "id": "1014",
          "name": "Viswanatham",
          "state": "Tamil Nadu"
        },
        {
          "id": "1015",
          "name": "Polur",
          "state": "Tamil Nadu"
        },
        {
          "id": "1016",
          "name": "Panagudi",
          "state": "Tamil Nadu"
        },
        {
          "id": "1017",
          "name": "Manawar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1018",
          "name": "Tehri",
          "state": "Uttarakhand"
        },
        {
          "id": "1019",
          "name": "Samdhan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1020",
          "name": "Pardi",
          "state": "Gujarat"
        },
        {
          "id": "1021",
          "name": "Rahatgarh",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1022",
          "name": "Panagar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1023",
          "name": "Uthiramerur",
          "state": "Tamil Nadu"
        },
        {
          "id": "1024",
          "name": "Tirora",
          "state": "Maharashtra"
        },
        {
          "id": "1025",
          "name": "Rangia",
          "state": "Assam"
        },
        {
          "id": "1026",
          "name": "Sahjanwa",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1027",
          "name": "Wara Seoni",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1028",
          "name": "Magadi",
          "state": "Karnataka"
        },
        {
          "id": "1029",
          "name": "Rajgarh (Alwar)",
          "state": "Rajasthan"
        },
        {
          "id": "1030",
          "name": "Rafiganj",
          "state": "Bihar"
        },
        {
          "id": "1031",
          "name": "Tarana",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1032",
          "name": "Rampur Maniharan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1033",
          "name": "Sheoganj",
          "state": "Rajasthan"
        },
        {
          "id": "1034",
          "name": "Raikot",
          "state": "Punjab"
        },
        {
          "id": "1035",
          "name": "Pauri",
          "state": "Uttarakhand"
        },
        {
          "id": "1036",
          "name": "Sumerpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1037",
          "name": "Navalgund",
          "state": "Karnataka"
        },
        {
          "id": "1038",
          "name": "Shahganj",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1039",
          "name": "Marhaura",
          "state": "Bihar"
        },
        {
          "id": "1040",
          "name": "Tulsipur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1041",
          "name": "Sadri",
          "state": "Rajasthan"
        },
        {
          "id": "1042",
          "name": "Thiruthuraipoondi",
          "state": "Tamil Nadu"
        },
        {
          "id": "1043",
          "name": "Shiggaon",
          "state": "Karnataka"
        },
        {
          "id": "1044",
          "name": "Pallapatti",
          "state": "Tamil Nadu"
        },
        {
          "id": "1045",
          "name": "Mahendragarh",
          "state": "Haryana"
        },
        {
          "id": "1046",
          "name": "Sausar",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1047",
          "name": "Ponneri",
          "state": "Tamil Nadu"
        },
        {
          "id": "1048",
          "name": "Mahad",
          "state": "Maharashtra"
        },
        {
          "id": "1049",
          "name": "Lohardaga",
          "state": "Jharkhand"
        },
        {
          "id": "1050",
          "name": "Tirwaganj",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1051",
          "name": "Margherita",
          "state": "Assam"
        },
        {
          "id": "1052",
          "name": "Sundarnagar",
          "state": "Himachal Pradesh"
        },
        {
          "id": "1053",
          "name": "Rajgarh",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1054",
          "name": "Mangaldoi",
          "state": "Assam"
        },
        {
          "id": "1055",
          "name": "Renigunta",
          "state": "Andhra Pradesh"
        },
        {
          "id": "1056",
          "name": "Longowal",
          "state": "Punjab"
        },
        {
          "id": "1057",
          "name": "Ratia",
          "state": "Haryana"
        },
        {
          "id": "1058",
          "name": "Lalgudi",
          "state": "Tamil Nadu"
        },
        {
          "id": "1059",
          "name": "Shrirangapattana",
          "state": "Karnataka"
        },
        {
          "id": "1060",
          "name": "Niwari",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1061",
          "name": "Natham",
          "state": "Tamil Nadu"
        },
        {
          "id": "1062",
          "name": "Unnamalaikadai",
          "state": "Tamil Nadu"
        },
        {
          "id": "1063",
          "name": "PurqUrban Agglomerationzi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1064",
          "name": "Shamsabad, Farrukhabad",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1065",
          "name": "Mirganj",
          "state": "Bihar"
        },
        {
          "id": "1066",
          "name": "Todaraisingh",
          "state": "Rajasthan"
        },
        {
          "id": "1067",
          "name": "Warhapur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1068",
          "name": "Rajam",
          "state": "Andhra Pradesh"
        },
        {
          "id": "1069",
          "name": "Urmar Tanda",
          "state": "Punjab"
        },
        {
          "id": "1070",
          "name": "Lonar",
          "state": "Maharashtra"
        },
        {
          "id": "1071",
          "name": "Powayan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1072",
          "name": "P.N.Patti",
          "state": "Tamil Nadu"
        },
        {
          "id": "1073",
          "name": "Palampur",
          "state": "Himachal Pradesh"
        },
        {
          "id": "1074",
          "name": "Srisailam Project (Right Flank Colony) Township",
          "state": "Andhra Pradesh"
        },
        {
          "id": "1075",
          "name": "Sindagi",
          "state": "Karnataka"
        },
        {
          "id": "1076",
          "name": "Sandi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1077",
          "name": "Vaikom",
          "state": "Kerala"
        },
        {
          "id": "1078",
          "name": "Malda",
          "state": "West Bengal"
        },
        {
          "id": "1079",
          "name": "Tharangambadi",
          "state": "Tamil Nadu"
        },
        {
          "id": "1080",
          "name": "Sakaleshapura",
          "state": "Karnataka"
        },
        {
          "id": "1081",
          "name": "Lalganj",
          "state": "Bihar"
        },
        {
          "id": "1082",
          "name": "Malkangiri",
          "state": "Odisha"
        },
        {
          "id": "1083",
          "name": "Rapar",
          "state": "Gujarat"
        },
        {
          "id": "1084",
          "name": "Mauganj",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1085",
          "name": "Todabhim",
          "state": "Rajasthan"
        },
        {
          "id": "1086",
          "name": "Srinivaspur",
          "state": "Karnataka"
        },
        {
          "id": "1087",
          "name": "Murliganj",
          "state": "Bihar"
        },
        {
          "id": "1088",
          "name": "Reengus",
          "state": "Rajasthan"
        },
        {
          "id": "1089",
          "name": "Sawantwadi",
          "state": "Maharashtra"
        },
        {
          "id": "1090",
          "name": "Tittakudi",
          "state": "Tamil Nadu"
        },
        {
          "id": "1091",
          "name": "Lilong",
          "state": "Manipur"
        },
        {
          "id": "1092",
          "name": "Rajaldesar",
          "state": "Rajasthan"
        },
        {
          "id": "1093",
          "name": "Pathardi",
          "state": "Maharashtra"
        },
        {
          "id": "1094",
          "name": "Achhnera",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1095",
          "name": "Pacode",
          "state": "Tamil Nadu"
        },
        {
          "id": "1096",
          "name": "Naraura",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1097",
          "name": "Nakur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1098",
          "name": "Palai",
          "state": "Kerala"
        },
        {
          "id": "1099",
          "name": "Morinda, India",
          "state": "Punjab"
        },
        {
          "id": "1100",
          "name": "Manasa",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1101",
          "name": "Nainpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1102",
          "name": "Sahaspur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1103",
          "name": "Pauni",
          "state": "Maharashtra"
        },
        {
          "id": "1104",
          "name": "Prithvipur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1105",
          "name": "Ramtek",
          "state": "Maharashtra"
        },
        {
          "id": "1106",
          "name": "Silapathar",
          "state": "Assam"
        },
        {
          "id": "1107",
          "name": "Songadh",
          "state": "Gujarat"
        },
        {
          "id": "1108",
          "name": "Safipur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1109",
          "name": "Sohagpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1110",
          "name": "Mul",
          "state": "Maharashtra"
        },
        {
          "id": "1111",
          "name": "Sadulshahar",
          "state": "Rajasthan"
        },
        {
          "id": "1112",
          "name": "Phillaur",
          "state": "Punjab"
        },
        {
          "id": "1113",
          "name": "Sambhar",
          "state": "Rajasthan"
        },
        {
          "id": "1114",
          "name": "Prantij",
          "state": "Rajasthan"
        },
        {
          "id": "1115",
          "name": "Nagla",
          "state": "Uttarakhand"
        },
        {
          "id": "1116",
          "name": "Pattran",
          "state": "Punjab"
        },
        {
          "id": "1117",
          "name": "Mount Abu",
          "state": "Rajasthan"
        },
        {
          "id": "1118",
          "name": "Reoti",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1119",
          "name": "Tenu dam-cum-Kathhara",
          "state": "Jharkhand"
        },
        {
          "id": "1120",
          "name": "Panchla",
          "state": "West Bengal"
        },
        {
          "id": "1121",
          "name": "Sitarganj",
          "state": "Uttarakhand"
        },
        {
          "id": "1122",
          "name": "Pasighat",
          "state": "Arunachal Pradesh"
        },
        {
          "id": "1123",
          "name": "Motipur",
          "state": "Bihar"
        },
        {
          "id": "1124",
          "name": "O' Valley",
          "state": "Tamil Nadu"
        },
        {
          "id": "1125",
          "name": "Raghunathpur",
          "state": "West Bengal"
        },
        {
          "id": "1126",
          "name": "Suriyampalayam",
          "state": "Tamil Nadu"
        },
        {
          "id": "1127",
          "name": "Qadian",
          "state": "Punjab"
        },
        {
          "id": "1128",
          "name": "Rairangpur",
          "state": "Odisha"
        },
        {
          "id": "1129",
          "name": "Silvassa",
          "state": "Dadra and Nagar Haveli"
        },
        {
          "id": "1130",
          "name": "Nowrozabad (Khodargama)",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1131",
          "name": "Mangrol",
          "state": "Rajasthan"
        },
        {
          "id": "1132",
          "name": "Soyagaon",
          "state": "Maharashtra"
        },
        {
          "id": "1133",
          "name": "Sujanpur",
          "state": "Punjab"
        },
        {
          "id": "1134",
          "name": "Manihari",
          "state": "Bihar"
        },
        {
          "id": "1135",
          "name": "Sikanderpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1136",
          "name": "Mangalvedhe",
          "state": "Maharashtra"
        },
        {
          "id": "1137",
          "name": "Phulera",
          "state": "Rajasthan"
        },
        {
          "id": "1138",
          "name": "Ron",
          "state": "Karnataka"
        },
        {
          "id": "1139",
          "name": "Sholavandan",
          "state": "Tamil Nadu"
        },
        {
          "id": "1140",
          "name": "Saidpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1141",
          "name": "Shamgarh",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1142",
          "name": "Thammampatti",
          "state": "Tamil Nadu"
        },
        {
          "id": "1143",
          "name": "Maharajpur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1144",
          "name": "Multai",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1145",
          "name": "Mukerian",
          "state": "Punjab"
        },
        {
          "id": "1146",
          "name": "Sirsi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1147",
          "name": "Purwa",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1148",
          "name": "Sheohar",
          "state": "Bihar"
        },
        {
          "id": "1149",
          "name": "Namagiripettai",
          "state": "Tamil Nadu"
        },
        {
          "id": "1150",
          "name": "Parasi",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1151",
          "name": "Lathi",
          "state": "Gujarat"
        },
        {
          "id": "1152",
          "name": "Lalganj",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1153",
          "name": "Narkhed",
          "state": "Maharashtra"
        },
        {
          "id": "1154",
          "name": "Mathabhanga",
          "state": "West Bengal"
        },
        {
          "id": "1155",
          "name": "Shendurjana",
          "state": "Maharashtra"
        },
        {
          "id": "1156",
          "name": "Peravurani",
          "state": "Tamil Nadu"
        },
        {
          "id": "1157",
          "name": "Mariani",
          "state": "Assam"
        },
        {
          "id": "1158",
          "name": "Phulpur",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1159",
          "name": "Rania",
          "state": "Haryana"
        },
        {
          "id": "1160",
          "name": "Pali",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1161",
          "name": "Pachore",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1162",
          "name": "Parangipettai",
          "state": "Tamil Nadu"
        },
        {
          "id": "1163",
          "name": "Pudupattinam",
          "state": "Tamil Nadu"
        },
        {
          "id": "1164",
          "name": "Panniyannur",
          "state": "Kerala"
        },
        {
          "id": "1165",
          "name": "Maharajganj",
          "state": "Bihar"
        },
        {
          "id": "1166",
          "name": "Rau",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1167",
          "name": "Monoharpur",
          "state": "West Bengal"
        },
        {
          "id": "1168",
          "name": "Mandawa",
          "state": "Rajasthan"
        },
        {
          "id": "1169",
          "name": "Marigaon",
          "state": "Assam"
        },
        {
          "id": "1170",
          "name": "Pallikonda",
          "state": "Tamil Nadu"
        },
        {
          "id": "1171",
          "name": "Pindwara",
          "state": "Rajasthan"
        },
        {
          "id": "1172",
          "name": "Shishgarh",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1173",
          "name": "Patur",
          "state": "Maharashtra"
        },
        {
          "id": "1174",
          "name": "Mayang Imphal",
          "state": "Manipur"
        },
        {
          "id": "1175",
          "name": "Mhowgaon",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1176",
          "name": "Guruvayoor",
          "state": "Kerala"
        },
        {
          "id": "1177",
          "name": "Mhaswad",
          "state": "Maharashtra"
        },
        {
          "id": "1178",
          "name": "Sahawar",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1179",
          "name": "Sivagiri",
          "state": "Tamil Nadu"
        },
        {
          "id": "1180",
          "name": "Mundargi",
          "state": "Karnataka"
        },
        {
          "id": "1181",
          "name": "Punjaipugalur",
          "state": "Tamil Nadu"
        },
        {
          "id": "1182",
          "name": "Kailasahar",
          "state": "Tripura"
        },
        {
          "id": "1183",
          "name": "Samthar",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1184",
          "name": "Sakti",
          "state": "Chhattisgarh"
        },
        {
          "id": "1185",
          "name": "Sadalagi",
          "state": "Karnataka"
        },
        {
          "id": "1186",
          "name": "Silao",
          "state": "Bihar"
        },
        {
          "id": "1187",
          "name": "Mandalgarh",
          "state": "Rajasthan"
        },
        {
          "id": "1188",
          "name": "Loha",
          "state": "Maharashtra"
        },
        {
          "id": "1189",
          "name": "Pukhrayan",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1190",
          "name": "Padmanabhapuram",
          "state": "Tamil Nadu"
        },
        {
          "id": "1191",
          "name": "Belonia",
          "state": "Tripura"
        },
        {
          "id": "1192",
          "name": "Saiha",
          "state": "Mizoram"
        },
        {
          "id": "1193",
          "name": "Srirampore",
          "state": "West Bengal"
        },
        {
          "id": "1194",
          "name": "Talwara",
          "state": "Punjab"
        },
        {
          "id": "1195",
          "name": "Puthuppally",
          "state": "Kerala"
        },
        {
          "id": "1196",
          "name": "Khowai",
          "state": "Tripura"
        },
        {
          "id": "1197",
          "name": "Vijaypur",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1198",
          "name": "Takhatgarh",
          "state": "Rajasthan"
        },
        {
          "id": "1199",
          "name": "Thirupuvanam",
          "state": "Tamil Nadu"
        },
        {
          "id": "1200",
          "name": "Adra",
          "state": "West Bengal"
        },
        {
          "id": "1201",
          "name": "Piriyapatna",
          "state": "Karnataka"
        },
        {
          "id": "1202",
          "name": "Obra",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1203",
          "name": "Adalaj",
          "state": "Gujarat"
        },
        {
          "id": "1204",
          "name": "Nandgaon",
          "state": "Maharashtra"
        },
        {
          "id": "1205",
          "name": "Barh",
          "state": "Bihar"
        },
        {
          "id": "1206",
          "name": "Chhapra",
          "state": "Gujarat"
        },
        {
          "id": "1207",
          "name": "Panamattom",
          "state": "Kerala"
        },
        {
          "id": "1208",
          "name": "Niwai",
          "state": "Uttar Pradesh"
        },
        {
          "id": "1209",
          "name": "Bageshwar",
          "state": "Uttarakhand"
        },
        {
          "id": "1210",
          "name": "Tarbha",
          "state": "Odisha"
        },
        {
          "id": "1211",
          "name": "Adyar",
          "state": "Karnataka"
        },
        {
          "id": "1212",
          "name": "Narsinghgarh",
          "state": "Madhya Pradesh"
        },
        {
          "id": "1213",
          "name": "Warud",
          "state": "Maharashtra"
        },
        {
          "id": "1214",
          "name": "Asarganj",
          "state": "Bihar"
        },
        {
          "id": "1215",
          "name": "Sarsod",
          "state": "Haryana"
        },
        {
          "id": "1216",
          "name": "Gandhinagar",
          "state": "Gujarat"
        },
        {
          "id":"1217",
          "name":"Kullu",
          "state":"Himachal Pradesh"
        },
        {
          "id":"1218",
          "name":"Manali",
          "state":"Himachal Praddesh"
        },
        {
          "id":"1219",
          "name":"Mirzapur",
          "state":"Uttar Pradesh"
        }
      ]
    });

    // pc.compare = function (repass) {
    //   if(repass.length>5){
    //     pc.isconfirm = pc.password == repass ? true : false;
    //   }
    // }

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
