import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import * as DTO from '@dto/backend';
import { AbstractModalComponent } from '@app/views/affiliate-modal/abstract-modal.component';
import { SharedPlayerService } from '@core/services/shared-player.service';
import { SharedDataService } from '@core/services/shared-data.service.o';
import { PlayerService } from '@core/services/affiliate-player.service';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { PlayerOperatingHistoryModel } from '@core/affiliate-models/player-operating-history.model';

@Component({
	templateUrl: 'add-note.component.html',
})
export class PlayerAddNoteComponent extends AbstractModalComponent implements OnInit
{
	onClose: Subject<boolean>;
	result: boolean;

	BalanceForm: FormGroup;

	Request: DTO.AddPlayerNoteRequest;

	NoteLength: number = 0;
	NoteMaxLength: number = 4000;
	WritingNote: boolean = false;

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

		this.BalanceForm = new FormGroup({
			Note: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(4000)])),
		});

		this.onClose = new Subject<boolean>();
		this.result = false; 
		
	}

	ngOnInit(): void
	{
		this.Reset();
	}

	HideInternal(): void
	{
		this.onClose.next(this.result);
	}

	Reset(): void
	{
		this.NoteLength = 0;
	}

	CheckPlayNoteLength(): void
	{
		if (this.BalanceNoteControl.value)
			this.NoteLength = this.BalanceNoteControl.value.length;
		else
			this.NoteLength = 0;
	}

	
	async Add(): Promise<void>
	{
		if (this.TryLockProcess() === false)
			return;

		try
		{
			const note: string = this.BalanceForm.get('Note').value;

			this.Request = new DTO.AddPlayerNoteRequest();
			this.Request.AgentName = this.sharedDataService.AgentName;
			this.Request.UserId = this.sharedPlayerService.UserId;
			this.Request.Note = note;

			await this.affiliatePlayerService.AddNote(this.Request);

			this.toastr.success(this.translate.instant('TOASTR_MSG_SUCCESSFULLY_ADDED_PLAYER_NOTE'));
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

	get BalanceNoteControl(): AbstractControl | null
	{
		return this.BalanceForm.get('Note');
	}
}
