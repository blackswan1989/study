import { Component, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import * as DTO from '@dto/backend';
import { PlayerService } from '@core/services';
import { AdvancedSecurityGuard } from '@core/guards/advanced-security-guard.service';
import { AbstractPlayerDropdownComponent } from '@core/directives/player-dropdown/player-dropdown.component';
import { SharedDataService } from '@core/services/shared-data.service.o';

@Component({
	selector: 'app-player-context',
	templateUrl: 'player-dropdown.component.html',
})
export class PlayerDropdownComponent extends AbstractPlayerDropdownComponent
{
	constructor(
		protected toastr: ToastrService,
		protected modalService: BsModalService,
		protected playerService: PlayerService,
		protected advancedSecurityGuard: AdvancedSecurityGuard,
		protected sharedDataService: SharedDataService,
		protected translate: TranslateService,
		public elementRef: ElementRef<HTMLElement>,
	)
	{
		super(toastr, modalService, playerService, advancedSecurityGuard, sharedDataService, translate, elementRef);
		this.PlayerInfo = new DTO.GetPlayerResponse();
	}

	get PlayerSummary(): string
	{
		if (this.IsLoading)
		{
			return '';
		}

		return `${this.PlayerInfo.Email ? this.PlayerInfo.Email : this.PlayerInfo.MobileNumber ? ('+' + this.PlayerInfo.MobileCountryCode + ' ' + this.PlayerInfo.MobileNumber) : this.PlayerInfo.Username}@${this.PlayerInfo.Agent}`;
	}

	GetPlayerMenuPermissions()
	{
		super.GetPlayerMenuPermissions();
		this.PlayerMenuPermissions.HasManualOptInPlayer = this.CurrentAgentInfo.Level <= 1;
		super.GetAdminAccessPermissions();
	}

	// 플레이어 정보 상태에 따라 아이콘 & 정보(email, mobile, username) 다르게 보여주도록
	SelectedInfoBoxSetting(): void
	{
		this.PlayerInfoList = {};
		if (this.PlayerInfo.Email)
		{
			this.PlayerInfoList['email'] = this.PlayerInfo.Email ? 'fa-envelope, ' + this.PlayerInfo.Email : '';
		}
		if (this.PlayerInfo.MobileNumber)
		{
			this.PlayerInfoList['mobile'] = this.PlayerInfo.MobileNumber ? 'fa-mobile-phone, ' + ('+' + this.PlayerInfo.MobileCountryCode + ' ' + this.PlayerInfo.MobileNumber) : '' ;
		}
		if (this.PlayerInfo.Username)
		{
			this.PlayerInfoList['username'] = this.PlayerInfo.Username ? 'fa-user, ' + this.PlayerInfo.Username : '' ;
		}

		if (this.PlayerDropdownDirective.ClickedObject)
		{
			this.SelectedDefaultIcon = this.PlayerInfoList[this.PlayerDropdownDirective.ClickedObject.toLowerCase()].split(',')[0];
			this.SelectedDefaultInformation = this.PlayerInfoList[this.PlayerDropdownDirective.ClickedObject.toLowerCase()].split(',')[1];
		}

		if (Object.keys(this.PlayerInfoList).length > 1)
		{
			this.SelectedInfoBox = '';
			Object.keys(this.PlayerInfoList).forEach(function eachKey(key)
			{
				const getObject = this.PlayerInfoList[key];
				const getKey = getObject.split(',')[0];
				const getValue = getObject.split(',')[1];

				if (getValue.trim() !== '' && key !== this.PlayerDropdownDirective.ClickedObject.toLowerCase())
				{
					this.SelectedInfoBox += '<div class="info-box"><i class="fa ' + getKey + '" aria-hidden="true"></i><span>' + getValue + '</span></div>';
				}
			}.bind(this));
		}
	}
}
