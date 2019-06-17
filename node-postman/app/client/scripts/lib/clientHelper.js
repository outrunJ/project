/**
 * Created by outrun on 11/6/15.
 */

(function () {
  window.meowUtil = {
    loadState: function (that, scope, storageKey, state) {
      var state;
      if(storageKey)
        state = angular.fromJson(localStorage[storageKey]);
      if(state) state = state;
      if(state === undefined) return;

      for (var key in state.self) {
        if (state.self.hasOwnProperty(key)) {
          that[key] = state.self[key];
        }
      }
      for (key in state.scope) {
        if (state.scope.hasOwnProperty(key)) {
          scope[key] = state.scope[key];
        }
      }
    }
  };
})();