<br>

# 1. AngularJS Events

<br>

#### &nbsp;&nbsp; AngularJS에는 자체 HTML 이벤트 지시문이 있다.

<br>

&nbsp;&nbsp; _URL : https://www.w3schools.com/angular/angular_events.asp_

<br>

---

<br>

## 01. Events

<br>

1. 이벤트 지시문을 사용하면 특정 사용자 이벤트에서 AngularJS 함수를 실행할 수 있다.

2. AngularJS 이벤트는 HTML 이벤트를 덮어 쓰지 않으며 두 이벤트가 모두 실행 된다.

3. 다음 지시문 중 하나 이상을 사용하여 이벤트 리스너를 HTML 요소에 추가 할 수 있다.

<br>

- #### Events Types

  - ng-blur
  - ng-change
  - ng-click
  - ng-copy
  - ng-cut
  - ng-dblclick
  - ng-focus
  - ng-keydown
  - ng-keypress
  - ng-keyup
  - ng-mousedown
  - ng-mouseenter
  - ng-mouseleave
  - ng-mousemove
  - ng-mouseover
  - ng-mouseup
  - ng-paste

<br>
<br>
<br>
<br>

## 02. Mouse Events

<br>

&nbsp; 마우스 이벤트는 커서가 다음 순서대로 요소 위로 이동할 때 발생 된다.

&nbsp;&nbsp; 1) `ng-mouseover`
&nbsp;&nbsp; 2) `ng-mouseenter`
&nbsp;&nbsp; 3) `ng-mousemove`
&nbsp;&nbsp; 4) `ng-mouseleave`

<br>

&nbsp; 또는 요소에서 마우스 버튼을 클릭 할 때 다음 순서대로 모든 HTML 요소에 마우스 이벤트를 추가 할 수 있다.

&nbsp;&nbsp; 1) `ng-mousedown`
&nbsp;&nbsp; 2) `ng-mouseup`
&nbsp;&nbsp; 3) `ng-click`

<br>

- **Examples : `ng-mousemove`**

  ```
  <body>

    <div ng-app="myApp" ng-controller="myCtrl">
      <h1 ng-mousemove="count = count + 1">Mouse Over Me!</h1>  // h1 요소에서 마우스를 움직일때마다 count가 올라간다.
      <h2>{{ count }}</h2>
    </div>

    <script>
      var app = angular.module('myApp', []);
      app.controller('myCtrl', function($scope) {
          $scope.count = 0;
      });
    </script>

  </body>
  ```

<br>
<br>
<br>

### 1) The ng-click Directive

<br>

&nbsp; `ng-click` 지시문은 요소를 클릭 할 때 실행될 AngularJS 코드를 정의해 준다.

<br>

- **Examples : `ng-click`**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <button ng-click="count = count + 1">Click Me!</button>   // 버튼을 클릭할 때 마다 count가 올라간다.
    <p>{{ count }}</p>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.count = 0;
    });
  </script>
  ```

<br>

- **Examples : `ng-click` refer to a function**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <button ng-click="myFunction()">Click Me!</button>    // myFunction()으로 실행
    <p>{{ count }}</p>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.count = 0;
        $scope.myFunction = function() {    // myFunction() function에 count++ 정의
            $scope.count++;
        }
    });
  </script>
  ```

<br>
<br>
<br>

### 2) Toggle, True/False

<br>

&nbsp; 버튼이 Toggle 스위치 처럼 작동하도록 한다. 즉 버튼을 클릭 할 때 HTML 섹션을 표시하고,  
&nbsp; 버튼을 다시 클릭 할 때 HTML 섹션을 숨겨서 드롭 다운 메뉴처럼 보이도록 해준다.

<br>

- **Examples :**

  ```
  <body>
    <div ng-app="myApp" ng-controller="myCtrl">
      <button ng-click="myFunc()">Click Me!</button>

      <div ng-show="showMe">
          <h1>Menu:</h1>
          <div>Pizza</div>
          <div>Pasta</div>
          <div>Pesce</div>
      </div>
    </div>
    <script>
      var app = angular.module('myApp', []);
      app.controller('myCtrl', function($scope) {
          $scope.showMe = false;    // ng-show를 false값으로 정의되어 숨겨져있다.
          $scope.myFunc = function() {    // click으로 myFunc()함수를 실행시키면
              $scope.showMe = !$scope.showMe;   // !을 사용하여 showMe 변수를 그 반대값(not)으로 설정해준다.
          }
      });
    </script>
  </body>
  ```

  - ng-show는 Boolean값이 `false`로 정의되어 숨겨진 상태로 시작되고 있다.
  - 버튼 click으로 `myFunc()`함수를 실행시키면 `!`을 사용하여 `showMe` 변수를 그 반대값(not)으로 설정해준다.
  - 따라서 버튼을 클릭할 때 마다 `<div ng-show="showMe">`요소에서는 `ng-hide` class가 붙었다가 사라졌다가를 반복한다.

  &nbsp;&nbsp;&nbsp;&nbsp;_<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_events_toggle</small>_

<br>
<br>
<br>

### 3) $event Object

<br>

1. 함수를 호출할 때 `$event` 객체(object)를 인수(argument)로 전달할 수 있다.

2. `$event` object에는 브라우저의 이벤트 object가 포함된다.

<br>

- **Examples :**

  제목 위로 마우스를 가져 가면 이벤트 객체의 `clientX` 및 `clientY` 값이 표시된다.

  ```
  <body>
    <div ng-app="myApp" ng-controller="myCtrl">
      <h1 ng-mousemove="myFunc($event)">Mouse Over Me!</h1>
      <p>Coordinates: {{x + ', ' + y}}</p>
    </div>

    <script>
      var app = angular.module('myApp', []);
      app.controller('myCtrl', function($scope) {
          $scope.myFunc = function(myE) {
              $scope.x = myE.clientX;
              $scope.y = myE.clientY;
          }
      });
    </script>
  </body>
  ```

  _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_events_event</small>_

<br>
<br>
<br>
<br>
<br>
<br>

---

<br>

# 2. AngularJS Forms

<br>

#### &nbsp;&nbsp; AngularJS의 Form은 input 컨트롤의 데이터 바인딩 및 유효성 검사를 제공해준다.

<br>

&nbsp;&nbsp; _URL : https://www.w3schools.com/angular/angular_forms.asp_

<br>

---

<br>

## 01. Input Controls

<br>

&nbsp; Input 컨트롤은 HTML의 input elements이다.

&nbsp; 종류로는 `input`, `select`, `button`, `textarea` elements 들이 있다.

<br>
<br>
<br>
<br>

### 1) Data-Binding

<br>

&nbsp; Input 컨트롤은 `ng-model` 지시문을 사용하여 데이터 바인딩을 제공하고 있다.

<br>

- **Examples 1 : `name` 속성은 컨트롤러에서 참조 할 수 있다.**

  ```
  <div ng-app="myApp" ng-controller="formCtrl">
    <form>
      Name: <input type="text" ng-model="name">
    </form>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
        $scope.name = "Tom Little";
    });
  </script>

  // 결과 : [Name : Tom Litter]
  ```

  - ng-model 지시문을 통해 name이라는 속성을 정의
  - ng-model 지시문은 입력 컨트롤러를 애플리케이션의 나머지 부분에 바인딩

<br>

- **Examples 2 : 애플리케이션의 다른 곳에서도 참조 할 수 있다.**

  ```
  <div ng-app="">
    <form>
      Name: <input type="text" ng-model="name">
    </form>

    <h1>You entered: {{name}}</h1>
  </div>
  ```

  - input 필드에서 이름을 변경하면 `h1`요소의 이름이 그에 따라 변경되는 것을 볼 수 있다.

<br>
<br>
<br>
<br>

### 2) CheckBox

<br>

&nbsp; checkbox의 값(value)은 `true` 또는 `false`이다. `ng-model` 지시문을 checkbox에 적용하고 애플리케이션에서 해당 값을 사용한다.

<br>

- **Examples : `checkbox`를 선택하면 헤더의 `ng-show` 속성이 `true`로 설정된다.**

  ```
  <div ng-app="">
    <form>
      Check to show a header:
      <input type="checkbox" ng-model="myVar">   // 체크박스 선택시 rue값이 되어 ng-show가 표시된다.
    </form>
    <h1 ng-show="myVar"> My Header value: "{{myVar}}"</h1>  // My Header value: "true"
  </div>
  ```

<br>
<br>
<br>
<br>

### 3) Radio buttons

<br>

1. `ng-model` 지시문을 사용하여 라디오 버튼을 애플리케이션에 바인딩해준다.

2. 동일한 `ng-model`을 가진 라디오 버튼은 다른 값을 가질 수 있지만 선택된 하나만 사용할 수 있다.

<br>

- **Examples : `ng-switch` 지시문은 라디오 버튼의 값에 따라 HTML 섹션을 표시해준다.**

  ```
  <body ng-app="">
    <form>
      Pick a topic:
      <input type="radio" ng-model="myPick" value="dogs">Dogs
      <input type="radio" ng-model="myPick" value="tuts">Tutorials
      <input type="radio" ng-model="myPick" value="cars">Cars
    </form>

    <div ng-switch="myPick">
      <div ng-switch-when="dogs">
        <h1>Dogs</h1>
        <p>Welcome to a world of dogs.</p>
      </div>

      <div ng-switch-when="tuts">
        <h1>Tutorials</h1>
        <p>Learn from examples.</p>
      </div>

      <div ng-switch-when="cars">
        <h1>Cars</h1>
        <p>Read about cars.</p>
      </div>
    </div>
  </body>

  // myPick의 값은 dogs, tuts 또는 cars가 된다.
  ```

  _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_form_radio</small>_

<br>
<br>
<br>
<br>

### 4) Selectbox

<br>

1. `ng-model` 지시문을 사용하여 Selectbox를 애플리케이션에 바인딩해준다.

2. `ng-model` 속성(attribute)에 정의 된 값(value)은 Selected option에서 선택한 옵션의 값을 갖는다.

<br>

- **Examples : `ng-switch` 지시문은 Selectbox의 드롭다운 option 값에 따라 HTML 섹션을 표시해준다.**

  ```
  <body ng-app="">

    <form>
      Select a topic:
      <select ng-model="mySelect">
        <option value="">(options)
        <option value="dogs">Dogs
        <option value="tuts">Tutorials
        <option value="cars">Cars
      </select>
    </form>

    <div ng-switch="mySelect">
      <div ng-switch-when="dogs">
        <h1>Dogs</h1>
        <p>Welcome to a world of dogs.</p>
      </div>

      <div ng-switch-when="tuts">
        <h1>Tutorials</h1>
        <p>Learn from examples.</p>
      </div>

      <div ng-switch-when="cars">
        <h1>Cars</h1>
        <p>Read about cars.</p>
      </div>
    </div>

  </body>
  ```

  _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_form_select</small>_

<br>
<br>
<br>
<br>

### 5) An AngularJS Form Example

<br>

1. `novalidate` 속성은 HTML5의 새로운 기능으로 기본 브라우저 유효성 검사를 비활성화 시켜준다.

2. `novalidate` 속성이 아래 애플리케이션에 필요한 것은 아니지만 일반적으로 AngularJS Form에서 사용하며 표준 HTML5 유효성 검사를 재정의 해준다.

<br>

- **Examples :**

  ```
  <div ng-app="myForm" ng-controller="formCtrl">
    <form novalidate>
      First Name:<br>
      <input type="text" ng-model="user.firstName"><br>
      Last Name:<br>
      <input type="text" ng-model="user.lastName">
      <br><br>
      <button ng-click="reset()">RESET</button>   // 버튼을 클릭하면 `reset()` 메서드를 호출
    </form>

    <p>form = {{user}}</p>  // 두개의 `user`객체(firstName, lastName)를 binding해준다
    <p>master = {{master}}</p> // 설정된 `$scope.master`를 바인딩.
  </div>

  <script>
  var app = angular.module('myForm', []);
  app.controller('formCtrl', function($scope) {
      $scope.master = {firstName:"John", lastName:"Doe"}; // 초기 값을 `master` 객체에 설정
      $scope.reset = function() {
          $scope.user = angular.copy($scope.master);  // `reset()` 메서드 정의(master와 동일하게 설정)
      };
      $scope.reset();
  });
  </script>
  ```

  - `ng-app` 지시문은 AngularJS 애플리케이션을 정의해준다.
  - `ng-controller` 지시문은 응용 프로그램 컨트롤러를 정의해준다.
  - `ng-model` 지시문은 두 개의 입력 요소를 model의 `user` 객체에 바인딩해준다.
  - `formCtrl` 컨트롤러는 초기 값을 `master` 객체에 설정하고 `reset()` 메서드를 정의하고 있다.
  - `angular.copy()`는 개체 또는 배열의 전체 복사본을 만들어 준다.
  - `reset()` 메서드는 `user` 객체를 `master` 객체와 동일하게 설정한다.
  - `ng-click` 지시문은 버튼을 클릭 한 경우에만 `reset()` 메서드를 호출해준다.

  - _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_form</small>_

<br>
<br>
<br>
<br>
<br>
<br>

---

<br>

# 3. AngularJS Form Validation

<br>

#### &nbsp;&nbsp; AngularJS는 입력 데이터의 유효성을 검사 할 수 있다.

<br>

&nbsp;&nbsp; _URL : https://www.w3schools.com/angular/angular_validation.asp_

&nbsp;&nbsp; _Angular JS : https://docs.angularjs.org/api/ng/directive/form_

<br>

---

<br>

## 01. Form Validation

<br>

1. AngularJS는 클라이언트 측에 Form의 유효성 검사를 제공해주고 있다.

2. AngularJS는 Form 및 Input Field(input, textarea, select)의 상태를 모니터링하고 사용자에게 현재 상태를 알릴 수 있다.

3. 또한 AngularJS는 터치(touched) 또는 수정(modified) 여부에 대한 정보를 보유한다.

4. 표준 HTML5 속성을 사용하여 입력의 유효성을 검사하거나 고유한 유효성 검사 기능을 만들 수 있다.

5. 클라이언트 측의 유효성 검사만으로는 사용자 입력을 보호 할 수 없기 때문에 서버 측의 유효성 검사도 필요하다.

<br>
<br>

### &nbsp;&nbsp;# AngularJS Validation Properties

- `$dirty`
- `$invalid`
- `$error`

<br>
<br>
<br>

### 1) Required (필수입력)

<br>

&nbsp; Input Field를 '필수'로 채우도록 지정하는 데 필요한 HTML5 속성을 사용할 수 있다.

<br>

- **Examples : The input field is `required`**

  ```
  <body ng-app="">

    <p>Try writing in the input field:</p>

    <form name="myForm">
      <input name="myInput" ng-model="myInput" required>  // required로 인하여 아무것도 입력하지않으면 false상태.
    </form>

    <p>The input's valid state is: <b>{{myForm.myInput.$valid}}</b> </p>

  </body>
  ```

  _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_validate_required</small>_

<br>
<br>
<br>

### 2) E-mail

<br>

&nbsp; HTML5 `type`중 `email`을 사용하여 input의 입력 값이 '이메일 형식'이어야 함을 지정할 수 있다.

<br>

- **Examples : The input field has to be an e-mail**

  ```
  <body ng-app="">

    <p>Try writing an E-mail address in the input field:</p>

    <form name="myForm">
      <input type="email" name="myInput" ng-model="myInput">
    </form>

    <p>The input's valid state is: <b>{{myForm.myInput.$valid}}</b> </p>

  </body>
  ```

  - input field의 상태는 쓰기를 시작하기 전부터 `true`값 상태이다(email주소가 포함되어 있지 않더라도)
  - `required`를 추가하면 상태는 쓰기전의 시작값이 `false`가 된다.

<br>
<br>
<br>

## 02. Form State and Input State

<br>

&nbsp; AngularJS는 Form과 Input fields의 상태를 지속적으로 업데이트 할 수 있다.

<br>

### &nbsp; 1) Input fields State (`true` or `false`)

- `$untouched` : Input field를 터치하지 않은 상태
- `$touched` : Input field가 터치 된 상태
- `$pristine` Input field가 아직 수정되지 않은 상태
- `$dirty` : Input field가 수정 된 상태
- `$invalid` : Input field 내용이 유효하지 않은 상태
- `$valid` : Input field 내용이 유효한 상태

<br>

### &nbsp; 2) Form State (`true` or `false`)

- `$pristine` 아직 수정 된 필드가 없는 상태
- `$dirty` 하나 이상이 수정 된 상태
- `$invalid` Form의 내용이 유효하지 않은 상태
- `$valid` Form의 내용이 유효한 상태
- `$submitted` Form이 제출된 상태

<br>

&nbsp;&nbsp; 위와 같은 상태들을 사용하여 사용자에게 의미있는 메시지를 표시 할 수 있다.

&nbsp;&nbsp; 예를 들어 Input field가 필수이고 사용자가 공백으로두면 사용자에게 경고를 제공할 수 있다.

<br>

- **Examples : input field가 `$touched` 상태이면서 비어 있는 경우 에러 메시지를 표시해주기**

  ```
  <body ng-app="">

    <p>Try leaving the first input field blank:</p>

    <form name="myForm">
      <p> Name:
        <input name="myName" ng-model="myName" required>
        <span ng-show="myForm.myName.$touched && myForm.myName.$invalid">The name is required.</span>
      </p>

      <p> Address:
        <input name="myAddress" ng-model="myAddress" required>
      </p>
    </form>

  </body>
  ```

  - `ng-show` 지시문을 사용하여 필드가 터치되고도 비어있는 경우에만 오류 메시지를 표시해준다.

  - _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_validate_show</small>_

<br>
<br>
<br>

## 03. CSS Classes

<br>

&nbsp; AngularJS는 상태에 따라 Form 및 Input Field에 CSS Class를 추가할 수 있다.

<br>

1. 다음 클래스가 Form 및 Input Field에 추가되거나 제거된다.

2. 나타내는 값이 `false`가 되면 클래스가 제거된다.

3. 이러한 클래스에 스타일을 추가하여 응용 프로그램에 더 좋고 직관적인 사용자 인터페이스를 제공할 수 있다.

4. 추가되거나 제거되는 class에서 `ng-state-key`작성 방식은 각 유효성 검사에 대한 하나의 키값이다.

5. 예시로 `ng-valid-required`처럼 작성하여 유효성을 검사해야하는 항목이 둘 이상 있을 때 유용하게 사용할 수 있다.

<br>
<br>

- **Examples 1 : Input을 'required' 상태로 만들어 작성 여부(`valid` or `invalid`)에 따라 css 클래스 적용이 달라지도록.**

  ```
  <style>
    input.ng-invalid {
        background-color:pink;
    }
    input.ng-valid {
        background-color:lightgreen;
    }
  </style>

  <body ng-app="">
    <p>Try writing in the input field:</p>
    <form name="myForm">
      <input name="myName" ng-model="myName" required>
    </form>
  </body>
  ```

  - input에 아무것도 입력하지 않으면 `ng-invalid`상태로 `input.ng-invalid` 클래스가 적용(pink)된다.
  - input에 내용을 입력하면 `ng-valid`상태가 되어 `input.ng-valid` 클래스가 적용(lightgreen)된다.

  - _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_validate_classes</small>_

<br>
<br>

- **Examples 2 : `ng-pristine`상태의 Form과 `ng-dirty`상태의 Form에 각기 다른 스타일 적용**

  ```
  <style>
  form.ng-pristine {
      background-color:lightblue;
  }
  form.ng-dirty {
      background-color:pink;
  }
  </style>

  <body ng-app="">
    <form name="myForm">
      <p>Try writing in the input field:</p>
      <input name="myName" ng-model="myName" required>
    </form>
  </body>
  ```

  - Form이 `ng-pristine`상태(input에 한번도 텍스트를 입력 한적 없는 상태)에서는 `form.ng-pristine` 클래스가 적용(lightblue) 된다.
  - Form이 `ng-dirty`상태(input에 텍스트를 입력했다가 지운 상태)가 되면 `form.ng-dirty` 클래스가 적용(pink)된다.

  - _<small>url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_validate_classes_form</small>_

<br>
<br>

- **Examples 2 : Validation Example**

  ```
  <body>
    <h2>Validation Example</h2>

    <form ng-app="myApp" ng-controller="validateCtrl" name="myForm" novalidate>
      <p>User Name :
        <input type="text" name="user" ng-model="user" required>
        <span style="color:red" ng-show="myForm.user.$dirty && myForm.user.$invalid">
          <span ng-show="myForm.user.$error.required">Username is required.</span>
        </span>
      </p>

      <p>E-mail Address :
        <input type="email" name="email" ng-model="email" required>
        <span style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid">
          <span ng-show="myForm.email.$error.required">Email is required.</span>
          <span ng-show="myForm.email.$error.email">Invalid email address.</span>
        </span>
      </p>

      <p>
        <input type="submit" ng-disabled="myForm.user.$dirty &&
        myForm.user.$invalid || myForm.email.$dirty && myForm.email.$invalid">
      </p>
    </form>

    <script>
      var app = angular.module('myApp', []);
      app.controller('validateCtrl', function($scope) {
          $scope.user = 'Your Name';
          $scope.email = 'Your E-mail';
      });
    </script>
  </body>
  ```

- `ng-model` 지시문은 input elements를 model에 바인딩 해준다.
- model 객체에는 `user`와 `email` 그리고 `password` 속성(properties)이 있다.
- `ng-show`는 위의 3가지 속성들이 `$dirty`상태이거나 `$invalid`상태일 때만 `<span>`의 `color:red`가 적용된 채로 화면에 표시된다.
- submit button은 위의 3가지 속성들이 `$dirty` & `$invalid`상태일 때는 `ng-disabled`상태가 되어 비활성화 된다.

- _<small>url : https://www.w3schools.com/code/tryit.asp?filename=GLPOT8PFD6B4</small>_
