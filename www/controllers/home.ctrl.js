/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('HomeCtrl', function ($firebaseArray, events, $timeout) {
      var home = angular.extend(this, {
        founders: [
          {
            image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/temporary%2F1.JPG?alt=media&token=d69c30d4-d01a-48e4-a533-0a0104d551e2'
          },
          {
            image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/temporary%2F2.JPG?alt=media&token=d69c30d4-d01a-48e4-a533-0a0104d551e2'
          },
          {
            image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/temporary%2F3.JPG?alt=media&token=d69c30d4-d01a-48e4-a533-0a0104d551e2'
          },
          {
            image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/temporary%2F4.JPG?alt=media&token=d69c30d4-d01a-48e4-a533-0a0104d551e2'
          },
          {
            image: 'https://firebasestorage.googleapis.com/v0/b/firebase-youthsocialservice.appspot.com/o/temporary%2F5.JPG?alt=media&token=d69c30d4-d01a-48e4-a533-0a0104d551e2'
          }
        ],
        members: [
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
        events: [],
        upcomingEvents: [],
        pastEvents: [],
        response: response,
      });
      var currentDate = new Date();
      activate();
      function activate() {
        events.then(function (data) {
          home.events = data;
          _.forEach(data, function (val) {
            // console.log(new Date(val.date), currentDate)
            if (new Date(val.date) > currentDate) {
              home.upcomingEvents.push(val);
            } else {
              home.pastEvents.push(val);
            }
          });
          $timeout(function () {
            if (!home.upcomingEvents.length)
              home.upcoming = false;
          }, 10)
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
        home.upcoming = true;
      }

      function showPastBlock() {
        home.upcoming = false;
      }

      function response(res) {
        if (!(_.isEmpty(User))) {
          if (res === 'sure') {
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
})();
