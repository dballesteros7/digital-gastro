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
    new diga.Category('oil', 'Oil, Dressing & Vinegar')
        .addItem(new diga.Item('frdressing', 'French dressing'))
        .addItem(new diga.Item('itdressing', 'Italian dressing'))
        .addItem(new diga.Item('mangolime', 'Mango & Lime dressing')),
    new diga.Category('snacks', 'Snacks')
        .addItem(new diga.Item('chips', 'Potato chips'))
        .addItem(new diga.Item('olives', 'Olives & Tomatoes'))
        .addItem(new diga.Item('spring', 'Spring Rolls')),
    new diga.Category('vegetables', 'Vegetables')
        .addItem(new diga.Item('lettuce', 'Lettuce'))
        .addItem(new diga.Item('celery', 'Celery'))
        .addItem(new diga.Item('carrots', 'Carrots')),
    new diga.Category('bread', 'Bread')
        .addItem(new diga.Item('sunbread', 'Sonnenbröt'))
        .addItem(new diga.Item('baguette', 'Baguette')),
    new diga.Category('meat', 'Meat')
        .addItem(new diga.Item('baby', 'Baby Beef'))
        .addItem(new diga.Item('goulash', 'Goulash'))
        .addItem(new diga.Item('tbone', 'T-bones'))
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
