/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('CrisisCtrl', function () {
      var crisis = angular.extend(this, {
        edSysLabels: ["Unable", "Able"],
        edSysData: [76, 24],
        readLabels: ["Cannot", "Can"],
        readData: [52, 48],
        absLabels: ["Absent", "Present"],
        absData: [17, 83],
        gtLabels: ["Usable", "Unusable"],
        gtData: [55, 45],
      })
    })

})();
