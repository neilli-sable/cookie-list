var cookieList = (function() {
  var _list = [];
  var _key = 'favorite';
  var _libName = 'cookie-list';

  var init = function() {
    _list = [];
    load();

    var buttons = document.getElementsByClassName(_libName + '-button');
    [].forEach.call(buttons, function(aButton) {
      aButton.addEventListener('click', function() {
        toggle(this.parentNode.getElementsByClassName(_libName + '-id')[0].textContent);
        save();
      });
    });
  };

  var load = function() {
    if (cookieControl.toHash().favorite) {
      _list = cookieControl.toHash().favorite.split(',');
    }
  };

  var toggle = function(data) {
    var done = add(data);
    if (!done) {
      del(data);
    }
  };

  var add = function(data) {
    var exist = _list.some(function(value) {
      if (value === data) {
        return true;
      }
    });

    if (!exist) {
      _list.push(data);
      return true; // add done
    }
    return false; // already exist
  };

  var del = function(data) {
    _list.forEach(function(value, index) {
      if (value === data) {
        _list.splice(index, 1);
      }
    });
  };

  var save = function() {
    cookieControl.save(_key, _list);
  };

  var list = function() {
    return _list;
  };

  return {
    init: init,
    add: add,
    del: del,
    save: save,
    list: list
  };
}());
