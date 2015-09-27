/**
 * Created by diegob on 26.09.15.
 */
(function () {
  'use strict';

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @constructor
   */
  diga.CategoryService = function($q) {
    /**
     * @private {?}
     */
    this.$q = $q;
  };

  /**
   * @const {!Array<diga.Category>}
   */
  diga.CategoryService.DEFAULT_CATEGORIES = [
    new diga.Category('oil', 'Oil, Dressing & Vinegar').addItem(new diga.Item('frdressing', 'French dressing')).addItem(new diga.Item('itdressing', 'Italian dressing')).addItem(new diga.Item('mangolime', 'Mango & Lime dressing')),
    new diga.Category('snacks', 'Snacks'),
    new diga.Category('vegetables', 'Vegetables'),
    new diga.Category('bread', 'Bread'),
    new diga.Category('meat', 'Meat')
  ];

  /**
   * @returns {!Promise<!Array<!diga.Category>>}
   */
  diga.CategoryService.prototype.loadAll = function () {
    return this.$q.when(diga.CategoryService.DEFAULT_CATEGORIES);
  };

  angular.module('diga')
      .service('categoryService', ['$q', diga.CategoryService]);


})();
