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

# 2. 데이터 바인딩(Data binding)

<br>

Angular는 단방향 데이터 바인딩(One-way data binding)과 양방향 데이터 바인딩(Two-way data binding)을 지원한다. 기존 웹 프로그래밍에서 사용하는 DOM 조작 방식보다 간편하게 데이터를 가져와서 뷰에 표현할 수 있다.

Angular는 아래와 같이 7가지 데이터 바인딩을 제공한다.

<br>

![data-binding](https://user-images.githubusercontent.com/67410919/103861760-4a66cb80-5101-11eb-8237-10d209bdfc89.PNG)

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

## 2.3 어트리뷰트 바인딩(Attribute binding)

https://poiemaweb.com/angular-component-data-binding#33-%EC%96%B4%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%8A%B8-%EB%B0%94%EC%9D%B8%EB%94%A9attribute-binding

<br>

어트리뷰트 바인딩은 컴포넌트 클래스의 프로퍼티와 템플릿 간의 단방향 데이터 바인딩에 사용되는 템플릿 문법으로 표현식의 평가 결과를 HTML 어트리뷰트에 바인딩한다.

`<element [attr.attribute-name]="expression">...</element>`

<br>

앞에서 살펴본 프로퍼티 바인딩과 차이점을 이해하기 위해서 HTML 어트리뷰트(attribute)와 DOM 프로퍼티(property)에 대해서 알아보도록 하자. 바인딩이 동작하는 방식을 이해하기 위해서는 HTML의 어트리뷰트와 프로퍼티의 차이를 파악하는 것이 중요하다.

Attribute와 Property는 모두 '속성'으로 변역되어 같은 것으로 오해할 수 있으나 이들은 서로 다른 것이다. 어트리뷰트는 HTML 문서에 존재하는 것으로 어트리뷰트의 값은 변하지 않는다. 프로퍼티는 DOM 노드 객체에 있는 것으로 동적으로 변한다.

브라우저는 HTML 문서를 파싱하여 DOM 트리로 변환하고 메모리에 적재한다. 이때 HTML 요소는 DOM 노드 객체로, HTML 어트리뷰트는 DOM 노드 객체의 프로퍼티로 변환된다.
