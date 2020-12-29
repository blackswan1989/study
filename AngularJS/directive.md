# Directives

<br>

## # ng-if (ngIf)

<br>

&nbsp;&nbsp; URL: https://docs.angularjs.org/api/ng/directive/ngIf

<br>

ngIf 지시문(Directives)은 `{expression}`을 기반으로 DOM 트리의 일부를 제거하거나 재생성합니다. ngIf에 할당 된 표현식이 `false` 값으로 평가되면 요소가 DOM에서 제거되고, 그렇지 않으면 요소의 복제본이 DOM에 다시 삽입됩니다.

ngIf는 ngIf가 css의 속성(property) `display`을 통해 가시성(visibility)을 변경하지 않고 DOM에서 요소를 완전히 제거하고 다시 생성한다는 점에서 `ngShow` 및 `ngHide`와 다릅니다. 이 차이가 중요한 일반적인 경우는 `:first-child` 또는 `:last-child`같은 pseudo-class와 DOM 내의 요소 위치(position)에 의존하는 CSS 선택기를 사용할 때입니다.

ngIf를 사용하여 요소를 제거하면 해당 범위가 파괴되고 요소가 복원될 때 새 범위가 생성됩니다. ngIf 내에서 생성 된 범위는 프로토 타입 상속을 사용하여 부모 범위에서 상속됩니다. 이것이 중요한 이유는 부모 범위에 정의 된 자바스크립트 원문(primitive)에 바인딩하기 위해 ngIf 내에서 ngModel이 사용되는 경우입니다. 이 경우 자식 범위 내에서 변수를 수정하면 부모 범위의 값이 재 정의(숨기기) 됩니다.

그리고 ngIf는 컴파일된 상태를 사용하여 요소를 다시 만듭니다. 이 동작의 예는 jQuery의 `.addClass()` 메서드와 같은 것을 사용하여 컴파일된 후 요소의 클래스 속성이 직접 수정되고 나중에 요소가 제거되는 경우입니다. ngIf가 요소를 다시 만들면 원래 컴파일된 상태가 요소를 다시 생성하는 데 사용되기 때문에 추가 된 클래스가 손실됩니다. 또한 ngAnimate 모듈을 통해 애니메이션을 제공하여 진입 및 퇴장 효과를 애니메이션 할 수 있습니다.

<br>

- **Usage :**

  ```
  <ANY
    ng-if="expression">
  ...
  </ANY>
  ```

<br>

- **Arguments : `ng-if`**

  표현식이 거짓(falsy)이면 요소가 DOM 트리에서 제거됩니다. 표현식이 진실(truthy)이라면 컴파일된 요소의 복사본이 DOM 트리에 추가됩니다.

<br>

- **Example :**

  ```
  // index.html

  <label>Click me:
    <input type="checkbox" ng-model="checked" ng-init="checked=true" /> // 체크되면 true임을 정의
  </label><br/>

  Show when checked:
  <span ng-if="checked" class="animate-if"> // 체크박스가 선책되면 true가 되고 class가 붙게 된다.
    This is removed when the checkbox is unchecked.
  </span>
  ```

  ```
  // animations.css

  .animate-if {
    background:white;
    border:1px solid black;
    padding:10px;
  }

  .animate-if.ng-enter, .animate-if.ng-leave {
    transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s;
  }

  .animate-if.ng-enter,
  .animate-if.ng-leave.ng-leave-active {
    opacity:0;
  }

  .animate-if.ng-leave,
  .animate-if.ng-enter.ng-enter-active {
    opacity:1;
  }

  // css를 주석처리하고 콘솔창의 element를 비교해보면 클래스들의 추가와 손실들을 확인할 수 있다.
  ```

  <small>url: https://plnkr.co/edit/rn3SI4ssWhnVNtOW?preview</small>

<br>
<br>
<br>
<br>

## # ng-class (ngClass)

<br>

&nbsp;&nbsp; URL: https://docs.angularjs.org/api/ng/directive/ngClass

<br>

ngClass 지시문(Directives)을 사용하면 추가할 모든 클래스를 나타내는 표현식을 데이터 바인딩하여 HTML 요소에 CSS 클래스를 동적으로 설정할 수 있습니다. 이 지시문은 표현식이 다음 세 가지 유형 중 어떤 것으로 평가하느냐에 따라 세 가지 방식으로 작동합니다.

1. 표현식이 문자열로 평가되는 경우 문자열은 하나 이상의 공백으로 구분된 클래스 이름이어야 합니다.

2. 표현식이 객체로 평가되면 실제 값을 가진 객체의 각 '키-값' 쌍에 대해 해당 키가 클래스 이름으로 사용됩니다.

3. 표현식이 배열로 평가되는 경우 배열의 각 요소는 '1번 유형'과 같은 문자열이거나 '2번 유형'와 같은 객체여야 합니다.  
   즉, 배열에서 문자열과 객체를 함께 혼합하여 표시되는 CSS 클래스를 보다 잘 제어할 수 있습니다.

<br>

특정 클래스가 이미 설정된 경우 지시문은 중복 클래스를 추가하지 않습니다. 표현식이 변경되면 이전에 추가 된 클래스가 제거되고 새로운 클래스만 추가됩니다. 그리고 알려진 이슈로 동일한 요소에 `ngClass` 지시문을 사용하는 경우 `class` 속성 값에 interpolation을 사용하면 안됩니다.

<br>

- **Usage :**

  ```
  // as attribute:
  <ANY
    ng-class="expression">
  ...
  </ANY>


  // as CSS class:
  <ANY class="ng-class: expression;"> ... </ANY>
  ```

<br>

- **Arguments : `ng-class`**

  계산할 식입니다. 평가 결과는 공백으로 구분된 클래스 이름을 나타내는 문자열, 배열 또는 클래스 이름을 부울 값으로 매핑할 수 있습니다.  
   맵의 경우 값이 truth인 속성의 이름이 요소에 css 클래스로 추가됩니다.

<br>

- **Example :**

  ```
  <body ng-app="">
    <p ng-class="{strike: deleted, bold: important, 'has-error': error}">Map Syntax Example</p>
    <label>
      <input type="checkbox" ng-model="deleted">
      deleted (apply "strike" class)
    </label><br>
    <label>
      <input type="checkbox" ng-model="important">
      important (apply "bold" class)
    </label><br>
    <label>
      <input type="checkbox" ng-model="error">
      error (apply "has-error" class)
    </label>
    <hr>

    <p ng-class="style">Using String Syntax</p>
    <input type="text" ng-model="style"
          placeholder="Type: bold strike red" aria-label="Type: bold strike red">
    <hr>

    <p ng-class="[style1, style2, style3]">Using Array Syntax</p>
    <input ng-model="style1"
          placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red"><br>
    <input ng-model="style2"
          placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red 2"><br>
    <input ng-model="style3"
          placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red 3"><br>
    <hr>

    <p ng-class="[style4, {orange: warning}]">Using Array and Map Syntax</p>
    <input ng-model="style4" placeholder="Type: bold, strike" aria-label="Type: bold, strike"><br>
    <label><input type="checkbox" ng-model="warning"> warning (apply "orange" class)</label>
  </body>
  ```

  <small>url : https://plnkr.co/edit/hoCFCMoAQO2YSYA4</small>

<br>
<br>
<br>
<br>

## # ng-Checked (ngChecked)

<br>

- ngChecked 내부의 표현식이 `true`인 경우 요소에 체크 된 속성을 설정해준다.

- 지시문은 예상치 못한 동작으로 이어질 수 있으므로 ngModel과 함께 사용해서는 안된다.

<br>

- **Example :**

  ```
  //html
  <label>Check me to check both:
    <input type="checkbox" ng-model="leader">
  </label><br/>
  <input id="checkFollower" type="checkbox" ng-checked="leader" aria-label="Follower input">


  //js
  it('should check both checkBoxes', function() {
    expect(element(by.id('checkFollower')).getAttribute('checked')).toBeFalsy();
    element(by.model('leader')).click();
    expect(element(by.id('checkFollower')).getAttribute('checked')).toBeTruthy();
  });
  ```
