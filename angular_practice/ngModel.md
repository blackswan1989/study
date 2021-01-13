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

## Description

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
