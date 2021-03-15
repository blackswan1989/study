<br>
<br>

# NgModel(DIRECTIVE)

<br>

url : https://angular.kr/api/forms/NgModel

<br>

---

<br>

`NgModel`은 도메인 모델에서 FormControl 인스턴스를 만들고 양식 컨트롤 요소에 바인딩합니다.

<br>
<br>

## # Selectors

<br>

### &nbsp; `[ngModel]:not([formControlName]):not([formControl])`

<br>
<br>

## # Properties

<br>

- `@Input()` : `name: string` 지시문에 바인딩 된 이름을 추적합니다. 부모 폼이 있으면 이 이름을 키로 사용하여이 컨트롤의 값을 검색합니다.

- `@Input('disabled')` : `isDisabled: boolean` 컨트롤이 비활성화되었는지 여부를 추적합니다.

- `@Input('ngModel')` : `model: any` 이 지시문에 바인딩 된 값을 추적합니다.

<br>
<br>
<br>
<br>

## # Description

<br>

FormControl 인스턴스는 컨트롤의 값, 사용자 상호 작용 및 유효성 검사 상태를 추적하고 뷰를 모델과 동기화 된 상태로 유지합니다. 부모 Form 내에서 사용되는 경우 지시문은 Form에 자식 컨트롤로 자신을 등록합니다.

이 지시문은 그 자체로 또는 더 큰 양식의 일부로 사용됩니다. ngModel Selector를 사용하여 활성화하십시오.

<br>

도메인 모델을 선택적 입력(optional Input)으로 허용합니다. `[]` 구문을 사용하는 ngModel에 대한 단방향 바인딩이있는 경우 구성 요소 클래스에서 도메인 모델의 값을 변경하면 뷰의 값이 설정됩니다.

`[()]` 구문 ( 'banana-in-a-box 구문'이라고도 함)을 사용하는 양방향 바인딩이있는 경우 UI의 값은 항상 클래스의 도메인 모델에 다시 동기화됩니다.

<br>

관련 FormControl의 속성 (예 : 유효성 상태)을 검사하려면 `ngModel`을 키로 사용하여 지시문을 로컬 템플릿 변수로 내 보냅니다 (예 : # myVar = "ngModel"). 그런 다음 지시문의 컨트롤 속성을 사용하여 컨트롤에 액세스 할 수 있습니다.

그러나 가장 일반적으로 사용되는 속성 (유효 및 더티 등)도 직접 액세스를위한 컨트롤에 존재합니다. AbstractControlDirective에서 직접 사용할 수있는 전체 속성 목록을 참조하십시오.

<br>
<br>
<br>

- **Example: 실무 사용 예제(CORE-1333 이슈)**

  ```
  // deposit-limit-edit.component.html

  <form class="deposit-limit-form" [class.hide]="IsNoLimit && Request.IsUsedCustom" [formGroup]="EditForm">
    ...
    <div class="custom-control custom-checkbox mt-4 mb-2 w-100">
      <input type="checkbox" class="custom-control-input" id="ChangePlayerRgDepositLimit" ([ngModel])="CashierSetRgDepositLimit" (click)="ChangePlayerRgDepositLimit()" />
      <label class="custom-control-label" for="ChangePlayerRgDepositLimit">{{ 'CHANGE_RGDEPOSITLIMIT_CHECKBOXLABEL' | translate }}</label>
    </div>
  </form>


  // deposit-limit-edit.component

  CashierSetRgDepositLimit: boolean;

  ChangePlayerRgDepositLimit()
  {
    this.CashierSetRgDepositLimit = !this.CashierSetRgDepositLimit;
    console.log(this.CashierSetRgDepositLimit);
  }

  async Edit(): Promise<void>
    ...
    if (this.CashierSetRgDepositLimit)
    {
      this.RequestToRG = new DTO.SetPlayerRGDepositLimitRequest();
      this.RequestToRG.AgentName = this.sharedPlayerService.AgentName;
      this.RequestToRG.UserId = this.sharedPlayerService.UserId;

      this.RequestToRG.DailyDepositLimit = this.Day1LimitControl.value;
      this.RequestToRG.WeeklyDepositLimit = this.Day7LimitControl.value;
      this.RequestToRG.MonthlyDepositLimit = this.Day30LimitControl.value;
    }
  ```

  - ngModel을 사용하여 CashierSetRgDepositLimit를 읽어온다 : `([ngModel])="CashierSetRgDepositLimit"`

  - `(click)="ChangePlayerRgDepositLimit()"`로 클릭 이벤트를 연결

  - ts파일에서 ChangePlayerRgDepositLimit() 함수안에 `CashierSetRgDepositLimit`을 boolean 값으로 체크박스를 체크하는 기능으로 사용

  - `Edit()`에서 `if (this.CashierSetRgDepositLimit)`(CashierSetRgDepositLimit가 체크되어있다면)일때 동작하도록 구현

<br>
<br>
<br>
<br>

- **Example: 실무 사용 예제(CORE-1467 이슈 : Responsible Gaming Set Limit, toggle 버튼 추가)**

  - No Limit를 설정하는 Toggle Button 추가 (Daily Login Time, Re-Login Time, Monthly Login Frequency)
  - Toggle Button On 시, Dropdown 박스 비활성화
  - Dropdown Box 내, No Limit Option 제거
  - Button Off & No Limit 상태인 경우 Option을 선택 했을 때만 save 가능하도록 설정

  <br>

  ```
  // affiliate-player-responsible-gaming-daily-login-time-limit.component.html

  <div class="rg-card-daily-login" *ngIf="hasEditPlayerRGSetting && IsEditable">
  	<div class="card-header">
  		<div class="card-title">{{'RG_CARD_TITLE_DAILYLOGIN' | translate}}</div>
      // *** toggle botton 추가
  		<div class="card-title font-weight-normal float-right mr-0">
  			{{'COMMON_NO_LIMIT' | translate}}
  			<label class="switch switch-label switch-pill switch-success">
  				<input class="switch-input" type="checkbox" [(ngModel)]="IsNoLimit" >   // *** [(ngModel)]="IsNoLimit"를 사용 -> 토글버튼의 boolean 값이 바인딩되도록.
  				<span class="switch-slider" [attr.data-checked]="'SWITCH_SLIDER_ON' | translate" [attr.data-unchecked]="'SWITCH_SLIDER_OFF' | translate"></span>
  			</label>
  		</div>
  	</div>
  	<div class="card-body" *ngIf="IsLoading === true">
  		<div class="loading-box">
  			<i class="fa fa-spinner fa-pulse fa-4x fa-fw" aria-hidden="true"></i>
  			<span class="sr-only">{{ 'COMMON_PROGRESS_TEXT' | translate }}</span>
  		</div>
  	</div>
  	<div class="card-body" *ngIf="IsLoading === false">
  		<div class="grid-form">
  			<div class="grid-bundle">
  				<div class="form-group row">
  					<label class="col-4 col-form-label">{{'RG_CARD_LABEL_SETTIME' | translate}}</label>
  					<div class="col-8">
  						<ng-select class="custom"
  								  [items]="DailyLoginTimeLimitList"
  								  bindLabel="label"
  								  bindValue="value"
  								  [searchable]="false"
  								  [clearable]="false"
  								  [(ngModel)]="Request.DailyLoginTimeLimit"
  								  [disabled]="IsNoLimit"   // *** 위의 [(ngModel)]과 바인딩되어 토글버튼이 On인 경우(true) disabled 되도록 함.
  								  placeholder="{{'FILTER_SELECT' | translate}}">
  						</ng-select>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  	<div class="card-bottom pt-3" *ngIf="IsLoading === false">
  		<button type="button" class="btn btn-secondary" (click)="ChangeMode(false)" [disabled]="IsLoading">{{'PLAYER_DETAIL_PROFILE_CANCEL' | translate}}</button>
      // *** (!IsNoLimit && Request.DailyLoginTimeLimit === undefined) 추가 -> IsNoLimit 상태가 아니면서 && undefined 값(nolimit상태)일때 save 버튼이 비활성화 되도록
  		<button type="button" class="btn btn-primary" (click)="SetPlayerRGDailyLoginTimeLimit()" [disabled]="IsLoading || (!IsNoLimit && Request.DailyLoginTimeLimit === undefined)">{{'PLAYER_DETAIL_PROFILE_SAVE' | translate}}</button>
  	</div>
  </div>
  ```

  ```
  // affiliate-player-responsible-gaming-daily-login-time-limit.component.ts

  export class AffiliatePlayerResponsibleGamingDailyLoginTimeLimitComponent implements OnInit
  {
    IsLoading: boolean;
    Request: DTO.SetPlayerRGDailyLoginTimeLimitRequest;
    IsNoLimit: boolean;   // *** 토글버튼 IsNoLimit 타입 정의

    ...

    async ngOnInit(): Promise<void>
    {
      // *** 드롭다운 박스 부분으로 this.DailyLoginTimeLimitList = [] 로 변경
      this.DailyLoginTimeLimitList = [{
        label: this.translate.instant('EDIT_DEPOSITLIMIT_MODAL_NO_LIMIT'),  // *** {label과 value}를 삭제해서 Dropdown Box 내, No Limit Option 제거
  		  value: null,                                                        // *** 삭제
      }];

      for (let i = 1; i < 24; i++)
      {
        this.DailyLoginTimeLimitList.push({
          label: `${i} ${this.translate.instant('RG_CONFIGURATION_LABEL_HR')}`,
          value: i,
        });
      }

      await this.Reset();
    }

    ...

    // *** save 시켜주는 부분
    async SetPlayerRGDailyLoginTimeLimit(): Promise<void>
    {
      if (this.hasEditPlayerRGSetting === false)
      {
        this.toastr.error(this.translate.instant('ACCESS_DENIED'));
        return;
      }

      if (this.IsLoading)
        return;

      try
      {
        // *** this.IsNoLimit 상태(toggle On)일때 저장시
        if (this.IsNoLimit)
          this.Request.DailyLoginTimeLimit = null;  // *** Request.DailyLoginTimeLimit값을 null로(NoLimit)만들어준다.

        this.IsLoading = true;

        await this.responsibleGamingService.SetPlayerRGDailyLoginTimeLimit(this.Request);
        this.toastr.success(this.translate.instant('RG_SUCCESS_CHANGE_VALUE'));
      }
      catch (e)
      {
        this.toastr.error(e instanceof DTO.BackendErrorResponse ? this.translate.instant(`${e.CustomerErrorCode}`) : JSON.stringify(e));
      }
      finally
      {
        this.IsLoading = false;
        await this.Reset();
      }
    }
  }

  ```
