import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';

import * as DTO from '@dto/backend';

@Injectable({
	providedIn: 'root',
})
export class PlayerService extends AbstractService
{
	constructor(
		protected http: HttpClient,
	)
	{
		super(http);
	}

	// ...

	async EditPlayerBankInformation(request: DTO.EditAffiliatePlayerBankInformationRequest): Promise<void>
	{
		return await this.Query<void>(request);
	}

	async GetAffiliateBankList(request: DTO.GetAffiliateBankListRequest): Promise<DTO.GetAffiliateBankListResponse>
	{
		return await this.Query<DTO.GetAffiliateBankListResponse>(request);
	}
}
