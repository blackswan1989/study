<br>

## ‘Promise는 자바스크립트 비동기 처리에 사용되는 객체’ 이다.

<br>

URL: https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/

<br>

---

<br>

# 1. 비동기 처리란?

<br>

---

<br>

자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미합니다.

<br>
<br>

## &nbsp;&nbsp;1) 비동기 처리 예제

<br>

- **Example: 제이쿼리의 ajax**

  ```
  function getData() {
    var tableData;
    $.get('https://domain.com/products/1', function(response) {
      tableData = response;
    });
    return tableData;
  }

  console.log(getData()); // undefined
  ```

  > 여기서 $.get()이 ajax 통신을 하는 부분입니다. https://domain.com 에다가 HTTP GET 요청을 날려 1번 상품(product) 정보를 요청하는 코드죠. 좀 더 쉽게 말하면 지정된 URL에 ‘데이터를 하나 보내주세요’ 라는 요청을 날리는 것과 같습니다.
  >
  > 그렇게 서버에서 받아온 데이터는 response 인자에 담깁니다. 그리고 tableData = response; 코드로 받아온 데이터를 tableData라는 변수에 저장합니다. 그럼 이제 이 getData()를 호출하면 어떻게 될까요? 받아온 데이터가 뭐든 일단 뭔가 찍혀야겠죠. 근데 결과는 맨 아래에서 보시는 것처럼 undefined입니다. 왜 그럴까요?
  >
  > 그 이유는 $.get()로 데이터를 요청하고 받아올 때까지 기다려주지 않고 다음 코드인 return tableData;를 실행했기 때문입니다. 따라서, getData()의 결과 값은 초기 값을 설정하지 않은 tableData의 값 undefined를 출력합니다.
  >
  > 이렇게 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기 처리입니다. 자바스크립트에서 비동기 처리가 필요한 이유를 생각해보면, 화면에서 서버로 데이터를 요청했을 때 서버가 언제 그 요청에 대한 응답을 줄지도 모르는데 마냥 다른 코드를 실행 안 하고 기다릴 순 없기 때문입니다. 위에선 간단한 요청 1개만 보냈는데 만약 100개 보낸다고 생각해보세요. 비동기 처리가 아니고 동기 처리라면 코드 실행하고 기다리고, 실행하고 기다리고.. 아마 웹 애플리케이션을 실행하는데 수십 분은 걸릴 겁니다.

<br>
<br>
<br>

## 2) 콜백 함수로 비동기 처리 방식의 문제점 해결하기

<br>

- **Solution: 위의 제이쿼리의 ajax통신 코드를 콜백 함수로 개선**

  ```
  function getData(callbackFunc) {
    $.get('https://domain.com/products/1', function(response) {
      callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
    });
  }

  getData(function(tableData) {
    console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
  });
  ```

  - 이렇게 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬 수 있습니다.

  > 비유하자면 콜백 함수의 동작 방식은 일종의 식당 자리 예약과 같습니다. 일반적으로 맛집을 가면 사람이 많아 자리가 없습니다. 그래서 대기자 명단에 이름을 쓴 다음에 자리가 날 때까지 주변 식당을 돌아다니죠. 만약 식당에서 자리가 생기면 전화로 자리가 났다고 연락이 옵니다.
  >
  > 그 전화를 받는 시점이 여기서의 콜백 함수가 호출되는 시점과 같습니다. 손님 입장에서는 자리가 날 때까지 식당에서 기다리지 않고 근처 가게에서 잠깐 쇼핑을 할 수도 있고 아니면 다른 식당 자리를 알아볼 수도 있습니다.
  >
  > 자리가 났을 때만 연락이 오기 때문에 미리 가서 기다릴 필요도 없고, 직접 식당 안에 들어가서 자리가 비어 있는지 확인할 필요도 없습니다. 자리가 준비된 시점, 즉 데이터가 준비된 시점에서만 저희가 원하는 동작(자리에 앉는다, 특정 값을 출력한다 등)을 수행할 수 있습니다.

<br>
<br>
<br>

## 3) 콜백 지옥 (Callback hell)

<br>

```
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```

> 웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있습니다. 만약 이 모든 과정을 비동기로 처리해야 한다고 하면 위와 같이 콜백 안에 콜백을 계속 무는 형식으로 코딩을 하게 됩니다. 이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵습니다. 이와 같은 코드 구조를 콜백 지옥이라고 합니다.

<br>
<br>
<br>

## 4) 콜백 지옥을 해결하는 방법

<br>

일반적으로 콜백 지옥을 해결하는 방법에는 Promise나 Async를 사용하는 방법이 있습니다. 만약 코딩 패턴으로만 콜백 지옥을 해결하려면 아래와 같이 각 콜백 함수를 분리해주면 됩니다.

<br>

- **Example: 콜백 지옥 개선**

  ```
  function parseValueDone(id) {
    auth(id, authDone);
  }

  function authDone(result) {
    display(result, displayDone);
  }

  function displayDone(text) {
    console.log(text);
  }

  $.get('url', function(response) {
    parseValue(response, parseValueDone);
  });
  ```

  > 위 코드는 앞의 콜백 지옥 예시를 개선한 코드입니다. 중첩해서 선언했던 콜백 익명 함수를 각각의 함수로 구분하였습니다. 정리된 코드를 간단하게 살펴보겠습니다.
  >
  > 먼저 ajax 통신으로 받은 데이터를 parseValue() 메서드로 파싱 합니다. parseValueDone()에 파싱 한 결과값인 id가 전달되고 auth() 메서드가 실행됩니다.
  >
  > auth() 메서드로 인증을 거치고 나면 콜백 함수 authDone()이 실행됩니다.
  >
  > 인증 결과 값인 result로 display()를 호출하면 마지막으로 displayDone() 메서드가 수행되면서 text가 콘솔에 출력됩니다.
  >
  > 위와 같은 코딩 패턴으로도 콜백 지옥을 해결할 수 있지만 Promise나 Async를 이용하면 더 편하게 구현할 수 있습니다.

<br>
<br>
<br>
<br>
<br>

---

<br>

# 자바스크립트의 Promise

<br>

URL : https://joshua1988.github.io/web-development/javascript/promise-for-beginners/

<br>

---

<br>

## 1. Promise란?

<br>

"Promise는 미래에 단일 값을 생성 할 수있는 객체"로 자바스크립트 비동기 처리에 사용되는 객체입니다. 여기서 자바스크립트의 비동기 처리란 ‘특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성’을 의미합니다.

<br>

프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용하는데, 일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아오기 위해 아래와 같은 API를 사용합니다.

```
$.get('url 주소/products/1', function(response) {
  // ...
});
```

> 위 API가 실행되면 서버에다가 ‘데이터 하나 보내주세요’ 라는 요청을 보내죠. 그런데 여기서 데이터를 받아오기도 전에 마치 데이터를 다 받아온 것 마냥 화면에 데이터를 표시하려고 하면 오류가 발생하거나 빈 화면이 뜹니다.
>
> 이와 같은 문제점을 해결하기 위한 방법 중 하나가 **Promise**입니다.

<br>
<br>

### # Example

<br>

- **Example: 1) ajax 통신 코드**

  ```
  function getData(callbackFunc) {
    $.get('url 주소/products/1', function(response) {
      callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
    });
  }

  getData(function(tableData) {
    console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
  });
  ```

  위 코드는 제이쿼리의 ajax 통신 API를 이용하여 지정된 url에서 1번 상품 데이터를 받아오는 코드입니다. 비동기 처리를 위해 프로미스 대신에 콜백 함수를 사용했습니다.

<br>

- **Example: 2) `Promise` 적용 코드**

  ```
  function getData(callback) {
    // new Promise() 추가
    return new Promise(function(resolve, reject) {
      $.get('url 주소/products/1', function(response) {
        // 데이터를 받으면 resolve() 호출
        resolve(response);
      });
    });
  }

  // getData()의 실행이 끝나면 호출되는 then()
  getData().then(function(tableData) {
    // resolve()의 결과 값이 여기로 전달됨
    console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
  });
  ```

  콜백 함수로 처리하던 구조에서 new Promise(), resolve(), then()와 같은 프로미스 API를 사용한 구조로 바뀌었습니다.

<br>
<br>
<br>
<br>

## 2. Promise의 3가지 상태(states)

<br>

프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)입니다.

<br>

여기서 말하는 상태란 "프로미스의 처리 과정"입니다. `new Promise()`로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖습니다.

<br>

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태

- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태

- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

<br>
<br>
<br>

### 1) Pending(대기)

<br>

먼저 `new Promise()` 메서드를 호출하면 대기(Pending) 상태가 됩니다.

new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, `reject`입니다.

```
new Promise(function(resolve, reject) {
  // ...
});
```

<br>
<br>

### 2) Fulfilled(이행)

<br>

여기서 콜백 함수의 인자 resolve를 아래와 같이 실행하면 이행(Fulfilled) 상태가 됩니다.

```
new Promise(function(resolve, reject) {
  resolve();
});
```

그리고 이행 상태가 되면 아래와 같이 then()을 이용하여 처리 결과 값을 받을 수 있습니다.

```
function getData() {
  return new Promise(function(resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function(resolvedData) {
  console.log(resolvedData); // 100
});
```

> ※ 프로미스의 '이행' 상태를 좀 다르게 표현해보면 '완료' 입니다.

<br>
<br>

### 3) Rejected(실패)

<br>

`new Promise()`로 프로미스 객체를 생성하면 콜백 함수 인자로 `resolve`와 `reject`를 사용할 수 있다고 했습니다. 여기서 `reject`를 아래와 같이 호출하면 실패(Rejected) 상태가 됩니다.

```
new Promise(function(resolve, reject) {
  reject();
});
```

그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 `catch()`로 받을 수 있습니다.

```
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function(err) {
  console.log(err); // Error: Request is failed
});
```

<br>
<br>
<br>
<br>

## 3. Promise 코드 - 쉬운 예제

<br>

아래 코드는 서버에서 제대로 응답을 받아오면 `resolve()` 메서드를 호출하고, 응답이 없으면 `reject()` 메서드를 호출하는 예제입니다.

호출된 메서드에 따라 `then()`이나 `catch()`로 분기하여 응답 결과 또는 오류를 출력합니다.

```
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data);       // response 값 출력
}).catch(function(err) {
  console.error(err);      // Error 출력
});

```

<br>
<br>
<br>
<br>

## 4. 여러 개의 프로미스 연결하기 (Promise Chaining)

<br>

프로미스의 또 다른 특징은 여러 개의 프로미스를 연결하여 사용할 수 있다는 점입니다. 앞 예제에서 then() 메서드를 호출하고 나면 새로운 프로미스 객체가 반환됩니다. 따라서, 아래와 같이 코딩이 가능합니다.

<br>

```
function getData() {
  return new Promise({
    // ...
  });
}

// then() 으로 여러 개의 프로미스를 연결한 형식
getData()
  .then(function(data) {
    // ...
  })
  .then(function() {
    // ...
  })
  .then(function() {
    // ...
  });
```

<br>
<br>

- **Example: `setTimeout() API`를 사용한 예제**

  아래 코드는 프로미스 객체를 하나 생성하고 `setTimeout()`을 이용해 2초 후에 `resolve()`를 호출하는 예제입니다.

  ```
  new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(1);
    }, 2000);
  })
  .then(function(result) {
    console.log(result);     // 1
    return result + 10;
  })
  .then(function(result) {
    console.log(result);     // 11
    return result + 20;
  })
  .then(function(result) {
    console.log(result);     // 31
  });
  ```

  - resolve()가 호출되면 프로미스가 대기 상태에서 이행 상태로 넘어가기 때문에 첫 번째 .then()의 로직으로 넘어갑니다.

  - 첫 번째 .then()에서는 이행된 결과 값 1을 받아서 10을 더한 후 그다음 .then() 으로 넘겨줍니다.

  - 두 번째 .then()에서도 바로 이전 프로미스의 결과 값 11을 받아서 20을 더하고 다음 .then()으로 넘겨줍니다.

  - 마지막 .then()에서 최종 결과 값 31을 출력합니다.

<br>
<br>
<br>
<br>

## 4. 실무에서 있을 법한 프로미스 연결 사례

<br>

- **Example: 사용자 로그인 인증 로직에 프로미스를 여러 개 연결**

  ```
  getData(userInfo)
    .then(parseValue)
    .then(auth)
    .then(diaplay);
  ```

  위 코드는 페이지에 입력된 사용자 정보를 받아와 파싱, 인증 등의 작업을 거치는 코드를 나타내었습니다.

  여기서 `userInfo`는 사용자 정보가 담긴 객체를 의미하고, `parseValue`, `auth`, `display`는 각각 프로미스를 반환해주는 함수라고 가정했습니다. 아래와 같이 말이죠.

  ```
  var userInfo = {
    id: 'test@abc.com',
    pw: '****'
  };

  function parseValue() {
    return new Promise({
      // ...
    });
  }
  function auth() {
    return new Promise({
      // ...
    });
  }
  function display() {
    return new Promise({
      // ...
    });
  }
  ```

  이처럼 여러 개의 프로미스를 `.then()`으로 연결하여 처리할 수 있습니다.

<br>
<br>
<br>
<br>

## 5. 프로미스의 에러 처리 방법

<br>

앞에서 살펴본 프로미스 예제는 코드가 항상 정상적으로 동작한다고 가정하고 구현한 예제입니다. 실제 서비스를 구현하다 보면 네트워크 연결, 서버 문제 등으로 인해 오류가 발생할 수 있습니다.

따라서, 프로미스의 에러 처리 방법에 대해서도 알고 있어야 합니다. 에러 처리 방법에는 다음과 같이 2가지 방법이 있습니다.

<br>

- **Example: 1) `then()`의 두 번째 인자로 에러를 처리하는 방법**

  ```
  getData().then(
    handleSuccess,
    handleError
  );
  ```

<br>

- **Example: 2) `catch()`를 이용하는 방법**

  ```
  getData().then().catch();
  ```

<br>
<br>

위 2가지 방법 모두 프로미스의 `reject()` 메서드가 호출되어 실패 상태가 된 경우에 실행됩니다.

간단하게 말해서 프로미스의 로직이 정상적으로 돌아가지 않는 경우 호출되는 거죠. 아래와 같이 말입니다.

<br>

- **Example: 실패 상태 예시**

  ```
  function getData() {
    return new Promise(function(resolve, reject) {
      reject('failed');
    });
  }

  // 1. then()의 두 번째 인자로 에러를 처리하는 코드
  getData().then(function() {
    // ...
  }, function(err) {
    console.log(err);
  });

  // 2. catch()로 에러를 처리하는 코드
  getData().then().catch(function(err) {
    console.log(err);
  });
  ```

<br>
<br>
<br>
<br>

## 6. 프로미스 에러 처리는 가급적 catch()를 사용

<br>

앞에서 프로미스 에러 처리 방법 2가지를 살펴봤습니다. 개개인의 코딩 스타일에 따라서 then()의 두 번째 인자로 처리할 수도 있고 catch()로 처리할 수도 있겠지만 가급적 catch()로 에러를 처리하는 게 더 효율적입니다.

<br>

- **Example: `then()`의 두 번째 인자**

  ```
  // then()의 두 번째 인자로는 감지하지 못하는 오류
  function getData() {
    return new Promise(function(resolve, reject) {
      resolve('hi');
    });
  }

  getData().then(function(result) {
    console.log(result);
    throw new Error("Error in then()");   // Uncaught (in promise) Error: Error in then()
  }, function(err) {
    console.log('then error : ', err);
  });
  ```

<br>

- **Example: `catch()`로 처리**

  ```
  // catch()로 오류를 감지하는 코드
  function getData() {
    return new Promise(function(resolve, reject) {
      resolve('hi');
    });
  }

  getData().then(function(result) {
    console.log(result);                  // hi
    throw new Error("Error in then()");
  }).catch(function(err) {
    console.log('then error : ', err);    // then error :  Error: Error in then()
  });
  ```

  발생한 에러(`then error : Error: Error in then()`)를 성공적으로 콘솔에 출력해준다

  따라서, 더 많은 예외 처리 상황을 위해 프로미스의 끝에 가급적 `catch()`를 붙이시기 바랍니다.

<br>
<br>
<br>
<br>
<br>
<br>

---

<br>

# 자바스크립트의 async와 await

<br>

---

<br>

## 1. async & await란?

<br>

async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 ES6 문법입니다. 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와줍니다.

<br>

```
var user = {
  id: 1,
  name: 'Josh'
};

if (user.id === 1) {
  console.log(user.name);   // Josh
}
```

위 코드는 `user`라는 변수에 객체를 할당한 뒤 조건문으로 사용자의 아이디를 확인하고 콘솔에 사용자의 `name`을 찍는 간단한 코드입니다.

우리는 이렇게 위에서부터 아래로 한 줄 한 줄 차근히 읽으면서 사고하는 것이 편합니다. 그렇게 프로그래밍을 배웠으니까요.

이러한 방식대로 코드를 구성하는 것이 async & await 문법의 목적입니다.

<br>

```
var user = fetchUser('domain.com/users/1');

if (user.id === 1) {
  console.log(user.name);
}
```

`fetchUser()`라는 메서드를 호출하면 앞에서 봤던 코드처럼 사용자 객체를 반환한다고 해보겠습니다.

그리고 여기서 `fetchUser()` 메서드가 서버에서 사용자 정보를 가져오는 HTTP 통신 코드라고 가정한다면 위 코드는 async & await 문법이 적용된 형태라고 보셔도 됩니다. 이게 대체 무슨 말인지 아래에서 함께 알아보겠습니다.

<br>
<br>
<br>
<br>

## 2. async & await 맛보기

<br>

먼저 위에서 살펴본 코드를 `logName()`이라는 간단한 함수로 감싸보겠습니다.

```
function logName() {
  var user = fetchUser('domain.com/users/1');

  if (user.id === 1) {
    console.log(user.name);
  }
}
```

이제 위 함수를 실행하면 아까와 동일하게 코드가 동작할 겁니다.

그리고 여기서 아래와 같이 `async`와 `await`를 추가해주면 이게 바로 async & await 코드입니다.

```
async function logName() {
  var user = await fetchUser('domain.com/users/1');

  if (user.id === 1) {
    console.log(user.name);
  }
}
```

<br>
<br>
<br>
<br>

## 3. async & await 적용된 코드와 그렇지 않은 코드

<br>

위에서 다룬 코드가 대체 어떤 의미인지 한번 알아보겠습니다. 먼저 아까 살펴봤던 logName() 함수 코드를 다시 보겠습니다.

```
function logName() {
  var user = fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```
