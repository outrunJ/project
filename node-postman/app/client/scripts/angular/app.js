(function () {
  var _App = {
    loadModules: [
      'ngCookies',
      'ui.router',
      // Controllers
      'CAT.DemoCtl',
      'CAT.LoginCtl',
      'CAT.HomeCtl',
      // Services
      'CAT.CommonSvc',
      'CAT.ConstantSvc',
      // Directives
      'CAT.CommonDrt'

    ],
    initSettings: function ($rootScope, $state, $stateParams, Constants) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.constants = Constants;
      _Helper.$rootScope = $rootScope;
      //$rootScope.hidden = true;

      //$rootScope.$on('$routeChangeStart', function (event, next, current) {
      //  console.log('$outeChangeStart');
      //
      //  if (localStorage.hasRestoreState == 'false') {
      //    $rootScope.$broadcast('restoreState');
      //    localStorage.hasRestoreState = true;
      //  } else {
      //    localStorage.hasRestoreState = 'false';
      //  }
      //});
      $rootScope.logout = _loginHelper.logout;

      window.onbeforeunload = function () {
        console.log('window.onbeforeunload');
        $rootScope.$broadcast('saveState');
        $rootScope.$broadcast('saveCurState');
      };
      window.onload = function () {
        console.log('window.onload');
      }

    }
  };
  var _Helper = {
    resolveBag: ['LocalStorage', function (LocalStorage) {
      return LocalStorage.bag;
    }]
  };
  var _loginHelper = {
    logout: function () {
      var $rootScope = _Helper.$rootScope,
        $state = $rootScope.$state;
      console.log('logout');
      $rootScope.$broadcast('cleanState');
      $state.transitionTo('login', {location: '/login'});
    },
    auth_login: function (bag, $state) {
      console.log('auth_login');
      if (bag && bag.user && bag.user.isLogin) {
        $state.transitionTo('home', {location: '/'})
      }
    },
    auth_user: function (bag, $state) {
      console.log('auth_user');
      var self = this;
      if (!bag || !bag.user || !bag.user.isLogin) {
        $state.transitionTo('login', {location: '/login'})
      }
    }
  };

  angular.module('MeowApp', _App.loadModules)
    .run(['$rootScope', '$state', '$stateParams', _App.initSettings])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      console.log('MeowApp');

      // use the HTML5 History API & set HTM5 mode true
      //$locationProvider.html5Mode(true);

      $urlRouterProvider
        //.when('/user/:id', '/home')
        .otherwise("/login");

      $stateProvider
        .state('demo', {
          url: "/demo",
          templateUrl: "../views/demo.html",
          controller: "DemoCtl",
          resolve: {bag: _Helper.resolveBag},
          onEnter: _loginHelper.auth_user,
          onExit: function () {
            console.log("demo onExit");
          }
        })
        .state('login', {
          url: "/login",
          templateUrl: "../views/login.html",
          controller: "LoginCtl",
          resolve: {bag: _Helper.resolveBag},
          onEnter: _loginHelper.auth_login
        })
        .state('home', {
          url: "/",
          templateUrl: "../views/home.html",
          controller: "HomeCtl",
          resolve: {bag: _Helper.resolveBag},
          onEnter: _loginHelper.auth_user
        })
    });
})();