import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { PlayerService } from '@core/services/affiliate-player.service';
import { InCurrencyPipe } from '@core/pipes/incurrency.pipe';
import { SimpleDatePipe } from '@core/pipes/simpledate.pipe';
import { DecimalPipe } from '@angular/common';
import * as DTO from '@dto/backend';
import { OperatingHistoryTabItem } from '@core/configs/shared.types';

import { SharedDataService } from '../services/shared-data.service.o';
import { IInterviewConclusionTypeLabel, IComplaintResponseLabel, IComplaintStatusLabel, IOperatingHistoryTabTypeLabel, IInterventionTypeLabel, IInterventionCauseLabel, IInterviewTypeLabel, IComplaintTypeLabel } from '@core/configs/shared.types';
import { DynamicFormRules } from '@core/helpers/dynamic-form';
import { Subject } from 'rxjs';
import { CustomOperatingHistoryAllItem, CustomNoteItem, CustomInterventionItem, CustomComplaintItem, CustomInterviewItem } from '@view/affiliate-players/detail/affiliate-player-detail.interfaces';
import { SharedPlayerService } from '@core/services/shared-player.service';
import { DiffDatePipe, IDiffDate } from '@core/pipes/diffdate.pipe';

export interface IFormRule
{
	[key: string]: string | RegExp;
}

@Injectable({
	providedIn: 'root',
})
export class PlayerOperatingHistoryModel
{
	IsLoading: boolean = false;
	IsNodata: boolean = true;
	IsShowActive: boolean = false;

	FormRule: IFormRule;

	ActivePlayers: DTO.ActivePlayer[];
	Request: DTO.GetActivePlayersRequest;
	InputString: Subject<string | null> = new Subject<string | null>();
	SearchType: DTO.PlayerSearchType;

	PageSize: number = 4;
	CurrentPage: number;
	TotalCount: number;
	TotalCountNote: number;
	TotalCountComplaint: number;
	TotalCountIntervention: number;
	TotalCountInterview: number;
	TotalCountComplaintActive: number;
	PlayerAllItems: CustomOperatingHistoryAllItem[] = [];
	PlayerNoteItems: CustomNoteItem[] = [];
	PlayerComplaintItems: CustomComplaintItem[] = [];
	PlayerInterventionItems: CustomInterventionItem[] = [];
	PlayerInterviewItems: CustomInterviewItem[] = [];

	OperatingTabActive: OperatingHistoryTabItem = OperatingHistoryTabItem.AllDetails;
	OperatingTabList: typeof OperatingHistoryTabItem = OperatingHistoryTabItem;
	TabTypeList: typeof DTO.OperatingHistoryTabType = DTO.OperatingHistoryTabType;
	
	ComplaintTypeList: IComplaintTypeLabel[] = [
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_ADVERTISING_OPERATOR', value: DTO.OperatingHistoryComplaintType.AdvertisingOperator },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_ADVERTISING_AUTHORITIES', value: DTO.OperatingHistoryComplaintType.AdvertisingAuthorities },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_UNFAIRGAMEPLAY', value: DTO.OperatingHistoryComplaintType.UnfairGamePlay },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_KYC', value: DTO.OperatingHistoryComplaintType.KYC },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_FRAUD', value: DTO.OperatingHistoryComplaintType.Fraud },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_SOCIAL', value: DTO.OperatingHistoryComplaintType.Social },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_PROBLEMGAMBLING', value: DTO.OperatingHistoryComplaintType.ProblemGambling },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TYPE_OTHER', value: DTO.OperatingHistoryComplaintType.Other },
	];
	ComplaintStatusList: IComplaintStatusLabel[] = [
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_STATUS_ACTIVE', value: DTO.OperatingHistoryComplaintStatus.Active },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_STATUS_CLOSED', value: DTO.OperatingHistoryComplaintStatus.Closed },
	];
	ComplaintResponseTypeList: IComplaintResponseLabel[] = [
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_RESPONSE_TYPE_INTERVENTION', value: DTO.OperatingHistoryComplaintResponseType.Intervention },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_RESPONSE_TYPE_FOLLOWUP', value: DTO.OperatingHistoryComplaintResponseType.FollowUp },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_RESPONSE_TYPE_INVESTIGATION', value: DTO.OperatingHistoryComplaintResponseType.Investigation },
	];
	InterventionTypeList: IInterventionTypeLabel[] = [
		{ label: 'FILTER_CONVERSATION_V_INFORM', value: DTO.OperatingHistoryInterventionType.ConversationVInform },
		{ label: 'FILTER_CONVERSATION_V_ANNOUNCE', value: DTO.OperatingHistoryInterventionType.ConversationVAnnounce },
		{ label: 'FILTER_CONVERSATION_T_INFORM', value: DTO.OperatingHistoryInterventionType.ConversationTInform },
		{ label: 'FILTER_CONVERSATION_T_ANNOUNCE', value: DTO.OperatingHistoryInterventionType.ConversationTAnnounce },
		{ label: 'FILTER_SET_FLAG', value: DTO.OperatingHistoryInterventionType.SetFlag },
		{ label: 'FILTER_SET_LIMIT', value: DTO.OperatingHistoryInterventionType.SetLimit },
		{ label: 'FILTER_EXCLUDE', value: DTO.OperatingHistoryInterventionType.Exclude },
		{ label: 'FILTER_OTHERS', value: DTO.OperatingHistoryInterventionType.Other }, 
	];
	InterventionCauseList: IInterventionCauseLabel[] = [
		{ label: 'PLAYER_DETAIL_PLAYER_INTERVENTION_CAUSE_FRAUD', value: DTO.OperatingHistoryInterventionCauseType.Fraud },
		{ label: 'PLAYER_DETAIL_PLAYER_INTERVENTION_CAUSE_SOCIAL', value: DTO.OperatingHistoryInterventionCauseType.Social },
		{ label: 'PLAYER_DETAIL_PLAYER_INTERVENTION_CAUSE_PROBLEMGAMBLING', value: DTO.OperatingHistoryInterventionCauseType.ProblemGambling },
		{ label: 'PLAYER_DETAIL_PLAYER_INTERVENTION_CAUSE_OTHER', value: DTO.OperatingHistoryInterventionCauseType.Other },
	];
	InterviewMethodTypeList: IInterviewTypeLabel[] = [
		{ label: 'FILTER_VOICECALL', value: DTO.OperatingHistoryInterviewMethodType.VoiceCall },
		{ label: 'FILTER_EMAIL', value: DTO.OperatingHistoryInterviewMethodType.Email }, 
	];
	InterviewConclusionTypeList: IInterviewConclusionTypeLabel[] = [
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_RESPONSE_TYPE_INTERVENTION', value: DTO.OperatingHistoryInterviewConclusionType.Intervention },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_RESPONSE_TYPE_FOLLOWUP', value: DTO.OperatingHistoryInterviewConclusionType.FollowUp },
		{ label: 'FILTER_CLOSED', value: DTO.OperatingHistoryInterviewConclusionType.Closed },
	];
	OperatingHistoryTabTypeList: IOperatingHistoryTabTypeLabel[] = [
		{ label: 'PLAYER_DETAIL_PLAYER_NOTE_TITLE_NEW', value: DTO.OperatingHistoryTabType.General },
		{ label: 'PLAYER_DETAIL_PLAYER_INTERVIEW_TITLE', value: DTO.OperatingHistoryTabType.Interview },
		{ label: 'PLAYER_DETAIL_PLAYER_INTERVENTION_TITLE', value: DTO.OperatingHistoryTabType.Intervention },
		{ label: 'PLAYER_DETAIL_PLAYER_COMPLAINT_TITLE', value: DTO.OperatingHistoryTabType.Complaint },
	];

	constructor(
		public translate: TranslateService,
		private toastr: ToastrService,
		public simpleDatePipe: SimpleDatePipe,
		public incurrencyPipe: InCurrencyPipe,
		public decimalPipe: DecimalPipe,
		private diffDate: DiffDatePipe,
		public sharedDataService: SharedDataService,
		public sharedPlayerService: SharedPlayerService,
		private affiliatePlayerService: PlayerService,
	)
	{
		this.FormRule = DynamicFormRules;
		this.Request = new DTO.GetActivePlayersRequest();
		this.ActivePlayers = [];
		this.SearchType = DTO.PlayerSearchType.Nickname;
		this.CurrentPage = 1;

		this.InputString.subscribe(async (inputText: string) =>
		{
			if (inputText)
			{
				this.Request.SearchTerm = inputText;
				this.Request.SearchType = this.SearchType;
				this.Request.IsIgnoredSiteCountry = true;
				this.GetActivePlayers();
			}
			else
			{
				this.SetInitialPlayers();
			}
		});

		this.TotalCount = 0;
		this.TotalCountNote = 0;
		this.TotalCountComplaint = 0;
		this.TotalCountIntervention = 0;
		this.TotalCountInterview = 0;
	}

	SetInitialPlayers(): void
	{
		this.Request = new DTO.GetActivePlayersRequest();
		this.Reset();
	}

	Reset(): void
	{
		this.ActivePlayers = [];
	}

	async GetActivePlayers(): Promise<void>
	{
		try
		{
			this.IsLoading = true;
			this.Reset();
			const response: DTO.GetActivePlayersResponse = await this.affiliatePlayerService.GetActivePlayers(this.Request);
			this.ActivePlayers = response.List;
			this.ActivePlayers.push({AccountId: 'Unknown', Nickname: 'Unknown'});
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

	async GetOperatingHistoryAll(): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;
			this.PlayerAllItems = [];
			this.PageSize = 4;

			const request: DTO.GetOperatingHistoryAllRequest = new DTO.GetOperatingHistoryAllRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.PageSize = this.PageSize;
			request.CurrentPage = this.CurrentPage - 1;

			const response: DTO.GetOperatingHistoryAllResponse = await this.affiliatePlayerService.GetOperatingHistoryAll(request);

			this.TotalCount = response.TotalCount ? response.TotalCount : 0;

			if (response && response.AllItems && response.AllItems.length > 0)
			{
				response.AllItems.forEach((data: DTO.OperatingHistoryAllItem) =>
				{
					const diffDateCreate: IDiffDate = this.diffDate.transform(data.CreatedAt);
					const diffDateUpdate: IDiffDate = this.diffDate.transform(data.UpdatedAt);

					const tabTypeItem: IOperatingHistoryTabTypeLabel = this.OperatingHistoryTabTypeList.find((x: IOperatingHistoryTabTypeLabel) => x.value === data.TabType);
					const interventionTypeItem: IInterventionTypeLabel = this.InterventionTypeList.find((x: IInterventionTypeLabel) => x.value === data.InterventionType);
					const interventionCauseItem: IInterventionCauseLabel = this.InterventionCauseList.find((x: IInterventionCauseLabel) => x.value === data.InterventionCause);
					const statusItem: IComplaintStatusLabel = this.ComplaintStatusList.find((x: IComplaintStatusLabel) => x.value === data.ComplaintStatus);
					const typeItem: IComplaintTypeLabel = this.ComplaintTypeList.find((x: IComplaintTypeLabel) => x.value === data.ComplaintType);
					let getConclusionTypeItem: IInterviewConclusionTypeLabel;
					let getResponseTypeItem: IComplaintResponseLabel;

					if (data.RecentInterviewConclusion)
						getConclusionTypeItem = this.InterviewConclusionTypeList.find((e: IInterviewConclusionTypeLabel) => e.value === data.RecentInterviewConclusion.Conclusion);

					if (data.RecentComplaintResponse)
						getResponseTypeItem = this.ComplaintResponseTypeList.find((e: IComplaintResponseLabel) => e.value === data.RecentComplaintResponse.ResponseType);

					this.PlayerAllItems.push({
						...data,
						CreatedAtString: diffDateCreate.text,
						CreatedAtInterval: diffDateCreate.interval,
						UpdatedAtString: diffDateUpdate.text,
						UpdatedAtInterval: diffDateUpdate.interval,
						OperatingHistoryTabTypeLabel: tabTypeItem ? tabTypeItem.label : null,
						InterventionTypeLabel: interventionTypeItem ? interventionTypeItem.label : null,
						InterventionCauseLabel: interventionCauseItem ? interventionCauseItem.label : null,
						ComplaintStatusLabel: statusItem ? statusItem.label : null,
						ComplaintTypeLabel: typeItem ? typeItem.label : null,
						InterviewConclusionTypeLabel: getConclusionTypeItem ? getConclusionTypeItem.label : null,
						ComplaintResponseTypeLabel: getResponseTypeItem ? getResponseTypeItem.label : null,
					});
				});
			}
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
		finally
		{
			this.IsLoading = false;
		}
	}

	async GetOperatingHistoryGenerals(): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;
			this.PlayerNoteItems = [];
			this.PageSize = 7;

			const request: DTO.GetPlayerNotesRequest = new DTO.GetPlayerNotesRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.PageSize = this.PageSize;
			request.CurrentPage = this.CurrentPage - 1;

			const response: DTO.GetPlayerNotesResponse = await this.affiliatePlayerService.GetPlayerNotes(request);

			this.TotalCountNote = response.TotalCount ? response.TotalCount : 0;

			if (response && response.PlayerNoteItems && response.PlayerNoteItems.length > 0)
			{
				response.PlayerNoteItems.forEach((data: DTO.PlayerNoteItem) =>
				{
					const diffDateCreate: IDiffDate = this.diffDate.transform(data.CreatedAt);
					const diffDateUpdate: IDiffDate = this.diffDate.transform(data.UpdatedAt);

					this.PlayerNoteItems.push({
						...data,
						CreatedAtString: diffDateCreate.text,
						CreatedAtInterval: diffDateCreate.interval,
						UpdatedAtString: diffDateUpdate.text,
						UpdatedAtInterval: diffDateUpdate.interval,
					});
				});
			}
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
		finally
		{
			this.IsLoading = false;
		}
	}

	async GetOperatingHistoryInterviews(): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;
			this.PlayerInterviewItems = [];
			this.PageSize = 5;

			const request: DTO.GetOperatingHistoryInterviewsRequest = new DTO.GetOperatingHistoryInterviewsRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.PageSize = this.PageSize;
			request.CurrentPage = this.CurrentPage - 1;

			const response: DTO.GetOperatingHistoryInterviewsResponse = await this.affiliatePlayerService.GetOperatingHistoryInterviews(request);

			this.TotalCountInterview = response.TotalCount ? response.TotalCount : 0;

			if (response && response.InterviewItems && response.InterviewItems.length > 0)
			{
				response.InterviewItems.forEach((data: DTO.OperatingHistoryInterviewItem) =>
				{
					const diffDateCreate: IDiffDate = this.diffDate.transform(data.CreatedAt);
					const diffDateUpdate: IDiffDate = this.diffDate.transform(data.UpdatedAt);

					let getConclusionTypeItem: IInterviewConclusionTypeLabel;

					if (data.RecentInterviewConclusion)
					{
						getConclusionTypeItem = this.InterviewConclusionTypeList.find((e: IInterviewConclusionTypeLabel) => e.value === data.RecentInterviewConclusion.Conclusion);
					}

					this.PlayerInterviewItems.push({
						...data,
						CreatedAtString: diffDateCreate.text,
						CreatedAtInterval: diffDateCreate.interval,
						UpdatedAtString: diffDateUpdate.text,
						UpdatedAtInterval: diffDateUpdate.interval,
						InterviewConclusionTypeLabel: getConclusionTypeItem ? getConclusionTypeItem.label : null,
					});
				});
			}
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
		finally
		{
			this.IsLoading = false;
		}
	}

	async GetOperatingHistoryInterventions(): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;
			this.PlayerInterventionItems = [];
			this.PageSize = 4;

			const request: DTO.GetOperatingHistoryInterventionsRequest = new DTO.GetOperatingHistoryInterventionsRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.PageSize = this.PageSize;
			request.CurrentPage = this.CurrentPage - 1;

			const response: DTO.GetOperatingHistoryInterventionsResponse = await this.affiliatePlayerService.GetOperatingHistoryInterventions(request);

			this.TotalCountIntervention = response.TotalCount ? response.TotalCount : 0;

			if (response && response.InterventionItems && response.InterventionItems.length > 0)
			{
				response.InterventionItems.forEach((data: DTO.OperatingHistoryInterventionItem) =>
				{
					const diffDateCreate: IDiffDate = this.diffDate.transform(data.CreatedAt);
					const diffDateUpdate: IDiffDate = this.diffDate.transform(data.UpdatedAt);

					const interventionTypeItem: IInterventionTypeLabel = this.InterventionTypeList.find((e: IInterventionTypeLabel) => e.value === data.InterventionType);
					const interventionCauseItem: IInterventionCauseLabel = this.InterventionCauseList.find((e: IInterventionCauseLabel) => e.value === data.InterventionCause);

					this.PlayerInterventionItems.push({
						...data,
						CreatedAtString: diffDateCreate.text,
						CreatedAtInterval: diffDateCreate.interval,
						UpdatedAtString: diffDateUpdate.text,
						UpdatedAtInterval: diffDateUpdate.interval,
						InterventionTypeLabel: interventionTypeItem ? interventionTypeItem.label : null,
						InterventionCauseLabel: interventionCauseItem ? interventionCauseItem.label : null,
					});
				});
			}
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
		finally
		{
			this.IsLoading = false;
		}
	}

	async GetOperatingHistoryComplaints(): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;
			this.PlayerComplaintItems = [];
			this.PageSize = 4;

			const request: DTO.GetOperatingHistoryComplaintsRequest = new DTO.GetOperatingHistoryComplaintsRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.PageSize = this.PageSize;
			request.CurrentPage = this.CurrentPage - 1;
			request.IsShowActive = this.IsShowActive;

			const response: DTO.GetOperatingHistoryComplaintsResponse = await this.affiliatePlayerService.GetOperatingHistoryComplaints(request);

			this.TotalCountComplaint = response.TotalCount ? response.TotalCount : 0;

			if (response && response.ComplaintItems && response.ComplaintItems.length > 0)
			{
				response.ComplaintItems.forEach((data: DTO.OperatingHistoryComplaintItem) =>
				{
					const diffDateCreate: IDiffDate = this.diffDate.transform(data.CreatedAt);
					const diffDateUpdate: IDiffDate = this.diffDate.transform(data.UpdatedAt);

					const statusItem: IComplaintStatusLabel = this.ComplaintStatusList.find((e: IComplaintStatusLabel) => e.value === data.ComplaintStatus);
					const typeItem: IComplaintTypeLabel = this.ComplaintTypeList.find((e: IComplaintTypeLabel) => e.value === data.ComplaintType);

					let getResponseTypeItem: IComplaintResponseLabel;

					if (data.RecentComplaintResponse)
					{
						getResponseTypeItem = this.ComplaintResponseTypeList.find((e: IComplaintResponseLabel) => e.value === data.RecentComplaintResponse.ResponseType);
					}

					this.PlayerComplaintItems.push({
						...data,
						CreatedAtString: diffDateCreate.text,
						CreatedAtInterval: diffDateCreate.interval,
						UpdatedAtString: diffDateUpdate.text,
						UpdatedAtInterval: diffDateUpdate.interval,
						ComplaintStatusLabel: statusItem ? statusItem.label : null,
						ComplaintTypeLabel: typeItem ? typeItem.label : null,
						ComplaintResponseTypeLabel: getResponseTypeItem ? getResponseTypeItem.label : null,
					});
				});
			}
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
		finally
		{
			this.IsLoading = false;
		}
	}

	async GetOperatingHistory(): Promise<void>
	{
		switch (this.OperatingTabActive)
		{
			case this.OperatingTabList.AllDetails:
				await this.GetOperatingHistoryAll();
				break;
			case this.OperatingTabList.NoteDetails:
				await this.GetOperatingHistoryGenerals();
				break;
			case this.OperatingTabList.ComplaintDetails:
				await this.GetOperatingHistoryComplaints();
				break;
			case this.OperatingTabList.InterventionDetails:
				await this.GetOperatingHistoryInterventions();
				break;
			case this.OperatingTabList.InterviewDetails:
				await this.GetOperatingHistoryInterviews();
				break;
			default:
				break;
		}
	}
}
