/**
 * Created by Shubham on 20-12-2016.
 */
angular.module('starter.services', [])

  .factory("events",function ($firebaseArray) {
    var eventsRef = firebase.database().ref().child('events');
    return $firebaseArray(eventsRef).$loaded();
  });
