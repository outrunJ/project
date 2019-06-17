(function () {
  if (!window) throw new Error('window is not defined.');
  if (!document) throw new Error('window is not defined.');

  var _ = window.NeatUtil;

  var hash;
  // root pages
  var components = {};

  function com(name, settings) {
    var root = document.getElementById(name);

    var _scopeNode = createScopeNode();

    var _com = components[name] = {
      root: root,
      // hash init
      pages: {},
      _scopeNode: _scopeNode
    };

    _.extend(_com, _scopeNode);
  }

  function createScopeNode(preNode, scope) {
    scope = scope || {};
    return {
      setProp: function (key, value) {
        scope[key] = value;
      },
      getProp: function (key) {
        return scope[key] !== undefined ? scope[key] :
          (preNode !== undefined ? preNode.getProp(key) : undefined);
      },
      scope: function () {
        if (preNode === undefined) {
          return scope
        }
        return _.extend(preNode.scope(), scope);
      }
    }
  }

  function page(comName, name, settings) {
    var component = components[comName];
    var p = component.pages[name] = {};

    p.hash = settings['hash'];
    p.init = settings['init'];

    var _scopeNode = createScopeNode(component._scopeNode);

    _.extend(p, _scopeNode);
  }

  function render(node, page) {
    refreshPage(node, page._scopeNode);
  }

  function refreshPage(node, scopeNode) {

    var childNodes = node.childNodes;
    if (node.nodeType != 3) { // content node
      var i, j;
      var attrCount = node.attributes.length;
      for (i = 0; i < attrCount; i++) {
        node.setAttribute(node.attributes[i].name, renderTpl(node.attributes[i].value, scopeNode));
      }

      var childCount = childNodes.length;
      for (j = 0; j < childCount; j++) {
        if (childNodes[j].nodeType != 3) {

          if (childNodes[j].hasAttribute('data-repeat')) {
            var item = childNodes[j].dataset.item;
            var repeat = childNodes[j].dataset.repeat;
            var repeatNode = childNodes[j];
            var repeatData = scopeNode.getProp(repeat);
            for (var prop in repeatData) {
              repeatNode = childNodes[j].cloneNode(true);
              node.appendChild(repeatNode);
              var repeatScope = createScopeNode(scopeNode);
              var obj = {
                key: prop,
                value: repeatData[prop],
              };
              repeatScope.setProp(item, obj);
              refreshPage(repeatNode, repeatScope);
            }
            childNodes[j].removeAttribute('data-repeat');
          }

        } else {
          refreshPage(childNodes[j], scopeNode)
        }
      }
    }
    else {
      node.textContent = renderTpl(node.textContent, scopeNode);
    }

  }

  function renderTpl(tpl, scopeNode) {
    return tpl.replace(/\{\{([^}]+)\}\}/gm, function (model) {
      var properties = model.substring(2, model.length - 2).split('.');

      var result = scopeNode.scope();
      var property;
      for (var n in properties) {
        if (result) {
          property = properties[n];
          switch (property) {
            default:
              result = result[property];
          }
        }
      }

      return result;
    })
  }

  function broadcastHash(hash) {

    function eachPage(root, page) {
      if (page.hash == hash) {
        render(root, page)
      }
    }

    function eachCom(com) {
      var root = com.root;
      _.each(_.values(com.pages), _.partial(eachPage, root))
    }

    _.each(_.values(components), eachCom);
  }

  function onhashchange() {

    hash = location.hash.substr(1);
    broadcastHash(hash)
  }

  (function init() {

    document.body.onhashchange = onhashchange;

  }());

  var Neat = {
    com: com,
    page: page,
  };

  window.Neat = Neat;
}());
