/**
 * Created by diegob on 26.09.15.
 */

(function() {

  /**
   * @constructor
   */
  diga.UserSelectController = function($mdDialog, users) {
    this.$mdDialog_ = $mdDialog;
    this.users = users;
  };

  diga.UserSelectController.prototype.assignUser = function(user) {
    this.$mdDialog_.hide(user)
  }

  angular.module('diga').controller('UserSelectController', ['$mdDialog', 'users', diga.UserSelectController]);
})();