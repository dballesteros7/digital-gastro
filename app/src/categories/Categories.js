/**
 * Created by diegob on 26.09.15.
 */
(function() {
  'use strict';

  /**
   * @constructor
   */
  diga.Category = function(name, displayName, imgSrc) {
    /**
     * @export {string}
     */
    this.name = name;
    /**
     * @export {string}
     */
    this.displayName = displayName;
    /**
     * @export {string}
     */
    this.imgSrc = imgSrc;
    /**
     * @export {!Array<!diga.Item>}
     */
    this.items = [];
  };

  /**
   * @param {!diga.Item} item
   * @return {!diga.Category}
   */
  diga.Category.prototype.addItem = function(item) {
    this.items.push(item);
    return this;
  };

  angular.module('categories', []);
})();