/**
 * Created by outrun on 10/26/15.
 */

(function () {
  angular.module('CAT.CommonSvc', [])
    .factory('LocalStorage', function ($rootScope, $cookies) {
      var service = {
        bag: {
          user: {isLogin: false}
        },
        saveState: function () {
          console.log('saveState');
          localStorage.user = angular.toJson(service.bag.user);
          $rootScope.user = service.bag.user;
        },
        restoreState: function ($event, userData) {
          console.log('restoreState');
          $rootScope.user = service.bag.user = angular.fromJson(localStorage.user);
        },
        cleanState: function () {
          console.log('cleanState');
          service.bag.user = {isLogin: false};
          $rootScope.user = service.bag.user;
          //$cookies.remove('userId');
          localStorage.user = '';
          $cookies.remove('userId');
        }
      };

      $rootScope.$on('saveState', service.saveState);
      $rootScope.$on('restoreState', service.restoreState);
      $rootScope.$on('cleanState', service.cleanState);

      // first open this page
      if (localStorage.user) service.restoreState();

      return service;
    })
    .factory('MeowUtil', function () {
      var service = {
        arrayPull: function (arr, key, val) {
          var retArr = [];

          if (!(arr instanceof Array))
            return retArr;
          arr.forEach(function (item, index) {
            if (item[key] == val)
              retArr.push(arr.splice(index, 1));
          });
          return retArr;
        }
      };
      return service;
    });
})();