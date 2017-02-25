/**
 * Created by shubhamjaiswal on 19/02/17.
 */
(function () {
  'use strict';

  angular.module('starter.controllers')
    .controller('AccountsCtrl', AccountsCtrl)
    .controller('PanelCtrl', PanelCtrl);

  function AccountsCtrl($log, $scope, $rootScope, $ionicLoading, $ionicPopup, $q, User, firebaseDataService,
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
            // 'webClientId': '528631628442-bjb7ubb6ds81lb0l7e925p3ovsb46ebr.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
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
      // $ionicLoading.show();
      ac.loading = true;
      firebase.auth().signInWithEmailAndPassword(ac.email, ac.password).then(function (response) {
        var user = firebase.auth().currentUser;
        if (user != null) {
          if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
            User = {
              'email': user.email,
              'userId': user.uid,
              'name': user.displayName,
              'picture': user.photoURL,
              // 'device_token': $rootScope.device_token

              // The user's ID, unique to the Firebase project. Do NOT use
              // this value to authenticate with your backend server, if
              // you have one. Use User.getToken() instead.
            };
          }
          else {
            User = {
              'email': user.email,
              'userId': user.uid,
              'name': user.displayName,
              'picture': user.photoURL
            };
          }
        } else {
          $timeout(function () {
            ac.loading = false;
          }, 10);
          // $ionicLoading.hide()
        }
        var newUser = firebaseDataService.getUserDetails(firebase.auth().currentUser.uid);
        if (newUser == null) {
          firebaseDataService.emailSignUp(User.userId, User);
        }
        $rootScope.$broadcast('user: loggedIn');
        localforage.setItem('currentUser', User).then(function () {
          console.log("Saved to LocalForage")
        });
        $timeout(function () {
          ac.loading = false;
        }, 10);
        console.log(User);
        // $ionicLoading.hide();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        if ($stateParams.prevState) {
          $state.go($stateParams.prevState);
        } else {
          $state.go('app.home')
        }
      }, function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
        $timeout(function () {
          ac.loading = false;
        }, 10);
        // $ionicLoading.hide()
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
          {text: 'Cancel'},
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

//This method is executed when the user press the "Dont have an account" link
    ac.createAccount = function () {
      // createPopup();
      // showPanel();
    };
    var createPopup = function () {
      var scope = $scope.$new();
      scope.data = {};
      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/createAccount.html',
        title: 'Create a new account',
        subTitle: 'Signup',
        scope: scope,
        buttons: [{
          text: 'Cancel',
          onTap: function (e) {
            scope.data.canceled = true;
            return scope.data;
          }
        }, {
          text: '<b>Sign Up</b>',
          type: 'button-positive',
          onTap: function (e) {
            var email = scope.data.email;
            var password = scope.data.password;
            var name = scope.data.name;
            if (email && email.length > 3) {
            } else {
              alert('Enter correct email');
              e.preventDefault();
            }
            $ionicLoading.show({
              template: 'Creating your account...'
            });
            var createUserId = function () {
              var info = $q.defer();
              firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {
                  info.resolve(response);
                },
                function (error) {
                  info.reject(error);
                }
              );
              return info.promise;
            };
            createUserId().then(function () {
              var user = firebase.auth().currentUser;

              user.updateProfile({
                displayName: scope.data.name,
                photoURL: "https://dl.dropbox.com/s/4tdz2fuzfcr29t6/avatar.png?dl=1"
              }).then(function () {
                console.log("Update Successful");
                // Update successful.
                if (user != null) {
                  User = {
                    'email': user.email,
                    'userId': user.uid,
                    'name': user.displayName,
                    'picture': user.photoURL,
                    // 'device_token': $rootScope.device_token

                    // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
                  };
                  // var newUser = firebaseDataService.getUserDetails(User.userId);
                  // if(newUser==null){
                  //   firebaseDataService.emailSignUp(User.userId, User);
                  // }
                  // User.SignInData=currentUser;
                  // $rootScope.$broadcast('user: loggedIn');
                  // localStorageService.set('currentUser', User);
                  myPopup.close();
                  $ionicLoading.hide();
                  // if($stateParams.prevState){
                  //   $state.go($stateParams.prevState);
                  // }
                  return scope.data;
                } else {
                  console.log("user is null");
                }
              }, function (error) {
                console.log("Account Created but update was unsuccessful", error);
                // An error happened.
              });
            }, function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("ErrorCode: ", errorCode);
              console.log("ErrorMessage: ", errorMessage);
              // ...
              $ionicLoading.hide();
              alert(errorMessage);
            });
            e.preventDefault();
          }
        }]
      });
      myPopup.then(function () {
        $ionicLoading.hide();
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
      zIndex: 150,
      clickOutsideToClose: false,
      clickEscapeToClose: false,
      hasBackdrop: true,
      fullscreen: true,
    };

    this._mdPanel.open(config);
  };

  function PanelCtrl(mdPanelRef, User, firebaseDataService, $rootScope, $timeout, $stateParams, $state, $scope, $ionicHistory, $ionicLoading) {
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
    });

    this._mdPanelRef = mdPanelRef;
    pc.closeDialog = function () {
      this._mdPanelRef && this._mdPanelRef.close();
    };
    pc.createAccount = function () {
      pc.loading = true;
      if (window.cordova) {
        $ionicLoading.show();
        document.addEventListener("deviceready", onDeviceReady, false);
        //noinspection JSAnnotator
        function onDeviceReady() {
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
          displayName: pc.firstName + "" + pc.lastName,
          photoURL: "https://dl.dropbox.com/s/4tdz2fuzfcr29t6/avatar.png?dl=1"
        }).then(function () {
            console.log("Update Successful");
            // Update successful.
            if (user != null) {
              User.details = {
                'email': user.email,
                'userId': user.uid,
                'name': user.displayName,
                'picture': user.photoURL,
                'emailVerified': user.emailVerified,
                'firstName': pc.firstName,
                'lastName': pc.lastName,
                'phone': pc.phone,
                'dob': pc.dob.toString(),
                'address1': pc.address1,
                'address2': pc.address2,
                'city': pc.city,
                'postcode': pc.postcode,
                'role': 'user'
                // 'device_token': $rootScope.device_token

                // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
              };
              var newUser = firebaseDataService.getUserDetails(User.details.userId);
              if (newUser == null) {
                firebaseDataService.emailSignUp(User.details.userId, User.details);
              }

              $rootScope.$broadcast('user: loggedIn');
              localforage.setItem('currentUser', User.details).then(function () {
                console.log("Saved to LocalForage", User.details)
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
            } else {
              console.log("user is null");
              $timeout(function () {
                pc.loading = false;
              }, 10);
            }
          },
          function (error) {
            // info.reject(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ErrorCode: ", errorCode);
            console.log("ErrorMessage: ", errorMessage);
            if (window.cordova) {
              $ionicLoading.hide();
              //noinspection JSUnresolvedFunction
              cordova.plugins.snackbar(error.message, 'INDEFINITE', "Okay", function () {
              });
            } else {
              alert(errorMessage)
            }
            $timeout(function () {
              pc.loading = false;
            }, 10);
          }
        );
        // return info.promise;
      }, function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ErrorCode: ", errorCode);
        console.log("ErrorMessage: ", errorMessage);
        if (window.cordova) {
          $ionicLoading.hide();
          //noinspection JSUnresolvedFunction
          cordova.plugins.snackbar(error.message, 'INDEFINITE', "Okay", function () {

          });
        } else {
          alert(errorMessage)
        }
        $timeout(function () {
          pc.loading = false;
        }, 10);
      });

    }
  }
})();
