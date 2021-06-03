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
	FormOptions: DForm.DynamicFormOption = new DForm.DynamicFormOption
		([
			DForm.BankAccountNumber,
			], DForm.DynamicFormGroupTypes.Horizon
		);
	PlayerInfo: DTO.AffiliatePlayer;
	Request: DTO.EditAffiliatePlayerBankInformationRequest;
	PlayerCountryCode: String;
	IsLoading: boolean;
	BankNameList: DTO.GetAffiliateBankListResponse[];
	BankNameOptionList: NgOption[];

	constructor
	(
		private playerService: PlayerService,
		public sharedPlayerService: SharedPlayerService,
	)
	{
		super();
	}

	Reset(playerInfo: DTO.AffiliatePlayer): void
	{
		this.IsLoading = false;
		this.PlayerInfo = playerInfo;
		this.Request = new DTO.EditAffiliatePlayerBankInformationRequest();

		this.Request.AgentName = this.PlayerInfo.Agent;
		this.Request.UserId = this.PlayerInfo.UserId;
		this.Request.IsVerified = this.PlayerInfo.IsBankVerified;
		this.Request.BankAccount = this.PlayerInfo.BankAccount;
		this.Request.BankCode = this.PlayerInfo.BankCode;

		try
		{
			this.GetBankNameList();
		}
		catch (e)
		{
			throw e;
		}
	}

	private async GetBankNameList(): Promise<void>
	{
		if (!this.BankNameList || this.BankNameList.length <= 0)
		{
			try
			{
				const request = new DTO.GetAffiliateBankListRequest();
				request.CountryCode = this.sharedPlayerService.PlayerInfo.CountryCode;

				const response: DTO.GetAffiliateBankListResponse = await this.playerService.GetAffiliateBankList(request);
				const bankList = response.BankList;

				if (bankList)
				{
					this.BankNameOptionList = [];

					bankList.forEach((row: DTO.BankInfo) =>
					{
						const option: NgOption = {
							label: row.BankName,
							value: row.BankCode,
						}
						this.BankNameOptionList.push(option);
					});
				}
			}
			catch (e)
			{
				throw e;
			}
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
