/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('ContactCtrl', function ($scope, $mdDialog, $timeout) {
      var cc = this;

      cc.hidden = false;
      cc.isOpen = false;
      cc.hover = true;

      // On opening, add a delayed property which shows tooltips after the speed dial has opened
      // so that they have the proper position; if closing, immediately hide the tooltips
      $scope.$watch('demo.isOpen', function (isOpen) {
        if (isOpen) {
          $timeout(function () {
            $scope.tooltipVisible = cc.isOpen;
          }, 600);
        } else {
          $scope.tooltipVisible = cc.isOpen;
        }
      });

      cc.items = [
        {
          name: "Blog",
          icon: "img/social-hand-drawn/svg/blogger-drew-logo.svg",
          direction: "bottom",
          url: 'https://youthsocialservicesy2s.blogspot.in'
        },
        {
          name: "Twitter",
          icon: "img/social-hand-drawn/svg/twitter-draw-logo.svg",
          direction: "top",
          url: 'https://m.facebook.com/y2s2414/'
        },
        {
          name: "Instagram",
          icon: "img/social-hand-drawn/svg/instagram-draw-logo.svg",
          direction: "bottom",
          url: 'https://m.facebook.com/y2s2414/'
        },
        {
          name: "Facebook",
          icon: "img/social-hand-drawn/svg/facebook.svg",
          direction: "top",
          url: 'https://m.facebook.com/y2s2414/'
        },
        {
          name: "Google Plus",
          icon: "img/social-hand-drawn/svg/google-plus-draw-logo.svg",
          direction: "bottom",
          url: 'https://m.facebook.com/y2s2414/'
        },
      ];
    })

})();
