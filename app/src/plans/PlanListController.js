/**
 * Created by diegob on 26.09.15.
 */

(function() {

  diga.PlanListController = function(plans) {
    this.months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    this.selectedMonth = this.months[moment().month()];
    this.plans = plans;
    this.dates = [];
    this.prepareDatesArray();
  };

  diga.PlanListController.prototype.prepareDatesArray = function() {
    this.dates = [];
    for(var i = 0; i < moment().month(this.selectedMonth).daysInMonth(); i++) {
      var date = moment().month(this.selectedMonth).date(i + 1);
      var plan =  this.plans.find(function(plan) {
        return date.isSame(plan.date, 'day');
      });
      if (plan) {
        plan.encodedId = btoa(plan.$id);
      }
      this.dates.push({
        date: date,
        plan: plan
      });
    }
  };

  diga.PlanListController.prototype.goToPlan = function(plan) {
    console.log(plan);
  };

  angular.module('diga').controller('PlanListController', ['plans', diga.PlanListController]);
})();