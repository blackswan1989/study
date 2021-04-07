import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
  ValidatorFn,
  ValidationErrors,
  FormArray,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import * as DTO from "@dto/backend";
import { AbstractModalComponent } from "@app/views/affiliate-modal/abstract-modal.component";
import { SharedPlayerService } from "@core/services/shared-player.service";

// service import
import { AffiliatePlayerResponsibleGamingService } from "@core/services/affiliate-player-responsible-gaming.service";
import { PlayerService } from "@core/services/player.service";
import { DynamicFormRules } from "@core/helpers/dynamic-form";
import { SharedDataService } from "@core/services/shared-data.service.o";

@Component({
  templateUrl: "deposit-limit-edit.component.html",
})
export class PlayerEditDepositLimitComponent
  extends AbstractModalComponent
  implements OnInit {
  onClose: Subject<boolean>;
  result: boolean;

  DepositTemplate: DTO.GetPlayerDepositTemplateResponse;
  DepositLimit: DTO.GetPlayerDepositLimitResponse;

  readonly MaxTagDisplay: number = 2;
  PlayerTagList: DTO.TagEntityGroup[];

  IsCustomDepositLimit: boolean = false;
  EditForm: FormGroup;

  IsLoading: boolean;
  Request: DTO.UpsertPlayerDepositLimitRequest;

  // CashierSetRgDepositLimit를 boolean 값으로 선언
  CashierSetRgDepositLimit: boolean;

  readonly hasManageDepositLimit: boolean;

  private _IsNoLimit: boolean;

  get IsNoLimit(): boolean {
    return this._IsNoLimit;
  }

  set IsNoLimit(val: boolean) {
    this._IsNoLimit = val;

    if (this.IsNoLimit) {
      this.Day1LimitControl.clearValidators();
      this.Day7LimitControl.clearValidators();
      this.Day30LimitControl.clearValidators();
      this.Day1WithdrawalLimitControl.clearValidators();
      this.Day7WithdrawalLimitControl.clearValidators();
      this.Day30WithdrawalLimitControl.clearValidators();
      this.Day1P2PTransferLimitControl.clearValidators();
      this.Day7P2PTransferLimitControl.clearValidators();
      this.Day30P2PTransferLimitControl.clearValidators();
    } else {
      this.EditForm.reset();

      this.Day1LimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day7LimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day30LimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day1WithdrawalLimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day7WithdrawalLimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day30WithdrawalLimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day1P2PTransferLimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day7P2PTransferLimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);
      this.Day30P2PTransferLimitControl.setValidators([
        Validators.max(2147483647),
        Validators.pattern(DynamicFormRules.NoLeadZero),
      ]);

      if (this.DepositLimit && this.DepositLimit.Day1CustomLimit)
        this.Day1LimitControl.patchValue(this.DepositLimit.Day1CustomLimit);

      if (this.DepositLimit && this.DepositLimit.Day7CustomLimit)
        this.Day7LimitControl.patchValue(this.DepositLimit.Day7CustomLimit);

      if (this.DepositLimit && this.DepositLimit.Day30CustomLimit)
        this.Day30LimitControl.patchValue(this.DepositLimit.Day30CustomLimit);

      if (this.DepositLimit && this.DepositLimit.Day1WithdrawalCustomLimit)
        this.Day1WithdrawalLimitControl.patchValue(
          this.DepositLimit.Day1WithdrawalCustomLimit
        );

      if (this.DepositLimit && this.DepositLimit.Day7WithdrawalCustomLimit)
        this.Day7WithdrawalLimitControl.patchValue(
          this.DepositLimit.Day7WithdrawalCustomLimit
        );

      if (this.DepositLimit && this.DepositLimit.Day30WithdrawalCustomLimit)
        this.Day30WithdrawalLimitControl.patchValue(
          this.DepositLimit.Day30WithdrawalCustomLimit
        );

      if (this.DepositLimit && this.DepositLimit.Day1P2PTransferCustomLimit)
        this.Day1P2PTransferLimitControl.patchValue(
          this.DepositLimit.Day1P2PTransferCustomLimit
        );

      if (this.DepositLimit && this.DepositLimit.Day7P2PTransferCustomLimit)
        this.Day7P2PTransferLimitControl.patchValue(
          this.DepositLimit.Day7P2PTransferCustomLimit
        );

      if (this.DepositLimit && this.DepositLimit.Day30P2PTransferCustomLimit)
        this.Day30P2PTransferLimitControl.patchValue(
          this.DepositLimit.Day30P2PTransferCustomLimit
        );
    }

    this.Day1LimitControl.updateValueAndValidity();
    this.Day7LimitControl.updateValueAndValidity();
    this.Day30LimitControl.updateValueAndValidity();
  }

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private bsModalService: BsModalService,
    private playerService: PlayerService,
    private sharedDataService: SharedDataService,
    private sharedPlayerService: SharedPlayerService,
    private responsibleGamingService: AffiliatePlayerResponsibleGamingService, // AffiliatePlayerResponsibleGamingService 추가
    public ModalRef: BsModalRef
  ) {
    super(ModalRef);

    this.onClose = new Subject<boolean>();
    this.result = false;

    this.hasManageDepositLimit = this.sharedDataService.GetAdminAccessPermission(
      DTO.AdminAccessPermission.ManageDepositLimit
    );

    this.EditForm = new FormGroup(
      {
        Day1Limit: new FormControl(""),
        Day7Limit: new FormControl(""),
        Day30Limit: new FormControl(""),
        Day1WithdrawalLimit: new FormControl(""),
        Day7WithdrawalLimit: new FormControl(""),
        Day30WithdrawalLimit: new FormControl(""),
        Day1P2PTransferLimit: new FormControl(""),
        Day7P2PTransferLimit: new FormControl(""),
        Day30P2PTransferLimit: new FormControl(""),
      },
      this.EditFormValidator()
    );
  }

  get Day1LimitControl(): AbstractControl | null {
    return this.EditForm.get("Day1Limit");
  }

  get Day7LimitControl(): AbstractControl | null {
    return this.EditForm.get("Day7Limit");
  }

  get Day30LimitControl(): AbstractControl | null {
    return this.EditForm.get("Day30Limit");
  }

  get Day1WithdrawalLimitControl(): AbstractControl | null {
    return this.EditForm.get("Day1WithdrawalLimit");
  }

  get Day7WithdrawalLimitControl(): AbstractControl | null {
    return this.EditForm.get("Day7WithdrawalLimit");
  }

  get Day30WithdrawalLimitControl(): AbstractControl | null {
    return this.EditForm.get("Day30WithdrawalLimit");
  }

  get Day1P2PTransferLimitControl(): AbstractControl | null {
    return this.EditForm.get("Day1P2PTransferLimit");
  }

  get Day7P2PTransferLimitControl(): AbstractControl | null {
    return this.EditForm.get("Day7P2PTransferLimit");
  }

  get Day30P2PTransferLimitControl(): AbstractControl | null {
    return this.EditForm.get("Day30P2PTransferLimit");
  }

  EditFormValidator(): ValidatorFn {
    return (form: FormGroup): ValidationErrors | null => {
      if (this.IsNoLimit) return null;
      else {
        const day1: AbstractControl | null = form.get("Day1Limit");
        const day7: AbstractControl | null = form.get("Day7Limit");
        const day30: AbstractControl | null = form.get("Day30Limit");
        const day1Withdrawal: AbstractControl | null = form.get(
          "Day1WithdrawalLimit"
        );
        const day7Withdrawal: AbstractControl | null = form.get(
          "Day7WithdrawalLimit"
        );
        const day30Withdrawal: AbstractControl | null = form.get(
          "Day30WithdrawalLimit"
        );
        const day1P2PTransfer: AbstractControl | null = form.get(
          "Day1P2PTransferLimit"
        );
        const day7P2PTransfer: AbstractControl | null = form.get(
          "Day7P2PTransferLimit"
        );
        const day30P2PTransfer: AbstractControl | null = form.get(
          "Day30P2PTransferLimit"
        );

        if (day1 && day1.value === null && day7 && day7.value)
          return {
            InValidLimit: this.translate.instant("INVALID_DEPOSIT_LIMIT", {
              DAYS1: 1,
              DAYS2: 7,
            }),
          };

        if (day1 && day1.value === null && day30 && day30.value)
          return {
            InValidLimit: this.translate.instant("INVALID_DEPOSIT_LIMIT", {
              DAYS1: 1,
              DAYS2: 30,
            }),
          };

        if (day7 && day7.value === null && day30 && day30.value)
          return {
            InValidLimit: this.translate.instant("INVALID_DEPOSIT_LIMIT", {
              DAYS1: 7,
              DAYS2: 30,
            }),
          };

        if (day1 && day1.value && day7 && day7.value && day1.value > day7.value)
          return {
            InValidLimit: this.translate.instant("INVALID_DEPOSIT_LIMIT", {
              DAYS1: 1,
              DAYS2: 7,
            }),
          };

        if (
          day7 &&
          day7.value &&
          day30 &&
          day30.value &&
          day7.value > day30.value
        )
          return {
            InValidLimit: this.translate.instant("INVALID_DEPOSIT_LIMIT", {
              DAYS1: 7,
              DAYS2: 30,
            }),
          };

        if (
          day7 &&
          !day7.value &&
          day1 &&
          day1.value &&
          day30 &&
          day30.value &&
          day1.value > day30.value
        )
          return {
            InValidLimit: this.translate.instant("INVALID_DEPOSIT_LIMIT", {
              DAYS1: 1,
              DAYS2: 30,
            }),
          };

        if (
          day1Withdrawal &&
          day1Withdrawal.value === null &&
          day7Withdrawal &&
          day7Withdrawal.value
        )
          return {
            InValidWithdrawalLimit: this.translate.instant(
              "INVALID_WITHDRAWAL_LIMIT",
              { DAYS1: 1, DAYS2: 7 }
            ),
          };

        if (
          day1Withdrawal &&
          day1Withdrawal.value === null &&
          day30Withdrawal &&
          day30Withdrawal.value
        )
          return {
            InValidWithdrawalLimit: this.translate.instant(
              "INVALID_WITHDRAWAL_LIMIT",
              { DAYS1: 1, DAYS2: 30 }
            ),
          };

        if (
          day7Withdrawal &&
          day7Withdrawal.value === null &&
          day30Withdrawal &&
          day30Withdrawal.value
        )
          return {
            InValidWithdrawalLimit: this.translate.instant(
              "INVALID_WITHDRAWAL_LIMIT",
              { DAYS1: 7, DAYS2: 30 }
            ),
          };

        if (
          day1Withdrawal &&
          day1Withdrawal.value &&
          day7Withdrawal &&
          day7Withdrawal.value &&
          day1Withdrawal.value > day7Withdrawal.value
        )
          return {
            InValidWithdrawalLimit: this.translate.instant(
              "INVALID_WITHDRAWAL_LIMIT",
              { DAYS1: 1, DAYS2: 7 }
            ),
          };

        if (
          day7Withdrawal &&
          day7Withdrawal.value &&
          day30Withdrawal &&
          day30Withdrawal.value &&
          day7Withdrawal.value > day30Withdrawal.value
        )
          return {
            InValidWithdrawalLimit: this.translate.instant(
              "INVALID_WITHDRAWAL_LIMIT",
              { DAYS1: 7, DAYS2: 30 }
            ),
          };

        if (
          day7Withdrawal &&
          !day7Withdrawal.value &&
          day1Withdrawal &&
          day1Withdrawal.value &&
          day30Withdrawal &&
          day30Withdrawal.value &&
          day1Withdrawal.value > day30Withdrawal.value
        )
          return {
            InValidWithdrawalLimit: this.translate.instant(
              "INVALID_WITHDRAWAL_LIMIT",
              { DAYS1: 1, DAYS2: 30 }
            ),
          };

        if (
          day1P2PTransfer &&
          day1P2PTransfer.value === null &&
          day7P2PTransfer &&
          day7P2PTransfer.value
        )
          return {
            InValidP2PTransferLimit: this.translate.instant(
              "PLAYERS_CASHIER_LIMIT_ERROR_MESSAGE",
              { DAYS1: 1, DAYS2: 7 }
            ),
          };

        if (
          day1P2PTransfer &&
          day1P2PTransfer.value === null &&
          day30P2PTransfer &&
          day30P2PTransfer.value
        )
          return {
            InValidP2PTransferLimit: this.translate.instant(
              "PLAYERS_CASHIER_LIMIT_ERROR_MESSAGE",
              { DAYS1: 1, DAYS2: 30 }
            ),
          };

        if (
          day7P2PTransfer &&
          day7P2PTransfer.value === null &&
          day30P2PTransfer &&
          day30P2PTransfer.value
        )
          return {
            InValidP2PTransferLimit: this.translate.instant(
              "PLAYERS_CASHIER_LIMIT_ERROR_MESSAGE",
              { DAYS1: 7, DAYS2: 30 }
            ),
          };

        if (
          day1P2PTransfer &&
          day1P2PTransfer.value &&
          day7P2PTransfer &&
          day7P2PTransfer.value &&
          day1P2PTransfer.value > day7P2PTransfer.value
        )
          return {
            InValidP2PTransferLimit: this.translate.instant(
              "PLAYERS_CASHIER_LIMIT_ERROR_MESSAGE",
              { DAYS1: 1, DAYS2: 7 }
            ),
          };

        if (
          day7P2PTransfer &&
          day7P2PTransfer.value &&
          day30P2PTransfer &&
          day30P2PTransfer.value &&
          day7P2PTransfer.value > day30P2PTransfer.value
        )
          return {
            InValidP2PTransferLimit: this.translate.instant(
              "PLAYERS_CASHIER_LIMIT_ERROR_MESSAGE",
              { DAYS1: 7, DAYS2: 30 }
            ),
          };

        if (
          day7P2PTransfer &&
          !day7P2PTransfer.value &&
          day1P2PTransfer &&
          day1P2PTransfer.value &&
          day30P2PTransfer &&
          day30P2PTransfer.value &&
          day1P2PTransfer.value > day30P2PTransfer.value
        )
          return {
            InValidP2PTransferLimit: this.translate.instant(
              "PLAYERS_CASHIER_LIMIT_ERROR_MESSAGE",
              { DAYS1: 1, DAYS2: 30 }
            ),
          };
      }

      return null;
    };
  }

  async ngOnInit(): Promise<void> {
    this.result = false;
    this.IsLoading = false;
    this.Request = new DTO.UpsertPlayerDepositLimitRequest();
    this.IsCustomDepositLimit = this.DepositLimit
      ? this.DepositLimit.IsUsedCustom
      : false;
    this.CashierSetRgDepositLimit = false; // ngOnInit에 false상태 선언

    if (this.hasManageDepositLimit === false) {
      this.toastr.error(this.translate.instant("ACCESS_DENIED"));
      await this.bsModalService.hide(1);
      return;
    }

    this.PlayerTagList =
      this.DepositTemplate && this.DepositTemplate.TagGroups
        ? this.DepositTemplate.TagGroups
        : [];

    this.Reset();
  }

  Reset(): void {
    this.Request.UserId = this.sharedPlayerService.UserId;
    this.Request.AgentName = this.sharedPlayerService.AgentName;
    this.Request.IsUsedCustom = this.IsCustomDepositLimit;

    this.EditForm.reset();

    if (this.IsCustomDepositLimit) {
      const depositLimit: DTO.GetPlayerDepositLimitResponse = this.DepositLimit;

      this.IsNoLimit = depositLimit
        ? !depositLimit.Day1CustomLimit &&
          !depositLimit.Day7CustomLimit &&
          !depositLimit.Day30CustomLimit &&
          !depositLimit.Day1WithdrawalCustomLimit &&
          !depositLimit.Day7WithdrawalCustomLimit &&
          !depositLimit.Day30WithdrawalCustomLimit &&
          !depositLimit.Day1P2PTransferCustomLimit &&
          !depositLimit.Day7P2PTransferCustomLimit &&
          !depositLimit.Day30P2PTransferCustomLimit
        : false;
      this.EditForm.patchValue({
        Day1Limit:
          depositLimit && depositLimit.Day1CustomLimit
            ? depositLimit.Day1CustomLimit
            : null,
        Day7Limit:
          depositLimit && depositLimit.Day7CustomLimit
            ? depositLimit.Day7CustomLimit
            : null,
        Day30Limit:
          depositLimit && depositLimit.Day30CustomLimit
            ? depositLimit.Day30CustomLimit
            : null,
        Day1WithdrawalLimit:
          depositLimit && depositLimit.Day1WithdrawalCustomLimit
            ? depositLimit.Day1WithdrawalCustomLimit
            : null,
        Day7WithdrawalLimit:
          depositLimit && depositLimit.Day7WithdrawalCustomLimit
            ? depositLimit.Day7WithdrawalCustomLimit
            : null,
        Day30WithdrawalLimit:
          depositLimit && depositLimit.Day30WithdrawalCustomLimit
            ? depositLimit.Day30WithdrawalCustomLimit
            : null,
        Day1P2PTransferLimit:
          depositLimit && depositLimit.Day1P2PTransferCustomLimit
            ? depositLimit.Day1P2PTransferCustomLimit
            : null,
        Day7P2PTransferLimit:
          depositLimit && depositLimit.Day7P2PTransferCustomLimit
            ? depositLimit.Day7P2PTransferCustomLimit
            : null,
        Day30P2PTransferLimit:
          depositLimit && depositLimit.Day30P2PTransferCustomLimit
            ? depositLimit.Day30P2PTransferCustomLimit
            : null,
      });
    } else {
      const depositTemplate: DTO.GetPlayerDepositTemplateResponse = this
        .DepositTemplate;

      this.IsNoLimit = depositTemplate
        ? !depositTemplate.Day1Limit &&
          !depositTemplate.Day7Limit &&
          !depositTemplate.Day30Limit &&
          !depositTemplate.Day1WithdrawalLimit &&
          !depositTemplate.Day7WithdrawalLimit &&
          !depositTemplate.Day30WithdrawalLimit
        : true;
    }
  }

  async HideInternal(): Promise<void> {
    this.onClose.next(this.result);
  }

  ChangeDepositLimitType(isCustom: boolean): void {
    if (this.Request.IsUsedCustom === isCustom) return;

    this.Request.IsUsedCustom = this.IsCustomDepositLimit = isCustom;

    if (isCustom) this.IsNoLimit = false;
    else this.Reset();
  }

  // ChangePlayerRgDepositLimit 함수 정의 추가
  ChangePlayerRgDepositLimit() {
    this.CashierSetRgDepositLimit = !this.CashierSetRgDepositLimit;
  }

  async Edit(): Promise<void> {
    if (this.TryLockProcess() === false) return;

    if (this.EditForm.invalid) return;

    try {
      if (this.IsNoLimit) {
        this.Request.Day1Limit = null;
        this.Request.Day7Limit = null;
        this.Request.Day30Limit = null;
        this.Request.Day1WithdrawalLimit = null;
        this.Request.Day7WithdrawalLimit = null;
        this.Request.Day30WithdrawalLimit = null;
        this.Request.Day1P2PTransferLimit = null;
        this.Request.Day7P2PTransferLimit = null;
        this.Request.Day30P2PTransferLimit = null;
      } else {
        this.Request.Day1Limit = this.Day1LimitControl.value;
        this.Request.Day7Limit = this.Day7LimitControl.value;
        this.Request.Day30Limit = this.Day30LimitControl.value;
        this.Request.Day1WithdrawalLimit = this.Day1WithdrawalLimitControl.value;
        this.Request.Day7WithdrawalLimit = this.Day7WithdrawalLimitControl.value;
        this.Request.Day30WithdrawalLimit = this.Day30WithdrawalLimitControl.value;
        this.Request.Day1P2PTransferLimit = this.Day1P2PTransferLimitControl.value;
        this.Request.Day7P2PTransferLimit = this.Day7P2PTransferLimitControl.value;
        this.Request.Day30P2PTransferLimit = this.Day30P2PTransferLimitControl.value;
      }

      await this.playerService.UpsertPlayerDepositLimit(this.Request);

      // <-- Edit버튼 부분에서 CashierSetRgDepositLimit 체크박스가 체크되었을때의 로직 추가
      if (this.CashierSetRgDepositLimit) {
        const requestToRg: DTO.SetPlayerRGDepositLimitRequest = new DTO.SetPlayerRGDepositLimitRequest();

        requestToRg.AgentName = this.sharedPlayerService.AgentName;
        requestToRg.UserId = this.sharedPlayerService.UserId;

        if (this.Request.IsUsedCustom) {
          requestToRg.DailyDepositLimit = this.Request.Day1Limit;
          requestToRg.WeeklyDepositLimit = this.Request.Day7Limit;
          requestToRg.MonthlyDepositLimit = this.Request.Day30Limit;
        } else {
          requestToRg.DailyDepositLimit =
            this.DepositTemplate &&
            (this.DepositTemplate.Day1Limit ||
              this.DepositTemplate.Day1Limit === 0)
              ? this.DepositTemplate.Day1Limit
              : null;
          requestToRg.WeeklyDepositLimit =
            this.DepositTemplate &&
            (this.DepositTemplate.Day7Limit ||
              this.DepositTemplate.Day7Limit === 0)
              ? this.DepositTemplate.Day7Limit
              : null;
          requestToRg.MonthlyDepositLimit =
            this.DepositTemplate &&
            (this.DepositTemplate.Day30Limit ||
              this.DepositTemplate.Day30Limit === 0)
              ? this.DepositTemplate.Day30Limit
              : null;
        }

        await this.responsibleGamingService.SetPlayerRGDepositLimit(
          requestToRg
        );
      }
      // -->

      this.toastr.success(
        this.translate.instant("EDIT_DEPOSITLIMIT_MODAL_SUCCESS")
      );

      this.result = true;
      await this.Hide();
    } catch (e) {
      if (
        e.CustomerErrorCode === "INVALID_DEPOSIT_LIMIT" ||
        e.CustomerErrorCode === "INVALID_WITHDRAWAL_LIMIT" ||
        e.CustomerErrorCode === "INVALID_P2PTRANSFER_LIMIT"
      )
        this.toastr.error(
          e instanceof DTO.BackendErrorResponse
            ? this.translate.instant(`${e.CustomerErrorCode}`, {
                DAYS1: e.CustomerErrorParameters[0],
                DAYS2: e.CustomerErrorParameters[1],
              })
            : JSON.stringify(e)
        );
      else
        this.toastr.error(
          e instanceof DTO.BackendErrorResponse
            ? this.translate.instant(`${e.CustomerErrorCode}`)
            : JSON.stringify(e)
        );
    } finally {
      this.TryUnlockProcess();
    }
  }

  AmountInputCheck(e: KeyboardEvent, inputControl: AbstractControl): boolean {
    const isExclude: boolean =
      e.key.toLowerCase() === "backspace" ||
      e.key.toLowerCase() === "delete" ||
      e.key.toLowerCase().substr(0, 5) === "arrow" ||
      e.key.toLowerCase() === "tab";

    if (/[0-9]/.test(e.key) === false && isExclude === false) {
      return false;
    }

    const val: string =
      inputControl && inputControl.value ? inputControl.value.toString() : "";

    if (val === "0" && isExclude === false) {
      return false;
    }

    if (val.length > 9 && isExclude === false) {
      return false;
    }

    return true;
  }
}
