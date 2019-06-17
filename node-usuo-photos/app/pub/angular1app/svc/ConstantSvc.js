/**
 * Created by outrun on 2/28/16.
 */

(function () {
  "use strict";
  var BASE_URL = '/api';

  angular.module('USuo.ConstantSvc', [])
  .constant('Constants', {
    urls: {
      Retrieve: BASE_URL + '/cargo',
      qiniu: BASE_URL + '/qiniu',
      order: BASE_URL + '/order',
      admin: BASE_URL + '/admin',
    }
  })
})();