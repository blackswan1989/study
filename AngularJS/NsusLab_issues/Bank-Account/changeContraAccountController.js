var ChangeContraAccountController = app.controller('ChangeContraAccountController', [
	'$rootScope', '$timeout', 'myInfoModel', 'commonModel', 'myInfoModel', '$window',
	function ($rootScope, $timeout, myInfoModel, commonModel, myInfoModel, $window)
	{
		var ChangeContraAccount = this;

		ChangeContraAccount.isNL = false;
		ChangeContraAccount.btnDisabled = false;

		ChangeContraAccount.openVerifyKycSignicatModal = function ()
		{
			if ($rootScope.isRGSelfExclusion === true)
			{
				return;
			}

			if (isUsedVerifyFlow())
			{
				commonModel.getRequirementStepList().then(function ()
				{
					$rootScope.openVerificationStep = true;
				});
			}
			else {
				$rootScope.openVerification = true;
			}
		};

		ChangeContraAccount.onInit = function ()
		{
			if ($window.environment === 'dev')
			{
				myInfoModel.getPlayerInfo(function ()
				{
					if (myInfoModel.myInfo.Country.toLowerCase() === 'nl')
					{
						ChangeContraAccount.isNL = true;
					}
				});
			}
		};

		ChangeContraAccount.onInit();
	}
]);
