/**
 * Created by diegob on 26.09.15.
 */

(function() {
  /**
   * @constructor
   * @param {string} name
   */
  diga.Item = function(name, displayName) {
    /**
     * @export {string}
     */
    this.name = name;
    /**
     * @export {string}
     */
    this.displayName = displayName;
  };

  /**
   * @constructor
   * @param {!diga.Item} item
   * @param {!diga.Quantity} quantity
   * @param {!diga.User} assignee
   */
  diga.AssignedItem = function(item, quantity, assignee) {
    /**
     * @export {!diga.Item}
     */
    this.name = name;
    /**
     * @export {!diga.Quantity}
     */
    this.quantity = quantity;
    /**
     * @export {!diga.User}
     */
    this.assignee = assignee;
  };

  angular.module('items', []);
})();