/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('DonateCtrl', function ($scope) {
      var home = angular.extend(this, {
        members: []
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
      'WY').split(' ').map(function (state) {
        return {abbrev: state};
      });
    })

})();
