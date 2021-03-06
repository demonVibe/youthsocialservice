/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('AccountsCtrl', AccountsCtrl)
    .controller('PanelCtrl', PanelCtrl);

  function AccountsCtrl($log, $scope, $rootScope, $ionicLoading, $ionicPopup, $q, currentUser, firebaseDataService,
    $mdPanel, $timeout, $state, $stateParams, $ionicHistory) {
    var ac = angular.extend(this, {
      email: "",
      password: "",
      loading: false,
    });

    activate();
    function activate() {
      ac._mdPanel = $mdPanel;
    }

    ac.googleLogin = function () {
      $log.debug("Inside Google");
      document.addEventListener('deviceready', deviceReady, false);

      function deviceReady() {
        ac.loading = true;
        // I get called when everything's ready for the plugin to be called!
        console.log('Device is ready!');
        window.plugins.googleplus.trySilentLogin(
          {
            // 'scopes': '... ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            // 'webClientId': '528631628442-bjb7ubb6ds81lb0l7e925p3ovsb46ebr.apps.googlecurrentUsercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            // 'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
          },
          function (obj) {
            alert(JSON.stringify(obj)); // do something useful instead of alerting
            console.log(obj);
          },
          function (msg) {
            alert('error: ' + msg);
            $timeout(function () {
              ac.loading = false;
            }, 10);
          }
        );
      }
    };
    //This method is executed when the user press the "SignIn with Email" link
    ac.emailLogin = function () {
      $ionicLoading.show();
      ac.loading = true;
      firebase.auth().signInWithEmailAndPassword(ac.email, ac.password).then(function (response) {
        var user = firebase.auth().currentUser;
        if (user != null) {
          currentUser.details = {
            'email': user.email,
            'userId': user.uid,
            'name': user.displayName,
            'picture': user.photoURL,
            'device_token': $rootScope.device_token || ""
          }
        } else {
          $timeout(function () {
            ac.loading = false;
          }, 10);
          $ionicLoading.hide()
        }
        firebaseDataService.getUserDetails(currentUser.details.userId).on("value", function (snapshot) {
          if (snapshot.val() == null) {
            firebaseDataService.emailSignUp(currentUser.details.userId, currentUser.details);
          } else {
            currentUser.details = snapshot.val();
          }
          $rootScope.$broadcast('user: loggedIn');
          localforage.setItem('currentUser', currentUser.details).then(function () {
            console.log("Saved to LocalForage", currentUser.details)
            if (window.cordova) {
              //noinspection JSUnresolvedFunction
              cordova.plugins.snackbar('Logged In Successfully!', 'LONG', "", function () {
              })
            }
            $timeout(function () {
              ac.loading = false;
            }, 10);
            $ionicLoading.hide();
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            if ($stateParams.prevState) {
              $state.go($stateParams.prevState);
            } else {
              $state.go('app.home')
            }
          });
        }, function (err) {
          console.log(err);
        });
      }, function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
        $timeout(function () {
          ac.loading = false;
        }, 10);
        $ionicLoading.hide()
      });
    };

    //This method is executed when the user press the "forgot password" link
    ac.resetPassword = function () {
      console.log("clicked");
      $scope.showPopup();
    };
    $scope.showPopup = function () {
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
            onTap: function (e) {
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

      myPopup.then(function (res) {
        var auth = firebase.auth();
        var emailAddress = res;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
          $ionicLoading.hide();
          console.log("email sent");
        }, function (error) {
          $ionicLoading.hide();
          console.log("error", error);
          // An error happened.
        });
      });
    };
  }

  AccountsCtrl.prototype.showDialog = function () {
    var position = this._mdPanel.newPanelPosition()
      .absolute();
    // .right()
    // .top('30%')
    // .bottom()
    // .left('5%')

    var animation = this._mdPanel.newPanelAnimation();

    animation.openFrom({
      top: document.documentElement.clientHeight,
      left: document.documentElement.clientWidth / 2 - 450
    });
    animation.closeTo({
      top: document.documentElement.clientHeight,
      left: document.documentElement.clientWidth / 2 - 450
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
      zIndex: 12,
      clickOutsideToClose: false,
      clickEscapeToClose: false,
      hasBackdrop: true,
      fullscreen: true,
    };

    this._mdPanel.open(config);
  };

  function PanelCtrl(mdPanelRef, currentUser, firebaseDataService, $rootScope, $timeout, $stateParams, $state, $scope, $ionicHistory, $ionicLoading) {
    var pc = angular.extend(this, {
      email: "",
      password: "",
      loading: false,
      firstName: "",
      lastName: "",
      phone: "",
      dob: null,
      address1: "",
      address2: "",
      city: "",
      postcode: "",
      minDate: new Date("january 1, 1950 00:00:00"),
      maxDate: new Date("december 31, 2016 00:00:00"),
    });

    this._mdPanelRef = mdPanelRef;
    pc.closeDialog = function () {
      this._mdPanelRef && this._mdPanelRef.close();
    };
    pc.createAccount = function () {
      pc.loading = true;
      $ionicLoading.show({ hideOnStateChange: true });
      if (window.cordova) {
        document.addEventListener("deviceready", readyForSnack, false);
        //noinspection JSAnnotator
        function readyForSnack() {
          //noinspection JSUnresolvedFunction
          cordova.plugins.snackbar('Hold on! This may take a while...', 'INDEFINITE', "", function () {
          });
        }
      }
      // var info = $q.defer();
      firebase.auth().createUserWithEmailAndPassword(pc.email, pc.password).then(function (response) {
        // info.resolve(response);
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: pc.firstName + " " + pc.lastName,
          photoURL: "https://dl.dropbox.com/s/4tdz2fuzfcr29t6/avatar.png?dl=1"
        }).then(function () {
          console.log("Update Successful");
          // Update successful.
          if (user != null) {
            currentUser.details = {
              'email': user.email,
              'userId': user.uid,
              'name': user.displayName,
              'picture': user.photoURL || "",
              'emailVerified': user.emailVerified,
              'firstName': pc.firstName,
              'lastName': pc.lastName,
              'phone': pc.phone,
              'dob': pc.dob.toString(),
              'address1': pc.address1,
              'address2': pc.address2 || "",
              'city': pc.city,
              'postcode': pc.postcode,
              'role': 'user',
              'createdAt': new Date() + "",
              'device_token': $rootScope.deviceToken || ""
            };
            firebaseDataService.getUserDetails(currentUser.details.userId).on("value", function (snapshot) {
              // console.log("snap", snapshot.val())
              if (snapshot.val() == null) {
                firebaseDataService.emailSignUp(currentUser.details.userId, currentUser.details);
              } else {
                currentUser.details = snapshot.val();
              }
              $rootScope.$broadcast('user: loggedIn');
              localforage.setItem('currentUser', currentUser.details).then(function () {
                // console.log("Saved to LocalForage", currentUser.details)
              });
              if (window.cordova) {
                //noinspection JSUnresolvedFunction
                cordova.plugins.snackbar('Congrats! Account created successfully!', 'LONG', "", function () {

                });
              }
              pc.closeDialog();
              $timeout(function () {
                pc.loading = false;
              }, 10);
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              // noinspection JSUnresolvedVariable
              if ($stateParams.prevState) {
                //noinspection JSUnresolvedVariable
                $state.go($stateParams.prevState);
              } else {
                $state.go('app.home');
              }
            })
          }
          else {
            console.log("user is null");
            $timeout(function () {
              pc.loading = false;
            }, 10);
            $ionicLoading.hide();
          }
        },
          function (error) {
            // info.reject(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ErrorCode: ", errorCode);
            console.log("ErrorMessage: ", errorMessage);
            if (window.cordova) {
              //noinspection JSUnresolvedFunction
              cordova.plugins.snackbar(error.message, 'INDEFINITE', "Okay", function () {
              });
            } else {
              alert(errorMessage)
            }
            $timeout(function () {
              pc.loading = false;
            }, 10);
            $ionicLoading.hide();
          });
        // return info.promise;
      }, function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ErrorCode: ", errorCode);
        console.log("ErrorMessage: ", errorMessage);
        if (window.cordova) {
          //noinspection JSUnresolvedFunction
          cordova.plugins.snackbar(error.message, 'INDEFINITE', "Okay", function () {

          });
        } else {
          alert(errorMessage)
        }
        $timeout(function () {
          pc.loading = false;
        }, 10);
        $ionicLoading.hide();
      });
    }
  }
})();
