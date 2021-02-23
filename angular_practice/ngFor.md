**url: https://angular.io/api/common/NgForOf#ngforof**

<br>
<br>

# # NgForOf

<br>
<br>

컬렉션의 각 항목에 대한 템플릿을 렌더링하는 구조적 지시문입니다. 지시문은 복제 된 템플릿의 부모가되는 요소에 배치됩니다.

<br>
<br>

### # Selectors

- [ngFor]
- [ngForOf]

<br>
<br>

## # Properties

<br>
<br>
<br>
<br>

## # Description

<br>

ngForOf 지시문은 일반적으로 \*ngFor의 축약 형식으로 사용됩니다. 이 양식에서 각 반복에 대해 렌더링 될 템플릿은 지시문을 포함하는 앵커 요소(anchor element)의 내용입니다.

<br>

다음 예는 `<li>` 요소에 포함 된 일부 옵션이있는 속기 구문을 보여줍니다.

```
<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>
```

<br>

속기 형식은 `<ng-template>` 요소에서 ngForOf 선택기를 사용하는 긴 형식으로 확장됩니다. `<ng-template>` 요소의 내용은 약식 지시문을 보유한 `<li>` 요소입니다. 다음은 약식 예제의 확장 버전입니다.

```
<ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
  <li>...</li>
</ng-template>
```

Angular는 템플릿을 컴파일 할 때 속기 구문을 자동으로 확장합니다. 포함 된 각 뷰의 컨텍스트는 어휘 위치에 따라 현재 구성 요소 컨텍스트에 논리적으로 병합됩니다.

<br>
<br>
<br>
<br>

## # Local variables

<br>

NgForOf는 지역 변수에 별칭을 지정할 수있는 내 보낸 값을 제공합니다. 예를 들면 다음 예제와 같습니다.

```
<li *ngFor="let user of users; index as i; first as isFirst">
  {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
</li>
```

내보낸 다음 값은 로컬 변수에 별칭을 지정할 수 있습니다.

<br>

- `$implicit : T`: iterable(ngForOf)의 개별 항목 값.

- `ngForOf: NgIterable <T>`: 반복 가능한 식의 값입니다. 표현식이 속성 액세스보다 더 복잡한 경우 (예: 비동기 파이프 (userStreams | async)를 사용할 때)에 유용합니다.

- `index : number` : iterable에서 현재 항목의 인덱스입니다.

- `count : number` : iterable의 길이.

- `first : boolean` : 항목이 iterable의 첫 번째 항목이면 True입니다.

- `last : boolean` : 항목이 iterable의 마지막 항목이면 True입니다.

- `even : boolean` : 항목에 iterable에 짝수 인덱스가있는 경우 True입니다.

- `odd : boolean` : 항목이 iterable에 홀수 인덱스를 가지고있는 경우 True입니다.
