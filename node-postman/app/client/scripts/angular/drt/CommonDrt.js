/**
 * Created by outrun on 10/27/15.
 */

(function () {
  angular.module('CAT.CommonDrt', [])
    // 'autoFocus1' used like auto-focus1='true' in HTML, and autofocus1 used like autofocus1 = 'true'
    .directive('autoFocus1', function () {
      return {
        link: function (scope, element, attrs, controller) {
          console.log('autoFocus1');
          element[0].focus();
        }
      }
    })
})();