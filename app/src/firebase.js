/**
 * Created by diegob on 26.09.15.
 */

(function() {

  diga.Backend = function($firebaseObject, $firebaseArray, $http) {
    this.baseUrl = 'https://diga.firebaseio.com';
    this.$firebaseObject_ = $firebaseObject;
    this.refFirebase = new Firebase('https://diga.firebaseio.com');
    this.$firebaseArray_ = $firebaseArray;
    this.$http_ = $http;
    this.plans = $firebaseArray(new Firebase(this.baseUrl + '/plans'));
    this.subscriptions = $firebaseArray(this.refFirebase.child('subscriptions'));
  };

  diga.Backend.prototype.storeSubscription = function(sub) {
    var parts = sub.endpoint.split('/');
    var registrationId = parts[parts.length - 1];
    this.subscriptions.$loaded().then(function(subs){
      var existingSub = subs.find(function(otherSub) {
        return registrationId === otherSub.registrationId;
      });
      if (!existingSub) {
        this.subscriptions.$add({
          endpoint: sub.endpoint,
          registrationId: registrationId
        });
      }
    }.bind(this));
  };

  diga.Backend.prototype.sendNotification = function(planId) {
    this.subscriptions.$loaded().then(function(subs){
      this.$http_({
        url: 'https://diga-1081.appspot.com/',
        method: 'POST',
        data: {
          to: subs.map(function(sub) {
            return sub.registrationId;
          })
        }
      });
    }.bind(this));
  };

  diga.Backend.prototype.addNewPlan = function(plan) {
    return this.plans.$add(plan).then(function(ref) {
      return ref.key();
    });
  };

  diga.Backend.prototype.savePlan = function(plan) {
    return this.plans.$save(plan).then(function(ref){
      return ref.key();
    });
  };

  diga.Backend.prototype.getPlan = function(planId) {
    return this.plans.$loaded().then(function(plans) {
      return plans.$getRecord(planId);
    });
  };

  diga.Backend.prototype.loadAllPlans = function() {
    return this.plans.$loaded().then(function(plans) {
      return plans.map(function(plan) {
        return plan;
      });
    })
  };

  diga.Backend.prototype.loadPublishedPlan = function(planId) {
    return this.plans.$loaded().then(function(plans) {
      return plans.find(function(plan) {
        return plan.$id === planId;
      });
    });
  };

  diga.Backend.prototype.watchPlan = function(plan, callback) {
    return this.$firebaseObject_(new Firebase(this.baseUrl + '/plans/' + plan.$id)).$watch(callback);
  };

  angular.module('diga').service('backend', ['$firebaseObject', '$firebaseArray', '$http', diga.Backend]);
})();