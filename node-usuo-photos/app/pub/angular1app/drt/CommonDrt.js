/**
 * Created by outrun on 3/5/16.
 */

(function () {
  "use strict";
  angular.module('USuo.CommonDrt', []).directive('errSrc', function () {
    return {
      link: function (scope, element, attrs) {
        //element.bind('error', function () {
        //  if (attrs.src != attr.errSrc) {
        //    attrs.$set('src', attrs.errSrc);
        //  }
        //});
        attrs.$observe('ngSrc', function (value) {
          if (!value && attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        })
      }
    }
  }).directive('pageIndex', function ($http) {
    var tpl = '';
    return {
      restrict: 'E',
      priority: 1,
      terminal: true,
      scope: {
        _pageParts: '=parts'
      },
      templateUrl: '/angular1app/view/common/pageIndex.html',
      link: function (scope, element, attrs) {
        var pageParts = scope._pageParts;
        var pageBarSize = pageParts.pageBarSize || 5;
        var func = pageParts._func = {};

        var page = func.page = function () {
          if (pageParts.pageNum == 0) return;
          var params = typeof pageParts.req.params === 'function' ? pageParts.req.params() : pageParts.req.params;
          $http({
            url: pageParts.req.url,
            method: 'GET',
            params: params
          }).success(pageParts.req.onSuc).error(pageParts.req.onErr || new Function)
        };

        func.genPageParts = function (pageCount, totalCount) {
          pageParts.totalCount = totalCount;
          pageParts.display = true;

          var pageNum = pageParts.pageNum;
          var length;

          var activeLen = pageNum % pageBarSize;
          var startInd = pageNum - activeLen;
          var expectedPageCount = (pageBarSize - activeLen) + pageNum;
          if (expectedPageCount > pageCount) {
            length = pageCount % pageBarSize;
          } else {
            length = pageBarSize;
          }
          var endInd = startInd + length,
            activeInd = startInd + activeLen;

          if (activeInd == 1) pageParts.prevEnable = false;
          if (activeInd == pageCount) pageParts.nextEnable = false;

          var pages = pageParts.pages = [];
          for (var ind = startInd + 1; ind <= endInd; ind++) {
            pages.push({
              num: ind,
              active: ind == activeInd ? true : false
            })
          }
        };

        scope.go2Page = function () {
          pageParts.pageNum = this['curPageNum'];
        };
        scope.$watch('pageParts.pageNum + pageParts.pageSize', page);
        console.log(scope);
      }
    }
  })
})();