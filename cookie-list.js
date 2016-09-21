var cookieList = (function() {
  var _list = [];
  var _key = 'favorite';


  var init = function() {
   _list = [];
   load();
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
      return false;
    }
    return true;
  };

  var add = function(data) {
    if (!data) return;

    if (!exist(data)) {
      _list.push(data);
      return true; // add done
    }
    return false; // already exist
  };

  var del = function(data) {
    if (!data) return;

    _list.forEach(function(value, index) {
      if (value === data) {
        _list.splice(index, 1);
        return true;
      }
    });
    return false;
  };

  var exist = function(data) {
    if (!data) return;

    var exist = _list.some(function(value) {
      if (value === data) {
        return true;
      }
    });

    exist = exist || false;

    return exist;
  };
  var save = function() {
    cookieControl.save(_key, _list);
  };

  var list = function() {
    return _list;
  };

  return {
    init: init,
    toggle: toggle,
    add: add,
    del: del,
    exist: exist,
    save: save,
    list: list
  };
}());
