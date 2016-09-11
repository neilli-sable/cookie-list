var cookieControl = (function() {
  var save = function(key, data) {
    if (Array.isArray(data)) {
      saveArray(key, data);
    }
    if (typeof data === 'string') {
      saveString(key, data);
    }
  };

  var saveString = function(key, data) {
    var write = key + '=' + encodeURIComponent(data);
  };

  var saveArray = function(key, data) {
    var write = key + '=' + encodeURIComponent(data.join(','));
    document.cookie = write;
  };

  var reset = function(key) {
    document.cookie = key + '=';
  };

  var toHash = function() {
    var result = [];

    var allcookies = document.cookie;
    if (allcookies !== '') {
      var cookies = allcookies.split( '; ' );
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split( '=' );
        result[cookie[0]] = decodeURIComponent(cookie[1]);
      }
    }
    return result;
  };

  return {
    save: save,
    reset: reset,
    toHash: toHash
  };
}());
