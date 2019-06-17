/**
 * Created by outrun on 10/27/15.
 */

(function () {
  var BASE_URL = '/api';
  angular.module('CAT.ConstantSvc', [])
    .constant('Constants', {
      urls: {
        HTTP_REQUESTER: BASE_URL + '/httpRequest',
        DEMO: BASE_URL + '/demo',
        USER: BASE_URL + '/user'
      }
    });
})();