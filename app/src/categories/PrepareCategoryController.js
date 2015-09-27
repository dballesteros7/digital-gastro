/**
 * Created by diegob on 26.09.15.
 */

(function() {

  /**
   * @constructor
   */
  diga.PrepareCategoryController = function($stateParams, categories) {
    this.category = categories.find(function(category) {
      return category.name === $stateParams.categoryName;
    });

    this.allItems = this.category.items;
    /**
     * @export {!Array<boolean>}
     */
    this.itemsWithStatus = this.allItems.map(function(item) {
      return {
        status: false,
        item: item
      };
    });
  };

  diga.PrepareCategoryController.prototype.getItemsToPrepare = function() {
    return this.itemsWithStatus.filter(function(entry) {
      return entry.status;
    });
  };

  angular.module('diga').controller('PrepareCategoryController', [
      '$stateParams', 'categories', diga.PrepareCategoryController
  ]);
})();