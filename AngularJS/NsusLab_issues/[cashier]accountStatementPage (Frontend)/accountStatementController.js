var AccountStatementController = app.controller("AccountStatementController", [
  "$scope",
  "$translate",
  "accountService",
  function ($scope, $translate, accountService) {
    var AccountStatement = this;

    AccountStatement.SelectedAnYear = {};
    AccountStatement.RequestAccountStatement = 0;
    AccountStatement.CurrentAccountStatement = 0;
    AccountStatement.YearList = [];
    AccountStatement.isModify = false;
    AccountStatement.BaseYear = new Date().getFullYear() + 1;
    AccountStatement.LastFiveYears = AccountStatement.BaseYear - 6;
    AccountStatement.clickDisabled = false;

    AccountStatement.alertClose = function () {
      angular.element(".alert_box").hide();
    };

    AccountStatement.setYearList = function () {
      AccountStatement.YearList = [];

      for (
        var i = AccountStatement.LastFiveYears;
        i < AccountStatement.BaseYear;
        i++
      ) {
        if (i === AccountStatement.LastFiveYears) {
          AccountStatement.YearList.push({
            label: $translate.instant("Common.Select"),
            value: i,
          });
        } else {
          AccountStatement.YearList.push({
            label: i + " ",
            value: i,
          });
        }
      }

      if (typeof AccountStatement.CurrentAccountStatement === "number") {
        angular.forEach(AccountStatement.YearList, function (row, idx) {
          if (row.value === AccountStatement.CurrentAccountStatement)
            AccountStatement.SelectedAnYear = row;
        });
      }

      AccountStatement.selectShow = true;
    };

    AccountStatement.changeYearList = function (row) {
      AccountStatement.SelectedAnYear = row;
      AccountStatement.RequestAccountStatement = row.value;

      if (
        AccountStatement.CurrentAccountStatement !==
        AccountStatement.RequestAccountStatement
      )
        AccountStatement.isModify = true;
      else AccountStatement.isModify = false;

      AccountStatement.selectShow = false;
      AccountStatement.clickDisabled = false;
    };

    AccountStatement.onInit = function () {
      AccountStatement.setYearList();
    };

    AccountStatement.onInit();

    AccountStatement.downloadAccountStatement = function () {
      var params = {
        Year: AccountStatement.SelectedAnYear.value,
      };

      AccountStatement.clickDisabled = true;

      accountService.downloadAccountStatement(params).then(function (response) {
        var data = response.data;

        if (data.body.Result == true) {
          AccountStatement.SelectedAnYear = $translate.instant("Common.Select");
          AccountStatement.selectShow = true;

          angular.element(".alert_box.success").fadeIn().delay(5000).fadeOut();
        } else {
          AccountStatement.clickDisabled = false;

          if (data.body == "EXCEED_DOWNLOAD_ATTEMPTS") {
            angular
              .element(".alert_box.failed p")
              .html($translate.instant("Download.Attempts.Exceed"));
          } else if (data.body == "DATA_NOT_EXISTING") {
            angular
              .element(".alert_box.failed p")
              .html($translate.instant("Download.Data.Not.Existing"));
          } else {
            angular
              .element(".alert_box.failed p")
              .html($translate.instant("Download.Is.Failed"));
          }

          angular.element(".alert_box.failed").fadeIn().delay(5000).fadeOut();
        }
      });
    };
  },
]);
