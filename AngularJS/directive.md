# Directives

<br>

## # ng-if (ngIf)

<br>

ngIf 지시어는 `{expression}`을 기반으로 DOM 트리의 일부를 제거하거나 재생성합니다.  
ngIf에 할당 된 표현식이 `false` 값으로 평가되면 요소가 DOM에서 제거되고, 그렇지 않으면 요소의 복제본이 DOM에 다시 삽입됩니다.

ngIf는 ngIf가 css의 속성(property) `display`을 통해 가시성(visibility)을 변경하지 않고  
DOM에서 요소를 완전히 제거하고 다시 생성한다는 점에서 `ngShow` 및 `ngHide`와 다릅니다.

이 차이가 중요한 일반적인 경우는 `:first-child` 또는 `:last-child`같은 pseudo-class와  
DOM 내의 요소 위치(position)에 의존하는 CSS 선택기를 사용할 때입니다.

ngIf를 사용하여 요소를 제거하면 해당 범위가 파괴되고 요소가 복원될 때 새 범위가 생성됩니다.  
ngIf 내에서 생성 된 범위는 프로토 타입 상속을 사용하여 부모 범위에서 상속됩니다.  
이것의 중요한 의미는 부모 범위에 정의 된 자바스크립트 원문(primitive)에 바인딩하기 위해 ngIf 내에서 ngModel이 사용되는 경우입니다.  
이 경우 자식 범위 내에서 변수를 수정하면 부모 범위의 값이 재 정의(숨기기) 됩니다.

또한 ngIf는 컴파일된 상태를 사용하여 요소를 다시 만듭니다.  
이 동작의 예는 jQuery의 `.addClass()` 메서드와 같은 것을 사용하여  
컴파일된 후 요소의 클래스 속성이 직접 수정되고 나중에 요소가 제거되는 경우입니다.  
ngIf가 요소를 다시 만들면 원래 컴파일된 상태가 요소를 다시 생성하는 데 사용되기 때문에 추가 된 클래스가 손실됩니다.  
또한 ngAnimate 모듈을 통해 애니메이션을 제공하여 진입 및 퇴장 효과를 애니메이션 할 수 있습니다.

<br>

- **Usage :**

  ```
  <ANY
    ng-if="expression">
  ...
  </ANY>
  ```

<br>

- **Arguments :**

  `ng-if` : 표현식이 거짓이면 요소가 DOM 트리에서 제거됩니다. 사실이라면 컴파일된 요소의 복사본이 DOM 트리에 추가됩니다.

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
