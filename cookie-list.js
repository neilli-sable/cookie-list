var cookieList = (function() {
  var _list = [];
  var _key = 'favorite';
  var _libName = 'cookie-list';

  var init = function() {
    _list = [];
    load(function() {
      var list = document.getElementById(_libName).getElementsByTagName('li');
      [].forEach.call(list, function(item) {
        var id = item.getElementsByClassName(_libName + '-id')[0].textContent;
        var button = item.getElementsByClassName(_libName + '-button')[0];
        if (cookieList.list().indexOf(id) > -1) {
          button.style.color = '#ffff00';
        }
      });
      addEvent();
    });
  };

  var addEvent = function() {
    var buttons = document.getElementsByClassName(_libName + '-button');
    [].forEach.call(buttons, function(aButton) {
      aButton.addEventListener('click', function() {
        // list control
        var star = cookieList.toggle(this.parentNode.getElementsByClassName(_libName + '-id')[0].textContent);
        cookieList.save();

        // icon change
        if (star) {
          this.style.color = '#ffff00';
        } else {
          this.style.color = '#000000';
        }
      });
    });
  };

  var load = function(callback) {
    if (cookieControl.toHash().favorite) {
      _list = cookieControl.toHash().favorite.split(',');
    }
    callback();
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
        return true;
      }
    });
    return false;
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
    save: save,
    list: list
  };
}());
