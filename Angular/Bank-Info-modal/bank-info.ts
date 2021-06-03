import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as DTO from '@dto/backend';
import { AbstractModalComponent } from '@app/views/modal/abstract-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { BankInfoModel } from '@core/affiliate-models/bank-info.model';
import { Subject } from 'rxjs';

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

	public PlayerInfo: DTO.AffiliatePlayer;

	constructor(
		public ModalRef: BsModalRef,
		private Toastr: ToastrService,
		public Model: BankInfoModel,
		private translate: TranslateService,
	)
	{
		super(ModalRef);

		this.onClose = new Subject<boolean>();
	}

	ngOnInit(): void
	{
		this.result = false;

		if (!this.PlayerInfo)
		{
			this.Toastr.error(this.translate.instant('TOASTR_ERRORMSG_PLAYERINFO_IS_NOT_SPECIFIED'));
		}
		else
		{
			this.Model.Reset(this.PlayerInfo);
		}
	}

	HideInternal(): void
	{
		this.onClose.next(this.result);
	}

	async Confirm(): Promise<void>
	{
		if (this.Model.FormOptions.Form.invalid)
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
