/**
 * Created by outrun on 3/12/16.
 */


(function () {
  "use strict";
  angular.module('USuo.ProfileCtl', [])
    .controller('ProfileCtl', function ($scope, $http, $rootScope, Constants) {
      var url = Constants.urls.admin;
      $scope.admin = bag.admin;

      $scope.adminCount = 0;
      $http({
        method: 'GET',
        url: url + '/count'
      }).success(function (data) {
        if (data && data.code == '0000') {
          $scope.adminCount = data.data;
        }
      }).error(function () {

      })

    });
})();
