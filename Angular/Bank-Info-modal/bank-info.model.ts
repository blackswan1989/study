import { Injectable } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import * as DTO from '@dto/backend';
import * as DForm from '@core/helpers/dynamic-form';
import { PlayerService } from '@core/services/affiliate-player.service';
import { SharedPlayerService } from '@core/services/shared-player.service';
import { AbstractModalModel } from '@core/models/abstract-modal.model';


@Injectable({
	providedIn: 'root',
})
export class BankInfoModel extends AbstractModalModel
{
	FormOptions: DForm.DynamicFormOption = new DForm.DynamicFormOption(
		[
			DForm.BankAccountNumber,
		], DForm.DynamicFormGroupTypes.Horizon);
	PlayerInfo: DTO.AffiliatePlayer;
	Request: DTO.EditAffiliatePlayerBankInformationRequest;
	PlayerCountryCode: String;
	IsLoading: boolean;
	BankNameOptionList: NgOption[];

	constructor
	(
		private playerService: PlayerService,
		public sharedPlayerService: SharedPlayerService,
	)
	{
		super();
	}

	async Reset(playerInfo: DTO.AffiliatePlayer): Promise<void>
	{
		this.IsLoading = false;
		this.PlayerInfo = playerInfo;
		this.Request = new DTO.EditAffiliatePlayerBankInformationRequest();

		this.Request.AgentName = this.PlayerInfo.Agent;
		this.Request.UserId = this.PlayerInfo.UserId;
		this.Request.IsVerified = this.PlayerInfo.IsBankVerified;

		this.FormOptions.Form.reset();

		try
		{
			await this.GetBankNameList();

			this.Request.BankCode = this.PlayerInfo.BankCode;
			this.FormOptions.Form.patchValue({
				BankAccount: this.PlayerInfo.BankAccount,
			});
		}
		catch (e)
		{
			throw e;
		}
	}

	private async GetBankNameList(): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;
			this.BankNameOptionList = [];

			const request = new DTO.GetAffiliateBankListRequest();
			request.CountryCode = this.PlayerInfo.CountryCode;

			const response: DTO.GetAffiliateBankListResponse = await this.playerService.GetAffiliateBankList(request);

			if (response && response.BankList && response.BankList.length > 0)
			{
				response.BankList.forEach((row: DTO.BankInfo) =>
				{
					this.BankNameOptionList.push({
						label: row.BankName,
						value: row.BankCode,
					});
				});
			}
		}
		catch (e)
		{
			throw e;
		}
		finally
		{
			this.IsLoading = false;
		}
	}

	async Confirm(): Promise<void>
	{
		if (!this.Request.BankCode)
			return;

		try
		{
			this.IsLoading = true;

			await this.playerService.EditPlayerBankInformation(this.Request);
			await this.sharedPlayerService.GetPlayerInfo();
		}
		catch (e)
		{
			throw e;
		}
		finally
		{
			this.IsLoading = false;
		}
	}
}
