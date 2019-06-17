/**
 * Created by outrun on 10/22/15.
 */

(function () {
  angular.module('CAT.LoginCtl', [])
    .controller('LoginCtl', function (bag, $state, $rootScope, $scope, $http, Constants, $cookies) {
      var self = this,
        userStuff = {
          _loginSuc: function (data) {
            if (!data)
              userStuff._loginFail();

            var user = {
              isLogin: true
            };
            localStorage.user = angular.toJson(user);
            var expireDate = new Date();
            expireDate.setYear(3000);
            $cookies.put('userId', data._id/*, {
             path: '/',
             domain: 'localhost',
             expires: expireDate
             }*/);
            $rootScope.$broadcast('restoreState');
            $state.transitionTo('home', {location: '/'});
          },
          _loginFail: function (err) {
            console.log(err);
            alert('login fail');
          },
          _registSuc: function (data) {
            console.log(data);
            alert('register success');
          },
          _registFail: function (err, data) {
            console.log(err);
            alert('register fail');
          }
        };

      self.url = Constants.urls.USER;
      self.user = bag && bag.user || {};

      $scope.regist = function () {
        $http({
          method: 'post',
          url: self.url,
          data: {
            name: $scope.reg.username,
            pwd: $scope.reg.password
          }
        }).success(userStuff._registSuc).error(userStuff._registFail);
      };
      $scope.login = function () {
        $http({
          method: 'get',
          url: self.url,
          params: {
            name: $scope.username,
            pwd: $scope.password
          }
        }).success(userStuff._loginSuc).error(userStuff._loginFail);
      }
    })
})();