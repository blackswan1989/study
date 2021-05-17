import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AbstractModalComponent } from "@app/views/affiliate-modal/abstract-modal.component";
import { PlayerRestrictTimeModel } from "@core/affiliate-models/restrict-time.model";
import * as DTO from "@dto/backend";

import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";

@Component({
  templateUrl: "restrict-time.component.html",
  providers: [ToastrService],
})
export class PlayerRestrictTimeComponent
  extends AbstractModalComponent
  implements OnInit
{
  onClose: Subject<boolean>;
  result: boolean;

  PlayerInfo: DTO.AffiliatePlayer;

  constructor(
    public ModalRef: BsModalRef,
    private toastr: ToastrService,
    public Model: PlayerRestrictTimeModel,
    private translate: TranslateService
  ) {
    super(ModalRef);

    this.onClose = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.result = false;

    if (!this.PlayerInfo) {
      this.toastr.error(
        this.translate.instant("TOASTR_ERRORMSG_PLAYERINFO_IS_NOT_SPECIFIED")
      );
    } else {
      this.Model.Reset(this.PlayerInfo);
    }
  }

  HideInternal(): void {
    this.onClose.next(this.result);
  }

  async Edit(): Promise<void> {
    try {
      await this.Model.Edit();

      this.result = true;
      this.toastr.success(
        this.translate.instant("TOASTR_MSG_SUCCESSFULLY_UPDATED_PLAYER", {
          FULLUSERNAME: this.Model.PlayerInfo.FullUsername,
        })
      );
      await this.Hide();
    } catch (e) {
      this.toastr.error(
        e instanceof DTO.BackendErrorResponse
          ? this.translate.instant(`${e.CustomerErrorCode}`)
          : JSON.stringify(e)
      );
    } finally {
      this.TryUnlockProcess();
    }
  }
}
