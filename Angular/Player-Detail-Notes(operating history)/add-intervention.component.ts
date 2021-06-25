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
import { CustomInterventionItem } from '@view/affiliate-players/detail/affiliate-player-detail.interfaces';
import { PlayerService } from '@core/services/affiliate-player.service';
import { FormGroup, FormControl, AbstractControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { IDatePickerOption, IDatePickerValue } from '@core/directives/date-picker/date-picker.interface';
import { PlayerOperatingHistoryModel } from '@core/affiliate-models/player-operating-history.model';
import { DynamicFormRules } from '@core/helpers/dynamic-form/dynamic-form-options';

@Component({
	templateUrl: 'add-intervention.component.html',
})
export class PlayerAddInterventionComponent extends AbstractModalComponent implements OnInit
{
	onClose: Subject<boolean>;
	result: boolean;

	InterventionForm: FormGroup;
	InterventionType: DTO.OperatingHistoryInterventionType;
	InterventionCause: DTO.OperatingHistoryInterventionCauseType;
	AddInterventionRequest: DTO.AddOperatingHistoryInterventionRequest;
	InterventionItem: CustomInterventionItem;

	NoteLength: number = 0;
	NoteMaxLength: number = 4000;
	WritingNote: boolean = false;

	startDateBegin: Date = null;
	endDateBegin: Date = null;
	startDateEnd: Date = null;
	endDateEnd: Date = null;

	datePickerOptions: IDatePickerOption =
	{
		SingleDatePicker: true,
		ShowDropdowns: true,
		Opens: 'left',
		Drops: 'up',
	};
	datePickerEndOptions: IDatePickerOption =
	{
		SingleDatePicker: true,
		ShowDropdowns: true,
		Opens: 'left',
		Drops: 'up',
	};

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

		this.InterventionForm = new FormGroup({
			InterventionType: new FormControl(null, [Validators.required]),
			InterventionCause: new FormControl(null,[Validators.required]),
			InterventionDetail: new FormControl(null, [Validators.required, Validators.maxLength(4000)]),
			ExpiryDate: new FormControl(null, [Validators.required]),
			ExpiryHour: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(23), Validators.pattern(DynamicFormRules.Number)]),
			ExpiryMinute: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(59), Validators.pattern(DynamicFormRules.Number)]),
			ExpiryDateEnd: new FormControl(null),
			ExpiryHourEnd: new FormControl(null),
			ExpiryMinuteEnd: new FormControl(null),
		}, this.formValidate());

		this.onClose = new Subject<boolean>();
		this.result = false;
	}

	ngOnInit(): void
	{
		this.NoteLength = 0;

		this.InterventionEndHourControl.setValidators([Validators.min(0), Validators.max(23), Validators.pattern(DynamicFormRules.Number)]);
		this.InterventionEndMinuteControl.setValidators([Validators.min(0), Validators.max(59), Validators.pattern(DynamicFormRules.Number)]);
		this.InterventionEndHourControl.updateValueAndValidity();
		this.InterventionEndMinuteControl.updateValueAndValidity();
	}

	formValidate(): ValidatorFn
	{
		return (control: FormGroup): ValidationErrors | null =>
		{
			const type: AbstractControl | null = control.get('InterventionType');
			const cause: AbstractControl | null = control.get('InterventionCause');
			const detail: AbstractControl | null = control.get('InterventionDetail');
			const startDate: AbstractControl | null = control.get('ExpiryDate');
			const startDateHour: AbstractControl | null = control.get('ExpiryHour');
			const startDateMinute: AbstractControl | null = control.get('ExpiryMinute');
			const endDate: AbstractControl | null = control.get('ExpiryDateEnd');
			const endDateHour: AbstractControl | null = control.get('ExpiryHourEnd');
			const endDateMinute: AbstractControl | null = control.get('ExpiryMinuteEnd');

			if (type && cause && detail && startDate && startDateHour && startDateMinute && endDate && endDateHour && endDateMinute)
			{
				const invalidValue: ValidationErrors = { invalid: true };

				if (startDate.value && (startDateHour.value || startDateHour.value === 0 || startDateHour.value === null) && (startDateMinute.value || startDateMinute.value === 0 || startDateMinute.value === null) && endDate.value && (endDateHour.value || endDateHour.value === 0 || endDateHour.value === null) && (endDateMinute.value || endDateMinute.value === 0 || endDateMinute.value === null))
				{
					const dateBegin: moment.Moment = moment(startDate.value);
					const dateEnd: moment.Moment = moment(endDate.value);

					dateBegin.set({
						hour: startDateHour.value,
						minute: startDateMinute.value,
						second: 59,
					});

					dateEnd.set({
						hour: endDateHour.value,
						minute: endDateMinute.value,
						second: 59,
					});

					if (dateEnd.isSameOrBefore(dateBegin))
					{
						startDate.setErrors({ invalidPeriod: true });
						startDateHour.setErrors(invalidValue);
						startDateMinute.setErrors(invalidValue);
						endDate.setErrors({ invalidPeriod: true });
						endDateHour.setErrors(invalidValue);
						endDateMinute.setErrors(invalidValue);
						return invalidValue;
					}
					else
					{
						startDate.setErrors(null);
						startDateHour.setErrors(null);
						startDateMinute.setErrors(null);
						endDate.setErrors(null);
						endDateHour.setErrors(null);
						endDateMinute.setErrors(null);

						if (startDateHour.value > 23 || startDateMinute.value > 59 || endDateHour.value > 23 || endDateMinute.value > 59 || startDateHour.value === null || startDateMinute.value === null || endDateHour.value === null || endDateMinute.value === null)
						{
							if (startDateHour.value > 23 || startDateHour.value === null)
								startDateHour.setErrors(invalidValue);

							else if (startDateMinute.value > 59 || startDateMinute.value === null)
								startDateMinute.setErrors(invalidValue);

							else if (endDateHour.value > 23 || endDateHour.value === null)
								endDateHour.setErrors(invalidValue);

							else if (endDateMinute.value > 59 || endDateMinute.value === null)
								endDateMinute.setErrors(invalidValue);

							return invalidValue;
						}

						return null;
					}
				}
				if (control.invalid)
					return invalidValue;
				else
				{
					if (!(endDateHour.value === null) || !(endDateMinute.value === null))
					{
						startDate.setErrors(null);
						return invalidValue;
					}
					return null;
				}
			}
			else
				return null;
		};
	}

	onStartDateChanged(e: IDatePickerValue): void
	{
		if (!e.startDate)
			return;

		this.InterventionStartDateControl.patchValue(e.startDate.format('YYYY-MM-DD'));
	}

	onEndDateChanged(e: IDatePickerValue): void
	{
		if (!e.startDate)
			return;

		this.InterventionEndDateControl.patchValue(e.startDate.format('YYYY-MM-DD'));
		this.InterventionEndHourControl.setValidators([Validators.required, Validators.min(0), Validators.max(23), Validators.pattern(DynamicFormRules.Number)]);
		this.InterventionEndMinuteControl.setValidators([Validators.required, Validators.min(0), Validators.max(59), Validators.pattern(DynamicFormRules.Number)]);
		this.InterventionEndHourControl.updateValueAndValidity();
		this.InterventionEndMinuteControl.updateValueAndValidity();
	}

	HideInternal(): void
	{
		this.onClose.next(this.result);
	}

	async Add(): Promise<void>
	{
		if (this.TryLockProcess() === false)
			return;

		this.InterventionForm.markAllAsTouched();

		if (this.InterventionForm.invalid)
			return;

		try
		{
			const interventionBeginDate: moment.Moment = moment.utc(this.startDateBegin);
			interventionBeginDate.set({
				hour: this.InterventionStartHourControl.value,
				minute: this.InterventionStartMinuteControl.value,
				second: 59,
			});
			const interventionEndDate: moment.Moment = moment.utc(this.startDateEnd);
			interventionEndDate.set({
				hour: this.InterventionEndHourControl.value,
				minute: this.InterventionEndMinuteControl.value,
				second: 59,
			});

			const interventionType = this.InterventionForm.get('InterventionType').value;
			const interventionCause = this.InterventionForm.get('InterventionCause').value;
			const interventionDetail = this.InterventionForm.get('InterventionDetail').value;

			this.AddInterventionRequest = new DTO.AddOperatingHistoryInterventionRequest();
			this.AddInterventionRequest.AgentName = this.sharedDataService.AgentName;
			this.AddInterventionRequest.UserId = this.sharedPlayerService.UserId;
			this.AddInterventionRequest.InterventionType = interventionType;
			this.AddInterventionRequest.InterventionCause = interventionCause;
			this.AddInterventionRequest.InterventionText = interventionDetail;
			this.AddInterventionRequest.BeginDate = interventionBeginDate.toDate();
			this.AddInterventionRequest.EndDate = interventionEndDate.toDate();

			await this.affiliatePlayerService.AddIntervention(this.AddInterventionRequest);

			this.toastr.success(this.translate.instant('TOASTR_MSG_SUCCESSFULLY_ADDED_PLAYER_INTERVENTION'));

			this.result = true;
			await this.Hide();
		}
		catch (e)
		{
			this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.Description}`) : JSON.stringify(e));
		}
		finally
		{
			this.TryUnlockProcess();
		}
	}

	CheckInterventionDetailLength(): void
	{
		if (this.InterventionDetailControl.value)
			this.NoteLength = this.InterventionDetailControl.value.length;
		else
			this.NoteLength = 0;
	}

	get InterventionTypeControl(): AbstractControl | null
	{
		return this.InterventionForm.get('InterventionType');
	}

	get InterventionCauseControl(): AbstractControl | null
	{
		return this.InterventionForm.get('InterventionCause');
	}

	get InterventionDetailControl(): AbstractControl | null
	{
		return this.InterventionForm.get('InterventionDetail');
	}

	get InterventionStartDateControl(): AbstractControl | null
	{
		return this.InterventionForm.get('ExpiryDate');
	}

	get InterventionStartHourControl(): AbstractControl | null
	{
		return this.InterventionForm.get('ExpiryHour');
	}

	get InterventionStartMinuteControl(): AbstractControl | null
	{
		return this.InterventionForm.get('ExpiryMinute');
	}

	get InterventionEndDateControl(): AbstractControl | null
	{
		return this.InterventionForm.get('ExpiryDateEnd');
	}

	get InterventionEndHourControl(): AbstractControl | null
	{
		return this.InterventionForm.get('ExpiryHourEnd');
	}

	get InterventionEndMinuteControl(): AbstractControl | null
	{
		return this.InterventionForm.get('ExpiryMinuteEnd');
	}
}
