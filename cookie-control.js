var cookieControl = (function() {
  var reset = function() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var pos = cookie.indexOf('=');
      var name = pos > -1 ? cookie.substr(0, pos) : cookie;

      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  };

  var save = function(key, data) {
    if (Array.isArray(data)) {
      saveArray(key, data);
    }
    if (typeof data === 'string') {
      saveString(key, data);
    }
  };

  var saveString = function(key, data) {
    var write = key + '=' + encodeURIComponent(data) + ';path=/';
    document.cookie = write;
  };

  var saveArray = function(key, data) {
    var write = key + '=' + encodeURIComponent(data.join(',')) + ';path=/';
    document.cookie = write;
  };

  var remove = function(key) {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  };

  var toHash = function() {
    var result = {};

    var allcookies = document.cookie;
    if (allcookies !== '') {
      var cookies = allcookies.split('; ');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=');
        result[cookie[0]] = decodeURIComponent(cookie[1]);
      }
    }
    return result;
  };

  return {
    reset: reset,
    save: save,
    remove: remove,
    toHash: toHash
  };
}());
