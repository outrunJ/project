/**
 * Created by outrun on 3/11/16.
 */

(function () {
  "use strict";
  angular.module('USuo.CommonFlt', []).filter('index', [function () {
    return function (arr) {
      return (arr || []).map(function (item, index) {
        item.order = index + 1;
        return item;
      })
    }
  }])
});