// LocalStorageService.js
const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("accessToken", tokenObj.accessToken);
    localStorage.setItem("name", tokenObj.name);
    localStorage.setItem("email", tokenObj.email);
    localStorage.setItem("user_id", tokenObj.user_id);
    localStorage.setItem("role", tokenObj.role);
  }
  function _getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  function _getValue(key) {
    return localStorage.getItem(key);
  }

  function _clearStorage() {
    localStorage.clear();
  }

  function _clearToken() {
    localStorage.removeItem("accessToken");
  }
  return {
    clearStorage: _clearStorage,
    getService: _getService,
    getValue: _getValue,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    clearToken: _clearToken,
  };
})();

export default LocalStorageService;
