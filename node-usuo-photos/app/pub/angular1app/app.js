/**
 * Created by outrun on 2/28/16.
 */

(function () {
  "use strict";
  var _app = {
    loadModules: [
      'ngCookies',
      'ui.router',
      //'USuo.CommonFlt',
      'USuo.RetrieveCtl',
      'USuo.UploadCtl',
      'USuo.ProfileCtl',
      'USuo.CommonSvc',
      'USuo.ConstantSvc',
      'USuo.CommonDrt',
      'USuo.RetrieveDrt',
    ],
    initSettings: function ($rootScope, $state, $stateParams, Constants) {
      console.log('angular1 init');
    }
  };
  var _helper = {};
  angular.module('USuoApp', _app.loadModules)
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/blank');
      $stateProvider
        .state('blank', {
          url: '/blank',
          templateUrl: '/angular1app/view/blank.html',
        })
        .state('retrieve/find', {
          url: '/retrieve/find',
          templateUrl: '/angular1app/view/retrieve/find.html',
          controller: 'RetrieveCtl',
          resolve: {}
        })
        .state('retrieve/selfFind', {
          url: '/retrieve/selfFind',
          templateUrl: '/angular1app/view/retrieve/selfFind.html',
          controller: 'RetrieveSelfCtl',
          resolve: {}
        })
        .state('upload/admin', {
          url: '/upload/admin',
          templateUrl: '/angular1app/view/upload/admin.html',
          controller: 'UploadCtl',
          resolve: {}
        })
        .state('profile/edit', {
          url: '/profile/edit',
          templateUrl: '/angular1app/view/profile/edit.html',
          controller: 'ProfileCtl',
          resolve: {}
        })
    })
    .run(['$rootScope', '$state', '$stateParams', _app.initSettings]);

})();