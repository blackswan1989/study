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

  _url : https://www.w3schools.com/angular/tryit.asp?filename=try_ng_services_filter2_

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

Methods는 모두 `$http` 서비스를 호출하는 바로 가기(shortcuts)이다.

- Methods

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
  <script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope, $http) {
    $http({
      method : "GET",
      url : "welcome.htm"
    }).then(function mySuccess(response) {
        $scope.myWelcome = response.data;
      }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
  });
  </script>
  ```

  객체는 HTTP Methods, URL, 성공시 수행 할 작업 및 실패시 수행 할 작업을 지정해 준다.
