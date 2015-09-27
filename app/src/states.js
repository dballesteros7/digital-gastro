/**
 * Created by diegob on 26.09.15.
 */

(function() {


  angular
      .module('diga')
      .config(['$stateProvider', function($stateProvider) {
        var commonResolves ={
          categories: ['categoryService', function(categoryService) {
            return categoryService.loadAll();
          }],
          users: ['userService', function(userService) {
            return userService.loadAll();
          }],
          plan: function() {
            return null;
          }
        };
        $stateProvider
            .state('newplan', {
              url: '/plan/new',
              templateUrl: '/src/plans/views/newplan.html',
              controller: 'NewPlanController',
              controllerAs: 'ctrl',
              resolve: commonResolves
            })
            .state('editplan', {
              url: '/plan/:planId/edit',
              templateUrl: '/src/plans/views/newplan.html',
              controller: 'NewPlanController',
              controllerAs: 'ctrl',
              resolve: {
                categories: commonResolves.categories,
                users: commonResolves.users,
                plan: ['backend', '$stateParams', function(backend, $stateParams) {
                  return backend.getPlan(atob($stateParams.planId));
                }]
              }
            })
            .state('planlist', {
              url: '/plan/',
              templateUrl: '/src/plans/views/plans.html',
              controller: 'PlanListController',
              controllerAs: 'ctrl',
              resolve: {
                users: commonResolves.users,
                categories: commonResolves.categories,
                plans: ['backend', function(backend) {
                  return backend.loadAllPlans();
                }]
              }
            })
            .state('viewplan', {
              url: '/plan/:planId',
              templateUrl: '/src/plans/views/publishedplan.html',
              controller: 'PublishedPlanController',
              controllerAs: 'ctrl',
              resolve: {
                users: commonResolves.users,
                categories: commonResolves.categories,
                plan: ['backend', '$stateParams', function(backend, $stateParams) {
                  return backend.loadPublishedPlan(atob($stateParams.planId));
                }]
              }
            });
      }]);
})();