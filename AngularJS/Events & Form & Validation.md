<br>

# 1. AngularJS Events

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

## 01. Mouse Events

<br>

&nbsp; 마우스 이벤트는 커서가 다음 순서대로 요소 위로 이동할 때 발생 된다.

&nbsp;&nbsp; 1) `ng-mouseover`
&nbsp;&nbsp; 2) `ng-mouseenter`
&nbsp;&nbsp; 3) `ng-mousemove`
&nbsp;&nbsp; 4) `ng-mouseleave`

<br>

&nbsp; 또는 요소에서 마우스 버튼을 클릭 할 때 다음 순서로 모든 HTML 요소에 마우스 이벤트를 추가 할 수 있다.

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

&nbsp; 버튼이 Toggle 스위치 처럼 작동하도록 한다. 즉 버튼을 클릭 할 때 HTML 섹션을 표시하고  
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
