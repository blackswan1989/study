<br>

# 1. AngularJS Services

#### &nbsp;&nbsp; AngularJS에서는 자신 만의 서비스를 만들거나 많은 내장 서비스 중 하나를 사용할 수 있다.

<br>

&nbsp;&nbsp; URL : https://www.w3schools.com/angular/angular_services.asp

<br>

---

<br>

## 01. What is a Service?

AngularJS에서 Service는 애플리케이션에서 사용 가능(available)하고 제한(limited) 될 수 있는 함수(function) 또는 객체(object)이다.  
 AngularJS에는 약 30개의 내장(built-in) 서비스가 있다. 그중 하나가 `$location` service이다.  
 `$location` 서비스에는 현재 웹 페이지의 위치에 대한 정보를 반환하는 메서드가 있다.

<br>

- **Examples : `$location` 내장 Service를 사용하여 페이지의 절대적인(absolute) URL을 가져와 준다.**

  ```
  // 결과(현재 주소) : [https://www.w3schools.com/angular/tryit.asp?filename=try_ng_services]

  <div ng-app="myApp" ng-controller="myCtrl">
    <p>The url of this page is:</p>
    <h3>{{myUrl}}</h3>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope, $location) {  // 컨트롤러에서 $location 사용
        $scope.myUrl = $location.absUrl();
    });
  </script>
  ```

  NOTE: `$location`는 컨트롤러에 인수(argument)로 전달되고, 컨트롤러에서 서비스를 사용하려면 종속성(dependency)으로 정의해야한다.

<br>

- #### Why use Services?

  `$location`와 같은 많은 서비스들의 경우, `window.location` 객체(object)처럼  
  이미 DOM에 있는 객체를 사용할 수 있지만, 적어도 몇 가지 제한 사항이 있다.  
  Angular JS는 애플리케이션을 지속적으로 감독하고 변경사항들과 이벤트들을 적절하게 처리하도록 하기 위해,  
  `window.location` 대신 `$location` 서비스를 사용하는 것을 선호한다.

<br>
<br>
<br>

## 02. The $http Service

`$http` 서비스는 가장 흔히 사용되는 서비스 중 하나로 서버에 요청을 하고 응용프로그램이 응답을 처리하도록 해준다.
즉 AngularJS `$http` 서비스는 서버에 요청(request)하고 응답(response)을 반환합니다.

<br>

- **Examples 1 : $http 서비스를 사용하여 서버에서 데이터를 요청한다.**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Today's welcome message is:</p>
    <h1> {{myWelcome}} </h1>    // "Hello AngularJS Students" 출력된다.
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope, $http) {   // 1) $http는 서버의 한 페이지를 요청한다.
      $http.get("welcome.htm").then(function (response) {
          $scope.myWelcome = response.data;   // 2) 응답은 "myWelcome" 변수의 값으로 설정된다.
      });
    });
  </script>
  ```

<br>
<br>
<br>

## 03. The $timeout Service

`$timeout` 서비스는 `window.setTimeout` function의 AngularJS 버전이다.

<br>

- **Examples : `$timeout`은 지정된 밀리 초 후에 함수를 실행해 준다.**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>This header will change after two seconds:</p>
    <h1>{{myHeader}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope, $timeout) {
      $scope.myHeader = "Hello World!";
      $timeout(function () {
          $scope.myHeader = "How are you today?";
      }, 2000);   // 2000 밀리초 = 2초 후 해당 함수 실행
      $timeout(function () {
          $scope.myHeader = "How are you today??????";
      }, 4000);   // 4초 후 해당 함수 실행
    });

  </script>
  ```

<br>
<br>
<br>

## 04. The $interval Service

$ interval 서비스는 window.setInterval 함수의 AngularJS 버전입니다.

<br>

- **Examples : `$timeout`은 지정된 밀리 초 후에 함수를 실행해 준다.**

```
// $interval 서비스는 지정된 밀리초마다 함수를 실행해 준다 -> 현재 로컬 시간이 초단위로 표시된다.

<script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope, $interval) {
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);
  });
</script>
```

<br>
<br>
<br>

## 05. Custom Service & Service Inside a Filter

<br>

### 1) Create Your Own Service

자체 서비스를 생성하려면 서비스를 Module에 연결해야 한다.

<br>

- **Examples : `hexafy`라는 이름의 서비스 만들기**

  사용자 지정 서비스를 사용하려면 컨트롤러를 정의할 때 해당 서비스를 종속성으로 추가해야 한다.
  숫자를 16 진수로 변환하려면 직접 만든 `hexafy`라는 사용자 지정 서비스를 사용하면 된다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>The hexadecimal value of 255 is:</p>  // 255의 16 진수 값은 다음과 같다.
    <h1>{{hex}}</h1>    // 결과값 출력
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.service('hexafy', function() {   // 숫자를 16 진수로 변환하는 메서드가있는 사용자 지정 서비스이다.
        this.myFunc = function (x) {
            return x.toString(16);
        }
    });
    app.controller('myCtrl', function($scope, hexafy) {
      $scope.hex = hexafy.myFunc(5000);
    });
  </script>

  결과 : [The hexadecimal value of 255 is: 1388]
  ```

<br>
<br>
<br>

### 2) Use a Custom Service Inside a Filter

서비스를 생성하고 애플리케이션에 연결 한 후에는 모든 controller, directive, filter 또는 다른 서비스 내에서도 해당 서비스를 사용할 수 있다.

필터 내부의 서비스를 사용하려면 필터를 정의할 때 종속성으로 추가해야 한다.

<br>

- **Examples : The service `hexafy` used in the filter `myFormat`**

  ```
  <div ng-app="myApp">
    <h1> {{5000 | myFormat}} </h1>  // 결과값 : 1388
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.service('hexafy', function() {
        this.myFunc = function (x) {
            return x.toString(16);
        }
    });
    app.filter('myFormat',['hexafy', function(hexafy) {
        return function(x) {
            return hexafy.myFunc(x);
        };
    }]);
  </script>
  ```

  <br>

  추가로 객체 또는 배열의 값을 표시 할 때 필터를 사용할 수 있다.

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <ul>
      <li ng-repeat="x in counts">{{x | myFormat}}</li>
    </ul>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.service('hexafy', function() {
        this.myFunc = function (x) {
            return x.toString(16);
        }
    });
    app.filter('myFormat',['hexafy', function(hexafy) {
        return function(x) {
            return hexafy.myFunc(x);
        };
    }]);
    app.controller('myCtrl', function($scope) {
        $scope.counts = [5000, 251, 200];
    });
  </script>


  // 결과 : [1388, fb, c8]
  ```

  <small>_url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_services_filter2_</small>

  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

---

<br>

# 2. AngularJS AJAX - $http

#### &nbsp;&nbsp;`$http`는 원격 서버에서 데이터를 읽기위한 AngularJS 서비스이다.

<br>

&nbsp;&nbsp; URL : https://www.w3schools.com/angular/angular_http.asp

<br>

---

<br>

## 01. AngularJS $http

AngularJS `$http` 서비스는 서버에 요청(request)하고 응답(response)을 반환(return)해 준다.

<br>

### 1) Methods

Methods는 모두 `$http` 서비스를 호출하는 바로 가기(shortcuts)이다.

- `.delete()`
- `.get()`
- `.head()`
- `.jsonp()`
- `.patch()`
- `.post()`
- `.put()`

  <br>

- **Examples : 객체(object)를 인수(argument)로 사용하여 `$http` 서비스를 실행한다.**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Today's welcome message is:</p>
    <h1>{{myWelcome}}</h1>
  </div>

  <script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope, $http) {
    $http({
      method : "GET",
      url : "welcome.htm"
    }).then(function(response) {    // 성공할 경우 수행
        $scope.myWelcome = response.data;
    }).catch(function(response) {   // 실패할 경우 수행
        $scope.myWelcome = response.statusText;
    });
  });
  </script>

  // 결과 : [Today's welcome message is: Hello AngularJS Students]
  ```

  - 위 예제에서는 객체를 인수로 사용하여 `$http` 서비스를 실행한다.
  - `$http` 서비스는 서버의 페이지를 요청하고 응답은 `"myWelcome"`변수의 값으로 설정된다.
  - HTTP Methods, URL, 성공시 수행 할 작업 및 실패시 수행 할 작업을 지정해 준다.

<br>
<br>
<br>

### 2) Properties

서버의 응답(response)은 다음 속성들(properties)을 가진 객체(object)이다.

- `.config` : 요청을 생성하는 데 사용되는 객체
- `.data` : 서버에서 응답을 전달하는 문자열 또는 객체
- `.headers` 헤더 정보를 얻는 데 사용하는 함수(function)
- `.status` HTTP 상태를 정의하는 숫자
- `.statusText` HTTP 상태를 정의하는 문자열

&nbsp;&nbsp;&nbsp; <small>HTTP response status codes : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status</small>

<br>

- **Examples 1 : 응답 객체(response object)의 속성들(properties)중에 data, status, statusText 값 예시**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <p>Data : {{content}}</p>
    <p>Status : {{statuscode}}</p>
    <p>StatusText : {{statustext}}</p>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope, $http) {
      $http.get("welcome.htm")
      .then(function(response) {
          $scope.content = response.data;
          $scope.statuscode = response.status;
          $scope.statustext = response.statusText;
      });
    });
  </script>

  // 결과 : [ Data : Hello AngularJS Students, Status : 200,  StatusText :     ]
  ```

<br>

- **Examples 2 : 에러를 처리하기 위해 `.then` method에 function을 추가한 예시**

  ```
  <div ng-app="myApp" ng-controller="myCtrl">
    <h1>{{content}}</h1>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope, $http) {
      $http.get("wrongfilename.htm").then(function(response) {
        $scope.content = response.data;
      }, function(response) {
          $scope.content = "Something went wrong!";
      });
    });
  </script>

  // 결과 : [ Something went wrong! ]
  ```

  - `$http` 서비스는 성공과 실패에 대해 다른 기능을 실행한다.

<br>
<br>
<br>

### 3) JSON

- 응답(response)에서 얻은 데이터는 JSON 형식이어야 한다.
- JSON은 데이터를 전송하는 훌륭한 방법이며 AngularJS 또는 다른 JavaScript 내에서 사용하기 쉽다.
- EX) 서버에는 15명의 고객이 포함 된 JSON 객체를 반환하는 파일이 있으며 모두 `records`라는 배열로 래핑(wrapped)되어 있다.
- EX) IMG : `records` JSON (customers.php)

  <img width="300" alt="customers" src="https://user-images.githubusercontent.com/67410919/102034371-35986000-3e01-11eb-882d-8be071d491a7.PNG">

<br>

- **Examples : `ng-repeat` 지시문을 사용한 예시**

  ```
  <div ng-app="myApp" ng-controller="customersCtrl">
    <ul>
      <li ng-repeat="test in myData">
        {{ test.Name + ', ' + test.Country }}  // Name과 Country정보가 출력된다. (City로 하면 도시 정보 출력)
      </li>
    </ul>
  </div>

  <script>
    var app = angular.module('myApp', []);
    app.controller('customersCtrl', function($scope, $http) {
      $http.get("customers.php").then(function (response) {
          $scope.myData = response.data.records;
      });
    });
  </script>

  // 결과 : [ - Alfreds Futterkiste, Germany    - Ana Trujillo Emparedados y helados, Mexico... ]
  ```

  - `$scope` 및 `$http` 객체를 사용하여 `customersCtrl` 컨트롤러를 정의한다.
  - `$http`는 외부 데이터를 요청하기 위한 `XMLHttpRequest` object이다.
  - `$http.get()`은 "https://www.w3schools.com/angular/customers.php"에서 JSON 데이터를 읽어온다.
  - `$http.get()`에 성공하면 컨트롤러는 서버의 JSON 데이터를 사용하여 scope에 `myData` 속성을 만든다.
  - <small> url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_customers_json</small>
