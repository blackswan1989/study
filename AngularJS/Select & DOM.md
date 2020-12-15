<br>

# 1. AngularJS Select Boxes

#### &nbsp;&nbsp; AngularJS를 사용하면 배열 또는 객체의 항목을 기반으로 드롭 다운 목록을 만들 수 있다.

<br>

&nbsp;&nbsp; URL : https://www.w3schools.com/angular/angular_select.asp

<br>

---

<br>

## 01. Select Boxes

### 1) `ng-options`을 사용한 Select Box 생성

AngularJS의 객체 또는 배열을 기반으로 드롭다운(dropdown) 목록을 생성하려면 `ng-options`지시문을 사용하면 된다.

<br>

- **Examples : `ng-options` 지시문을 사용하여 드롭다운 목록을 채우는 방법을 보여준다.**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <select ng-model="selectedName" ng-options="x for x in names"></select>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
      $scope.names = ["Emil", "Tobias", "Linus"];   // 배열의 항목을 사용하여 드롭 다운 목록의 옵션을 채워준다.
    });
  </script>
  ```

<br>

#### #`ng-options` 지시문

- **Syntax :**

  `<select ng-options="array expression"></select>`

  Supported by the `<select>` element.

<br>

- Definition and Usage : `ng-options`

  `ng-options`지시문은 `<select>`요소를 `<options>`로 채운다.

  ng-options 지시문은 배열을 사용하여 드롭 다운 목록을 채우는데, 대부분의 경우 `ng-repeat` 지시문을  
  사용하는 것이 더 쉬울 수 있지만 `ng-options` 지시문을 사용할 때 더 많은 유연성(flexibility)이 있다.

<br>
<br>
<br>

### 2) `ng-repeat`을 사용한 Select Box 생성

`ng-repeat` 명령을 사용하여 동일한 드롭다운 목록을 만들 수도 있다.

<br>

- **Examples : `ng-repeat` 지시문을 사용하여 드롭다운 목록을 채우는 방법을 보여준다.**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <select>
      <option ng-repeat="x in names">{{x}}</option>
    </select>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.names = ["Emil", "Tobias", "Linus"];
    });
  </script>
  ```

  `ng-repeat` 지시문은 배열의 각 항목에 대해 HTML 코드 블록을 반복하기 때문에 드롭 다운 목록에서  
  옵션을 만드는 데 사용할 수 있지만 특히 드롭 다운 목록을 '옵션'으로 채우기 위해 만들어졌다.

<br>

#### #`ng-repeat` 지시문

- **Syntax :**

  `<element ng-repeat="expression"></element>`

  Supported by all HTML elements.

<br>

- Definition and Usage : `ng-repeat`

  `ng-repeat` 지시문은 주어진 횟수만큼 HTML집합(set of HTML)을 반복한다.

  HTML집합은 컬렉션의 항목당 한 번씩 반복되며 컬렉션은 배열 또는 객체여야한다.
  참고로 반복되는 각 인스턴스에는 현재 항목으로 구성된 자체 범위가 지정된다.

  객체 컬렉션이있는 경우 `ng-repeat` 지시문은 HTML 테이블을 만들고
  각 객체에 대해 하나의 테이블 행(row)을 표시하고, 각 객체 속성에 대해 하나의 테이블 데이터를 표시하는데 적합하다.

<br>

- **Parameter Values :**

  - test in records
  - (key, value) in myObj
  - test in records track by $id(x)

<br>
<br>
<br>

## 02. `ng-options` VS `ng-repeat`

<br>

- **NOTE: 객체 배열이 있다고 가정**

  ```
  $scope.cars = [
    {model : "Ford Mustang", color : "red"},
    {model : "Fiat 500", color : "white"},
    {model : "Volvo XC90", color : "black"}
  ];
  ```

<br>

### 1) `ng-repeat`

<br>

- **Examples 1 : Using `ng-repeat`**

  `ng-repeat` 지시문을 사용하여 드롭다운 목록을 만들 때 선택한 값은 문자열이어야 한다.  
  아래 예제에서는 선택한 값으로 사용할 색상 또는 모델 중에서 선택 해야 한다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Select a car:</p>
    <select ng-model="selectedCar">
      <option ng-repeat="x in cars" value="{{x.model}}">{{x.model}}</option>
    </select>
    <h1>You selected: {{selectedCar}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.cars = [
            {model : "Ford Mustang", color : "red"},
            {model : "Fiat 500", color : "white"},
            {model : "Volvo XC90", color : "black"}
        ];
    });
  </script>

  // 결과 : 드롭다운 -> Ford Mustang 선택시 "You selected: {{selectedCar}}"에 해당 선택지 출력
  // {{x.model}} -> {{x.color}} 변경 후 드롭다운 -> red 선택시 "You selected: {{selectedCar}}"에 Ford Mustang 출력
  ```

  _<small> url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_select_repeat_selected</small>_

<br>

- **Examples 2 : `ng-repeat`를 객체로 사용**

  값을 객체로 사용할 때 `value`대신 `ng-value`를 사용한다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Select a car:</p>
    <select ng-model="selectedCar">
      <option ng-repeat="x in cars" ng-value="{{x}}">{{x.model}}</option>
    </select>
    <h1>You selected a {{selectedCar.color}} {{selectedCar.model}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.cars = [
            {model : "Ford Mustang", color : "red"},
            {model : "Fiat 500", color : "white"},
            {model : "Volvo XC90", color : "black"}
        ];
    });
  </script>

  // 결과 : 드롭다운 -> Ford Mustang 선택시 "You selected a red Ford Mustang" 출력
  // {{x.model}} -> {{x.color}} 변경 후 드롭다운 -> "You selected a red Ford Mustang" 출력
  ```

  _<small> url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_select_repeat_selected_2</small>_

<br>
<br>
<br>

### 2) `ng-options`

<br>

- **Examples : Using `ng-options`**

  `ng-options` 지시문을 사용하여 드롭다운 목록을 만들면 선택한 값이 객체가 될 수 있다.
  선택한 값이 객체이면 더 많은 정보를 보유 할 수 있고 응용 프로그램이 더 유연해질 수 있다.
  아래 예제에서는 선택한 요소의 모델과 색상을 모두 표시 할 수 있다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Select a car:</p>
    <select ng-model="selectedCar" ng-options="x.model for x in cars"></select>   // Ford Mustang 선택시

    <h1>You selected: {{selectedCar.model}}</h1>  // You selected: Ford Mustang 출력
    <p>Its color is: {{selectedCar.color}}</p>    // Its color is: red 출력
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.cars = [
            {model : "Ford Mustang", color : "red"},
            {model : "Fiat 500", color : "white"},
            {model : "Volvo XC90", color : "black"}
        ];
    });
  </script>
  ```

<br>
<br>
<br>
<br>

## 03. 객체로서의 데이터 소스

이전 예제에서 데이터 소스는 배열이었지만 객체를 사용할 수도 있다.

<br>

- **Examples 1 :**

  ##### NOTE: 키(key)와 값(value)이 쌍으로 이루어진 객체가 있다고 가정

  ```
  $scope.cars = {
    car01 : "Ford",
    car02 : "Fiat",
    car03 : "Volvo"
  };
  ```

  <br>

  `ng-options` 속성의 표현식은 객체에 대해 약간 다르다.  
  아래 예제에서는 드롭다운 목록을 만들 때 데이터 소스로 객체를 사용하는 방법을 보여준다.  
  객체를 데이터 소스로 사용하면 x(car)는 키를 나타내고 y는 값을 나타낸다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Select a car:</p>
    <select ng-model="selectedCar" ng-options="car for (car, y) in cars"></select>
    <h1>You selected: {{selectedCar}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.cars = {
            car01 : "Ford",
            car02 : "Fiat",
            car03 : "Volvo"
        }
    });
  </script>
  ```

  _<small> url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_select_object</small>_

<br>

- **Examples 2 :**

  ##### NOTE: 키(key)와 값(value)이 쌍으로 이루어진 객체가 있으며 값(value)도 객체로 이루어져있다고 가정

  ```
  $scope.cars = {
    car01 : {brand : "Ford", model : "Mustang", color : "red"},
    car02 : {brand : "Fiat", model : "500", color : "white"},
    car03 : {brand : "Volvo", model : "XC90", color : "black"}
  };
  ```

  <br>

  선택한 값은 개체를 나타낸다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Select a car:</p>
    <select ng-model="selectedCar" ng-options="x for (x, y) in cars"></select>

    <h1>You selected: {{selectedCar.brand}}</h1>
    <h2>Model: {{selectedCar.model}}</h2>
    <h3>Color: {{selectedCar.color}}</h3>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.cars = {
            car01 : {brand : "Ford", model : "Mustang", color : "red"},
            car02 : {brand : "Fiat", model : "500", color : "white"},
            car03 : {brand : "Volvo", model : "XC90", color : "black"}
        }
    });
  </script>
  ```

  _<small> url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_select_object_object</small>_

  <br>

  드롭 다운 목록의 옵션은 key&value가 쌍으로 이루어질 필요는 없으며  
  그 목록 안에 표시되는 텍스트는 value 또는 value object의 속성일 수도 있다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Select a car:</p>
    <select ng-model="selectedCar" ng-options="y.brand for (x, y) in cars"></select>

    <h1>You selected: {{selectedCar.brand}}</h1>
    <h2>Model: {{selectedCar.model}}</h2>
    <h3>Color: {{selectedCar.color}}</h3>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.cars = {
            car01 : {brand : "Ford", model : "Mustang", color : "red"},
            car02 : {brand : "Fiat", model : "500", color : "white"},
            car03 : {brand : "Volvo", model : "XC90", color : "black"}
        }
    });
  </script>
  ```

<br>
<br>
<br>
<br>
<br>
<br>

---

<br>

# 1. AngularJS HTML DOM

#### &nbsp;&nbsp; AngularJS에는 애플리케이션 데이터를 HTML DOM 요소의 속성에 바인딩하기위한 지시문이 있다.

<br>

&nbsp;&nbsp; URL : https://www.w3schools.com/angular/angular_htmldom.asp

<br>

---

<br>

## 01. The ng-disabled Directive

`ng-disabled` 지시문은 AngularJS 애플리케이션 데이터를 HTML 요소의 disabled 속성(attribute)에 바인딩(binds)해 준다.

`ng-disabled` 지시문은 값을 `true`와 `false` 사이에서 이동할 수 있어야한다.  
HTML에서는 `disabled` 속성을 `false`로 설정할 수 없다. `disabled` 속성이 있으면 값에 관계 없이 요소가 비활성화된다.

<br>

- **Syntax :**

  `<input ng-disabled="expression"></input>`

  Supported by `<input>`, `<select>`, and `<textarea>` elements.

<br>

- **Parameter Values :**

  - expression : `true`를 반환하는 경우 요소의 `disabled` 속성을 설정하는 표현식

<br>

- **Examples 1 :**

  ```
  <body ng-app="">
    Click here to disable all the form fields: <input type="checkbox" ng-model="all">
    {{ all }}
    <br>
    <br>
    <input type="text" ng-disabled="all">   //
    <input type="radio" ng-disabled="all">
    <select ng-disabled="all">
      <option>Female</option>
      <option>Male</option>
    </select>
  </body>
  ```

  - 입력 필드 비활성화(Disable) / 활성화(enable)
  - `ng-disabled` 지시문은 form 필드(입력, 선택 또는 텍스트 영역)의 비활성화 된 속성을 설정해준다.
  - `ng-disabled` 속성 내의 표현식이 `true`를 반환하면 form 필드가 비활성화된다.

<br>

- **Examples 2 :**

  ```
  <div ng-app="" ng-init="mySwitch=true">
      <button ng-disabled="mySwitch">Click Me!</button>   // button이 체크되어있으면 비활성화
      <input type="checkbox" ng-model="mySwitch"/>Button
      {{ mySwitch }}  // button이 체크되어있으면 true 반환
  </div>

  // 즉 mySwitch 값이 true로 평가되면 버튼이 비활성화되고, false로 평가되면 버튼이 비활성화되지 않는다.
  ```

  - `ng-disabled` 지시문은 애플리케이션 데이터 `mySwitch`를 버튼의 `disabled` 속성에 바인딩하고 있다.
  - `ng-model` 지시문은 checkbox 요소의 값을 `mySwitch`의 값에 바인딩하고 있다.

<br>
<br>
<br>
<br>

## 02. The ng-show Directive

`ng-show` 지시문은 표현식이 `true`로 평가되면 지정된 HTML 요소를 표시하고 그렇지 않으면 HTML 요소가 숨겨진다.

<br>

- **Syntax :**

  `<element ng-show="expression"></element>`

  Supported by all HTML elements.

<br>

- **Parameter Values :**

  - expression : 표현식이 `true`를 반환하는 경우에만 요소를 표시하는 표현식

<br>

- **Examples 1 : `ng-show`는 `ture`or`false` 값을 기반으로 HTML 요소를 표시하거나 숨긴다**

  ```
  // 결과 : [I am visible.]

  <body>
    <div ng-app="">
      <p ng-show="true">I am visible.</p>
      <p ng-show="false">I am not visible.</p>    // false값이므로 출력되지 않음
    </div>
  </body>
  ```

<br>

- **Examples 2 : `checkbox`가 선택되면 true가 되어 섹션 표시**

  ```
  <body ng-app="">
    Show HTML: <input type="checkbox" ng-model="myVar"> {{myVar}}  // 체크됨 = true

    <div ng-show="myVar">   // 체크박스가 선택되면 출력
      <h1>Welcome</h1>
      <p>Welcome to my home.</p>
    </div>
  </body>
  ```

<br>

- **Examples 3 : hour은 12보다 크므로 true가 되어 HTML 요소를 표시**

  ```
  <body>
    <div ng-app="" ng-init="hour=13">
      <p ng-show="hour > 12"> I am visible. </p>  // 13 > 12 = true로 텍스트 출력됨
      {{hour}}   // 13
    </div>
  </body>
  ```

<br>
<br>
<br>
<br>

## 03. The ng-hide Directive

`ng-hide` 지시문은 HTML 요소를 숨기거나 표시해주는 것으로 표현식이 true로 평가되면 HTML 요소를 숨긴다.  
이는 AngularJS에 미리 정의 된 CSS 클래스이며 `display`를 `none`으로 설정해 준다.

<br>

- **Syntax :**

  `<element class="ng-hide"></element>`

  `<element ng-hide="expression"></element>` | when used as a CSS class

  Supported by all HTML elements.

<br>

- **Parameter Values :**

  - expression : 표현식이 `true`를 반환하는 경우 요소를 숨겨주는 표현식

<br>

- **Examples 1 : `checkbox`가 선택되면 true가 되어 섹션 숨김**

  ```
  <body ng-app="">
    Hide HTML: <input type="checkbox" ng-model="myVar">

    <div ng-hide="myVar">
      <h1>Welcome</h1>
      <p>Welcome to my home.</p>
    </div>
  </body>
  ```

<br>

- **Examples 2 : `ture`or`false` 값을 기반으로 HTML 요소를 표시하거나 숨긴다**

  ```
  <body>
    <div ng-app="">
      <p ng-hide="true">I am not visible.</p>   // true값이므로 element가 숨겨진다
      <p ng-hide="false">I am visible.</p>    // false값이므로 element가 출력된다
    </div>
  </body>
  ```

<br>

- **Examples 3 : `ng-show`와 마찬가지로 hour은 12보다 크므로 true가 되어 HTML 요소를 숨겨준다**

  ```
  <body>
    <div ng-app="" ng-init="hour=13">
      <p ng-hide="hour > 12">I am not visible.</p>  // 13 > 12 = true로 텍스트가 숨겨짐
      <p ng-hide="hour > 13">I am visible.</p>    // 12 > 13 = false이므로 텍스트가 표시됨
    </div>
  </body>
  ```
