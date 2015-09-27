(function(){
  'use strict';

  /**
   * @constructor
   */
  diga.UserService = function($firebaseArray, $firebaseAuth){
    this.users_ = $firebaseArray(new Firebase('https://diga.firebaseio.com/users'));
    this.authObject_ = $firebaseAuth(new Firebase('https://diga.firebaseio.com'));
    this.currentUser = null;
    this.checkUserLogIn_();
  };

  diga.UserService.prototype.checkUserLogIn_ = function() {
    var authData = this.authObject_.$getAuth();
    if (authData) {
      this.getUser(authData.uid).then(function(user){
        if(user) {
          this.currentUser = user;
        }
      }.bind(this));
    }
  };

  diga.UserService.prototype.loadAll = function() {
      return this.users_.$loaded();
  };

  diga.UserService.prototype.storeUser = function(loggedUser) {
    return this.users_.$loaded().then(function(users) {
      var foundUser = users.find(function(user) {
        return user.uid === loggedUser.uid;
      });
      if (!foundUser) {
        return users.$add(loggedUser);
      } else {
        foundUser.name = loggedUser.name;
        foundUser.profileImgSrc = loggedUser.profileImgSrc;
        return users.$save(foundUser);
      }
    }).then(function(ref) {
      return this.users_.$getRecord(ref.key());
    }.bind(this));
  };

  diga.UserService.prototype.getUser = function(uid) {
    return this.users_.$loaded().then(function(users) {
      return users.find(function(user) {
        return user.uid === uid;
      });
    });
  };

    angular.module('users').service('userService', ['$firebaseArray', '$firebaseAuth', diga.UserService]);
})();
