var accountStatementService = app.factory("accountStatementService", [
  "$http",
  "$q",
  "$interval",
  "$timeout",
  function ($http, $q, $interval, $timeout) {
    var accountStatementService = {};

    accountStatementService.downloadAccountStatement = function (params) {
      var req = {
        url: "/api/DownloadAccountStatementRequest",
        method: "POST",
        params: params,
      };

      return $http(req);
    };

    return accountStatementService;
  },
]);
