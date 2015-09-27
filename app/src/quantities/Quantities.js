/**
 * Created by diegob on 26.09.15.
 */

(function() {

  /**
   *
   * @constructor
   * @param {number} value
   * @param {diga.Unit} unit
   */
  diga.Quantity = function(value, unit) {
    /**
     * @export {number}
     */
    this.value = value;
    /**
     * @export {diga.Unit}
     */
    this.unit = unit;
  };

  /**
   * @enum {String}
   */
  diga.Unit = {
    KG: 'kg',
    LITER: 'l',
    OUNCE: 'oz'
  };

  angular.module('quantities', []);
})();