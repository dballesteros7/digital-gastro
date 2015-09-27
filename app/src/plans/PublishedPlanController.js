/**
 * Created by diegob on 27.09.15.
 */

(function() {

  /**
   * @constructor
   */
  diga.PublishedPlanController = function($mdDialog, $state, backend, userService, users, categories, plan) {
    diga.NewPlanController.call(this, $mdDialog, $state, backend, users, categories, plan);
    this.userService_ = userService;
    backend.watchPlan(this.plan, this.onPlanChange.bind(this));
  };

  diga.PublishedPlanController.prototype = Object.create(
      diga.NewPlanController.prototype
  );

  diga.PublishedPlanController.prototype.constructor = diga.PublishedPlanController;

  diga.PublishedPlanController.prototype.getCurrentUser = function() {
    return this.userService_.currentUser;
  };

  diga.PublishedPlanController.prototype.onPlanChange = function() {
    this.backend_.loadPublishedPlan(this.plan.$id).then(function(plan) {
      this.plan = plan;
      this.toMutablePlan();
    }.bind(this));
  };

  diga.PublishedPlanController.prototype.update = function () {
    this.toImmutablePlan();
    this.backend_.plans.$save(this.plan);
  };

  angular.module('diga').controller('PublishedPlanController', ['$mdDialog', '$state', 'backend', 'userService', 'users', 'categories', 'plan', diga.PublishedPlanController]);
})();