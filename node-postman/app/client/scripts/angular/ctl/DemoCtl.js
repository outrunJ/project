/**
 * Created by outrun on 10/22/15.
 */

(function () {
  angular.module('CAT.DemoCtl', [])
    .controller('DemoCtl', function ($scope, $http, $rootScope, Constants, MeowUtil) {
      var self = this;
      self.url = Constants.urls.DEMO;

      $scope.dataTypes = {
        options: [
          {id: 1, name: 'str'},
          {id: 2, name: 'num'}
        ]
      };
      $scope.httpMethods = {
        options: [
          {id: 1, name: 'get'},
          {id: 2, name: 'post'},
          {id: 3, name: 'put'},
          {id: 4, name: 'delete'}
        ]
      };

      (function () {
        // request states
        $http({
          method: 'get',
          url: self.url + '/snapshot'
        }).success(function (states) {
          console.log(states);
          $scope.states = states;
        }).error(function (err) {
          console.log(err);
        });
      })();

      // state
      meowUtil.loadState(self, $scope, 'state_demo');
      var httpStuff = self.httpStuff = self.httpStuff || {
          _paramsCurId: 1,
          _headersCurId: 1,
          _cookiesCurId: 1,
        };
      httpStuff._showResult = function (data) {
        $scope.result = JSON.stringify(data);
      };
      $scope.url = $scope.url || '';
      $scope.params = $scope.params || [
          {id: 0, key: '', val: '', type: ''}
        ];
      $scope.headers = $scope.headers || [
          {id: 0, key: '', val: ''}
        ];
      $scope.cookies = $scope.cookies  || [
          {id: 0, key: '', val: ''}
        ];
      $scope.method = $scope.method || {};
      $scope.result = $scope.result || '';
      // end of state
      $scope.sceneName = '';


      $scope.pushParam = function ($childScope, $event) {
        $scope.params.push({id: httpStuff._paramsCurId, key: '', val: ''});
        httpStuff._paramsCurId++;
      };
      $scope.pullParam = function ($childScope, $event) {
        $scope.params.forEach(function (item, index) {
          if (item.id == $childScope.curId) {
            $scope.params.splice(index, 1);
          }
        })
      };
      $scope.pushHeader = function () {
        $scope.headers.push({id: httpStuff._headersCurId, key: '', val: ''});
        httpStuff._headersCurId++;
      };
      $scope.pullHeader = function ($childScope) {
        MeowUtil.arrayPull($scope.headers, 'id', $childScope.curId);
      };
      $scope.pushCookie = function () {
        "use strict";
        $scope.cookies.push({id: httpStuff._cookiesCurId, key: '', val: ''});
        httpStuff._cookiesCurId++;
      };
      $scope.pullCookie = function ($childScope) {
        "use strict";
        MeowUtil.arrayPull($scope.cookies, 'id', $childScope.curId);
      };
      $scope.httpSubmit = function () {
        $http({
          method: 'post',
          url: Constants.urls.HTTP_REQUESTER,
          data: {
            url: $scope.url,
            methodId: $scope.method.id,
            params: $scope.params,
            headers: $scope.headers,
            cookies: $scope.cookies,
          }
        }).success(httpStuff._showResult).error(httpStuff._showResult);
      };
      $scope.snapshot = function () {
        var state = self.getState();
        $http({
          method: 'post',
          url: self.url + '/snapshot',
          data: {
            sceneName: $scope.sceneName,
            state: state
          }
        }).success(function (data) {
          $scope.states.push({
            name: $scope.sceneName,
            state: JSON.stringify(state)
          });
          alert('save state success');
        }).error(function (err) {
          console.log(err);
          alert('save state error');
        });
      };
      $scope.snapRestore = function (state) {
        state = state.state;
        if (typeof state === 'string') state = JSON.parse(state);
        meowUtil.loadState(self, $scope, null, state);
      };

      self.getState = function () {
        return {
          self: {
            httpStuff: httpStuff
          },
          scope: {
            url: $scope.url,
            params: $scope.params,
            headers: $scope.headers,
            cookies: $scope.cookies,
            result: $scope.result,
            method: $scope.method
          }
        }
      };

      // state persistence
      $rootScope.$on('saveCurState', function () {
        console.log('demo saveCurState');
        var state = self.getState();
        // escape functions
        localStorage['state_demo'] = angular.toJson(state);
      });

    }).controller('DemoCtl.Child', function ($scope, $http, $rootScope) {
    var self = this;
  })
})
();
