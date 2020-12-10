# 1. AngularJS Scope

#### Scope는 HTML(View)과 JavaScript(Controller) 사이의 'Binding Part' 이다.

#### Scope는 사용 가능한 Properties(속성) 및 Methods가 있는 Object(개체)다.

#### Scope는 View와 Controller 모두에서 사용할 수 있다.

URL : https://www.w3schools.com/angular/angular_scopes.asp

---

<br>

## 01. How to Use the Scope?

AngularJS에서 Controller를 만들 때 `$scope`개체를 인수로 사용한다.  
Controller에서 만든 Properties(속성)는 View에서 참조 할 수 있다.

<br>

- **Examples :**

  ```
  // 결과 : [Volvo]

  <div ng-app="myApp" ng-controller="myCtrl">
    <h1>{{carname}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.carname = "Volvo";
    });
  </script>
  ```

  - 속성 `carname`은 컨트롤러에서 만들어졌으며 `{{}}`를 사용하여 View에서 참조 할 수 있다.
  - 컨트롤러의 `$scope`에 속성을 추가하면 View(HTML)가 그러한 속성에 액세스 할 수 있습니다.
  - View에서 접두사 `$scope`를 사용하지 않고 `{{carname}}`과 같은 속성 이름 만 참조한다.

<br>
<br>
<br>

## 02. Understanding the Scope

AngularJS 애플리케이션의 구성은 HTML인 View와, 현재 View에서 사용 가능한 데이터인 Model,  
데이터를 생성/변경/제거/제어하는 ​​JavaScript 함수인 Controller가 있다. 그리고 그 다음에 Scope Model이 있는데,  
Scope는 View와 Controller 둘다 사용할 수 있는 Properties & Methods가 있는 JavaScript Object이다.

<br>

- **Examples :**

  View를 변경하면 Model과 Controller가 업데이트된다.  
  `input`에서 텍스트를 변경하면 변경 사항이 모델에 영향을 미치고 컨트롤러의 `name` 속성에도 영향을 미친다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <input ng-model="name">
    <h1>My name is "{{name}}"</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.name = "John Doe";
    });
  </script>
  ```

<br>
<br>
<br>

## 03. Know Your Scope

다루고있는 Scope를 아는 것이 중요하다. 위의 두 예제에서는 Scope가 하나뿐이므로 해당 Scope를 아는 것은 문제가 되지 않지만,  
더 큰 응용 프로그램의 경우 HTML DOM에 특정 scopes에만 액세스 할 수 있는 섹션이 있을 수 있기 때문이다.

<br>

- **Examples :**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <ul>
      <li ng-repeat="test in names">{{test}}</li>
    </ul>
  </div>


  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.names = [
          "Emil",
          "Tobias",
          "Linus",
          "Address"
        ];
    });
  </script>
  ```

  - `ng-repeat` 지시문을 처리 할 때, 각 Repetition(반복)은 현재 반복 객체(Current Repetition Bbject)에 액세스 할 수 있다.
  - 변수 `test`는 각 Repetition(반복)에 대해 다른 값을 가지며 각각의 Repetition(반복)마다 자체 범위가 있음을 증명한다.
  - 각 `<li>` 요소는 현재 반복 개체(이 경우 `test`를 사용하여 참조되는 String)에 액세스 할 수 있다.

<br>
<br>
<br>

## 03. Know Your Scope

모든 애플리케이션에는 `ng-app` 지시문을 포함하는 HTML 요소에 생성 된 범위인 `$rootScope`가 있다.  
`$rootScope`는 전체 애플리케이션에서 사용할 수 있다.  
변수의 이름이 현재 scope와 rootScope 둘다 동일한 경우 애플리케이션은 현재 scope에 있는 것을 사용한다.

<br>

- **Examples :**

  ```
  <body ng-app="myApp">

    <p>The rootScope's favorite color:</p>
    <h1>{{color}}</h1>  // &rootScope가 적용되어 "blue"텍스트가 출력된다..

    <div ng-controller="myCtrl">
      <p>The scope of the controller's favorite color:</p>
      <h1>{{color}}</h1>   // controller의 $scope가 적용되어 "red"텍스트가 출력된다.
    </div>

    <p>The rootScope's favorite color is still:</p>
    <h1>{{color}}</h1>  // &rootScope가 적용되어 "blue"텍스트가 출력된다.

    <script>
      var app = angular.module('myApp', []);
      app.run(function($rootScope) {
          $rootScope.color = 'blue';
      });
      app.controller('myCtrl', function($scope) {
          $scope.color = "red";
      });
    </script>

  </body>
  ```

  - `color`라는 변수는 컨트롤러의 `$scope`와 `$rootScope`에 모두 존재한다.
  - `ng-controller`의 색상 변수는 `&rootScope`의 색상 값을 덮어 쓰지 않는 점을 주의.

<br>
<br>
<br>
<br>
<br>
<br>

# 2. AngularJS Filters

#### 데이터 형식(data format)을 지정하기 위해 AngularJS에 Filter를 추가 할 수 있다.

URL : https://www.w3schools.com/angular/angular_filters.asp

---

<br>

## 01. Filters 종류

AngularJS는 데이터를 변환하는 Filter를 제공합니다.

- currency 숫자를 통화 형식으로 지정해 준다.
- date 날짜를 지정된 형식으로 지정해 준다.
- filter 배열에서 항목의 하위 집합을 선택해 준다.
- json 객체를 JSON 문자열로 포맷해 준다.
- limitTo Array/String을 지정된 elements/characters로 제한시켜 준다.
- lowercase 문자열을 소문자로 포맷해 준다.
- number 숫자를 문자열로 포맷해 준다.
- orderBy 표현식으로 배열을 정렬해 준다.
- uppercase 문자열을 대문자로 포맷해 준다.

<br>
<br>
<br>

## 02. Adding Filters to Expressions

파이프 문자 `|` 뒤에 필터를 사용하여 필터를 표현식(Expressions)에 추가 할 수 있다.

- **Examples :**

  ```
  <div ng-app="myApp" ng-controller="personCtrl">
    <p>{{ firstName + " " + lastName | uppercase }}</p>  // JANE DOE
    <p>{{ firstName + " " + lastName | lowercase }}</p>  // jane doe
    <p>{{ firstName + " " + lastName | orderBy }}</p>   // [" ","a","D","e","e","J","n","o"]

    <p>{{ age | currency }}</p>   // $30.00
    <p>{{ age | number }}</p>   // 30
    <p>{{ age | orderBy }}</p>    // ["0","3"]

    <p>{{ birth | date }}</p>   // Dec 31, 1992
  </div>

  <script>
    angular.module('myApp', []).controller('personCtrl', function($scope) {
        $scope.firstName = "Jane",
        $scope.lastName = "Doe",
        $scope.age = "30",
        $scope.birth = "1992-12-31"
    });
  </script>
  ```

<br>
<br>
<br>

## 03. Adding Filters to Directives

필터는 파이프 문자 `|`와 필터를 사용하여 `ng-repeat`와 같은 지시문에 추가된다.
