<br>

# 1. AngularJS Scope

#### &nbsp;&nbsp; Scope는 HTML(View)과 JavaScript(Controller) 사이의 'Binding Part' 이다.

#### &nbsp;&nbsp; Scope는 사용 가능한 Properties(속성) 및 Methods가 있는 Object(개체)다.

#### &nbsp;&nbsp; Scope는 View와 Controller 모두에서 사용할 수 있다.

<br>

&nbsp;&nbsp; URL : https://www.w3schools.com/angular/angular_scopes.asp

<br>

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
    <h1>{{color}}</h1>  // $rootScope가 적용되어 "blue"텍스트가 출력된다..

    <div ng-controller="myCtrl">
      <p>The scope of the controller's favorite color:</p>
      <h1>{{color}}</h1>   // controller의 $scope가 적용되어 "red"텍스트가 출력된다.
    </div>

    <p>The rootScope's favorite color is still:</p>
    <h1>{{color}}</h1>  // $rootScope가 적용되어 "blue"텍스트가 출력된다.

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

---

<br>

# 2. AngularJS Filters

#### &nbsp;&nbsp;데이터 형식(data format)을 지정하기 위해 AngularJS에 Filter를 추가 할 수 있다.

<br>

&nbsp;&nbsp; URL : https://www.w3schools.com/angular/angular_filters.asp

<br>

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
- orderBy 배열 형식으로 정렬해 준다.
- uppercase 문자열을 대문자로 포맷해 준다.

<br>
<br>
<br>

## 02. Adding Filters to Expressions

파이프 문자 `|` 뒤에 필터를 사용하여 필터를 표현식(Expressions)에 추가 할 수 있다.

<br>

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

<br>

- **Examples :**

  ```
  <div ng-app="myApp" ng-controller="namesCtrl">
    <p>Looping with objects:</p>  // Objects로 반복
    <ul>
      <li ng-repeat="x in names | orderBy:'country'">   // "country" 항목이 알파벳 순으로 재정렬되도록 한다.
        {{ x.name + ', ' + x.country }}
      </li>
    </ul>
  </div>

  <script>
    angular.module('myApp', []).controller('namesCtrl', function($scope) {
        $scope.names = [
          {name:'Jani',country:'Norway'},
          {name:'Carl',country:'Sweden'},
          {name:'Margareth',country:'England'},
          {name:'Hege',country:'Norway'},
          {name:'Joe',country:'Denmark'},
          {name:'Gustav',country:'Sweden'},
          {name:'Birgit',country:'Denmark'},
          {name:'Mary',country:'England'},
          {name:'Kai',country:'Norway'}
            ];
    });
  </script>
  ```

<br>
<br>
<br>

## 04. The currency Filter

`currency` 필터는 숫자를 통화($) 형식으로 지정해 준다.  
기본적으로 locale(장소) 통화 형식이 사용된다.

<br>

- **Syntax :**

  `{{ number | currency : symbol : fractionsize }}`

<br>

- **Parameter Values :**

  - symbol : 선택사항으로 표시 할 통화 기호. 기호는 모든 문자 또는 텍스트 일 ​​수 있다.
  - fractionsize : 선택사항으로 소수 자릿수 표시 여부.

<br>

- **Examples 1 :**

  ```
  // 결과 : [Price: $58.00]

  <div ng-app="myApp" ng-controller="costCtrl">
    <h1>Price: {{ price | currency }}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('costCtrl', function($scope) {
        $scope.price = 58;
    });
  </script>
  ```

<br>

- **Examples 2 : 노르웨이 통화 형식으로 소숫점을 추가하여 가격을 표시**

  ```
  // 결과 : [Price = NOK9.990]

  <div ng-app="myApp" ng-controller="costCtrl">
    <p>Price = {{ price | currency : "NOK" : 3}}</p>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('costCtrl', function($scope) {
        $scope.price = 9.99;
    });
  </script>

  // "NOK" 기호 매개 변수를 설정하여 통화 기호를 변경할 수 있다.
  // fractionsize 매개 변수를 3으로 설정하여 입력하면 소숫점 3자리까지 표시 된다.
  ```

<br>
<br>
<br>

## 05. The 'filter' Filter

`filter` 필터는 Array(배열)의 하위 집합을 선택해 준다.  
이는 배열에서만 사용할 수 있으며 `filter`와 일치하는 항목만 포함하는 배열을 반환한다.

<br>

- **Syntax :**

  `{{ arrayexpression | filter : expression : comparator }}`

<br>

- **Parameter Values :**

  1. expression : 배열에서 항목을 선택할 때 사용되는 식이다. 표현식은 다음과 같은 유형일 수 있다.

     - String : 문자열과 일치하는 배열 항목이 반환된다.
     - Object : 객체는 `filter: {"name" : "H", "city": "London"}` 처럼 배열에서 검색 할 패턴이다.
     - Function : 각 배열 항목에 대해 호출되는 함수이며, 함수가 true를 반환하는 항목은 '결과 배열'에서 호출된다.

  2. comparator : 선택사항으로 비교가 얼마나 엄격해야 하는지를 규정한다. 이 값은 다음과 같을 수 있다.

     - true : 배열 항목의 값이 우리가 비교하는 것과 정확히 일치하는 경우에만 일치 항목을 반환한다.
     - false : 배열 항목의 값에 비교한 내용이 포함되어 있는 경우 일치하는 항목을 반환한다. 이 비교는 대소문자를 구분하지 않는다.(default)
     - function : 일치여부를 정의할 수 있는 함수.

<br>

- **Examples 1 : 문자 "i"가 포함 된 이름을 반환해 준다.**

  ```
  <div ng-app="myApp" ng-controller="namesCtrl">
    <ul>
      <li ng-repeat="x in names | filter : 'i'">
        {{ x }}   // 문자 "i"를 포함하는 이름들인 Jani, Birgit, Kai 가 반환된다.
      </li>
    </ul>
  </div>

  <script>
    angular.module('myApp', []).controller('namesCtrl', function($scope) {
        $scope.names = [
            'Jani',
            'Carl',
            'Margareth',
            'Hege',
            'Joe',
            'Gustav',
            'Birgit',
            'Mary',
            'Kai'
        ];
    });
  </script>
  ```

<br>

- **Examples 2 : filter를 통해 name중 'O'가 들어가는 동시에 city가 'London'인 값을 반환 해 준다.**

  ```
  // 결과 : [Around the Horn, London]

  <div ng-app="myApp" ng-controller="arrCtrl">
    <ul>
      <li ng-repeat="x in customers | filter : {'name' : 'O', 'city' : 'London'}"> {{x.name + ", " + x.city}} </li>
    </ul>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('arrCtrl', function($scope) {
        $scope.customers = [
            {"name" : "Alfreds Futterkiste", "city" : "Berlin"},
            {"name" : "Around the Horn", "city" : "London"},
            {"name" : "B's Beverages", "city" : "London"},
            {"name" : "Bólido Comidas preparadas", "city" : "Madrid"},
            {"name" : "Bon app", "city" : "Marseille"},
            {"name" : "Bottom-Dollar Marketse" ,"city" : "Tsawassen"},
            {"name" : "Cactus Comidas para llevar", "city" : "Buenos Aires"}
        ];
    });
  </script>
  ```

<br>

- **Examples 3 : 다음 식과 정확히 같은 값이 아니면 일치를 반환하지 않는 "엄격한" 비교를 수행해 준다.**

  ```
  // 결과 : [London Food, London]

  <div ng-app="myApp" ng-controller="arrCtrl">
    <ul>
      <li ng-repeat="x in customers | filter : 'London' : true"> {{x.name + ", " + x.city}} </li>
    </ul>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('arrCtrl', function($scope) {
        $scope.customers = [
            {"name" : "London Food", "city" : "London"},
            {"name" : "London Catering", "city" : "London City"},
            {"name" : "London Travel", "city" : "Heathrow, London"}
        ];
    });
  </script>
  ```

<br>
<br>
<br>

## 06. Filter an Array Based on User Input

사용자가 입력한 내용을 기준으로 Array를 필터링해 준다.  
`ng-model` 지시어를 input field에 설정하면 input field 값을 필터의 표현식(expression)으로 사용할 수 있다.  
input field에 문자를 입력하면 일치 항목에 따라 목록이 축소(shrink)/증가(grow)한다.

<br>

- **Examples 1 : 사용자가 Input에 입력한 내용을 기준으로 Array를 필터링해 준다.**

  ```
  <div ng-app="myApp" ng-controller="namesCtrl">
    <p><input type="text" ng-model="test"></p>

    <ul>
      <li ng-repeat="x in names | filter:test">  // `names` 목록은 필터와 일치하는 내용으로만 반환된다.
        {{ x }}
      </li>
    </ul>
  </div>

  <script>
    angular.module('myApp', []).controller('namesCtrl', function($scope) {
        $scope.names = [
            'Jani',
            'Carl',
            'Margareth',
            'Hege',
            'Joe',
            'Gustav',
            'Birgit',
            'Mary',
            'Kai'
        ];
    });
  </script>
  ```

  _url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_filters_input_

<br>

- **Examples 2 : 사용자 입력에 따라 배열을 정렬해 준다.**

  테이블 헤더에 `ng-click` 지시어를 추가하여 배열의 정렬 순서를 변경하는 함수를 실행할 수 있다.

  ```
  <div ng-app="myApp" ng-controller="namesCtrl">
    <table border="1" width="100%">
      <tr>
        <th ng-click="orderByMe('name')">Name</th>  //  "Name"을 클릭하면 이름(알파펫) 순으로 정렬된다.
        <th ng-click="orderByMe('country')">Country</th>  "Country"를 클릭하면 나라(알파펫) 순으로 정렬된다.
      </tr>
      <tr ng-repeat="x in names | orderBy:myOrderBy">
        <td>{{x.name}}</td>
        <td>{{x.country}}</td>
      </tr>
    </table>
  </div>

  <script>
    angular.module('myApp', []).controller('namesCtrl', function($scope) {
        $scope.names = [
            {name:'Jani',country:'Norway'},
            {name:'Carl',country:'Sweden'},
            {name:'Margareth',country:'England'},
            {name:'Hege',country:'Norway'},
            {name:'Joe',country:'Denmark'},
            {name:'Gustav',country:'Sweden'},
            {name:'Birgit',country:'Denmark'},
            {name:'Mary',country:'England'},
            {name:'Kai',country:'Norway'}
            ];
        $scope.orderByMe = function(x) {
            $scope.myOrderBy = x;
        }
    });
  </script>
  ```

  _url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_filters_orderby_click_

<br>
<br>
<br>

## 07. Custom Filters

새로운 필터 팩토리 기능(factory function)을 모듈(module)에 등록(registering)하여 자신만의 필터를 만들 수 있다.

<br>

- **Examples : `myFormat` 이라는 사용자 정의 필터 만들기**

  ```
  <ul ng-app="myApp" ng-controller="namesCtrl">
    <li ng-repeat="newFilter in names">
        {{newFilter | myFormat}}
    </li>
  </ul>

  <script>
    var app = angular.module('myApp', []);
    app.filter('myFormat', function() {
        return function(newFilter) {
            var i, c, txt = "";
            for (i = 0; i < newFilter.length; i++) {
                c = newFilter[i];
                if (i % 2 == 0) {   // 짝수번째 문자마다 대문자로 바꾸어준다.
                    c = c.toUpperCase();
                }
                txt += c;
            }
            return txt;
        };
    });
    app.controller('namesCtrl', function($scope) {
        $scope.names = [
            'Jani',
            'Carl',
            'Margareth',    // 결과 : [MaRgArEtH]
            'Hege',
            'Joe',
            'Gustav',   // 결과 : [GuStAv]
            'Birgit',
            'Mary',
            'Kai'
            ];
    });
  </script>
  ```
