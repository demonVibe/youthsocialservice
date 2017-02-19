/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('WhatWeDoCtrl', function () {
      var ww = angular.extend(this, {
        members: [],
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

})();
