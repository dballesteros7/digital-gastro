/**
 * Created by diegob on 27.09.15.
 */

(function() {
  diga.AuthController = function($firebaseAuth) {
    this.$firebaseAuth_ = $firebaseAuth;
  };

  angular.module('diga').controller('AuthController', ['$firebaseAuth', diga.AuthController]);
})();