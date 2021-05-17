import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  FormArray,
} from "@angular/forms";
import * as DTO from "@dto/backend";
import * as moment from "moment";
import { PlayerService } from "@core/services/player.service";
import { TranslateService } from "@ngx-translate/core";
import { DynamicFormRules } from "@core/helpers/dynamic-form";
import { IFormControlValidator } from "@core/configs/shared.types";

@Injectable({
  providedIn: "root",
})
export class PlayerRestrictTimeModel {
  PlayerInfo: DTO.AffiliatePlayer;
  FormGroup: FormGroup;
  IsLoading: boolean;

  protected constructor(
    private translate: TranslateService,
    private playerService: PlayerService
  ) {
    this.FormGroup = new FormGroup(
      {
        StartHourTime: new FormControl(""),
        StartMinuteTime: new FormControl(""),
        EndHourTime: new FormControl(""),
        EndMinuteTime: new FormControl(""),
        SetRestrictTime: new FormControl(false),
      },
      this.FormValidator()
    );
  }

  get StartHourTimeControl(): AbstractControl | null {
    return this.FormGroup.get("StartHourTime");
  }

  get StartMinuteTimeControl(): AbstractControl | null {
    return this.FormGroup.get("StartMinuteTime");
  }

  get EndHourTimeControl(): AbstractControl | null {
    return this.FormGroup.get("EndHourTime");
  }

  get EndMinuteTimeControl(): AbstractControl | null {
    return this.FormGroup.get("EndMinuteTime");
  }

  get SetRestrictTimeControl(): AbstractControl | null {
    return this.FormGroup.get("SetRestrictTime");
  }

  Reset(playerInfo: DTO.AffiliatePlayer): void {
    this.IsLoading = false;
    this.PlayerInfo = playerInfo;

    this.FormGroup.reset();

    // form controller

    this.FormGroup.get("SetRestrictTime").valueChanges.subscribe((e) => {
      const validator: ValidatorFn[] = [
        Validators.required,
        Validators.pattern(DynamicFormRules.Number),
        Validators.min(0),
      ];
      const hourValidator: ValidatorFn[] = [
        ...validator,
        ...[Validators.max(23)],
      ];
      const minuteValidator: ValidatorFn[] = [
        ...validator,
        ...[Validators.max(59)],
      ];
      const controls: IFormControlValidator[] = [
        {
          control: this.StartHourTimeControl,
          validator: hourValidator,
        },
        {
          control: this.StartMinuteTimeControl,
          validator: minuteValidator,
        },
        {
          control: this.EndHourTimeControl,
          validator: hourValidator,
        },
        {
          control: this.EndMinuteTimeControl,
          validator: minuteValidator,
        },
      ];

      if (e) {
        controls.forEach((row: IFormControlValidator) => {
          row.control.setValidators(row.validator);
          row.control.updateValueAndValidity();
          row.control.enable();
        });
      } else {
        controls.forEach((row: IFormControlValidator) => {
          row.control.clearValidators();
          row.control.patchValue(null);
          row.control.markAsUntouched();
          row.control.updateValueAndValidity();
          row.control.disable();
        });
      }
    });

    // 토글인 IsRestricted 컨트롤러로 true flase 값을 체크하여 설정
    if (this.PlayerInfo.IsRestricted) {
      const startDate: moment.Moment = moment.utc(
        this.PlayerInfo.RestrictTimeStart
      );
      const endDate: moment.Moment = moment.utc(
        this.PlayerInfo.RestrictTimeEnd
      );

      this.FormGroup.patchValue({
        SetRestrictTime: this.PlayerInfo.IsRestricted,
        StartHourTime: startDate.hour(),
        StartMinuteTime: startDate.minute(),
        EndHourTime: endDate.hour(),
        EndMinuteTime: endDate.minute(),
      });
    } else {
      this.FormGroup.patchValue({
        SetRestrictTime: this.PlayerInfo.IsRestricted,
      });
    }
  }

  // Form Validator

  FormValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const validError: ValidationErrors = { invalid: true };

      if (form.invalid) return form.errors;

      const startHourTime: AbstractControl | null = form.get("StartHourTime");
      const startMinuteTime: AbstractControl | null =
        form.get("StartMinuteTime");
      const endHourTime: AbstractControl | null = form.get("EndHourTime");
      const endMinuteTime: AbstractControl | null = form.get("EndMinuteTime");

      if (
        (startHourTime.value &&
          endHourTime.value &&
          startMinuteTime.value &&
          endMinuteTime.value) !== null
      ) {
        if (
          startHourTime.value + startMinuteTime.value ===
          endHourTime.value + endMinuteTime.value
        ) {
          if (
            (endHourTime.value + 24 - startHourTime.value) * 60 +
            (endMinuteTime.value - startMinuteTime.value)
          ) {
            startHourTime.markAsTouched();
            startMinuteTime.markAsTouched();
            endHourTime.markAsTouched();
            endMinuteTime.markAsTouched();
            return validError;
          }
        }
      }

      return null;
    };
  }

  // input check function
  AmountInputCheck(e: KeyboardEvent, inputControl: AbstractControl): boolean {
    const isExclude: boolean =
      e.key.toLowerCase() === "backspace" ||
      e.key.toLowerCase() === "delete" ||
      e.key.toLowerCase().substr(0, 5) === "arrow" ||
      e.key.toLowerCase() === "tab";

    if (/[0-9]/.test(e.key) === false && isExclude === false) return false;

    return true;
  }

  async Edit(): Promise<void> {
    if (this.IsLoading) return;

    this.FormGroup.markAllAsTouched();

    try {
      this.IsLoading = true;

      const request = new DTO.ChangeRestrictTimeAffiliatePlayerRequest();
      request.AgentName = this.PlayerInfo.Agent;
      request.UserId = this.PlayerInfo.UserId;
      request.IsRestricted = this.SetRestrictTimeControl.value;

      // request.IsRestricted가 true 일때 form의 값을 가져와준다.
      if (request.IsRestricted) {
        const startHour: number = this.StartHourTimeControl.value;
        const startMinute: number = this.StartMinuteTimeControl.value;
        const endHour: number = this.EndHourTimeControl.value;
        const endMinute: number = this.EndMinuteTimeControl.value;

        const startHourString: string =
          startHour < 10 ? `0${startHour.toString()}` : startHour.toString();
        const startMinuteString: string =
          startMinute < 10
            ? `0${startMinute.toString()}`
            : startMinute.toString();
        const endHourString: string =
          endHour < 10 ? `0${endHour.toString()}` : endHour.toString();
        const endMinuteString: string =
          endMinute < 10 ? `0${endMinute.toString()}` : endMinute.toString();

        request.RestrictTimeStart = `${startHourString}:${startMinuteString}`;
        request.RestrictTimeEnd = `${endHourString}:${endMinuteString}`;
      }

      await this.playerService.PlayerRestrictTime(request);
    } catch (e) {
      throw e;
    } finally {
      this.IsLoading = false;
    }
  }
}
