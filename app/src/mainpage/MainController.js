/**
 * Created by diegob on 26.09.15.
 */

(function() {

  /**
   *
   * @constructor
   */
  diga.MainController = function($mdSidenav, $firebaseAuth, userService, notificationService) {
    this.$mdSidenav_ = $mdSidenav;
    this.authObject_ = $firebaseAuth(new Firebase('https://diga.firebaseio.com'));
    this.userService_ = userService;
    this.notificationService_ = notificationService;
    this.notificationControl = this.notificationService_.pushEnabled;
    this.sidenavOptions = [
      {
        displayName: 'Prepare To-Do list',
        icon: 'create',
        state: 'newplan'
      },
      {
        displayName: 'View To-Do lists',
        icon: 'view_list',
        state: 'planlist'
      },
      {
        displayName: 'My Recipes',
        icon: 'book'
      },
      {
        displayName: 'Shared Recipes',
        icon: 'library_books'
      }
    ];

    this.aboutOptions = [
      {
        displayName: 'The Team',
        icon: 'people',
        url: 'https://www.f6s.com/profile/985085/about',
      },
      {
        displayName: 'Feedback',
        icon: 'feedback',
        url: 'mailto:chef@digitalgastro.co'
      }
    ];
  };

  Object.defineProperty(
      diga.MainController.prototype,
      'notificationControl',
      {
        get: function() {
          return this.notificationService_.pushEnabled;
        },
        set: function(value) {
          if (!this.notificationService_.pushEnabled) {
            this.notificationService_.subscribe();
          } else {
            this.notificationService_.unsuscribe();
          }
        }
      }
  );
  diga.MainController.prototype.isNotificationControlDisabled = function() {
    return this.notificationService_.disableControl;
  };

  diga.MainController.prototype.getNotificationsControlText = function() {
    return this.notificationService_.controlText;
  };

  diga.MainController.prototype.notificationControlChanged = function() {

  };

  diga.MainController.prototype.getCurrentUser = function() {
    return this.userService_.currentUser;
  };

  diga.MainController.prototype.signOut = function() {
    this.userService_.currentUser = null;
    this.authObject_.$unauth();
  };

  diga.MainController.prototype.toggleSidenav = function() {
    this.$mdSidenav_('left').toggle();
  };

  diga.MainController.prototype.authWithFacebook = function() {
    this.authObject_.$authWithOAuthPopup('facebook').then(function(authData) {
      this.userService_.storeUser({
        uid: authData.uid,
        name: authData.facebook.displayName,
        profileImgSrc: authData.facebook.profileImageURL
      }).then(this.onSuccessfulAuth.bind(this));
    }.bind(this));
  };

  diga.MainController.prototype.authWithGoogle = function() {
    this.authObject_.$authWithOAuthPopup('google').then(function(authData) {
      this.userService_.storeUser({
        uid: authData.uid,
        name: authData.google.displayName,
        profileImgSrc: authData.google.profileImageURL
      }).then(this.onSuccessfulAuth.bind(this));
    }.bind(this));
  };

  diga.MainController.prototype.onSuccessfulAuth = function(user) {
    this.userService_.currentUser = user;
  };

  angular.module('diga')
      .controller('MainController', [
        '$mdSidenav', '$firebaseAuth', 'userService',
        'notificationService', diga.MainController]);

})();