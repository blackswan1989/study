import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import * as DTO from '@dto/backend';
import { AbstractModalComponent } from '@app/views/modal/abstract-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { BankInfoModel } from '@core/affiliate-models/bank-info.model';
import { SharedDataService } from '@core/services/shared-data.service.o';

@Component({
	templateUrl: 'bank-info.component.html',
	providers: [
		ToastrService,
	],
})
export class PlayerBankInfoComponent extends AbstractModalComponent implements OnInit
{
	onClose: Subject<boolean>;
	result: boolean;

	PlayerInfo: DTO.AffiliatePlayer;
	IsLoading: boolean = false;

	constructor(
		public ModalRef: BsModalRef,
		private Toastr: ToastrService,
		public Model: BankInfoModel,
		private translate: TranslateService,
		private sharedDataService: SharedDataService,
	)
	{
		super(ModalRef);

		this.onClose = new Subject<boolean>();
	}

	async ngOnInit(): Promise<void>
	{
		this.result = false;
		this.IsLoading = false;

		if (!this.PlayerInfo)
		{
			this.Toastr.error(this.translate.instant('TOASTR_ERRORMSG_PLAYERINFO_IS_NOT_SPECIFIED'));
		}
		else
		{
			try
			{
				this.IsLoading = true;
				await this.Model.Reset(this.PlayerInfo);
			}
			catch (e)
			{
				this.Toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
			}
			finally
			{
				this.IsLoading = false;
				this.sharedDataService.SetMobileModalClass();
			}
		}
	}

	HideInternal(): void
	{
		this.onClose.next(this.result);
	}

	async Confirm(): Promise<void>
	{
		if (this.Model.IsLoading || this.Model.FormOptions.Form.invalid)
			return;

		try
		{
			await this.Model.Confirm();

			this.result = true;
			this.Toastr.success(this.translate.instant('PLAYER_DETAIL_SECURITY_BANKINFO_CHANGESUCCESS', {EMAIL: this.PlayerInfo.Email}));
			await this.Hide();
		}
		catch (e)
		{
			this.Toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
		finally
		{
			this.TryUnlockProcess();
		}
	}
}
