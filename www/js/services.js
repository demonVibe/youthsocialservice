/**
 * Created by Shubham on 20-12-2016.
 */
  (function () {
    'use strict';

    angular
      .module('starter.services',[])
      .factory('db', function() {
        return firebase.database().ref()
      })
      .factory("events",function ($firebaseArray) {
      var eventsRef = firebase.database().ref().child('events');
      return $firebaseArray(eventsRef).$loaded();
      })
      .factory('currentUser', function() {
        return {
          details:{}
        }
      })
      .service('firebaseDataService', firebaseDataService);

    firebaseDataService.$inject = ['db', '$firebaseArray', '$firebaseObject', '$firebaseAuth'];

    /* @ngInject */
    function firebaseDataService(db, $firebaseArray, $firebaseObject, $firebaseAuth) {
      return {
        getUserDetails:getUserDetails,
        setUserDetails: setUserDetails,
        fbSignUp: fbSignUp,
        googleSignUp: googleSignUp,
        emailSignUp: emailSignUp,
        updateToken: updateToken,
      };
      ////////////////

      function getUserDetails(userId) {
        return db.child('/users/'+ userId);
      }

      function emailSignUp(userId, userData) {
        db.child('/users/'+ userId).set(userData);
      }
      function setUserDetails(userId, additionalInfo) {
        var ref = db.child('/customers/'+ userId);
        ref.update(additionalInfo);
      }

      function fbSignUp(userId, userData) {
        var ref = db.child('/customers/');
        ref.child(userId).set(userData);
      }

      function googleSignUp(userId, userData) {
        var ref = db.child('/customers/');
        ref.child(userId).set(userData);
      }

      function updateToken(userId, token) {
        var ref = db.child('/customers/' + userId);
        return ref.update({'device_token': token});
      }
    }

  })();


