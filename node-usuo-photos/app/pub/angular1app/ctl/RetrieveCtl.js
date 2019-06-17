/**
 * Created by outrun on 2/28/16.
 */

(function () {
  "use strict";
  angular.module('USuo.RetrieveCtl', []).controller('RetrieveCtl', function ($timeout, $scope, $http, $rootScope, Constants) {
    //$scope.$broadcast('', 'aa')
    //$scoep.$on('', function (){})

    var url = Constants.urls.Retrieve;
    var PAGE_SIZE = 20, PAGEBAR_SIZE = 5;

    $scope.photoGenres = [{
      name: '全部类型',
    }, {
      mark: 1,
      name: '证件照',
    }, {
      mark: 2,
      name: '文艺照',
    }, {
      mark: 3,
      name: '形象照',
    }, {
      mark: 4,
      name: '头像照',
    }, {
      mark: 5,
      name: '登记照',
    }, {
      mark: 6,
      name: '萌宠照',
    }, {
      mark: 7,
      name: '全家福',
    }];

    $scope.cargoes = [];

    var $timeBegin = $('#timeBegin'),
      $timeEnd = $('#timeEnd'),
      $content = $('#content'),
      $photoGenre = $('#photoGenre');

    $scope.find = function () {
      if (pageParts.display) pageParts._func.page();
      else pageParts.display = true;
      //pageParts.pageNum = 1;
    };
    var pageParts = $scope.pageParts = {
      display: false,
      pageSize: PAGE_SIZE,
      pageBarSize: PAGEBAR_SIZE,
      pageNum: 1,
      totalCount: 0,
      prevEnable: false,
      nextEnable: false,
      pages: [
        //{
        //  num: 1,
        //  active: true,
        //}
      ],
      req: {
        url: url + '/multi',
        params: function () {
          return {
            timeBegin: $timeBegin.val(),
            timeEnd: $timeEnd.val(),
            content: $content.val(),
            inlineGenre: $photoGenre.val(),
            pageSize: pageParts.pageSize,
            pageNum: pageParts.pageNum
          };
        },
        onSuc: function (data) {
          if (data && data.code && data.code == '0000') {
            $scope.cargoes = data.data.pages;
            var page = data.data;
            pageParts._func.genPageParts(page.pageCount, page.totalCount);
          } else {
            alertify.error('检索失败 ' + data.msg);
          }
        },
        onErr: function (err) {
          alertify.error('服务异常');
        }
      }
    };

    $scope.cargoShowing;
    $scope.photosShowing;
    $scope.showCargo = function () {
      var ind = this['cargoInd'];
      var cargo = $scope.cargoShowing = $scope.cargoes[ind];
      $scope.photosShowing = cargo.photos;
      $timeout(function () {
        window.qiniuInit(cargo.photos.length);
      });

    };
    $scope.photoShowing;
    $scope.showPhoto = function () {
      $scope.photoShowing = this['photoUrl'];
    };


  }).controller('RetrieveSelfCtl', function ($scope, $http, $rootScope, Constants) {
    //$scope.$emit('', 'aa')
    //$scope.$on('', function() {})
    var url = Constants.urls.Retrieve;
    var PAGE_SIZE = 20, PAGEBAR_SIZE = 5;

    $scope.photoGenres = [{
      name: '全部类型',
    }, {
      mark: 1,
      name: '证件照',
    }, {
      mark: 2,
      name: '文艺照',
    }, {
      mark: 3,
      name: '形象照',
    }, {
      mark: 4,
      name: '头像照',
    }, {
      mark: 5,
      name: '登记照',
    }, {
      mark: 6,
      name: '萌宠照',
    }, {
      mark: 7,
      name: '全家福',
    }];

    $scope.cargoes = [];

    var $timeBegin = $('#timeBegin'),
      $timeEnd = $('#timeEnd'),
      $content = $('#content'),
      $photoGenre = $('#photoGenre');

    $scope.find = function () {
      if (pageParts.display) pageParts._func.page();
      else pageParts.display = true;
      //pageParts.pageNum = 1;
    };
    var pageParts = $scope.pageParts = {
      display: false,
      pageSize: PAGE_SIZE,
      pageBarSize: PAGEBAR_SIZE,
      pageNum: 1,
      totalCount: 0,
      prevEnable: false,
      nextEnable: false,
      pages: [
        //{
        //  num: 1,
        //  active: true,
        //}
      ],
      req: {
        url: url + '/multi',
        params: function () {
          return {
            timeBegin: $timeBegin.val(),
            timeEnd: $timeEnd.val(),
            content: $content.val(),
            inlineGenre: $photoGenre.val(),
            pageSize: pageParts.pageSize,
            pageNum: pageParts.pageNum,
            adminIds: JSON.stringify([bag.admin._id]),
          };
        },
        onSuc: function (data) {
          if (data && data.code && data.code == '0000') {
            $scope.cargoes = data.data.pages;
            var page = data.data;
            pageParts._func.genPageParts(page.pageCount, page.totalCount);
          } else {
            alertify.error('检索失败 ' + data.msg);
          }
        },
        onErr: function (err) {
          alertify.error('服务异常');
        }
      }
    };

    $scope.cargoShowing;
    $scope.photosShowing;
    $scope.showCargo = function () {
      var ind = this['cargoInd'];
      var cargo = $scope.cargoShowing = $scope.cargoes[ind];
      $scope.photosShowing = cargo.photos;
      $timeout(function () {
        window.qiniuInit(cargo.photos.length);
      });

    };
    $scope.photoShowing;
    $scope.showPhoto = function () {
      $scope.photoShowing = this['photoUrl'];
    };

  });
})();
