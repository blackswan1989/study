# AngularJS

<br>

- AngularJS는 JavaScript 프레임 워크이다. `<script>` 태그를 사용하여 HTML 페이지에 추가 할 수 있다.
- AngularJS는 Directives로 HTML 속성을 확장 하고 Expressions로 데이터를 HTML에 바인딩 해준다.
- AngularJS는 JavaScript 파일로 배포되며 스크립트 태그를 사용하여 웹 페이지에 추가 할 수 있다.
- AngularJS는 데이터베이스 CRUD(Create Read Update Delete) 애플리케이션에 적합하다.

  url : https://www.w3schools.com/angular/angular_intro.asp

## <br>

<br>

## 01. AngularJS Introduction

<br>

### 1) AngularJS Extends HTML (HTML을 확장하는 AngularJS)

AngularJS는 `ng-directives`로 HTML을 확장시켜 준다.  
`ng-app` 지시문은 AngularJS 응용 프로그램을 정의한다.  
`ng-model` 지시문은 애플리케이션 데이터를 제어하고 HTML(입력, 선택한 텍스트 영역)의 값을 결합해 준다.  
`ng-bind` 지시문은 애플리케이션 데이터를 HTML view에 바인딩(결합)해준다. (binds: 묶다, 결속시키다)

- **Examples :**

  ```
  // AngularJS는 웹 페이지가 로드되면 자동으로 시작된다.
  // input에 입력하는 텍스트필드를 실시간으로 `<p ng-bind="name"></p>` 위치에 반영시켜준다.

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

  <div ng-app="">
    <p>Input something in the input box:</p>
    <p>Name: <input type="text" ng-model="name"></p>
    <p ng-bind="name"></p>
  </div>
  ```

<br>
<br>

### 2) AngularJS Directives (AngularJS의 지시어)

이미 위에서 보았듯 AngularJS Directives은 `ng` 접두사가 있는 HTML속성이다.  
`ng-init` 지시문은 AngularJS 응용 프로그램 변수를 초기화 시켜준다.

- **Examples :**

  ```
  // 결과 : [The name is Jane]

  <div ng-app="" ng-init="firstName='Jane'">
    <p>The name is <span ng-bind="firstName"></span></p>
  </div>
  ```

  **Tip:** 페이지 HTML을 유효하게 만들려면 `ng-` 대신 `data-ng-`를 사용할 수 있다.

<br>
<br>

### 3) AngularJS Expressions (AngularJS 표현식)

AngularJS 표현식은 `{{expression}}`중괄호 안에 작성되며 표현식이 쓰여진 정확한 위치에 데이터를 "출력"한다.

- **Examples 1 :**

  ```
  // 결과 : [My first expression: 10 ]

  <div ng-app="">
    <p>My first expression: {{ 5 + 5 }}</p>
  </div>
  ```

<br>

AngularJS 표현식은 `ng-bind` 지시문 과 같은 방식으로 AngularJS 데이터를 HTML에 바인딩해준다.

- **Examples 2 :**

  ```
  // input에 입력하는 텍스트필드를 <p>{{name}}</p>에 실시간으로 반영시켜준다.

  <div ng-app="">
    <p>Input something in the input box:</p>
    <p>Name: <input type="text" ng-model="name"></p>
    <p>{{name}}</p>
  </div>
  ```

<br>
<br>

### 4) AngularJS Applications

AngularJS modules는 애플리케이션을 정의(define)한다.  
AngularJS controllers는 애플리케이션을 제어(control)한다.  
`ng-app`를 지시하면 애플리케이션을 정의하고 `ng-controller`는 controller를 정의한다.

```
// input에 지정된 firstName과 lastName이 미리 입력되어있고, 다르게 입력하면 실시간으로 Full Name에 반영된다.

<div ng-app="myApp" ng-controller="myCtrl">
  First Name: <input type="text" ng-model="firstName"><br>
  Last Name: <input type="text" ng-model="lastName"><br>
  Full Name: {{firstName + " " + lastName}}  // 가운데 " "는 띄어쓰기 공간
</div>

<script>
  var app = angular.module('myApp', []);  // module
  app.controller('myCtrl', function($scope) {  // controller
      $scope.firstName= "Jane";  // $scope는 view와 controller를 연결하는 개념이다.
      $scope.lastName= "Doe";
  });
</script>

```

<br>
<br>
<br>
<br>

## 02. AngularJS Expressions (AngularJS 표현식)

<br>

#### &nbsp;&nbsp; AngularJS binds data to HTML using Expressions.

- AngularJS 표현식은 이중 중괄호 안에 작성할 수 있다 : {{ expression }}
- AngularJS 표현식은 지시문 안에 작성할 수도 있다 : ng-bind="expression"
- AngularJS는 표현식을 해석하고 표현식이 작성된 정확한 위치에 결과를 반환해 준다.
- AngularJS 표현식은 JavaScript 표현식과 매우 유사 하며 리터럴, 연산자, 변수를 포함할 수 있다.
- 예제 : {{5 + 5}} 또는 {{firstName + ""+ lastName}}

<br>

- **Examples :**

  AngularJS는 원하는 곳에 표현식을 작성할 수 있으며 단순히 표현식을 해결하고 결과를 반환해 준다.

  ```
  // input필드에 색상(pink or #000등)을 입력하면 CSS 속성 값을 바로 변경시켜 준다.

  <p>Change the value of the input field:</p>

  <div ng-app="" ng-init="myCol='lightblue'">
   <input style="background-color:{{myCol}}" ng-model="myCol">
  </div>
  ```

  _url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_expression_3_

<br>
<br>

### 1) AngularJS Numbers

AngularJS의 numbers는 JavaScript의 numbers와 같다.

- **Examples :**

  ```
  // 결과 : [Total in dollar: 50]

  <div ng-app="" ng-init="quantity=10;cost=5">
    <p>Total in dollar: {{ quantity * cost }}</p>
  </div>


  // `ng-bind`를 사용하여 동일한 결과를 출력할 수 있다.

  <div ng-app="" ng-init="quantity=10;cost=5">
    <p>Total in dollar: <span ng-bind="quantity * cost"></span></p>
  </div>
  ```

<br>
<br>

### 2) AngularJS Strings

AngularJS의 Strings는 JavaScript의 Strings와 같다.

- **Examples :**

  ```
  // 결과 : [The full name is: Jane Doe]

  <div ng-app="" ng-init="firstName='Jane';lastName='Doe'">
    <p>The full name is: {{ firstName + " " + lastName }}</p>
  </div>


  // `ng-bind`를 사용하여 동일한 결과를 출력할 수 있다.

  <div ng-app="" ng-init="firstName='Jane';lastName='Doe'">
    <p>The full name is: <span ng-bind="firstName + ' ' + lastName"></span></p>
  </div>
  ```

<br>
<br>

### 3) AngularJS Objects

AngularJS의 Objects는 JavaScript의 Objects와 같다.

- **Examples :**

  ```
  // 결과 : [The name is John Doe]

  <div ng-app="" ng-init="person={firstName:'John',lastName:'Doe'}">
    <p>The name is {{ person.firstName + " " + person.lastName }}</p>
  </div>


  // `ng-bind`를 사용하여 동일한 결과를 출력할 수 있다.

  <div ng-app="" ng-init="person={firstName:'John',lastName:'Doe'}">
    <p>The name is <span ng-bind="person.firstName + ' ' + person.lastName"></span></p>
  </div>
  ```

<br>
<br>

### 4) AngularJS Arrays

AngularJS의 Arrays는 JavaScript의 Arrays와 같다.

- **Examples :**

  ```
  // 결과 : [The third result is "40"]

  <div ng-app="" ng-init="points=[1,15,19,2,40]">
    <p>The third result is "{{ points[4] }}"</p>
  </div>


  // `ng-bind`를 사용하여 동일한 결과를 출력할 수 있다.

  <div ng-app="" ng-init="points=[1,15,19,2,40]">
    <p>The third result is "<span ng-bind="points[4]"></span>"</p>
  </div>
  ```

<br>
<br>

### 5) AngularJS Expressions vs JavaScript Expressions

- JavaScript 표현식과 마찬가지로 AngularJS 표현식에는 리터럴, 연산자 및 변수가 포함될 수 있다.
- JavaScript 표현식과 달리 AngularJS 표현식은 HTML 내부에 작성할 수 있다.
- AngularJS 표현식은 조건(conditionals), 루프(loops) 및 예외(exceptions)를 지원하지 않지만 JavaScript 표현식은 지원한다.
- AngularJS 표현식은 필터(filters)를 지원하지만 JavaScript 표현식은 지원하지 않습니다.

<br>
<br>
<br>
<br>

## 03. AngularJS Modules

<br>

- AngularJS module은 애플리케이션을 정의(defines)한다.
- Module은 application의 다른 부분에 대한 컨테이너(container)입니다.
- Module은 애플리케이션 컨트롤러(controllers)의 컨테이너(container)이다.
- 컨트롤러(controllers)는 항상 Module에 속한다.

<br>

### 1) Creating a Module

AngularJS function을 사용하여 Module(`angular.module`)을 만든다.

`"myApp"`parameter(매개변수)는 애플리케이션이 실행 될 HTML 요소를 나타낸다.  
이제 AngularJS 애플리케이션에 컨트롤러(controllers), 지시문(directives), 필터 등을 추가 할 수 있다.

- **Examples :**

  ```
  <div ng-app="myApp">...</div>

  <script>
    var app = angular.module("myApp", []);
  </script>
  ```

<br>
<br>

### 2) Adding a Controller

애플리케이션에 컨트롤러를 추가하고 `ng-controller` 지시문으로 컨트롤러를 참조(refer)해준다.

- **Examples :**

  ```
  // 결과 : [John Doe]
  <div ng-app="myApp" ng-controller="myCtrl">
    {{ firstName + " " + lastName }}
  </div>

  <script>
    var app = angular.module("myApp", []);
    app.controller("myCtrl", function($scope) {
      $scope.firstName = "John";
      $scope.lastName = "Doe";
    });
  </script>
  ```

<br>
<br>

### 3) Adding a Directive

AngularJS에는 애플리케이션에 기능을 추가하는데 사용할 수 있는 기본적으로 내장된 지시문 세트가 있다.  
또한 모듈을 사용하여 애플리케이션에 고유한 지시문을 추가 할 수도 있다.

Directive reference : https://www.w3schools.com/angular/angular_ref_directives.asp

<br>

- **Examples :**

  ```
  // 결과 : [I was made in a directive constructor!]

  <div ng-app="myApp" w3-test-directive></div>

  <script>
    var app = angular.module("myApp", []);
    app.directive("w3TestDirective", function() {
      return {
        template : "I was made in a directive constructor!"
      };
    });
  </script>
  ```

<br>
<br>

### 4) Modules and Controllers in Files

AngularJS 애플리케이션에서는 Module과 Controller를 JavaScript 파일에 넣는 것이 일반적이다.  
아래 예제에서 `"myApp.js"`는 애플리케이션 모듈 정의를 포함하고 `"myCtrl.js"`는 컨트롤러를 포함한다.

- **Examples :**

  ```
  // 결과 : [John Doe]

  <div ng-app="myApp" ng-controller="myCtrl">
    {{ firstName + " " + lastName }}
  </div>

  <script src="myApp.js"></script>
  <script src="myCtrl.js"></script>
  ```

  ```
  // myCtrl.js
  app.controller("myCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName= "Doe";
  });
  ```

  ```
  // myApp.js
  var app = angular.module("myApp", []);
  ```

  - 위의 `//myApp.js`에서 모듈 정의의 `[]`매개 변수를 사용하여 종속 모듈을 정의 할 수 있다.
  - `[]`매개 변수가 없으면 새 모듈을 생성하지 않고 기존 모듈을 검색한다.

<br>
<br>

### 5) More

- #### Functions(함수)는 Global Namespace를 오염시킬 수 있다.

  JavaScript에서는 전역 함수를 피해야한다. 다른 스크립트로 쉽게 덮어 쓰거나 삭제할 수 있기 때문이다.  
  AngularJS modules은 모든 함수를 module에 로컬로 유지함으로써이 문제를 감소시킨다.

<br>

- #### When to Load the Library(라이브러리 로드 시기)

  HTML 애플리케이션에서는 `<body>`요소 끝에 스크립트를 배치하는 것이 일반적이지만,  
  .NET Framework에서는 `<head>`또는 `<body>`시작 부분에 AngularJS 라이브러리를 로드하는 것이 좋다.  
  왜냐하면 angular.module 라이브러리가 로드 된 이후에만 ​​컴파일 될 수 있기 때문이다.

<br>
<br>
<br>

## 04. AngularJS Directives (AngularJS의 지시어)

- AngularJS를 사용하면 Directives라는 새로운 속성으로 HTML을 확장할 수 있다.
- AngularJS에는 애플리케이션에 기능을 제공하는 내장 지시문 세트가 있다.
- AngularJS를 사용하면 고유 한 지시문을 정의 할 수도 있다.
- URL : https://www.w3schools.com/angular/angular_directives.asp

---

### &nbsp;&nbsp;&nbsp;# What is Directives?

- AngularJS 지시문은 `ng-`접두사가 있는 확장된 HTML 속성이다.

- **Examples :**

  ```
  <div ng-app="" ng-init="firstName='John'">  // input 텍스트 필드에 John으로 초기화되어있다.
    <p>Name: <input type="text" ng-model="firstName"></p>
    <p>You wrote: {{ firstName }}</p>  // input의 입력값이 반영된다.
  </div>
  ```

  **Tip:** `ng-app`은 `<DIV>`element가 AngularJS와 애플리케이션의 "소유자"라고 AngularJS에게 알려준다.

  <br>

  #### 1. The ng-app Directive

  - `ng-app` 지시문은 AngularJS 애플리케이션의 '루트 요소(Root element)'를 정의해 준다.
  - `ng-app` 지시문은 웹 페이지가 로드 될 때 애플리케이션을 자동으로 초기화(Auto-bootstrap)해 준다.

  <br>

  #### 2. The ng-init Directive

  - `ng-init`지시문은 AngularJS 애플리케이션의 초기 값을 정의한다.
  - 일반적으로 `ng-init`를 사용하는 대신 컨트롤러 또는 모듈을 사용한다.

  <br>

  #### 3. The ng-model Directive

  - `ng-model` 지시문은 HTML 컨트롤(입력, 선택, 텍스트 영역)의 값을 애플리케이션 데이터에 바인딩(binds)한다.
  - `ng-model` 지시문은 다음을 수행 할 수도 있다 :

    - 애플리케이션 데이터 Type(number, email, required)에 대한 유효성 검사.
    - 애플리케이션 데이터에 대한 상태(status: invalid, dirty, touched, error)제공.
    - HTML Elements에 대한 CSS 클래스들을 제공해 준다.
    - HTML Elements를 HTML Form에 바인딩 해준다.

<br>
<br>

### 1) Data Binding

데이터 바인딩이란 두 데이터 혹은 정보의 소스를 모두 일치시키는 기법이다.  
즉 화면에 보이는 데이터와 브라우저 메모리에 있는 데이터를 일치시키는 기법으로,  
많은 자바스크립트 프레임워크가 이러한 데이터 바인딩 기술을 제공하고 있다.  
하지만 대다수의 자바스크립트 프레임워크가 단방향 데이터 바인딩을 지원하는 반면  
AngularJS는 양방향 데이터 바인딩을 제공하고 있다.

위의 예제에서 `{{ firstName }}`표현식은 AngularJS의 데이터 바인딩 표현식이다.  
즉 {{ firstName }}와 `ng-model="firstName"`은 양방향으로 데이터가 바인딩 되고 있다.

- **Examples :**

  ```
  <div data-ng-app="" data-ng-init="quantity=1;price=5">
    <h2>Cost Calculator</h2>
    Quantity: <input type="number" ng-model="quantity">
    Price: <input type="number" ng-model="price">
    <p><b>Total in dollar: {{quantity * price}}</b></p>
  </div>
  ```

<br>
<br>

### 2) Repeating HTML Elements

`ng-repeat`지시문은 HTML 요소를 반복시켜준다.

- **Examples :**

```
<div ng-app="" ng-init="names=['Jani','Hege','Kai']">
  <p>Looping with ng-repeat:</p>
  <ul>
    <li ng-repeat="x in names">
      {{ x }}
    </li>
  </ul>
</div>
```

<br>

`ng-repeat` 지시문은 수집한 각 항목에 대해 HTML 요소를 한 번씩 복제해준다.

- **Examples : 객체 배열에 사용되는 ng-repeat 지시문**

```
// 결과 : [Jani, Norway | Hege, Sweden | Kai, Denmark]

<div ng-app="" ng-init="names=[
  {name:'Jani',country:'Norway'},
  {name:'Hege',country:'Sweden'},
  {name:'Kai',country:'Denmark'}]">

  <ul>
    <li ng-repeat="test in names">
    {{ test.name + ', ' + test.country }}</li>
  </ul>
</div>
```

<br>
<br>

### 3) Create New Directives

기본적으로 내장된 AngularJS 지시문 외에도 모든 고유 한 지시문을 만들 수 있다.  
`.directive` function을 사용하여 새 지시문을 만들 수 있다.  
새로운 지시문을 호출하려면 새롭게 만든 지시문과 동일한 태그명을 가진 HTML element를 만들면 된다.

지시문의 이름을 지정할 때에는 낙타문법(`w3TestDirective`)과 같은 방식으로 지정 해야 하지만  
지시문을 호출 할 때에는 `-`로 구분 된 문법(`w3-test-directive`)의 방식을 사용하여 호출 해야 한다.

- **Examples :**

  ```
  <body ng-app="myApp">

    <w3-test-directive></w3-test-directive>  // 지시문과 동일한 태그명을 가진 지시문을 작성하여 호출

    // 속성(Attribute)을 추가하여 <div w3-test-directive></div> 작성 가능
    // 클래스(class)를 추가하여 <div class="w3-test-directive"></div> 작성 가능

    <script>
      var app = angular.module("myApp", []);
      app.directive("w3TestDirective", function() {  // 지시문의 이름 "w3TestDirective" 지정
          return {
              template : "<h1>Made by a directive!</h1>"  // 지시문 내용 작성
          };
      });
    </script>

  </body>
  ```

<br>
<br>

### 4) Restrictions

지시문이 일부 Methods에 의해서만 호출되도록 제한(restrict)할 수 있다.

- The legal restrict values are:

  - EA : Default
  - E : Element name
  - A : Attribute
  - C : Class
  - M : Comment

- **Examples :**

  값이 "A"인 제한 속성을 추가하면 지시문은 해당 속성(attributes)에 포함되는 요소들만 호출할 수 있다.

  ```
  <body ng-app="myApp">

    <w3-test-directive></w3-test-directive>
    <div w3-test-directive></div>

    <script>
      var app = angular.module("myApp", []);
      app.directive("w3TestDirective", function() {
          return {
              restrict : "A",
              template : "<h1>Made by a directive!</h1>"
          };
      });
    </script>

  </body>
  ```

  _Note: restrict 속성을 "A"로 설정하면 "w3-test-directive"에 속성(div, p Attribute등)이 있는 HTML 요소만 호출할 수 있다._

<br>
<br>
