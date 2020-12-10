# AngularJS Model

URL : https://www.w3schools.com/angular/angular_model.asp

---

<br>

## 01. Model - The `ng-model` Directive

- `ng-model` 지시문은 HTML 컨트롤(입력, 선택, 텍스트 영역)의 값을 애플리케이션 데이터에 바인딩(binds)한다.

- `ng-model` 지시문을 사용하면 입력 필드(Input Field)의 값을 AngularJS에서 생성 된 변수(variable)에 바인딩(bind) 할 수 있다.

  - **Examples :**

    ```
    <div ng-app="myApp" ng-controller="myCtrl">
      Name: <input ng-model="name">
    </div>

    <script>
      var app = angular.module('myApp', []);
      app.controller('myCtrl', function($scope) {
          $scope.name = "Jane Doe";
      });
    </script>

    // 결과 : [Name: Jane Doe]
    // ng-model 지시문을 사용하여 입력 필드의 값을 컨트롤러에서 만든 속성에 바인딩 해준다.
    ```

<br>
<br>
<br>

## 02. Model - Two-Way Binding

바인딩은 양방향으로 진행된다. 사용자가 입력 필드 내의 값을 변경하면 AngularJS 속성도 해당 값을 변경해 준다.

- **Examples :**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    Name: <input ng-model="name">
    <h1>You entered: {{name}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.name = "Jane Doe";
    });
  </script>

  // 결과 : [Name: Jane Doe | You entered: Jane Doe]
  // Input Field에서 이름을 변경하면 헤더의 이름이 그에 따라 변경되는 것을 볼 수 있다.
  ```

<br>
<br>

## 03. Model - Validate User Input

`ng-model` 지시문은 애플리케이션 데이터 Type(number, email, required)에 대한 유효성 검사를 제공해준다.

- **Examples :**

  ```
  <form ng-app="" name="myForm">
      Email:
      <input type="email" name="myAddress" ng-model="text">
      <span ng-show="myForm.myAddress.$error.email">Not a valid e-mail address</span>
  </form>

  // input 입력한 값이 이메일 주소가 아닌 경우 <span ng-show="myForm.myAddress.$error.email">는 오류 메시지를 표시해 준다.
  ```

  - 위의 예제에서 `<span>`은 `ng-show`속성의 표현식이 `true`를 반환하는 경우에만 표시된다.
  - 만약 `ng-model`의 property(특성)에 attribute(속성)이 존재하지 않으면 AngularJS가 자동으로 생성해 준다.

<br>
<br>

## 04. Model - Application Status

`ng-model` 지시문은 애플리케이션 데이터에 대한 상태(status: invalid, dirty, touched, error)를 제공해 준다.

- **Examples :**

  ```
  <form ng-app="" name="myForm" ng-init="myText = 'post@myweb.com'">

    Email:
    <input type="email" name="myAddress" ng-model="myText" required>
    <p>Edit the e-mail address, and try to change the status.</p>

    <h1>Status</h1>
    <p>Valid: {{myForm.myAddress.$valid}} (if true, the value meets all criteria).</p>
    <p>Dirty: {{myForm.myAddress.$dirty}} (if true, the value has been changed).</p>
    <p>Touched: {{myForm.myAddress.$touched}} (if true, the field has been in focus).</p>

  </form>
  ```

  _url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_model_status_

<br>
<br>

## 05. Model - CSS Classes

`ng-model` 지시문은 상태에 따라 HTML Elements에 대한 CSS 클래스들을 제공해 준다.

`ng-model` 지시문은 양식 필드(Input Feild)의 상태에 따라 다음 클래스들을 추가 & 제거해 준다 :

- `ng-empty`
- `ng-not-empty`
- `ng-touched`
- `ng-untouched`
- `ng-valid` // 유효한
- `ng-invalid` // 유효하지 않음
- `ng-dirty`
- `ng-pending` // 보류중
- `ng-pristine` // 깨끗한

<br>

- **Examples :**

  텍스트 필드를 편집하면 상태에 따라 클래스를 가져 오거나 잃게 된다.

  ```
  // input field를 비워두면 유효하지 않은 상태(ng-invalid)가 된다
  // 따라서 ".ng-invalid"의 클래스가 추가되어 css가 적용되고 텍스트를 입력하면 css가 해제된다.

  <style>
    input.ng-invalid {
        background-color: lightblue;
    }
  </style>

  <body>
    <form ng-app="" name="myForm">
        Enter your name:
        <input name="myName" ng-model="myText" required>
    </form>
  </body>
  ```

  **NOTE :** "required" 속성이있는 텍스트 필드는 비어있는 경우 유효하지 않다.

<br>
<br>
<br>
<br>
<br>
<br>

---

# AngularJS Data Binding

**AngularJS의 Data Binding은 Model과 View간의 Synchronization(동기화)이다.**

<br>

URL : https://www.w3schools.com/angular/angular_databinding.asp

---

<br>

## 01. Data Binding - Data Model

Data Model은 애플리케이션에서 사용할 수 있는 데이터 모음이다.

```
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.firstname = "John";
  $scope.lastname = "Doe";
});
```

<br>
<br>
<br>

## 02. Data Binding - HTML View

AngularJS 애플리케이션이 표시되는 HTML 컨테이너를 View라고 한다.  
View는 Model에 액세스 할 수 있으며 View에 Model 데이터를 표시하는 여러 가지 방법이 있다.  
Element의 innerHTML을 지정된 Model Property에 바인딩 하는 `ng-bind`지시문을 사용 할 수 있다.

- **Examples 1 :**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
      <p ng-bind="firstname"></p>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.firstname = "John";
        $scope.lastname = "Doe";
    });
  </script>

  // ng-bind 지시문을 사용하여 Element의 innerHTML을 데이터 모델의 속성에 바인딩합니다.

  ```

<br>

- **Examples 2 :**

  이중 중괄호 `{{}}`를 사용하여 모델의 콘텐츠를 표시 할 수도 있다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Full name: {{firstname + lastname}}</p>
  </div>
  ```

<br>

- **Examples 3 :**

  또는 `ng-model` 지시문을 사용하여 모델의 데이터를 HTML 컨트롤(입력, 선택, 텍스트 영역)의 보기에 바인딩할 수 있다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <input ng-model="firstname + lastname">
  </div>
  ```

<br>
<br>
<br>

## 03. Data Binding - Two-way Binding

Model의 데이터가 변경되면 View에 변경 사항이 반영되고  
View의 데이터가 변경되면 Model도 업데이트 된다.  
이는 즉시 자동으로 발생하므로 Model과 View가 항상 업데이트 된다.

- **Examples :**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    Name: <input ng-model="name">
    <h1>{{name}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
      $scope.name = ""
    });
  </script>

  // Input field 내에서 text를 변경하면 Model 데이터가 자동으로 변경되므로 <h1>도 해당 값이 변경 된다.
  ```

  _url : https://www.w3schools.com/code/tryit.asp?filename=GLILVHUK29EF_

<br>
<br>
<br>

## 04. Data Binding - Controller

Model과 View의 즉각적인 동기화로 인해 컨트롤러는 View에서 완전히 분리되어 Model 데이터에만 집중할 수 있다.  
AngularJS의 데이터 바인딩 덕분에 View는 컨트롤러의 모든 변경 사항을 반영할 수 있다.

- **Examples :**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
      <h1 ng-click="changeName()">{{firstname}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.firstname = "John";
        $scope.changeName = function() {    // {{firstname}}이 click되면 changeName()이 실행된다.
            $scope.firstname = "Nelly";
        }
    });
  </script>

  // 헤더를 클릭하여 "changeName"기능을 실행해보면, 컨트롤러를 사용하여 모델 데이터를 변경하는 방법을 알 수 있다.
  ```

  _url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_databinding_controller_

<br>
<br>
<br>
<br>
<br>
<br>

---

# AngularJS Controllers

- AngularJS 컨트롤러는 AngularJS 애플리케이션의 데이터를 제어한다.
- AngularJS 컨트롤러는 표준 JavaScript Objects이다.

<br>

URL : https://www.w3schools.com/angular/angular_controllers.asp

---

## 01. Controllers

AngularJS 애플리케이션은 Controller에 의해 제어된다.  
`ng-controller` 지시문은 애플리케이션 Controller를 정의해 준다.  
Controller는 표준 JavaScript Objects 생성자에 의해 생성 된 JavaScript Objects이다.

- **Examples :**

  ```
  // 입력하는 텍스트가  {{firstName + " " + lastName}}에 바로 반영된다.

  <div ng-app="myApp" ng-controller="myCtrl">
    First Name: <input type="text" ng-model="firstName"><br>
    Last Name: <input type="text" ng-model="lastName"><br>
    Full Name: {{firstName + " " + lastName}}
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.firstName = "Jane";  // input field에 자동입력
        $scope.lastName = "Doe";
    });
  </script>
  ```

  - 애플리케이션은 `ng-app = "myApp"`에 의해 정의되며 `<div>`내에서 실행된다.
  - `ng-controller = "myCtrl"`속성은 AngularJS 지시문으로 Controller를 정의한다.
  - `myCtrl` function는 JavaScript function이다.
  - `$scope`는 application object로 애플리케이션의 변수 및 함수의 소유자이다. 이 `$scope` object는 컨트롤러를 호출해 준다.
  - 컨트롤러는 scope에 firstName와 lastName라는 두 개의 속성(변수)을 만든다.
  - `ng-model` 지시문은 Input field를 컨트롤러 속성(firstName & lastName)에 바인딩해 준다.

<br>
<br>
<br>

## 02. Controller Methods

위의 예제들은 `lastName`과 `firstName`이라는 두 가지 속성이있는 Controller Object를 보여준다.  
그 외에도 컨트롤러는 Methods(함수로서의 변수)도 가질 수 있다.

- **Examples :**

  ```
  <div ng-app="myApp" ng-controller="personCtrl">
    First Name: <input type="text" ng-model="firstName"><br>
    Last Name: <input type="text" ng-model="lastName"><br>
    <br>
    Full Name: {{fullName()}}
  </div>

  <script>
    var app = angular.module('myApp', []);

    app.controller('personCtrl', function($scope) {
        $scope.firstName = "Jane";
        $scope.lastName = "Doe";
        $scope.fullName = function() {   // 컨트롤러 내부에서 fullName()이라는 함수를 생성하여 사용
            return $scope.firstName + " " + $scope.lastName;
        };
    });
  </script>
  ```

<br>
<br>
<br>

## 03. Controllers In External Files(외부 파일)

대규모 응용 프로그램에서는 Controller를 외부 파일에 저장하는 것이 일반적이다.

- **Examples 1 :**

```
// fullName() 결과 : [Full Name: John Doe]

<div ng-app="myApp" ng-controller="personCtrl">
  First Name: <input type="text" ng-model="firstName"><br>
  Last Name: <input type="text" ng-model="lastName"><br>
  Full Name: {{fullName()}}
</div>

<script src="personController.js"></script>
```

```
// personController.js

angular.module('myApp', []).controller('personCtrl', function($scope) {
    $scope.firstName = "John",
    $scope.lastName = "Doe",
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
});
```

<br>

- **Examples 2 :**

```
// 결과 : [Jani, Norway | Hege, Sweden | Kai, Denmark]

<div ng-app="myApp" ng-controller="namesCtrl">
  <ul>
    <li ng-repeat="test in names">
      {{ test.name + ', ' + test.country }}
    </li>
  </ul>
</div>

<script src="namesController.js"></script>
```

```
// namesController.js

angular.module('myApp', []).controller('namesCtrl', function($scope) {
  $scope.names = [
    {name:'Jani', country:'Norway'},
    {name:'Hege', country:'Sweden'},
    {name:'Kai', country:'Denmark'}
  ];
});
```
