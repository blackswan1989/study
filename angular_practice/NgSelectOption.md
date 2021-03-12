<br>

# # NgSelectOption - `DIRECTIVE`

<br>
<br>

<small> URL : https://angular.io/api/forms/NgSelectOption</small>

<br>

---

<br>

동적으로 `<option>` 을 표시하여 옵션이 변경 될 때 Angular에 알릴 수 있습니다.

<br>
<br>

## # Selectors - `option`

<br>
<br>

## # Properties

<br>

- `id:` `string` : 옵션 요소의 ID (ID of the option element)

- `@Input()` `ngValue: any` : 옵션 요소에 바인딩 된 값을 추적합니다. 값 바인딩과 달리 `ngValue`는 개체에 대한 바인딩을 지원합니다. <small>`Write-Only`</small>

- `@Input()` `value: any` : 옵션 요소에 바인딩 된 간단한 문자열 값을 추적합니다. 객체의 경우 `ngValue` 입력 바인딩을 사용합니다. <small>`Write-Only`</small>

<br>
<br>
<br>
<br>

---

<br>

# # See also - `SelectControlValueAccessor`

<br>

<small> URL : https://angular.io/api/forms/SelectControlValueAccessor</small>

<br>
<br>

`ControlValueAccessor`는 선택 제어 값을 작성(writing select control values)하고, 선택 제어 변경을 수신( listening to select control changes)합니다.

값 접근자(value accessor)는 `FormControlDirectiv`e, `FormControlName` 및 `NgModel` 지시문에서 사용됩니다.

<br>
<br>
<br>

## # `SelectControlValueAccessor` - Selectors

<br>

- ### `select:not([multiple])[formControlName]`

- ### `select:not([multiple])[formControl]`

- ### `select:not([multiple])[ngModel]`

<br>
<br>
<br>
<br>

## # Description

<br>

반응형으로 선택 컨트롤(select controls)을 사용한다. 다음 예제는 반응 형으로 선택 컨트롤을 사용하는 방법을 보여줍니다.

<br>

```
import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'example-app',
  template: `
    <form [formGroup]="form">
      <select formControlName="state">
        <option *ngFor="let state of states" [ngValue]="state">
          {{ state.abbrev }}
        </option>
      </select>
    </form>

     <p>Form value: {{ form.value | json }}</p>
     <!-- {state: {name: 'New York', abbrev: 'NY'} } -->
  `,
})
export class ReactiveSelectComp {
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];

  form = new FormGroup({
    state: new FormControl(this.states[3]),
  });
}
```
