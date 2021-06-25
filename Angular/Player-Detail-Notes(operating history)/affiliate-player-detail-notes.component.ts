import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions, PageChangedEvent } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { OperatingHistoryTabItem } from '@core/configs/shared.types';

import * as DTO from '@dto/backend';
import { SharedPlayerService } from '@core/services/shared-player.service';
import { PlayerService } from '@core/services/affiliate-player.service';
import { ModalClass } from '@core/configs/shared.config';
import { PlayerViewNoteComponent } from '@app/views/affiliate-modal/player/view-note.component';
import { PlayerViewComplaintComponent } from '@app/views/affiliate-modal/player/view-complaint.component';
import { PlayerViewInterventionComponent } from '@app/views/affiliate-modal/player/view-intervention.component';
import { PlayerViewInterviewComponent } from '@app/views/affiliate-modal/player/view-interview.component';
import { PlayerAddNoteComponent } from '@app/views/affiliate-modal/player/add-note.component';
import { PlayerAddInterventionComponent } from '@app/views/affiliate-modal/player/add-intervention.component';
import { PlayerAddComplaintComponent } from '@app/views/affiliate-modal/player/add-complaint.component';
import { PlayerAddInterviewComponent } from '@app/views/affiliate-modal/player/add-interview.component';
import { SharedDataService } from '@core/services/shared-data.service.o';
import { CustomNoteItem, CustomInterventionItem, CustomComplaintItem, CustomInterviewItem } from './affiliate-player-detail.interfaces';
import { PlayerOperatingHistoryModel } from '@core/affiliate-models/player-operating-history.model';

@Component({
	selector: 'affiliate-player-detail-notes',
	templateUrl: 'affiliate-player-detail-notes.component.html'
})
export class AffiliatePlayerDetailNotesComponent implements OnInit
{
	IsLoading: boolean = false;
	AddNoteDisabled: boolean = true;
	AdminName: string;

	IsNoteEdit: boolean = false;
	ModalRef: BsModalRef;
	ModalColors = ModalClass;

	AddRequest: DTO.AddPlayerNoteRequest;
	AddComplaintRequest: DTO.AddOperatingHistoryComplaintRequest;
	AddInterventionRequest: DTO.AddOperatingHistoryInterventionRequest;
	AddInterviewRequest: DTO.AddOperatingHistoryInterviewRequest;
	WritingNote: boolean = false;
	TextLength: number = 0;
	
	hasManageNote: boolean;

	showActive: boolean = false;
	PlayerCount: number;

	constructor(
		private translate: TranslateService,
		private toastr: ToastrService,
		private affiliatePlayerService: PlayerService,
		private modalService: BsModalService,
		private sharedDataService: SharedDataService,
		public sharedPlayerService: SharedPlayerService,
		public Model: PlayerOperatingHistoryModel,
	)
	{
		if (this.sharedDataService.AdminName)
		{
			this.hasManageNote = this.sharedDataService.GetAdminAccessPermission(DTO.AdminAccessPermission.ManageNotes);
			this.AdminName = this.sharedDataService.AdminName;
		}
		else
		{
			this.hasManageNote = false;
		}
	}

	async ngOnInit(): Promise<void>
	{
		await this.Reset();

		await this.onChangeTabs(OperatingHistoryTabItem.AllDetails);
	}

	async onChangeTabs(tabName: OperatingHistoryTabItem): Promise<void>
	{
		this.Model.OperatingTabActive = tabName;

		await this.Reset();
		await this.Model.GetOperatingHistory();
	}

	get PlayerInfo(): DTO.AffiliatePlayer
	{
		return this.sharedPlayerService.PlayerInfo;
	}

	async Reset(): Promise<void>
	{
		this.Model.CurrentPage = 1;

		this.Model.TotalCount = 0;
		this.Model.TotalCountNote = 0;
		this.Model.TotalCountComplaint = 0;
		this.Model.TotalCountIntervention = 0;
		this.Model.TotalCountInterview = 0;

		this.AddRequest = new DTO.AddPlayerNoteRequest();
		this.AddComplaintRequest = new DTO.AddOperatingHistoryComplaintRequest();
		this.AddInterventionRequest = new DTO.AddOperatingHistoryInterventionRequest();
		this.AddInterviewRequest = new DTO.AddOperatingHistoryInterviewRequest();

		this.showActive = false;
	}

	async PageChanged(event: PageChangedEvent): Promise<void>
	{
		this.Model.CurrentPage = event.page;
		await this.Model.GetOperatingHistory();
	}

	async OpenViewModal(note: CustomNoteItem): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
			initialState: {
				NoteItem: note,
			},
		};

		this.ModalRef = this.modalService.show(PlayerViewNoteComponent, Options);

		const isEdited: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isEdited)
		{
			await this.Model.GetOperatingHistoryGenerals();
		}
	}

	async OpenComplaintViewModal(complaint: CustomComplaintItem): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
			initialState: {
				ComplaintItem: complaint,
			},
		};

		this.ModalRef = this.modalService.show(PlayerViewComplaintComponent, Options);

		const isEdited: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isEdited)
		{
			await this.Model.GetOperatingHistoryComplaints();
		}
	}

	async OpenInterventionViewModal(intervention: CustomInterventionItem): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
			initialState: {
				InterventionItem: intervention,
			},
		};

		this.ModalRef = this.modalService.show(PlayerViewInterventionComponent, Options);

		const isEdited: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isEdited)
		{
			await this.Model.GetOperatingHistoryInterventions();
		}
	}

	async OpenInterviewViewModal(interview: CustomInterviewItem): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
			initialState: {
				InterviewItem: interview,
			},
		};

		this.ModalRef = this.modalService.show(PlayerViewInterviewComponent, Options);

		const isEdited: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isEdited)
		{
			await this.Model.GetOperatingHistoryInterviews();
		}
	}

	async EditPin(note: CustomNoteItem): Promise<void>
	{
		if (note.IsEditable === false)
			return;

		await this.EditNotePin(note);
		await this.Reset();
		await this.Model.GetOperatingHistoryGenerals();
	}

	async EditNotePin(note: CustomNoteItem): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;

			if (this.hasManageNote === false)
				throw 'ACCESS_DENIED';

			const request: DTO.EditPlayerNotePinRequest = new DTO.EditPlayerNotePinRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.NoteId = note.Id;
			request.Version = note.Version;
			request.IsPinned = !note.IsPinned;

			await this.affiliatePlayerService.EditNotePin(request);
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

	async EditComplaintPin(complaint: CustomComplaintItem): Promise<void>
	{
		await this.EditComplaintNotePin(complaint);
		await this.Reset();
		await this.Model.GetOperatingHistoryComplaints();
	}

	async EditComplaintNotePin(complaint: CustomComplaintItem): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;

			if (this.hasManageNote === false)
				throw 'ACCESS_DENIED';

			const request: DTO.EditOperatingHistoryComplaintPinRequest = new DTO.EditOperatingHistoryComplaintPinRequest();
			request.ComplaintId = complaint.Id;
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.IsPinned = !complaint.IsPinned;

			await this.affiliatePlayerService.EditComplaintPin(request);
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

	async EditInterventionPin(intervention: CustomInterventionItem): Promise<void>
	{
		await this.EditInterventionNotePin(intervention);
		await this.Reset();
		await this.Model.GetOperatingHistoryInterventions();
	}

	async EditInterventionNotePin(intervention: CustomInterventionItem): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;

			if (this.hasManageNote === false)
				throw 'ACCESS_DENIED';

			const request: DTO.EditOperatingHistoryInterventionPinRequest = new DTO.EditOperatingHistoryInterventionPinRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.IsPinned = !intervention.IsPinned;
			request.InterventionId = intervention.Id;

			await this.affiliatePlayerService.EditInterventionPin(request);
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

	async EditInterviewPin(interview: CustomInterviewItem): Promise<void>
	{
		await this.EditInterviewNotePin(interview);
		await this.Reset();
		await this.Model.GetOperatingHistoryInterviews();
	}

	async EditInterviewNotePin(interview: CustomInterviewItem): Promise<void>
	{
		if (this.IsLoading)
			return;

		try
		{
			this.IsLoading = true;

			if (this.hasManageNote === false)
				throw 'ACCESS_DENIED';

			const request: DTO.EditOperatingHistoryInterviewPinRequest = new DTO.EditOperatingHistoryInterviewPinRequest();
			request.AgentName = this.sharedPlayerService.AgentName;
			request.UserId = this.sharedPlayerService.UserId;
			request.IsPinned = !interview.IsPinned;
			request.InterviewId = interview.Id;

			await this.affiliatePlayerService.EditInterviewPin(request);
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

	async Add(): Promise<void>
	{
		this.AddNoteDisabled = true;
		this.TextLength = 0;

		await this.AddNoteButton();
		await this.Reset();
	}

	Writing(): void
	{
		this.TextLength = this.AddRequest.Note ? this.AddRequest.Note.length : 0;
		this.AddNoteDisabled = !this.AddRequest.Note || this.TextLength < 1;
	}

	async AddNoteButton(): Promise<void>
	{
		if (!this.AddRequest.Note)
			return;

		try
		{
			if (this.hasManageNote === false)
				throw 'ACCESS_DENIED';

			this.AddRequest.AgentName = this.sharedPlayerService.AgentName;
			this.AddRequest.UserId = this.sharedPlayerService.UserId;

			await this.affiliatePlayerService.AddNote(this.AddRequest);

			this.toastr.success(this.translate.instant('TOASTR_MSG_SUCCESSFULLY_ADDED_PLAYER_NOTE'));
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
	}


	async AddNote(): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
		};

		this.ModalRef = this.modalService.show(PlayerAddNoteComponent, Options);

		const isAdded: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isAdded)
		{
			setTimeout(async () =>
			{
				await this.Model.GetOperatingHistory();
			}, 800);
		}
	}

	async AddComplaint(): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
		};

		this.ModalRef = this.modalService.show(PlayerAddComplaintComponent, Options);

		const isAdded: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isAdded)
		{
			setTimeout(async () =>
			{
				await this.Model.GetOperatingHistory();
			}, 800);
		}
	}

	async AddIntervention(): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
		};

		this.ModalRef = this.modalService.show(PlayerAddInterventionComponent, Options);

		const isAdded: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isAdded)
		{
			setTimeout(async () =>
			{
				await this.Model.GetOperatingHistory();
			}, 800);
		}
	}

	async AddInterview(): Promise<void>
	{
		if (!this.sharedPlayerService.PlayerInfo)
			return;

		const Options: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			class: this.ModalColors.PrimaryWidth100,
		};

		this.ModalRef = this.modalService.show(PlayerAddInterviewComponent, Options);

		const isAdded: boolean = await new Promise<boolean>((resolve, reject) =>
		{
			this.ModalRef.content.onClose.subscribe((result: boolean) =>
			{
				resolve(result);
			});
		});

		if (isAdded)
		{
			setTimeout(async () =>
			{
				await this.Model.GetOperatingHistory();
			}, 800);
		}
	}

	ShowActiveClick(): void
	{
		this.Model.CurrentPage = 1;

		if (this.showActive)
		{
			this.showActive = false;
			this.Model.IsShowActive = false;
			this.Model.GetOperatingHistoryComplaints();
		}
		else
		{
			this.showActive = true;
			this.Model.IsShowActive = true;
			this.Model.GetOperatingHistoryComplaints();
		}
	}
}
