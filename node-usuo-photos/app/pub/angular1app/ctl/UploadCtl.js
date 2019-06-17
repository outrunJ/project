/**
 *
 * Created by outrun on 2/28/16.
 */

(function () {
  "use strict";
  angular.module('USuo.UploadCtl', [])
    .controller('UploadCtl', function ($scope, $http, $rootScope, Constants) {
      $scope.admin = bag.admin;

      var orderUrl = Constants.urls.order;

      $scope.orders;
      $scope.curOrder = {};
      $http({
        url: orderUrl + '/multi',
        method: 'GET',
        params: {
          timeEnd: Date.now()
        }
      }).success(function (data) {
        if (data && data.code === '0000') {
          $scope.orders = data.data;
          $scope.curOrder = $scope.orders[0];
        } else {
          alertify.error('获取订单失败, ' + data.msg);
        }
      }).error(function () {
        alertify.error('获取订单，服务异常');
      });

      $scope.selectOrder = function (x) {
        //$scope.curOrder = $scope.orders[x];
      }

    }).filter('index', [function () {
    return function (arr) {
      return (arr || []).map(function (item, index) {
        item.order = index;
        return item;
      })
    }
  }])
})();
