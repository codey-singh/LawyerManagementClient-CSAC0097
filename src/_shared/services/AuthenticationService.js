import LocalStorageService from "./LocalStorageService";

const AuthenticationService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _isAuthenticated() {
    return !!LocalStorageService.getAccessToken();
  }
  return {
    getService: _getService,
    isAuthenticated: _isAuthenticated,
  };
})();

export default AuthenticationService;
