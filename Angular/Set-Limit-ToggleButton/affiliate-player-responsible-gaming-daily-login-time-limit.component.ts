import { Component, OnInit } from "@angular/core";
import { NgOption } from "@ng-select/ng-select";
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
} from "@angular/forms"; // import 추가
import { TranslateService } from "@ngx-translate/core";
import * as DTO from "@dto/backend";
import { SharedPlayerService } from "@core/services/shared-player.service";
import { SharedDataService } from "@core/services/shared-data.service.o";
import { AffiliatePlayerResponsibleGamingService } from "@core/services/affiliate-player-responsible-gaming.service";
import { ToastrService } from "ngx-toastr";
import { AffiliatePlayerResponsibleGamingConfirm } from "@app/views/affiliate-players/responsible-gaming/affiliate-player-responsible-gaming-confirm";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap";
import { ModalClass } from "@core/configs/shared.config";

@Component({
  selector: "affiliate-player-responsible-gaming-daily-login-time-limit",
  templateUrl:
    "affiliate-player-responsible-gaming-daily-login-time-limit.component.html",
})
export class AffiliatePlayerResponsibleGamingDailyLoginTimeLimitComponent
  implements OnInit {
  IsLoading: boolean;
  Request: DTO.SetPlayerRGDailyLoginTimeLimitRequest;

  PlayerCurrentDailyLoginTimeLimit: DTO.PlayerCurrentDailyLoginTimeLimit;
  PlayerPendingDailyLoginTimeLimit: DTO.PlayerPendingDailyLoginTimeLimit;

  readonly hasEditPlayerRGSetting: boolean;

  IsEditable: boolean = false;
  DailyLoginTimeLimitList: NgOption[];
  IsNoLimit: boolean = false; // IsNoLimit 상태일때 true & false 값을 설정
  FormGroup: FormGroup; // FormGroup 사용하기 위해 추가

  isDailyLoginTimeLimitPendingOn: boolean = false;
  ModalColors = ModalClass;

  constructor(
    private translate: TranslateService,
    private sharedDataService: SharedDataService,
    private toastr: ToastrService,
    private sharedPlayerService: SharedPlayerService,
    private responsibleGamingService: AffiliatePlayerResponsibleGamingService,
    public ModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {
    this.hasEditPlayerRGSetting = this.sharedDataService.GetAdminAccessPermission(
      DTO.AdminAccessPermission.EditPlayerRGSetting
    );

    // 추가한 FormGroup 로직
    this.FormGroup = new FormGroup({
      IsNoLimit: new FormControl(false),
      DailyLoginTimeLimit: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });

    this.FormGroup.get("IsNoLimit").valueChanges.subscribe((e) => {
      this.IsNoLimit = e;

      if (e) {
        this.FormGroup.patchValue({
          DailyLoginTimeLimit: null,
        });

        this.limitControl.disable();
      } else this.limitControl.enable();
    });
  }

  async ngOnInit(): Promise<void> {
    this.DailyLoginTimeLimitList = [];

    for (let i = 1; i < 24; i++) {
      this.DailyLoginTimeLimitList.push({
        label: `${i} ${this.translate.instant("RG_CONFIGURATION_LABEL_HR")}`,
        value: i,
      });
    }

    await this.Reset();

    // GetPlayerRGDailyLoginTimeLimit() 호출 추가
    await this.GetPlayerRGDailyLoginTimeLimit();
  }

  async Reset(): Promise<void> {
    this.IsEditable = false;
    this.IsLoading = false;
    this.PlayerCurrentDailyLoginTimeLimit = new DTO.PlayerCurrentDailyLoginTimeLimit();
    this.PlayerPendingDailyLoginTimeLimit = new DTO.PlayerPendingDailyLoginTimeLimit();
    this.Request = new DTO.SetPlayerRGDailyLoginTimeLimitRequest();
    this.Request.AgentName = this.sharedPlayerService.AgentName;
    this.Request.UserId = this.sharedPlayerService.UserId;

    // FormGroup.reset() 추가
    this.FormGroup.reset();

    await this.GetPlayerRGDailyLoginTimeLimit();
  }

  // get limitControl(): AbstractControl | null {...} 추가
  get limitControl(): AbstractControl | null {
    return this.FormGroup.get("DailyLoginTimeLimit");
  }

  ChangeMode(isEditable: boolean): void {
    this.IsEditable = isEditable;

    // FormGroup.patchValue(...) 추가
    this.FormGroup.patchValue({
      IsNoLimit:
        !this.PlayerCurrentDailyLoginTimeLimit.DailyLoginTimeLimit &&
        this.PlayerCurrentDailyLoginTimeLimit.DailyLoginTimeLimit !== 0,
      DailyLoginTimeLimit: this.PlayerCurrentDailyLoginTimeLimit
        .DailyLoginTimeLimit,
    });
  }

  async GetPlayerRGDailyLoginTimeLimit(): Promise<void> {
    if (this.IsLoading) return;

    try {
      this.IsLoading = true;

      const request: DTO.GetPlayerRGDailyLoginTimeLimitRequest = new DTO.GetPlayerRGDailyLoginTimeLimitRequest();
      request.AgentName = this.sharedPlayerService.AgentName;
      request.UserId = this.sharedPlayerService.UserId;

      const response: DTO.GetPlayerRGDailyLoginTimeLimitResponse = await this.responsibleGamingService.GetPlayerRGDailyLoginTimeLimit(
        request
      );
      if (response) {
        this.PlayerCurrentDailyLoginTimeLimit =
          response.PlayerCurrentDailyLoginTimeLimit;
        this.PlayerPendingDailyLoginTimeLimit =
          response.PlayerPendingDailyLoginTimeLimit;

        // IsNoLimit & FormGroup.patchValue 추가
        this.IsNoLimit =
          !this.PlayerCurrentDailyLoginTimeLimit.DailyLoginTimeLimit &&
          this.PlayerCurrentDailyLoginTimeLimit.DailyLoginTimeLimit !== 0;
        this.FormGroup.patchValue({
          DailyLoginTimeLimit: this.PlayerCurrentDailyLoginTimeLimit
            .DailyLoginTimeLimit,
        });
      }
    } catch (e) {
      this.toastr.error(
        e instanceof DTO.BackendErrorResponse
          ? this.translate.instant(`${e.CustomerErrorCode}`)
          : JSON.stringify(e)
      );
    } finally {
      this.IsLoading = false;
    }
  }

  async SetPlayerRGDailyLoginTimeLimit(): Promise<void> {
    if (this.hasEditPlayerRGSetting === false) {
      this.toastr.error(this.translate.instant("ACCESS_DENIED"));
      return;
    }

    // this.FormGroup.invalid 상태일때도 returne되도록 추가
    if (this.IsLoading || this.FormGroup.invalid) return;

    try {
      this.IsLoading = true;

      this.Request.DailyLoginTimeLimit = this.FormGroup.value.DailyLoginTimeLimit;

      await this.responsibleGamingService.SetPlayerRGDailyLoginTimeLimit(
        this.Request
      );
      this.toastr.success(this.translate.instant("RG_SUCCESS_CHANGE_VALUE"));
    } catch (e) {
      this.toastr.error(
        e instanceof DTO.BackendErrorResponse
          ? this.translate.instant(`${e.CustomerErrorCode}`)
          : JSON.stringify(e)
      );
    } finally {
      this.IsLoading = false;
      await this.Reset();
    }
  }

  async openConfirmModal(isSetVerified: boolean): Promise<void> {
    if (this.hasEditPlayerRGSetting === false) {
      this.toastr.error(this.translate.instant("ACCESS_DENIED"));
      return;
    }

    const Options: ModalOptions = {
      backdrop: "static",
      keyboard: false,
      class: this.ModalColors.Primary,
      initialState: {
        isSetVerified: isSetVerified,
        currentRGLimitType: DTO.RGLimitType.DailyLoginTimeLimit,
      },
    };
    this.ModalRef = this.bsModalService.show(
      AffiliatePlayerResponsibleGamingConfirm,
      Options
    );

    const isEdited: boolean = await new Promise<boolean>((resolve) => {
      this.ModalRef.content.onClose.subscribe((result: boolean) => {
        resolve(result);
      });
    });

    if (isEdited) {
      try {
        await this.GetPlayerRGDailyLoginTimeLimit();
      } catch (e) {
        this.toastr.error(
          e instanceof DTO.BackendErrorResponse
            ? this.translate.instant(`${e.CustomerErrorCode}`)
            : JSON.stringify(e)
        );
      }
    }
  }
}
