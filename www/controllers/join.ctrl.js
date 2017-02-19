/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('JoinCtrl', function ($scope) {
      var home = angular.extend(this, {
        members: []
      });
      $scope.user = {
        name: 'Manoj Kr Prajapat',
        email: 'manojkrbhatiwal@gmail.com',
        phone: '',
        address: 'Jaipur',
        donation: 19.99
      };
    })

})();
