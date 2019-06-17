/**
 * Created by outrun on 3/4/16.
 */

(function () {
  "use strict";
  angular.module('USuo.RetrieveDrt', []).directive('photoRevise', function ($http, $rootScope, Constants) {
    var url = Constants.urls.qiniu;


    return {
      //restrict: 'A',
      link: function (scope, element, attrs, controller) {
        //var $element = $(element);
        //var photoId = scope['photoId'];
        //$element.click(function () {
        //  $http({
        //    url: url,
        //    method: 'PUT',
        //    data: {
        //      _id: $scope.cargoShowing._id,
        //      photoId: photoId,
        //      photoUrlRevised: qiniuPhotoUrlRevised,
        //    }
        //  }).success(function () {
        //    $element.parent('div').prev('img').attr('src', qiniuPhotoUrlRevised + '?imageView2/1/w/300/h/350');
        //  }).error(function () {
        //    alertify.error('服务异常');
        //  });
        //})
      }
    }
  });
})();