<br>

# Data binding

<br>

URL : https://poiemaweb.com/angular-component-data-binding

<br>

---

<br>

# 1. 데이터 바인딩(Data binding)이란?

<br>

구조화된 웹 애플리케이션을 구축하기 위해서는 뷰와 모델의 분리가 필수적이다. 하지만 분리된 뷰와 모델은 유기적으로 동작하여야 한다. 데이터 바인딩은 이러한 모순을 해결해준다.

데이터 바인딩은 뷰와 모델을 하나로 연결하는 것을 의미한다. Angular의 데이터 바인딩은 템플릿(View)과 컴포넌트 클래스의 데이터(Model)를 하나로 묶어 유기적으로 동작하게 하는 것을 말한다. 이는 템플릿의 정적 HTML에 컴포넌트의 동적 데이터를 하나로 묶어 브라우저에 표시할 완성된 뷰를 만들기 위함이다.

```
//jQuery에 의한 DOM 조작 예시

$(function() {
  var title = 'app works!';
  $('h1').text(title);        // DOM: <h1></h1>
});
```

위의 예제의 경우, DOM에 접근하고 조작하는 코드를 작성해야 한다. 이를 위해 자바스크립트는 DOM의 구조를 파악하고 있어야 하며, 이 구조가 변경되면 자바스크립트 로직도 변경되어야 한다. 예를 들어 h1 요소가 p 요소로 변경되면 자바스크립트 로직도 변경이 필요하다.

기존의 웹 애플리케이션은 자바스크립트 DOM API를 사용하여 DOM을 직접 조작(Manipulation)하는 방식이기 때문에 뷰와 모델 간의 관계를 느슨하게 결합하기 어려운 구조를 갖는다. 이와 같은 구조 상 문제로 뷰가 변경되면 로직도 변경될 가능성이 매우 높다.

하지만 Angular는 DOM에 직접 접근하지 않고 템플릿과 컴포넌트 클래스의 상호 관계를 선언하는 방식(선언형 프로그래밍: Declarative programming)으로 뷰와 모델의 관계를 관리한다. 이때 사용되는 것이 "데이터 바인딩"이며 이를 통해 템플릿과 컴포넌트 클래스는 연결된다. 데이터 바인딩은 템플릿 문법으로 기술된다. HTML과 템플릿 문법으로 기술된 템플릿은 JIT 또는 AOT 컴파일러에 의해 브라우저가 이해할 수 있는 자바스크립트로 컴파일된다.

```
//Angular의 데이터 바인딩에 의한 템플릿과 컴포넌트 클래스의 연결

export class AppComponent {
  title = 'app works!';         // template: <h1>{{ title }}</h1>
}
```

위의 예제의 경우, 템플릿에서 직접 컴포넌트 클래스의 프로퍼티를 참조하기 때문에 DOM에 접근하고 조작하는 코드를 작성할 필요가 없다. 따라서 컴포넌트 클래스는 DOM의 구조를 파악하고 있을 필요가 없으며 템플릿이 변경되어도 컴포넌트 클래스를 변경할 필요가 없다. 예를 들어 h1 요소가 p 요소로 변경되어도 컴포넌트 클래스는 변경이 필요 없다.

<br>
<br>
<br>
<br>
<br>

# 2. 데이터 바인딩(Data binding)

<br>

Angular는 단방향 데이터 바인딩(One-way data binding)과 양방향 데이터 바인딩(Two-way data binding)을 지원한다. 기존 웹 프로그래밍에서 사용하는 DOM 조작 방식보다 간편하게 데이터를 가져와서 뷰에 표현할 수 있다.

Angular는 아래와 같이 7가지 데이터 바인딩을 제공한다.

<br>

![data-binding](https://user-images.githubusercontent.com/67410919/103861760-4a66cb80-5101-11eb-8237-10d209bdfc89.PNG)

<br>
<br>
<br>
<br>

## 2.1 인터폴레이션(Interpolation)

<br>

표현식을 두 개의 중괄호로 열고닫은 형식(`{{ expression }}`)을 인터폴레이션이라 한다. 인터폴레이션은 단방향 데이터 바인딩에 사용되는 템플릿 문법으로 표현식의 평가 결과를 문자열로 변환하여 템플릿에 바인딩한다.

<br>

- **Example:**

  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `
      <p>name: {{ name }}</p>       // name: Jane
      <p>age: {{ age }}</p>         // age: 20
      <p>admin: {{ admin }}</p>       // admin: true
      <p>address: {{ address.city }} {{ address.country }}</p>      // address: Seoul Korea
      <p>gender: {{ gender }}</p>         // gender:
      <p>sayHi(): {{ sayHi() }}</p>       // sayHi(): Hi! my name is Jane.
      <p>age * 10: {{ age * 10 }}</p>     // age * 10: 200
      <p>age > 10: {{ age > 10 }}</p>     // age > 10: true
      <p>'stirng': {{ 'stirng' }}</p>     // 'stirng': stirng
    `
  })
  export class AppComponent {
    name = 'Jane';
    age = 20;
    admin = true;
    address = {
      city: 'Seoul',
      country: 'Korea'
    };

    sayHi() {
      return `Hi! my name is ${ this.name }.`;
    }
  }
  ```

  컴포넌트 클래스의 프로퍼티가 문자열이 아닌 경우 문자열로 변환되며 존재하지 않는 프로퍼티에 접근하는 경우(위 예제의 gender) 에러 발생 없이 아무것도 출력하지 않는다.

<br>
<br>
<br>
<br>

## 2.2 프로퍼티 바인딩(Property binding)

<br>

프로퍼티 바인딩은 컴포넌트 클래스의 프로퍼티와 템플릿 간의 단방향 데이터 바인딩에 사용되는 템플릿 문법으로 표현식의 평가 결과를 HTML 요소의 DOM 프로퍼티에 바인딩한다.

<br>

- **Example:**

  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `
      <!-- input 요소의 value 프로퍼티에 컴포넌트 클래스의 name 프로퍼티 값을 프로퍼티 바인딩 -->
      <input type="text" [value]="name">

      <!-- p 요소의 innerHTML 프로퍼티에 컴포넌트 클래스의 contents 프로퍼티 값을 프로퍼티 바인딩 -->
      <p [innerHTML]="contents"></p>

      <!-- img 요소의 src 프로퍼티에 컴포넌트 클래스의 imageUrl 프로퍼티 값을 프로퍼티 바인딩 -->
      <img [src]="imageUrl"><br>

      <!-- button 요소의 disabled 프로퍼티에 컴포넌트 클래스의 isDisabled 프로퍼티 값을 프로퍼티 바인딩 -->
      <button [disabled]="isDisabled">disabled button</button>
    `
  })
  export class AppComponent {
    name = 'ungmo2';
    contents = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
    imageUrl = 'https://via.placeholder.com/350x150';
    isDisabled = true;
  }
  ```

  인터폴레이션은 템플릿의 어디에서도 사용할 수 있다. 인터폴레이션은 순수한 문자열을 반환하므로 HTML 콘텐츠로 사용할 수도 있고 HTML 어트리뷰트의 값으로 사용할 수도 있다.

<br>

Angular는 뷰를 렌더링하기 이전에 인터폴레이션을 프로퍼티 바인딩으로 변환한다. 사실 인터폴레이션은 프로퍼티 바인딩의 Syntactic sugar인 것이다. `<p>{{ contents }}</p>`는 `<p [innerHTML]="contents"></p>` 코드와 동일하게 동작한다.

프로퍼티 바인딩에는 객체를 포함한 모든 값을 사용할 수 있다. DOM 노드 객체의 프로퍼티에는 객체를 포함한 모든 값을 할당할 수 있기 때문이다. 이 특성을 이용하여 부모 컴포넌트에서 자식 컴포넌트로 값을 전달하는 경우 프로퍼티 바인딩을 사용한다.

<br>
<br>
<br>
<br>

## 2.3 어트리뷰트 바인딩(Attribute binding)

https://poiemaweb.com/angular-component-data-binding#33-%EC%96%B4%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%8A%B8-%EB%B0%94%EC%9D%B8%EB%94%A9attribute-binding

<br>

어트리뷰트 바인딩은 컴포넌트 클래스의 프로퍼티와 템플릿 간의 단방향 데이터 바인딩에 사용되는 템플릿 문법으로 표현식의 평가 결과를 HTML 어트리뷰트에 바인딩한다.

`<element [attr.attribute-name]="expression">...</element>`

<br>

앞에서 살펴본 프로퍼티 바인딩과 차이점을 이해하기 위해서 HTML 어트리뷰트(attribute)와 DOM 프로퍼티(property)에 대해서 알아보도록 하자. 바인딩이 동작하는 방식을 이해하기 위해서는 HTML의 어트리뷰트와 프로퍼티의 차이를 파악하는 것이 중요하다.

Attribute와 Property는 모두 '속성'으로 변역되어 같은 것으로 오해할 수 있으나 이들은 서로 다른 것이다. 어트리뷰트는 HTML 문서에 존재하는 것으로 어트리뷰트의 값은 변하지 않는다. 프로퍼티는 DOM 노드 객체에 있는 것으로 동적으로 변한다.

브라우저는 HTML 문서를 파싱하여 DOM 트리로 변환하고 메모리에 적재한다. 이때 HTML 요소는 DOM 노드 객체로, HTML 어트리뷰트는 DOM 노드 객체의 프로퍼티로 변환된다.

<br>
<br>

예를 들어 아래의 input 요소는 3개의 어트리뷰트를 가지고 있다.

`<input id="user" type="text" value="ungmo2">`

<br>

브라우저가 위의 코드를 파싱하면 DOM 노드 객체 HTMLInputElement가 생성되고 이 객체는 다양한 프로퍼티를 소유한다. input 요소의 모든 어트리뷰트는 HTMLInputElement 객체의 attributes 프로퍼티로 변환되고 이것은 getAttribute 메소드로 취득 가능하다.

`document.getElementById('user').getAttribute('value'); // ungmo2`

<br>
<br>

DOM 노드 객체의 attributes 프로퍼티는 HTML 어트리뷰트의 값을 가지며 그 값은 결코 변하지 않는다. HTML 어트리뷰트는 원래 변하지 않는 초기 기본값을 나타내기 때문이다.

위 input 요소의 value 어트리뷰트는 input 요소의 초기 기본값을 설정한 것으로 사용자의 입력에 의해 상태가 변경된다 하더라도 value 어트리뷰트의 값은 변경되지 않는다. 즉, DOM 노드 객체의 attributes 프로퍼티 값 또한 변경되지 않는다.

<br>
<br>

하지만 DOM은 상태(예를 들어 input 요소에 값을 입력한 상태 또는 checkbox 요소를 체크한 상태)를 가지고 있으며 이 상태는 변화하는 살아있는 것이다. 따라서 DOM 노드 객체는 상태 변화를 관리하기 위한 프로퍼티를 갖는다.

예를 들어 input 요소는 입력값의 상태를 관리하기 위해 value 프로퍼티를 갖는다. 이 value 프로퍼티는 HTML 어트리뷰트의 고정된 값을 관리하는 attributes 프로퍼티와는 달리 상태 변화에 반응한다.

```
// HTMLInputElement.attributes.value의 값을 취득한다. 결과는 언제나 동일하다.
document.getElementById('user').getAttribute('value'); // ungmo2

// HTMLInputElement.value의 값을 취득한다. 결과는 요소의 상태에 따라 동적으로 변경된다.
document.getElementById('user').value;
```

<br>
<br>

주의하여야 할 것은 HTML 어트리뷰트와 상태 변화를 관리하기 위한 프로퍼티가 언제나 1:1로 매핑되는 것은 아니라는 것이다. 예를 들어 살펴보자.

<br>

- id 어트리뷰트와 id 프로퍼티는 1:1 매핑한다.

- class 어트리뷰트는 classList 프로퍼티로 변환된다.

- td 요소의 colspan 어트리뷰트의 경우, 매핑하는 프로퍼티가 존재하지 않는다.

- textContent 프로퍼티의 경우, 대응하는 어트리뷰트가 존재하지 않는다.

- input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 매핑하지만 서로 다르게 동작한다.

<br>

id 어트리뷰트는 id 프로퍼티와 1:1 매핑하므로 DOM 노드 객체 HTMLInputElement에는 id 프로퍼티가 생성되고 id 어트리뷰트의 값 ‘user’가 할당된다. 하지만 value 어트리뷰트는 value 프로퍼티와 1:1 매핑하지만 서로 다르게 동작한다.

DOM 노드 객체에 value 프로퍼티가 생성되고 value 어트리뷰트의 값 ‘ungmo2’가 할당된다. 여기까지는 1:1 매핑하는 id 어트리뷰트와 동일하지만 사용자에 의해 input 요소에 새로운 값이 입력되면 다르게 동작하기 시작한다.

만약 사용자에 의해 “lee”가 입력되면 DOM 노드 객체의 value 프로퍼티는 “lee”로 변경된다. 하지만 value 어트리뷰트는 초기 기본값 “ungmo2”인 상태에서 변경되지 않는다. 이는 HTML 요소가 DOM 노드 객체로 변환된 이후에 HTML 요소의 어트리뷰트는 변하지 않기 때문이다.

하지만 DOM 프로퍼티는 언제든지 바뀔 수 있다. 즉, value의 경우, 어트리뷰트는 DOM 프로퍼티의 초기 기본값을 의미하며 DOM 프로퍼티는 현재의 상태 값을 의미한다.

<br>

- **Example:**

  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `
      <!-- 프로퍼티 바인딩 -->
      <input id="user" type="text" [value]="name">        // Hello
      <!-- 어트리뷰트 바인딩 -->
      <input id="user" type="text" [attr.value]="name">   // Hello
    `
  })
  export class AppComponent {
    name = 'Hello';
  }
  ```

  - 프로퍼티 바인딩은 DOM 노드 객체의 프로퍼티에 컴포넌트 클래스의 프로퍼티 값을 바인딩해준다.

  - 어트리뷰트 바인딩은 HTML 요소의 어트리뷰트(DOM 노드 객체의 attributes 프로퍼티)에 컴포넌트 클래스의 프로퍼티 값을 바인딩한다.

  ```
  // 프로퍼티 바인딩
  document.getElementById('user').value = 'ungmo2';

  // 어트리뷰트 바인딩
  document.getElementById('user').setAttribute('value', 'ungmo2');
  ```

  따라서 위 컴포넌트는 아래와 같이 변환될 것이다.

  ```
  <!-- 프로퍼티 바인딩의 변환 결과 -->
  <input id="user" type="text">

  <!-- 어트리뷰트 바인딩의 변환 결과 -->
  <input id="user" type="text" value="ungmo2">
  ```

<br>

- **Example: td 요소의 colspan 어트리뷰트**

  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `
      <table>
        <tr>
          <!-- colspan 프로퍼티는 존재하지 않기 때문에 어튜리뷰트 바인딩을 사용한다. -->
          <td [attr.colspan]="length">A + B</td>    // [X] <td [colspan]="length">A + B</td>
        </tr>
        <tr>
          <td>C</td><td>D</td>
        </tr>
      </table>
    `,
    styles: [`
      table, td {
        width: 200px;
        border: 1px solid black;
        text-align: center;
      }
    `]
  })
  export class AppComponent {
    length = 2;
  }
  ```

  td 요소의 colspan 어트리뷰트의 경우, 매핑하는 프로퍼티가 존재하지 않는다. 따라서 프로퍼티 바인딩 대신 어트리뷰트 바인딩을 사용한다.

  이와 같이 DOM의 프로퍼티는 HTML 요소의 어트리뷰트와는 다르게 동작하기 때문에 프로퍼티 바인딩과 어트리뷰트 바인딩은 구분되어 사용하여야 한다.

<br>
<br>
<br>
<br>

## 2.4 클래스 바인딩(Class binding)

<br>

클래스 바인딩을 사용하면 HTML 요소의 class 어트리뷰트에 클래스를 추가 또는 삭제할 수 있다. 클래스 바인딩은 아래와 같이 두 가지의 방식으로 사용할 수 있다.

<br>

- `<element [class.class-name]="booleanExpression">...</element>`

- `<element [class]="class-name-list">...</element>`

<br>
<br>

### 1) 단항 클래스 바인딩

<br>

클래스 바인딩의 좌변에는 class 뒤에 HTML 요소의 class 어트리뷰트에 반영할 클래스 이름을 지정하고, 우변에는 참이나 거짓으로 평가될 수 있는 표현식을 바인딩한다.

<br>

- `<div [class.alert]="isError">...</div>`

  위 예제의 경우, 우변의 표현식 isError의 값이 참이면 좌변의 class 뒤에 지정한 클래스 alert을 class 어트리뷰트에 추가하고, isError의 값이 거짓이면 class 어트리뷰트에서 삭제한다.

<br>

- `<div class="rounded" [class.alert]="isError">...</div>`와 같이 다른 클래스가 적용되어 있는 경우

  isError의 값이 참일때 : `<div class="rounded" [class.alert]="isError">...</div>`

  isError의 값이 거짓일때 : `<div class="rounded">...</div>`

<br>

- `<div class="alert" [class.alert]="isError">...</div>`와 같이 이미 alert 클래스가 적용되어 있는 경우

  isError의 값이 참일때 : `<div class="alert">...</div>`

  isError의 값이 거짓일때 : `<div>...</div>`

<br>
<br>

### 2) 다항 클래스 바인딩

<br>

클래스 바인딩의 좌변에는 class를 지정하고 우변에는 HTML 요소의 class 어트리뷰트에 반영할 클래스의 리스트(공백으로 구분된 클래스 리스트의 문자열)를 바인딩한다.

마치 DOM 객체의 class 프로퍼티에 프로퍼티 바인딩을 하는 것과 유사하지만 DOM 객체에는 class 프로퍼티가 존재하지 않는다. 따라서 다항 클래스 바인딩은 프로퍼티 바인딩이 아니며 단항 클래스 바인딩와 마찬가지로 HTML 요소의 어트리뷰트를 조작한다.

<br>

- `<div [class]="my-classes">...</div>`

  다항 클래스 바인딩은 우변의 표현식 `my-classes`의 값을 `class` 어트리뷰트에 반영한다.

  위 예제의 경우, `my-classes`의 값이 `‘my-class1 my-class2’`이면 `<div class="my-class1 my-class2">...</div>`로 변환 된다.

<br>

- `<div class="my-class1 my-class2" [class]="my-classes">...</div>`와 같이 이미 클래스가 적용되어 있는 경우

  `my-classes`의 값이 `‘my-class3 my-class4’`라면 `<div class="my-class3 my-class4">...</div>`와 같이 변환된다.

<br>

이와 같이 HTML 요소의 class 어트리뷰트에 의해 이미 클래스가 지정되어 있을 때 한 개의 클래스를 대상으로 하는 단항 클래스 바인딩(`[class.class-name]`)은 class 어트리뷰트를 병합(merge)하여 새로운 class 어트리뷰트를 작성한다.

하지만 복수의 클래스를 대상으로 하는 다항 클래스 바인딩(`[class]`)은 기존의 class 어트리뷰트를 삭제하고 바인딩된 클래스의 리스트를 기준으로 새로운 class 어트리뷰트를 작성한다.

다시 말해 클래스 바인딩은 기존 class 어트리뷰트보다 우선한다. 따라서 기존 class 어트리뷰트는 클래스 바인딩에 의해 리셋된다. 이때 클래스 바인딩의 위치는 관계없다.

<br>

- **Example:**

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- 조건의 의한 클래스 바인딩: 우변의 표현식이 true이면 클래스를 추가한다 -->
    <div [class.text-large]="isLarge">text-large</div>

    <!-- 조건의 의한 클래스 바인딩 : 우변의 표현식이 false이면 클래스를 삭제한다 -->
    <div class="text-small color-red" [class.color-red]="isRed">text-small</div>

    <!-- 여러 개의 클래스를 한번에 지정할 수 있다 -->
    <div [class]="myClasses">text-large color-red</div>

    <!-- 클래스 바인딩은 기존 클래스 어트리뷰트보다 우선한다. 따라서 기존 클래스 어트리뷰트는
         클래스 바인딩에 의해 reset된다. 클래스 바인딩의 위치는 관계없다. -->
    <div class="text-small color-blue" [class]="myClasses">text-large color-red</div>
  `,
  styles: [`
    .text-small { font-size: 18px;}
    .text-large { font-size: 36px;}
    .color-blue { color: blue;}
    .color-red { color: red;}
  `]
})
export class AppComponent {
  isLarge = true;
  isRed = false;
  myClasses = 'text-large color-red';
}
```

클래스 바인딩은 주로 하나의 클래스를 조건에 의해 추가 또는 삭제하는 용도로 사용한다. 여러 개의 클래스를 지정할 때도 클래스 바인딩을 사용할 수 있으나 `ngClass` 디렉티브를 사용하면 좀더 세밀한 제어가 가능하다.

<br>
<br>
<br>
<br>

## 2.5 이벤트 바인딩(Event binding)

<br>

`<element (event)="statement">...</element>`

이벤트 바인딩은 뷰의 상태 변화(버튼 클릭, 체크박스 체크, input에 텍스트 입력 등)에 의해 이벤트가 발생하면 이벤트 핸들러를 호출하는 것을 말한다.

지금까지 살펴본 데이터 바인딩은 모두 컴포넌트 클래스에서 템플릿으로 데이터가 이동했지만 이벤트 바인딩은 템플릿에서 컴포넌트 클래스로 데이터가 이동한다.

<br>

- **Example:**

  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `
      <!-- (1) -->
      <input type="text" [value]="name" (input)="setName($event)">

      <!-- (2) -->
      <button (click)="clearName()">clear</button>

      <!-- (3) -->
      <p>name: {{ name }}</p>
    `
  })
  export class AppComponent {
    name = '';

    setName(event) {
      console.log(event);
      // event.target.value에는 사용자 입력 텍스트가 담겨있다.
      this.name = event.target.value;
    }

    clearName() {
      this.name = '';
    }
  }
  ```

  - 사용자의 텍스트 입력에 의해 input 이벤트가 발생하면 이벤트 바인딩을 통하여 이벤트 핸들러 `setName`을 호출한다. 이때 이벤트 정보를 담고 있는 DOM 이벤트 객체 `$event`를 이벤트 핸들러에 전달할 수 있다. $event 객체는 DOM 이벤트의 종류에 의해 타입(KeyboardEvent, InputEvent, MouseEvent 등)이 결정된다. Angular는 표준 DOM 이벤트를 사용하기 때문에 $event를 통해 브라우저의 Event 객체의 프로퍼티나 메소드에 자유롭게 접근할 수 있다. 이벤트 핸들러 setName은 input 이벤트를 발생시킨 input 요소(event.target)의 value 프로퍼티(사용자 입력 텍스트가 담겨있다)를 $event로 부터 추출하여 name 프로퍼티에 할당한다.

  - 버튼이 클릭되면 click 이벤트가 발생하고 이벤트 바인딩을 통하여 이벤트 핸들러 clearName을 호출한다. clearName은 name 프로퍼티에 빈문자열을 할당한다. 그리고 name 프로퍼티는 프로퍼티 바인딩에 의해 다시 input 요소에 바인딩된다.

  - name 프로퍼티는 인터폴레이션에 의해 템플릿에 바인딩된다.

<br>
<br>
<br>
<br>

## 2.6 양방향 데이터 바인딩(Two-way data binding)

<br>

`<element [(ngModel)]="property">...</element>`

양방향 데이터 바인딩은 뷰와 컴포넌트 클래스의 상태 변화를 상호 반영하는 것을 말한다. 즉, 뷰의 상태가 변화하면 컴포넌트 클래스의 상태도 변화하고 그 반대로 컴포넌트 클래스의 상태가 변화하면 뷰의 상태도 변화하는 것이다.

ngModel 디렉티브를 이벤트 바인딩(( ))과 프로퍼티 바인딩([ ]) 형식으로 기술한 후 우변에 뷰와 컴포넌트 클래스가 공유할 프로퍼티를 기술한다. ngModel 디렉티브를 사용하기 위해서는 FormsModule을 모듈에 등록하여야 한다.

<br>

- **Example:**

  ```
  // src/app/app.module.ts

  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';   // FormsModule 임포트

  import { AppComponent } from './app.component';

  @NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule],    // FormsModule 등록
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  ```

  컴포넌트 클래스의 name 프로퍼티는 템플릿의 input 요소와 양방향으로 바인딩되어 있다. 즉, input 요소의 value 프로퍼티가 변화하면 컴포넌트 클래스의 name 프로퍼티도 동일한 값으로 변화하고 반대로 컴포넌트 클래스의 name 프로퍼티가 변화하면 input 요소의 value 프로퍼티도 동일한 값으로 변화한다.

  사실 Angular는 양방향 바인딩을 지원하지 않는다. [( )](이것을 Banana in a box라고 부른다)에서 추측할 수 있듯이 양방향 바인딩은 이벤트 바인딩과 프로퍼티 바인딩의 축약 표현(Shorthand syntax)일 뿐이다. 즉, 양방향 바인딩의 실제 동작은 이벤트 바인딩과 프로퍼티 바인딩의 조합으로 이루어진다.
