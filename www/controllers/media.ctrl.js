/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('MediaCtrl', function (events) {
      var mc = angular.extend(this, {
        members: [],
        events: [],
        selectedIndex: 0,
      });
      var currentDate = new Date();
      events.then(function (data) {
        _.forEach(data, function (val) {
          // console.log(new Date(val.date), currentDate)
          if (new Date(val.date) > currentDate) {
            // home.upcomingEvents.push(val);
          } else {
            mc.events.push(val);
          }
        });
        console.log(mc.events);
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

})();
