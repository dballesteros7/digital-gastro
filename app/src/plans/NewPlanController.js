/**
 * Created by diegob on 26.09.15.
 */

(function() {
  /**
   * @constructor
   */
  diga.NewPlanController = function($mdDialog, $state, backend, users, categories, opt_plan) {
    this.categories = categories;
    this.$mdDialog_ = $mdDialog;
    this.$state_ = $state;
    this.users = users;
    this.backend_ = backend;
    this.plan = opt_plan;
    this.toMutablePlan();
  };

  diga.NewPlanController.prototype.toMutablePlan = function() {
    if (this.plan) {
      this.mutablePlan = {};
      this.mutablePlan.date = new Date(this.plan.date);
      this.mutablePlan.categoryViews = this.plan.categories.map(function(category) {
        return {
          expandIcon: 'expand_less',
          isOpen: true,
          category : angular.copy(category)
        };
      });
      this.mutablePlan.isPublished = this.plan.isPublished;
    } else {
      this.mutablePlan = {
        date: new Date(),
        categoryViews: this.categories.map(function(category) {
          return {
            expandIcon: 'expand_less',
            isOpen: true,
            category: {
              name: category.name,
              displayName: category.displayName,
              items: category.items.map(function(item) {
                return {
                  displayName: item.displayName,
                  name: item.name,
                  assignee: null
                }
              })
            }
          }
        }),
        isPublished: false
      };
    }
  };

  diga.NewPlanController.prototype.toggleCategory = function(categoryView, opt_status) {
    if (opt_status === undefined) {
      categoryView.isOpen = !categoryView.isOpen;
    } else {
      categoryView.isOpen = opt_status;
    }
    categoryView.expandIcon = categoryView.isOpen ? 'expand_less' : 'expand_more';
  };

  diga.NewPlanController.prototype.openAssignDialog = function(event, item) {
    this.$mdDialog_.show({
      controller: 'UserSelectController',
      controllerAs: 'ctrl',
      templateUrl: 'src/users/views/userselection.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      locals: {
        users: this.users
      }
    }).then(function(user) {
      item.assignee = user;
    });
  };

  diga.NewPlanController.prototype.expandAll = function() {
    this.mutablePlan.categoryViews.forEach(function(categoryView) {
      this.toggleCategory(categoryView,  true);
    }, this);
  };

  diga.NewPlanController.prototype.hideAll = function() {
    this.mutablePlan.categoryViews.forEach(function(categoryView) {
      this.toggleCategory(categoryView,  false);
    }, this);
  };

  diga.NewPlanController.prototype.removeAssignment = function(item, event) {
    event.stopPropagation();
    event.preventDefault();
    item.assignee = null;
  };

  diga.NewPlanController.prototype.toImmutablePlan = function() {
    this.plan = this.plan || {};
    this.plan.date = this.mutablePlan.date.toISOString();
    this.plan.categories = this.mutablePlan.categoryViews.map(function(categoryView) {
      return categoryView.category;
    });
  };

  diga.NewPlanController.prototype.savePlan = function() {
    if (this.plan) {
      this.toImmutablePlan();
      return this.backend_.savePlan(this.plan);
    } else {
      this.toImmutablePlan();
      this.backend_.addNewPlan(this.plan).then(function (planId) {
        this.$state_.go('editplan', {
          planId: btoa(planId)
        });
      }.bind(this));
    }
  };

  diga.NewPlanController.prototype.publishPlan = function() {
    if (!this.plan) {
      this.toImmutablePlan();
      this.backend_.addNewPlan(this.plan).then(function (planId) {
        this.backend_.getPlan(planId).then(function(storedPlan) {
          this.plan = storedPlan;
          this.publishPlan();
        }.bind(this));
      }.bind(this));
    } else {
      this.plan.isPublished = true;
      this.savePlan().then(function(planId) {
        this.backend_.sendNotification(planId);
        this.$state_.go('viewplan', {
          planId: btoa(planId)
        });
      }.bind(this))
    }
  };

  angular.module('diga').controller('NewPlanController', ['$mdDialog', '$state', 'backend', 'users', 'categories', 'plan', diga.NewPlanController]);
})();