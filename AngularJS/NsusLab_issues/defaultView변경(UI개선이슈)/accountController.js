var AccountController = app.controller("AccountController", [
  "$rootScope",
  "$route",
  "$scope",
  "$filter",
  "$interval",
  "$timeout",
  "$window",
  "$location",
  "$translate",
  "$q",
  "accountService",
  "commonServices",
  "commonModel",
  "accountModel",
  "depositModel",
  "$document",
  "securityService",
  function (
    $rootScope,
    $route,
    $scope,
    $filter,
    $interval,
    $timeout,
    $window,
    $location,
    $translate,
    $q,
    accountService,
    commonServices,
    commonModel,
    accountModel,
    depositModel,
    $document,
    securityService
  ) {
    var Account = this;

    Account.isConfirmPassword = false;
    Account.fundPassword = "";
    Account.commonService = commonServices;
    Account.accountModel = accountModel;
    Account.accountService = accountService;
    Account.nextProcess = {};
    setCheckRequiredInfo(Account, $translate);
    Account.depositLimitSetupCountries = commonModel.depositLimitSetupCountries;
    Account.isDepositLimitSetupCountry = false;
    Account.isShowBalance = window.isShowBalance;

    Account.validateConfirmPassword = function (type) {
      Account.nextProcess = type;
      if ($rootScope.player.info.IsEnableFundPassword) {
        Account.isConfirmPassword = true;
        angular.element(".background_layer").fadeIn();
      } else Account.confirmFundPasswordResponse(true);
    };

    Account.confirmFundPasswordResponse = function (isVerify) {
      if (isVerify) {
        Account.isConfirmPassword = false;
        Account.nextProcess();
      } else {
        locationGoBack($window, $rootScope.previousRoute);
        Account.resetFundPassword();
      }
    };

    Account.resetFundPassword = function () {
      Account.isConfirmPassword = false;
      Account.fundPassword = "";
      Account.nextProcess = {};
    };

    var failCount = 0;
    var intervalTimer = 10 * 1000;

    Account.setBalanceInterval = function () {
      if (Account.isShowBalance === false) return;

      Account.balanceInterval = $interval(function () {
        Account.balance();
      }, intervalTimer);
    };

    Account.balance = function () {
      var data;
      accountService
        .getPlayerBalance()
        .then(function (response) {
          if (response && response.data) {
            data = response.data;

            if (typeof data.error === "number" && data.error === 0) {
              $rootScope.player.balance = data.body ? data.body : 0;

              failCount = 0;
            } else if (
              data.body === "CONNECTION_FAILED" ||
              data.body === null
            ) {
              if (failCount >= 4) {
                failCount = 0;
                throw data.body ? data.body : "API_SERVER_CONNECTION_FAILED";
              }

              failCount++;
            } else {
              failCount = 0;
              throw data.body ? data.body : "INTERNAL_ERROR";
            }
          } else {
            throw "INTERNAL_ERROR";
          }
        })
        .catch(function (e) {
          Account.resetBalanceInterval(data);
        });
    };

    Account.resetBalanceInterval = function (data) {
      $interval.cancel(Account.balanceInterval);
      if (data) {
        if (data.body === "ACCOUNT_LOCKED") {
          if (data.CustomerCode === "ACCOUNT_LOGIN_LIMIT_ACCESS") {
            location.href =
              "/error/loginlimit?Description=" +
              data.CustomerErrorParameters[0];
            logoutMobile();
          } else if (data.CustomerCode === "GAMSTOP_SELF_EXCLUDED") {
            location.href =
              "/error/SelfExcluded?description=" +
              data.CustomerErrorParameters[0];
            logoutMobile();
          } else if (data.CustomerCode === "ACCOUNT_LOCKED") {
            location.href = "/error/accountlocked";
            logoutMobile();
          } else {
            location.href = "/error/index";
            logoutMobile();
          }
        } else if (data.body === "ACCESS_DENIED") {
          location.href = "/error/index";
          logoutMobile();
        } else if (data.body === "ACCOUNT_SUSPENDED") {
          switch (data.CustomerCode) {
            case "ACCOUNT_LOGIN_ATTEMPS_FAILED_LOCKED":
            case "ACCOUNT_LOGIN_REMAIN_LIMIT":
            case "ACCOUNT_LOGIN_REMAIN_LIMIT_OVER_LOCKED":
            case "COMPLIANCE_CHECK_PERIOD":
            case "CLOSED":
            case "COMPLIANCE_CHECK":
            case "SECURITY":
            case "MULTIACC_CHECK":
              location.href =
                "/error/AccountSuspended?description=" +
                data.CustomerErrorParameters[0];
              break;
            case "EXCLUSION_CHECK":
              location.href =
                "/error/SelfExcluded?description=" +
                data.CustomerErrorParameters[0];
              break;
            default:
              location.href =
                "/error/excluded?date=" +
                data.CustomerErrorParameters[0] +
                "&type=" +
                data.CustomerErrorParameters[1];
              break;
          }
          logoutMobile();
        }
      } else {
        location.href = "/error/index";
        logoutMobile();
      }
    };

    var body = $document.find("body");

    //NOTE 이 if문은 해당 조건일때 body에 fixed 클래스를 붙여준다(.fixed는 스크롤 숨김 위한 overflow: hidden css코드)
    if (
      $rootScope.viewType === "mobileType" &&
      window.location.pathname.substr(1).toLowerCase() !== "myinfo"
    ) {
      body.addClass("fixed");
    }

    Account.changeBtnShape = true;
    Account.openMobileGnb = function () {
      if (body.find(".gnb_article").hasClass("on") === true) {
        body.removeClass("fixed");
        body.find(".gnb_article").removeClass("on");
        Account.changeBtnShape = false;
      } else {
        body.addClass("fixed");
        body.find(".gnb_article").addClass("on");
        Account.changeBtnShape = true;
      }
    };
    Account.closeMobileGnb = function () {
      body.removeClass("fixed");
      body.find(".gnb_article").removeClass("on");
      Account.changeBtnShape = false;
    };

    Account.backMobilePSPList = function () {
      $rootScope.currentMobilePSPName = "";
    };

    Account.activeLanguageBtn = false;
    Account.showLanguageBox = false;
    Account.inClickLanguageBox = false;

    Account.showLanguageSelector = function () {
      Account.activeLanguageBtn = !Account.activeLanguageBtn;
      Account.showLanguageBox = !Account.showLanguageBox;
    };

    Account.selectedLanguage = function (languageCode) {
      $rootScope.changeLanguage(languageCode);
      Account.refreshInformation();
      Account.closeLanguageBox();
    };

    Account.closeLanguageBox = function () {
      Account.activeLanguageBtn = false;
      Account.showLanguageBox = false;
    };

    angular.element("body").click(function () {
      if (Account.inClickLanguageBox === false && Account.showLanguageBox)
        Account.closeLanguageBox();

      $scope.$apply();
    });

    Account.openNotificationModal = function () {
      $rootScope.openNotificationBoard = true;
    };

    Account.onInit = function () {
      $rootScope.getRGConfig();
      $rootScope.getRGSelfExclusion();

      if (window.headerClass)
        angular.element("#mainHeader").addClass(window.headerClass);

      show2FaLoginModal(commonServices, securityService, $rootScope);

      $rootScope.openVerificationSetup = false;
      $rootScope.openKycInfoUploadModal = false;
      $rootScope.openAffordabilityCheck = false;
      $rootScope.openVerification = false;
      $rootScope.openPersonalInfoSetup = false;
      $rootScope.openBonusSetupKyc = false;
      $rootScope.openWithdrawalRequestConfirmation = false;

      $rootScope.getPlayer().then(function () {
        if ($rootScope.player.info.CountryCode) {
          Account.isDepositLimitSetupCountry =
            $rootScope.player.info.CountryCode &&
            Account.depositLimitSetupCountries.indexOf(
              $rootScope.player.info.CountryCode
            ) >= 0;
        }

        $rootScope.getNotificationBoard();
        Account.setBalanceInterval();
      });

      $timeout(
        function () {
          showLifeTimeConfirmModal($rootScope, Account);
        },
        500,
        true
      );
    };

    Account.exclusionStatusInterval = $interval(function () {
      accountService.checkExclusionStatus().then(function (response) {
        if (response.data.body !== null) {
          var data = response.data;

          if (data.body === "ACCOUNT_SUSPENDED") {
            logoutMobile();

            switch (data.CustomerCode) {
              case "ACCOUNT_LOGIN_ATTEMPS_FAILED_LOCKED":
              case "ACCOUNT_LOGIN_REMAIN_LIMIT":
              case "ACCOUNT_LOGIN_REMAIN_LIMIT_OVER_LOCKED":
              case "COMPLIANCE_CHECK_PERIOD":
              case "CLOSED":
              case "COMPLIANCE_CHECK":
              case "SECURITY":
              case "MULTIACC_CHECK":
                location.href =
                  "/error/AccountSuspended?description=" +
                  data.CustomerErrorParameters[0];
                break;
              case "EXCLUSION_CHECK":
                location.href =
                  "/error/SelfExcluded?description=" +
                  data.CustomerErrorParameters[0];
                break;
              default:
                location.href =
                  "/error/excluded?date=" +
                  data.CustomerErrorParameters[0] +
                  "&type=" +
                  data.CustomerErrorParameters[1];
                break;
            }
          }
        }
      });
    }, 1000 * 60 * 60 * 24);

    Account.refreshInformation = function () {
      switch ($route.current.$$route.activeTab) {
        case "deposit":
          $route.current.scope.$$childTail.Deposit.setPageVerification();
          break;
        case "withdrawal":
          $route.current.scope.$$childTail.Withdrawal.setPageVerification();
          break;
        case "moneyTransfer":
          $route.current.scope.$$childTail.Transfer.setPageVerification();
          break;
        default:
          break;
      }
    };

    Account.onInit();

    $scope.$on("refreshAccountVerification", function () {
      $rootScope.getPlayer().then(function () {
        Account.refreshInformation();
      });
    });

    $scope.$on("balanceIntervalOff", function () {
      $interval.cancel(Account.balanceInterval);
      Account.balanceInterval = undefined;
    });

    $rootScope.$on("balanceIntervalOn", function () {
      failCount = 0;
      Account.setBalanceInterval();
    });

    Account.backGroundColor = window.backGroundColor;

    Account.refreshPage = function () {
      $window.location.reload();
    };
  },
]);
app.config(routeConfig);

function logoutMobile() {
  $.ajax({
    type: "POST",
    url: "/home/logout",
    data: {
      token: sessionStorage.token,
    },
  }).done(function (result) {
    var data = {};
    data.action = "logout";

    window.parent.postMessage(data, "*");
  });
}
