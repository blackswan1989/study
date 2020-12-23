<br>

# ES6문법

<br>

URL : https://poiemaweb.com/es6-block-scope

<br>

---

<br>

# 1. let, const와 블록 레벨 스코프

<br>

## 01. let

<br>

### 1) 함수 레벨 스코프 vs 블록 레벨 스코프

<br>

- 대부분의 프로그래밍 언어는 블록 레벨 스코프(Block-level scope)를 따르지만 자바스크립트는 함수 레벨 스코프(Function-level scope)를 따른다.

- 함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다. 즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다.

- 블록 레벨 스코프(Block-level scope)는 모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등) 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다. 즉, 코드 블록 내부에서 선언한 변수는 지역 변수이다.

<br>
<br>

### 2) 변수 중복 선언 금지

<br>

var 키워드로는 동일한 이름을 갖는 변수를 중복해서 선언할 수 있었다. 하지만, let 키워드로는 동일한 이름을 갖는 변수를 중복해서 선언할 수 없다. 변수를 중복 선언하면 문법 에러(SyntaxError)가 발생한다.

<br>
<br>

### 3) 호이스팅

<br>

- 자바스크립트는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다.

- 호이스팅(Hoisting)이란, var 선언문이나 function 선언문 등을 해당 스코프의 선두로 옮긴 것처럼 동작하는 특성을 말한다.

- 하지만 var 키워드로 선언된 변수와는 달리 let 키워드로 선언된 변수를 선언문 이전에 참조하면 참조 에러(ReferenceError)가 발생한다. 이는 let 키워드로 선언된 변수는 스코프의 시작에서 변수의 선언까지 일시적 사각지대(Temporal Dead Zone; TDZ)에 빠지기 때문이다.

<br>

> 변수가 어떻게 생성되며 호이스팅은 어떻게 이루어지는지 좀 더 자세히 살펴보자. **변수는 3단계에 걸쳐 생성**된다.
>
> - **선언 단계(Declaration phase)** : 변수를 실행 컨텍스트의 변수 객체(Variable Object)에 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.
>
> - **초기화 단계(Initialization phase)** : 변수 객체(Variable Object)에 등록된 변수를 위한 공간을 메모리에 확보한다. 이 단계에서 변수는 undefined로 초기화된다.
>
> - **할당 단계(Assignment phase)** : undefined로 초기화된 변수에 실제 값을 할당한다.
>   <br> <br>
>
> **var 키워드로 선언된 변수**는 선언 단계와 초기화 단계가 한번에 이루어진다. 즉, 스코프에 변수를 등록(선언 단계)하고 메모리에 변수를 위한 공간을 확보한 후, undefined로 초기화(초기화 단계)한다. 따라서 변수 선언문 이전에 변수에 접근하여도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환한다. 이후 변수 할당문에 도달하면 비로소 값이 할당된다. 이러한 현상을 변수 호이스팅(Variable Hoisting)이라 한다.
> <br> <br>
>
> 반면 **let 키워드로 선언된 변수**는 선언 단계와 초기화 단계가 분리되어 진행된다. 즉, 스코프에 변수를 등록(선언단계)하지만 초기화 단계는 변수 선언문에 도달했을 때 이루어진다. 초기화 이전에 변수에 접근하려고 하면 참조 에러(ReferenceError)가 발생한다. 이는 변수가 아직 초기화되지 않았기 때문이다. 다시 말하면 변수를 위한 메모리 공간이 아직 확보되지 않았기 때문이다. 따라서 스코프의 시작 지점부터 초기화 시작 지점까지는 변수를 참조할 수 없다. 스코프의 시작 지점부터 초기화 시작 지점까지의 구간을 ‘일시적 사각지대(Temporal Dead Zone; TDZ)’라고 부른다.

<br>
<br>

### 4) 전역 객체(Global Object)와 let

<br>

- 전역 객체는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window 객체, Server-side(Node.js)에서는 global 객체를 의미한다.

<br>

- var 키워드로 선언된 변수를 전역 변수로 사용하면 전역 객체의 프로퍼티가 된다.

  ```
  var foo = 123; // 전역변수

  console.log(window.foo); // 123
  ```

<br>

- let 키워드로 선언된 변수를 전역 변수로 사용하는 경우, let 전역 변수는 전역 객체의 프로퍼티가 아니다.

- 즉, 위의 window.foo와 같이 접근할 수 없다. let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.

  ```
  let foo = 123; // 전역변수

  console.log(window.foo); // undefined
  ```

<br>
<br>
<br>
<br>

## 02. const

<br>

const는 상수(변하지 않는 값)를 위해 사용한다. 하지만 반드시 상수만을 위해 사용하지는 않는다. 이에 대해서는 후반부에 설명한다. const의 특징은 let과 대부분 동일하므로 let과 다른 점만 살펴보도록 하자.

<br>
<br>

### 1) 선언과 초기화

<br>

- let은 재할당이 자유로우나 const는 재할당이 금지된다.

- 주의할 점은 const는 반드시 선언과 동시에 할당이 이루어져야 한다는 것이다. 그렇지 않으면 문법 에러(SyntaxError)가 발생한다.

- 또한, const는 let과 마찬가지로 블록 레벨 스코프를 갖는다.

<br>
<br>

### 2) 상수(const)

<br>

상수는 가독성과 유지보수의 편의를 위해 적극적으로 사용해야 한다. 예를 들어 아래 코드를 살펴보자.

```
// 10의 의미를 알기 어렵기 때문에 가독성이 좋지 않다.
if (rows > 10) {
}

// 값의 의미를 명확히 기술하여 가독성이 향상되었다.
const MAXROWS = 10;
if (rows > MAXROWS) {
}
```

위처럼 네이밍이 적절한 상수로 선언하면 가독성과 유지보수성이 대폭 향상된다.

<br>

const는 객체에도 사용할 수 있다. 물론 이때도 재할당은 금지된다.

```
const obj = { foo: 123 };

obj = { bar: 456 }; // TypeError: Assignment to constant variable.
```

<br>
<br>

### 3) const와 객체

<br>

const는 재할당이 금지된다. 이는 const 변수의 타입이 객체인 경우, 객체에 대한 참조를 변경하지 못한다는 것을 의미한다. 하지만 이때 "객체의 프로퍼티는 보호되지 않는다.

다시 말하자면 재할당은 불가능하지만 할당된 객체의 내용(프로퍼티의 추가, 삭제, 프로퍼티 값의 변경)은 변경할 수 있다.

```
const user = { name: 'Lee' };

// const 변수는 재할당이 금지된다.
// user = {}; // TypeError: Assignment to constant variable.

// 객체의 내용은 변경할 수 있다.
user.name = 'Kim';

console.log(user); // { name: 'Kim' }
```

객체의 내용이 변경되더라도 객체 타입 변수에 할당된 주소값은 변경되지 않는다. 따라서 객체 타입 변수 선언에는 const를 사용하는 것이 좋다. 만약에 명시적으로 객체 타입 변수의 주소값을 변경(재할당)하여야 한다면 let을 사용한다.

<br>
<br>
<br>
<br>

## 03. `var` vs `let` vs `const`

<br>

변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다. 원시 값의 경우, 가급적 상수(const)를 사용하는 편이 좋다. 그리고 객체를 재할당하는 경우는 생각보다 흔하지 않다. const 키워드를 사용하면 의도치 않은 재할당을 방지해 주기 때문에 보다 안전하다.

<br>

var와 let, 그리고 const는 다음처럼 사용하는 것을 추천한다.

- ES6를 사용한다면 `var` 키워드는 사용하지 않는다.

- 재할당이 필요한 경우에 한정해 `let` 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.

- 변경이 발생하지 않는(재할당이 필요 없는 상수) 원시 값과 객체에는 `const`를 사용한다. 이는 재할당을 금지하므로 `var`나 `let` 보다 안전하다.

<br>
<br>
<br>
<br>
<br>
<br>

# 2. Template literals

<br>

- ES6는 템플릿 리터럴(Template literal)이라고 불리는 새로운 문자열 표기법을 도입하였다.

- 템플릿 리터럴은 일반 문자열과 비슷해 보이지만, ‘ 또는 “ 같은 통상적인 따옴표 문자 대신 백틱(backtick) 문자 `를 사용한다.

- 템플릿 리터럴은 '작은따옴표(single quotes)'와 "큰따옴표(double quotes)"를 혼용할 수 있다.

- 일반적인 문자열에서 줄바꿈은 허용되지 않으며 공백(white-space)를 표현하기 위해서는 백슬래시(\)로 시작하는 이스케이프 시퀀스(Escape Sequence)를 사용하여야 한다. ES6 템플릿 리터럴은 일반적인 문자열과 달리 여러 줄에 걸쳐 문자열을 작성할 수 있으며 템플릿 리터럴 내의 모든 여백(white-space)는 있는 그대로 적용된다.

<br>

- 템플릿 리터럴은 `+` 연산자를 사용하지 않아도 간단한 방법으로 새로운 "문자열을 삽입"할 수 있는 기능을 제공한다. 이를 문자열 인터폴레이션(String Interpolation)이라 한다.

  ```
  const first = 'Ung-mo';
  const last = 'Lee';

  // ES5: 문자열 연결
  console.log('My name is ' + first + ' ' + last + '.');
  // "My name is Ung-mo Lee."

  // ES6: String Interpolation
  console.log(`My name is ${first} ${last}.`);
  // "My name is Ung-mo Lee."
  ```

  문자열 인터폴레이션은 ${ … }으로 표현식을 감싼다. 문자열 인터폴레이션 내의 표현식은 문자열로 강제 타입 변환된다.

<br>

- `${expression}`을 템플릿 대입문(template subsitution)이라 한다.

  ```
  // 템플릿 대입문에는 문자열 뿐만 아니라 표현식도 사용할 수 있다.
  console.log(`1 + 1 = ${1 + 1}`); // 1 + 1 = 2

  const name = 'jane'
  console.log(`Hello ${name.toUpperCase()}`); // Hello JANE
  ```

<br>
<br>
<br>
<br>
<br>
<br>

# 3. Arrow function

<br>

## 01. 화살표 함수의 선언

<br>

화살표 함수(Arrow function)는 function 키워드 대신 화살표(`=>`)를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있다. 하지만 모든 경우 화살표 함수를 사용할 수 있는 것은 아니다. 화살표 함수의 기본 문법은 아래와 같다.

```
// 매개변수 지정 방법

    () => { ... }   // 매개변수가 없을 경우

     x => { ... }   // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.

(x, y) => { ... }   // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.
```

```
// 함수 몸체 지정 방법

x => { return x * x }   // single line block

x => x * x              // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다. 위 표현과 동일하다.


() => { return { a: 1 }; }

() => ({ a: 1 })   // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

<br>
<br>
<br>
<br>

## 02. 화살표 함수의 호출

<br>

화살표 함수는 익명 함수로만 사용할 수 있다. 따라서 화살표 함수를 호출하기 위해서는 함수 표현식을 사용한다.

```
// ES5

var pow = function (x) { return x * x; };
console.log(pow(10)); // 100
```

```
// ES6

const pow = (x) => { x * x; }
console.log(pow(10)); // 100
```

<br>

또는 콜백 함수로 사용할 수 있다. 이 경우 일반적인 함수 표현식보다 표현이 간결하다.

```
// ES5

var arr = [1, 2, 3];
var pow = arr.map(function (x) {  // x는 요소값
  return x * x;
});

console.log(pow); // [ 1, 4, 9 ]
```

```
// ES6

const arr6 = [1, 2, 3];
const pow6 = arr.map((x) => {x * x});

console.log(pow); // [ 1, 4, 9 ]
```

<br>
<br>
<br>
<br>

## 03. this

<br>

function 키워드로 생성한 일반 함수와 화살표 함수의 가장 큰 차이점은 `this`이다.

<br>

### 1) 일반 함수의 this

<br>

자바스크립트의 경우 함수 호출 방식에 의해 `this`에 바인딩할 어떤 객체가 동적으로 결정된다. 다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

<br>

아래 예제는 콜백 함수 내부의 this는 전역 객체 window를 가리킨다.

```
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // (A)
  return arr.map(function (x) {
    return this.prefix + ' ' + x; // (B)
  });
};

var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));   //  (2)["undefined Lee", "undefined Kim"]
```

- (A) 지점에서의 this는 생성자 함수 Prefixer가 생성한 객체, 즉 생성자 함수의 인스턴스(위 예제의 경우 pre)이다.

- (B) 지점에서 사용한 this는 아마도 생성자 함수 Prefixer가 생성한 객체(위 예제의 경우 pre)일 것으로 기대하였겠지만, 이곳에서 this는 전역 객체 window를 가리킨다. 이는 생성자 함수와 객체의 메소드를 제외한 모든 함수(내부 함수, 콜백 함수 포함) 내부의 this는 전역 객체를 가리키기 때문이다.

- `this` : https://poiemaweb.com/js-this

<br>
<br>

콜백 함수 내부의 this가 메소드를 호출한 객체(생성자 함수의 인스턴스)를 가리키게 하려면 아래의 3가지 방법이 있다.

- Solution 1 : `that = this`

  ```
  function Prefixer(prefix) {
    this.prefix = prefix;
  }

  Prefixer.prototype.prefixArray = function (arr) {
    var that = this;    // this: Prefixer 생성자 함수의 인스턴스
    return arr.map(function (x) {
      return that.prefix + ' ' + x;
    });
  };

  var pre = new Prefixer('Hi');
  console.log(pre.prefixArray(['Lee', 'Kim']));   // (2) ["Hi Lee", "Hi Kim"]
  ```

<br>

- Solution 2 : `map(func, this)`

  ```
  function Prefixer(prefix) {
    this.prefix = prefix;
  }

  Prefixer.prototype.prefixArray = function (arr) {
    return arr.map(function (x) {
      return this.prefix + ' ' + x;
    }, this);   // this: Prefixer 생성자 함수의 인스턴스
  };

  var pre = new Prefixer('Hi');
  console.log(pre.prefixArray(['Lee', 'Kim']));
  ```

<br>

- Solution 3: `bind(this)` - Function.prototype.bind()로 this를 바인딩한다.

  ```
  function Prefixer(prefix) {
    this.prefix = prefix;
  }

  Prefixer.prototype.prefixArray = function (arr) {
    return arr.map(function (x) {
      return this.prefix + ' ' + x;
    }.bind(this));  // this: Prefixer 생성자 함수의 인스턴스
  };

  var pre = new Prefixer('Hi');
  console.log(pre.prefixArray(['Lee', 'Kim']));   // (2) ["Hi Lee", "Hi Kim"]
  ```

<br>
<br>
<br>
<br>

### 2) 화살표 함수의 "`this`"

<br>

일반 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다고 하였다.

반면 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다. 동적으로 결정되는 일반 함수와는 달리 화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다.

즉, 화살표 함수는 언제나 자신을 포함하는 외부 스코프에서 this를 계승 받는다. 다시 말해 화살표 함수는 자신만의 this를 생성하지 않고 자신을 포함하는 상위 컨텍트로부터 this를 계승 받는다. 이를 Lexical this라 한다. 화살표 함수는 앞서 살펴본 Solution 3의 Syntactic sugar(문법적 설탕: 더 간결하고 명확하게 표현하는 문법)이다.

```
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(x => `${this.prefix}  ${x}`);  // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
};

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

<br>
<br>
<br>
<br>

## 04. 화살표 함수를 사용해서는 안되는 경우

<br>

화살표 함수는 Lexical this를 지원하므로 콜백 함수로 사용하기 편리하다. 하지만 화살표 함수를 사용하는 것이 오히려 혼란을 불러오는 경우도 있으므로 주의해야 한다.

<br>
<br>

### 1) 메소드

<br>

화살표 함수로 메소드를 정의하는 것은 피해야 한다. 화살표 함수로 메소드를 정의하여 보자.

```
// Bad
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`)
};

person.sayHi(); // Hi undefined
```

위 예제의 경우, 메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 상위 컨택스트인 전역 객체 window를 가리킨다. 따라서 화살표 함수로 메소드를 정의하는 것은 바람직하지 않다.

이와 같은 경우는 메소드를 위한 단축 표기법인 ES6의 축약 메소드 표현을 사용하는 것이 좋다.

```
// Good
const person = {
  name: 'Lee',
  sayHi() {   // === sayHi: function() {...}
    console.log(`Hi ${this.name}`);
  }
};

person.sayHi(); // Hi Lee
```

<br>
<br>
<br>
<br>

### 2) prototype

<br>

화살표 함수로 정의된 메소드를 prototype에 할당하는 경우도 동일한 문제가 발생한다. 화살표 함수로 정의된 메소드를 prototype에 할당하여 보자.

```
// Bad
const person = {
  name: 'Lee',
};

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

person.sayHi(); // Hi undefined
```

화살표 함수로 객체의 메소드를 정의하였을 때와 같은 문제가 발생한다. 따라서 prototype에 메소드를 할당하는 경우, 일반 함수를 할당한다.

```
// Good
const person = {
  name: 'Lee',
};

Object.prototype.sayHi = function() {
  console.log(`Hi ${this.name}`);
};

person.sayHi(); // Hi Lee
```

<br>
<br>
<br>
<br>

### 3) 생성자 함수

<br>

화살표 함수는 생성자 함수로 사용할 수 없다. 생성자 함수는 prototype 프로퍼티를 가지며 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor를 사용한다. 하지만 화살표 함수는 prototype 프로퍼티를 가지고 있지 않다.

```
const Foo = () => {};

// 화살표 함수는 prototype 프로퍼티가 없다
console.log(Foo.hasOwnProperty('prototype')); // false

const foo = new Foo(); // TypeError: Foo is not a constructor
```

<br>
<br>
<br>
<br>

### 4) addEventListener 함수의 콜백 함수

<br>

addEventListener 함수의 콜백 함수를 화살표 함수로 정의하면 this가 상위 컨택스트인 전역 객체 window를 가리킨다.

```
// Bad [Uncaught TypeError: Cannot read property 'addEventListener']

var button = document.getElementById('myButton');

button.addEventListener('click', () => {
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});
```

따라서 addEventListener 함수의 콜백 함수 내에서 this를 사용하는 경우, function 키워드로 정의한 일반 함수를 사용하여야 한다. 일반 함수로 정의된 addEventListener 함수의 콜백 함수 내부의 this는 이벤트 리스너에 바인딩된 요소(currentTarget)를 가리킨다.

```
// Good

var button = document.getElementById('myButton');

button.addEventListener('click', function() {
  console.log(this === button); // => true
  this.innerHTML = 'Clicked button';
});
```

<br>
<br>
<br>
<br>
<br>
<br>

# 4. Extended Parameter Handling

<br>

## 01. 매개변수 기본값 (Default Parameter value)

<br>

함수를 호출할 때 매개변수의 개수만큼 인수를 전달하는 것이 일반적이지만 그렇지 않은 경우에도 에러가 발생하지는 않는다. 함수는 매개변수의 개수와 인수의 개수를 체크하지 않는다. 인수가 부족한 경우, 매개변수의 값은 undefined이다.

```
function sum(x, y) {
  return x + y;
}

console.log(sum(1));   // NaN
```

<br>

따라서 아래 소스 처럼 매개변수에 적절한 인수가 전달되었는지 함수 내부에서 확인할 필요가 있다.

```
function sum(x, y) {
  // 매개변수의 값이 falsy value인 경우, 기본값을 할당한다.
  x = x || 0;
  y = y || 0;

  return x + y;
}

console.log(sum(1));     // 1
console.log(sum(1, 2));   // 3
```

<br>

ES6에서는 아래 처럼 매개변수 기본값을 사용하여 함수 내에서 수행하던 파라미터 검사와 초기화를 간소화할 수 있다.

```
function sum(x = 0, y = 0) {
  return x + y;
}

console.log(sum(1));    // 1
console.log(sum(1, 2)); // 3
```

<br>
<br>
<br>
<br>
<br>

## 02. Rest 파라미터

<br>

### 1) 기본 문법

<br>

- Rest 파라미터는 매개변수 이름 앞에 세개의 점"`...`"(Spread연산자)을 붙여서 정의한 매개변수를 의미한다.

- Rest 파라미터를 사용하면 인수(argument) 리스트를 함수 내부에서 배열로 전달받을 수 있다.

  ```
  foo(1, 2, 3, 4, 5);

  function foo(...rest) {
    console.log(Array.isArray(rest));   // true
    console.log(rest);  // (5)[ 1, 2, 3, 4, 5 ]
  }
  ```

  함수에 전달된 인수들은 순차적으로 파라미터와 Rest 파라미터에 할당된다.

  ```
  foo(1, 2, 3, 4, 5);

  function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest);  // (4)[2, 3, 4, 5]
  }


  bar('a', 'b', 'c', 'd', 'e');

  function bar(param1, param2, ...rest) {
    console.log(param1); // a
    console.log(param2); // b
    console.log(rest);   // (3)["c", "d", "e"]
  }
  ```

  Rest 파라미터는 이름 그대로 먼저 선언된 파라미터에 할당된 인수를 제외한 나머지 인수들이 모두 배열에 담겨 할당된다. 따라서 Rest 파라미터는 반드시 마지막 파라미터이어야 한다.

  ```
  function foo( ...rest, param1, param2) { }

  foo(1, 2, 3, 4, 5);
  // SyntaxError: Rest parameter must be last formal parameter
  ```

<br>
<br>
<br>
<br>

### 2) arguments와 rest 파라미터

<br>

ES5에서는 인자의 개수를 사전에 알 수 없는 '가변 인자 함수'의 경우, arguments 객체를 통해 인수를 확인한다. arguments 객체는 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회가능한(iterable) 유사 배열 객체(array-like object)이며 함수 내부에서 지역 변수처럼 사용할 수 있다.

```
// ES5
var test = function () {
  console.log(arguments);
};

test(1, 2); // { '0': 1, '1': 2 }
```

<br>

가변 인자 함수는 파라미터를 통해 인수를 전달받는 것이 불가능하므로 arguments 객체를 활용하여 인수를 전달받는다. 하지만 arguments 객체는 유사 배열 객체이므로 배열 메소드를 사용하려면 Function.prototype.call을 사용해야 하는 번거로움이 있다.

```
// ES5

function sum() {
  /*
  가변 인자 함수는 arguments 객체를 통해 인수를 전달받는다.
  유사 배열 객체인 arguments 객체를 배열로 변환한다.
  */
  var array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  });
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

<br>

ES6에서는 rest 파라미터를 사용하여 가변 인자의 목록을 배열로 전달받을 수 있다. 이를 통해 유사 배열인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.

```
// ES6

function sum(...args) {
  console.log(arguments); // Arguments(5) [1, 2, 3, 4, 5, callee: (...), Symbol(Symbol.iterator): ƒ]
  console.log(Array.isArray(args)); // true
  return args.reduce((pre, cur) => pre + cur);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

<br>

하지만 ES6의 화살표 함수에는 함수 객체의 arguments 프로퍼티가 없다. 따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 rest 파라미터를 사용해야 한다.

```
const normalFunc = function () {};
console.log(normalFunc.hasOwnProperty('arguments')); // true

const arrowFunc = () => {};
console.log(arrowFunc.hasOwnProperty('arguments')); // false
```

<br>
<br>
<br>
<br>

### 3) Spread 문법

<br>

https://poiemaweb.com/es6-extended-parameter-handling#3-spread-%EB%AC%B8%EB%B2%95
