<br>

# # Transforming Data Using Pipes

<br>
<br>

<small> URL : https://angular.io/guide/pipes#transforming-data-using-pipes</small>

<br>

---

<br>

파이프를 사용하여 표시 할 문자열, 통화 금액, 날짜 및 기타 데이터를 변환합니다. 파이프는 입력 값을 받아들이고 변환 된 값을 반환하기 위해 템플릿 표현식에서 사용할 수있는 간단한 함수입니다.

파이프는 각 파이프를 한 번만 선언하면서 애플리케이션 전체에서 사용할 수 있기 때문에 유용합니다. 예를 들어 파이프를 사용하여 원시 문자열 형식이 아닌 1988 년 4 월 15 일로 날짜를 표시합니다.

<br>
<br>

## 1. pipe

<br>

`@Pipe {}` 데코레이터가 선행되고 뷰에 표시하기 위해 입력 값을 출력 값으로 변환하는 함수를 정의하는 클래스입니다. Angular는 다양한 파이프를 정의하며 새 파이프를 정의 할 수 있습니다.

<br>
<br>

- **Example: Pipes**

  ```
  // app.component.html

  <a id="toc"></a>
  <h1>Pipes</h1>
  <a href="#happy-birthday1">Happy Birthday v1</a><br>
  <a href="#birthday-date-pipe">Birthday DatePipe</a><br>
  <a href="#happy-birthday2">Happy Birthday v2</a><br>
  <a href="#birthday-pipe-chaining">Birthday Pipe Chaining</a><br>
  ...

  <hr>
  <a id="happy-birthday1"></a>
  <h2>Hero Birthday v1</h2>
  <app-hero-birthday></app-hero-birthday>			// The hero's birthday is Apr 15, 1988

  <hr>
  <a id="birthday-date-pipe"></a>
  <h2>Birthday DatePipe</h2>
  <p>The hero's birthday is {{ birthday | date }}</p>				// The hero's birthday is Apr 15, 1988
  <p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>	// The hero's birthday is 04/15/88

  <hr>
  <a id="happy-birthday2"></a>
  <h2>Hero Birthday v2</h2>
  <app-hero-birthday2></app-hero-birthday2>			// The hero's birthday is 4/15/88

  <hr>
  <a id="birthday-pipe-chaining"></a>
  <h2>Birthday Pipe Chaining</h2>
  <p>
  The chained hero's birthday is
  {{ birthday | date | uppercase}}				 // The chained hero's birthday is APR 15, 1988
  </p>
  <p>
  The chained hero's birthday is
  {{  birthday | date:'fullDate' | uppercase}}     // The chained hero's birthday is FRIDAY, APRIL 15, 1988
  </p>
  <p>
  The chained hero's birthday is
  {{ ( birthday | date:'fullDate' ) | uppercase}}  // The chained hero's birthday is FRIDAY, APRIL 15, 1988
  </p>
  ...
  ```

  ```
  // app.component.ts

  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
  })
  export class AppComponent {
  	birthday = new Date(1988, 3, 15); 		// April 15, 1988 -- 월 매개 변수가 0부터 시작하기 때문에
  }
  ```

  <small>URL: https://stackblitz.com/angular/ebxnxlknykk?file=src%2Fapp%2Fapp.component.html</small>

<br>
<br>
<br>
<br>
<br>

### 1) built-in pipes (내장 파이프)

<br>

Angular는 로케일 정보를 사용하여 데이터 형식을 지정하는 국제화 (i18n)를위한 변환을 포함하여 일반적인 데이터 변환을위한 내장 파이프를 제공합니다. 다음은 데이터 형식화에 일반적으로 사용되는 내장 파이프입니다.

<br>

- DatePipe : 로케일 규칙에 따라 날짜 값의 형식을 지정합니다.

- UpperCasePipe : 텍스트를 모두 대문자로 변환합니다.

- LowerCasePipe : 텍스트를 모두 소문자로 변환합니다.

- CurrencyPipe : 로케일 규칙에 따라 형식이 지정된 통화 문자열로 숫자를 변환합니다.

- DecimalPipe : 로케일 규칙에 따라 형식이 지정된 소수점이있는 문자열로 숫자를 변환합니다.

- PercentPipe : 로케일 규칙에 따라 형식이 지정된 백분율 문자열로 숫자를 변환합니다.

<br>

파이프를 생성하여 사용자 지정 변환을 캡슐화하고 템플릿 표현식에서 사용자 지정 파이프를 사용할 수도 있습니다.

<br>
<br>
<br>
<br>

### 2) Prerequisites (전제 조건)

<br>

파이프를 사용하려면 다음 사항에 대한 기본적인 이해가 있어야합니다.

<br>

- Typescript 및 HTML5 프로그래밍

- CSS 스타일이있는 HTML Templates
- Components

<br>
<br>
<br>
<br>

### 3) Using a pipe in a template (템플릿에서 파이프 사용)

<br>

파이프를 적용하려면 기본 제공 `DatePipe`의 날짜 인 파이프 이름과 함께 다음 코드 예제와 같이 템플릿 표현식 내에서 파이프 연산자 (`|`)를 사용합니다. 예제의 탭은 다음을 보여줍니다.

- `app.component.html`은 별도의 템플릿에서 날짜를 사용하여 생일을 표시합니다.

- `hero-birthday1.component.ts`는 생일 값도 설정하는 구성 요소에서 인라인 템플릿의 일부로 동일한 파이프를 사용합니다.

  ```
  // hero-birthday1.component.ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-hero-birthday',
    template: `<p>The hero's birthday is {{ birthday | date }}</p>`
  })
  export class HeroBirthdayComponent {
    birthday = new Date(1988, 3, 15); 		// April 15, 1988 -- 월 매개 변수가 0부터 시작하기 때문에
  }
  ```

<br>
<br>
<br>
<br>

## 2. Transforming data with parameters and chained pipes (매개 변수 및 체인 파이프로 데이터 변환)

<br>

선택적 매개 변수(optional parameters)를 사용하여 파이프의 출력을 미세 조정하십시오.

예를 들어 EUR와 같은 국가 코드를 매개 변수(parameter)로 사용하여 `CurrencyPipe`를 사용할 수 있습니다.

템플릿 표현식 `{{amount | currency : 'EUR'}}`는 금액을 유로 통화로 변환합니다.

위와 같이 파이프 이름 `currency` 뒤에 콜론 `:`과 매개 변수 값(parameter value)인 `'EUR'`이 붙습니다.

<br>
<br>

파이프가 여러 매개 변수(multiple parameters)를 허용하는 경우 콜론으로 값을 구분하십시오.

예를 들어 `{{amount | currency : 'EUR': 'Euros'}}` 는 두 번째 매개 변수 인 문자열 리터럴(string literal) `'Euros'`를 출력 문자열에 추가합니다.

문자열 리터럴 또는 구성요소 속성(component property)과 같은 유효한 템플릿 식(template expression)을 매개 변수로 사용할 수 있습니다.

<br>

일부 파이프에는 하나 이상의 매개 변수가 필요하며 `SlicePipe`와 같은 더 많은 선택적 매개 변수를 허용합니다.

예를 들어 `{{slice : 1 : 5}}`는 요소 1로 시작하고 요소 5로 끝나는 요소의 하위 집합을 포함하는 새 배열 또는 문자열을 만듭니다.

<br>
<br>
<br>
<br>

### 1) Example: Formatting a date (날짜 서식 지정)

<br>

다음 예제의 탭은 서로 다른 두 형식 (`shortDate`및 `fullDate`) 간 전환을 보여줍니다.

- app.component.html 템플릿은 `DatePipe`(이름 지정된 날짜)에 대한 형식 매개 변수를 사용하여 날짜를 `04/15/88`로 표시합니다.

- 아래 hero-birthday2.component.ts 구성 요소는 파이프의 형식 매개 변수를 템플릿 섹션(template section)에있는 구성 요소의 형식 속성에 바인딩하고 구성 요소의 `toggleFormat()` 메서드에 바인딩 된 클릭 이벤트에 대한 버튼을 추가합니다.

  ```
  template:
    <p>The hero's birthday is {{ birthday | date:format }}</p>
    <button (click)="toggleFormat()">Toggle Format</button>
  ```

- hero-birthday2.component.ts 구성 요소의 `toggleFormat()` 메서드는 구성 요소의 형식 속성을 짧은 형식 ( `shortDate`)과 긴 형식 (`fullDate`)간에 전환합니다.

  ```
  export class HeroBirthday2Component {
    birthday = new Date(1988, 3, 15);     // April 15, 1988 -- since month parameter is zero-based
    toggle = true;                        // start with true == shortDate

    get format() {
      return this.toggle ? 'shortDate' : 'fullDate';
    }

    toggleFormat() {
      this.toggle = !this.toggle;
    }
  }
  ```

- Toggle Format 버튼을 클릭하면 그림 1과 같이 1988 년 4 월 15 일과 1988 년 4 월 15 일 금요일 사이의 날짜 형식이 바뀝니다. <small>(URL: https://angular.io/guide/pipes#example-formatting-a-date)</small>

<br>
<br>
<br>
<br>

## 3. DecimalPipe

<br>

숫자 옵션 및 로케일 규칙에 따라 값을 형식화합니다. 로케일은 그룹 크기 및 구분 기호, 소수점 문자 및 기타 로케일 별 구성을 결정합니다.

<br>

`{{ value_expression | number [ : digitsInfo [ : locale ] ] }}`

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# issue

- default-layout.component.html

  ```
  <div class="value-detail" *ngIf="!sharedDataService.AdminName">
      <dl>
        //NOTE 타이틀에 국가별에 해당하는 화폐단위를 넣기위해 GetCurrencySymbol() 함수를 만들어 바인딩.
        <dt class="name">{{ 'HEADER_BALANCE' | translate }} {{sharedDataService.GetCurrencySymbol()}}</dt>
        <dd class="value">
          //NOTE numberformat파이프를 사용하여 바인딩 (:'1.2-2'는 두번째 인수로 ts파일의 decimal에 값을 전달해준다.)
          <code [class.text-danger]="sharedDataService.AgentBalance < 0">{{sharedDataService.AgentBalance | numberformat:'1.2-2'}}</code>
        </dd>
      </dl>
      <dl>
        <dt class="name">{{ 'HEADER_C_DOLLAR' | translate }}</dt>
        <dd class="value">
          <code [class.text-danger]="sharedDataService.AgentCDollar < 0">{{sharedDataService.AgentCDollar | numberformat:'1.2-2'}}</code>
        </dd>
      </dl>
      <dl>
        <dt class="name">{{ 'HEADER_T_DOLLAR' | translate }}</dt>
        <dd class="value">
          <code [class.text-danger]="sharedDataService.AgentTDollar < 0">{{sharedDataService.AgentTDollar | numberformat:'1.2-2'}}</code>
        </dd>
      </dl>
      <dl>
        <dt class="name">{{ 'HEADER_TICKET' | translate }} {{sharedDataService.GetCurrencySymbol()}}</dt>
        <dd class="value">
          <span class="badge badge-pill badge-secondary mr-2">
            {{sharedDataService.AgentTicketCount | number}}
          </span>
          <button type="button" class="btn btn-link" [class.text-danger]="sharedDataService.AgentTicketValue < 0" (click)="OpenModal(Modals.TicketList, ModalColors.Primary)">
            {{sharedDataService.AgentTicketValue | numberformat:'1.2-2'}}
          </button>
        </dd>
      </dl>
    </div>
  ```

- numberformat.pipe.ts

  ```
  import { Injectable } from '@angular/core';
  import { Pipe, PipeTransform } from '@angular/core';
  import { DecimalPipe } from '@angular/common';

  @Injectable()
  @Pipe({
    name: 'numberformat',
    pure: true
  })
  export class NumberFormatPipe implements PipeTransform
  {
    constructor(private decimalPipe: DecimalPipe)
    {
    }

    //NOTE html에서 두번째 인수 값을 받아올 decimal은 옵셔널(?:)로 지정하여 값이 없는 경우 null을 받아올수있도록 한다.
    transform(value: number, decimal?: string): string
    {
      //NOTE decimalPoint변수를 추가하여 decimal값이 있으면? decimal을 사용하거나 : 없으면 1.0-2 값을 디폴트로 사용하도록 작성
      const decimalPoint: string = (decimal) ? decimal : '1.0-2';

      //NOTE (value, decimalPoint)를 decimalPipe.transform시켜주고 반환되도록 작성
      return this.decimalPipe.transform(value, decimalPoint);
    }
  }
  ```
