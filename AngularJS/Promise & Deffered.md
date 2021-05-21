<br>

## 1. AngularJS - $q 서비스

<br>

AngularJS는 앞에서 본 Common JS Promises/A 스펙에 대한 구현 API를 $q 서비스를 이용해 제공하는 것으로,

AngularJS의 scope 모델의 데이터 바인딩에 대한 처리가 최적화돼 있다.

<br> 
<br>
<br>

## 2. Promise 객체

<br>

Promise는 문자 그대로 약속을 표현하는 자바스크립트 객체다. 약속은 지켜질 수 있고 물론 지켜지지 않을 수도 있다.

```
var promiseWithStudent = Student.doHomework(homework);

promiseWithStudent.then(
  function (data) {
    //then 메소드의 첫번째 인자로 전달되는 콜백함수는 약속이 지켜지면 실행된다.
    if (Teacher.makeScore(data) === 100) {
      Teacher.giveCandy(100, Student);
    } else {
      Teacher.giveCandy(50, Student);
    }
  },

  //then 메소드의 두번째 인자로 전달되는 콜백함수는 약속을 어기면(취소/거절) 실행된다.

  function (error) {
    Teacher.hitHip(100, Student);
  }
);
```

학생이 숙제를 해온다고 약속하면 위 코드에서는 promise 객체를 반환한다고 생각하면 된다.

그리고 약속이 지켜질 때와 지켜지지 않을 때를 then 메서드를 이용해 정의하는데,
지켜지면 첫 번째 콜백 함수가 호출되고 지켜지지 않으면 두 번째 콜백 함수가 호출된다.

이 처럼 promise 객체는 미래에 지켜지거나 지켜지지 않을 일을 객체로 표현했고,
이 일들에 대한 처리를 then 메서드를 이용해 처리하는 것이다.

실제 AngularJS에서는 `$http`, `$timeoute`, `$resource`, `$route` 등 여러 서비스에서 promise 객체를 반환한다.

<br> 
<br>
<br>

## 3. Deferred 객체

<br>

약속이 지켜지거나 거절될 때의 일을 정의하였으면 누군가는 약속을 지키거나 거절해야 한다. 이러한 일을 하는 것이 바로 `deferred` 객체다.

약속을 만든 사람이 약속을 거절하고 취소하듯이 `deferred`는 약속을 만들고 이 약속의 상태를 변경한다.

AnguarJS에서는 `$q.defer()`를 이용해 deferred 객체를 생성할 수 있다(deferred 객체의 생성은 곧 promise의 생성이기도 하다).

이렇게 생성한 deferred 객체는 `resolve`, `reject`, `notify`를 통하여 약속을 지키거나 거절/취소하거나 진행 상태를 알려주게 된다.

deferred객체는 주로 별도의 서비스를 만들고 해당 서비스에서 생성하여 해당 객체의 약속을 반환하는 식으로 많이 사용한다.

```
angular
  .module("demo-app", [])
  .factory("userService", function ($http, $log, $q) {
    return {
      getUser: function (userId) {
        var deferred = $q.defer(); //deferred 객체를 생성한다.

        $http
          .get("/api/users/" + userID)
          .success(function (data) {
            deferred.resolve({
              //요청이 성공하면 약속을 지키고 별도 데이터를 전달한다.
              name: data.name,
              address: data.address,
            });
          })
          .error(function (
            msg,
            code //요청이 실패하면 약속을 취소하고 메시지를 전달한다.
          ) {
            deferred.reject(msg);
            $log.error(msg, code);
          });

        return deferred.promise; //해당 deferred 객체의 약속을 반환한다.
      },
    };
  });
```

출처 : https://backback.tistory.com/121 [Back Ground]
