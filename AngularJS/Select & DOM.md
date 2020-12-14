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

### 3) `ng-options` VS `ng-repeat`

<br>

- **Examples : 객체 배열이 있다고 가정**

  ```
  $scope.cars = [
    {model : "Ford Mustang", color : "red"},
    {model : "Fiat 500", color : "white"},
    {model : "Volvo XC90", color : "black"}
  ];
  ```

<br>

- **Examples : Using `ng-repeat`**

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
```
