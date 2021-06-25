import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import * as DTO from '@dto/backend';
import * as moment from 'moment';
import { AbstractModalComponent } from '@app/views/affiliate-modal/abstract-modal.component';
import { SharedPlayerService } from '@core/services/shared-player.service';
import { SharedDataService } from '@core/services/shared-data.service.o';
import { PlayerService } from '@core/services/affiliate-player.service';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { HistoryTransferType } from '@core/configs/shared.types';
import { IDatePickerOption, IDatePickerValue } from '@core/directives/date-picker/date-picker.interface';
import { FinanceHistoryTarget } from '@core/configs/shared.types';
import { PlayerOperatingHistoryModel } from '@core/affiliate-models/player-operating-history.model';
import { DynamicFormRules } from '@core/helpers/dynamic-form/dynamic-form-options';

export interface IActivePlayer
{
	[key: string]: string;
}

@Component({
	templateUrl: 'add-complaint.component.html',
})
export class PlayerAddComplaintComponent extends AbstractModalComponent implements OnInit
{
	onClose: Subject<boolean>;
	result: boolean;

	ComplaintForm: FormGroup;

	AddComplaintRequest: DTO.AddOperatingHistoryComplaintRequest;
	Subtype: DTO.OperatingHistoryComplaintType;
	Causetype: DTO.OperatingHistoryInterventionCauseType;

	NoteLength: number = 0;
	NoteMaxLength: number = 4000;
	WritingNote: boolean = false;

	DateNow: moment.Moment;
	datePickerOptions: IDatePickerOption =
	{
		SingleDatePicker: true,
		ShowDropdowns: true,
		Opens: 'left',
	};
	startDate: Date = null;
	endDate: Date = null;

	/* modal */
	HistoryTransferType: typeof HistoryTransferType = HistoryTransferType;
	HistoryCurrentTransferType: HistoryTransferType;
	HistoryTransferTargetType: typeof HistoryTransferType = HistoryTransferType;
	HistoryCurrentTransferTargetType: HistoryTransferType;

	FinanceHistoryTarget: typeof FinanceHistoryTarget = FinanceHistoryTarget;
	CurrentTarget: FinanceHistoryTarget;

	SearchType = DTO.PlayerSearchType;
	SearchTypeList = [
		{ Key: DTO.PlayerSearchType.Nickname, Value: this.translate.instant('PLAYERS_TABLE_NICKNAME'), Label: 'Nickname' },
	];
	SelectedSearchType = this.SearchTypeList[0];
	SelectTags: string[];

	constructor(
		private toastr: ToastrService,
		private translate: TranslateService,
		private sharedPlayerService: SharedPlayerService,
		private sharedDataService: SharedDataService,
		private affiliatePlayerService: PlayerService,
		public ModalRef: BsModalRef,
		public DeleteModalRef: BsModalRef,
		public Model: PlayerOperatingHistoryModel,
	)
	{
		super(ModalRef);

		this.ComplaintForm = new FormGroup({
			Subtype: new FormControl(null, [Validators.required]),
			Note: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
			ExpiryDate: new FormControl('', [Validators.required]),
			ExpiryHour: new FormControl('', [Validators.required, Validators.min(0), Validators.max(23), Validators.pattern(DynamicFormRules.Number)]),
			ExpiryMinute: new FormControl('', [Validators.required, Validators.min(0), Validators.max(59), Validators.pattern(DynamicFormRules.Number)]),
			SelectedPlayers: new FormControl([], Validators.compose([])),
		});

		this.onClose = new Subject<boolean>();
		this.result = false; 
	}

	ngOnInit(): void
	{
		this.Model.SearchType = this.SearchTypeList[0].Key;
		this.DateNow = moment();
		this.datePickerOptions.MaxDate = this.DateNow.format('YYYY-MM-DD HH:mm');
		this.Reset();
	}

	onDateChanged(e: IDatePickerValue): void
	{
		if (!e.startDate)
			return;

		this.ComplaintDateControl.patchValue(e.startDate.format('YYYY-MM-DD'));
	}

	HideInternal(): void
	{
		this.onClose.next(this.result);
	}

	Reset(): void
	{
		this.NoteLength = 0;

		this.SetFormClean();
		this.SelectTags = [];
		this.Model.ActivePlayers = [];
	}

	CheckPlayNoteLength(): void
	{
		if (this.ComplaintNoteControl.value)
			this.NoteLength = this.ComplaintNoteControl.value.length;
		else
			this.NoteLength = 0;
	}
	
	SetFormClean(): void
	{
		this.ComplaintForm.reset();
	}

	OnProcessChangeSearchType(event: any): void
	{
		this.SetFormClean();
	}

	changeValidation(): void
	{
		this.Model.SetInitialPlayers();
	}

	async Add(): Promise<void>
	{
		if (this.TryLockProcess() === false)
			return;

		this.ComplaintForm.markAllAsTouched();

		if (this.ComplaintForm.invalid)
			return;

		try
		{
			const ComplaintDate: moment.Moment = moment.utc(this.startDate);
			ComplaintDate.set({
				hour: this.ComplaintHourControl.value,
				minute: this.ComplaintMinuteControl.value,
				second: 59,
			});

			this.AddComplaintRequest = new DTO.AddOperatingHistoryComplaintRequest();
			this.AddComplaintRequest.AgentName = this.sharedDataService.AgentName;
			this.AddComplaintRequest.UserId = this.sharedPlayerService.UserId;
			this.AddComplaintRequest.ComplaintType = this.ComplaintTypeControl.value;
			this.AddComplaintRequest.ComplaintText = this.ComplaintNoteControl.value;
			this.AddComplaintRequest.IncidentDate = ComplaintDate.toDate();
			this.AddComplaintRequest.InvolvedPlayers = this.ComplaintPlayerControl.value;

			if (this.AddComplaintRequest.InvolvedPlayers === null)
				this.AddComplaintRequest.InvolvedPlayers = [];

			await this.affiliatePlayerService.AddComplaint(this.AddComplaintRequest);

			this.toastr.success(this.translate.instant('TOASTR_MSG_SUCCESSFULLY_ADDED_PLAYER_COMPLAINT'));
			this.result = true;
			await this.Hide();
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
		}
		finally
		{
			this.TryUnlockProcess();
		}
	}

	get ComplaintTypeControl(): AbstractControl | null
	{
		return this.ComplaintForm.get('Subtype');
	}
	get ComplaintNoteControl(): AbstractControl | null
	{
		return this.ComplaintForm.get('Note');
	}

	get ComplaintDateControl(): AbstractControl | null
	{
		return this.ComplaintForm.get('ExpiryDate');
	}

	get ComplaintHourControl(): AbstractControl | null
	{
		return this.ComplaintForm.get('ExpiryHour');
	}

	get ComplaintMinuteControl(): AbstractControl | null
	{
		return this.ComplaintForm.get('ExpiryMinute');
	}

	get ComplaintPlayerControl(): AbstractControl | null
	{
		return this.ComplaintForm.get('SelectedPlayers');
	}
}
