var ChangeContraAccountController = app.controller('ChangeContraAccountController', [
	'$rootScope', '$timeout', 'myInfoModel', 'commonModel',
	function ($rootScope, $timeout, myInfoModel, commonModel)
	{
		var ChangeContraAccount = this;

		ChangeContraAccount.btnDisabled = false;

		ChangeContraAccount.requestForChangeBankInfo = function ()
		{
			ChangeContraAccount.btnDisabled = true;

			angular.element('.alert_box.success').fadeIn().delay(3000).fadeOut();

			//ChangeContraAccount.requestForChangeBankInfo().then(function (response)
			//{
			//});
		}

		ChangeContraAccount.onInit = function () {

		};

		ChangeContraAccount.onInit();
	}
]);