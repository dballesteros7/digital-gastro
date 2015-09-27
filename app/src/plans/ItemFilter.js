/**
 * Created by diegob on 27.09.15.
 */

(function() {
  angular.module('diga')
      .filter('assignedItems', function() {
        return function(items) {
          if (!items) {
            return items;
          }
          return items.filter(function(item) {
            return item.assignee != null;
          });
        };
      })
      .filter('byUser', function() {
        return function(items, user, enable) {
          if(!enable || !items || !user) {
            return items;
          }
          return items.filter(function(item) {
            return item.assignee.uid === user.uid;
          });
        }
      });
})();