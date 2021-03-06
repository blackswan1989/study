<br>

# 01. 클래스(Class)와 기본 문법

<br>

URL : https://ko.javascript.info/class

<br>

---

클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로, 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.

실무에선 사용자나 물건같이 동일한 종류의 객체를 여러 개 생성해야 하는 경우가 잦습니다.

이럴 때 'new' 연산자와 생성자 함수에서 배운 new function을 사용할 수 있습니다.

여기에 더하여 모던 자바스크립트에 도입된 클래스(class)라는 문법을 사용하면 객체 지향 프로그래밍에서 사용되는 다양한 기능을 자바스크립트에서도 사용할 수 있습니다.

<br>
<br>
<br>
<br>

## 1. 기본 문법

<br>

클래스는 다음과 같은 기본 문법을 사용해 만들 수 있습니다.

```
class MyClass {

  // 여러 메서드를 정의할 수 있음
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...

}
```

이렇게 클래스를 만들고, new MyClass()를 호출하면 내부에서 정의한 메서드가 들어 있는 객체가 생성됩니다.

객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화 할 수 있습니다.

```
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// 사용법:
let user = new User("John");
user.sayHi();
```

new User("John")를 호출하면 다음과 같은 일이 일어납니다.

1. 새로운 객체가 생성됩니다.
2. 넘겨받은 인수와 함께 constructor가 자동으로 실행됩니다. 이때 인수 "John"이 this.name에 할당됩니다.
3. 이런 과정을 거친 후에 user.sayHi() 같은 객체 메서드를 호출할 수 있습니다.

<br>
<br>

문법상 주의할 점으로는 메서드 사이엔 쉼표가 없습니다.

초보 개발자는 클래스 메서드 사이에 쉼표를 넣는 실수를 저지르곤 합니다. 이렇게 쉼표를 넣으면 문법 에러가 발생합니다.

클래스와 관련된 표기법은 객체 리터럴 표기법과 차이가 있습니다. 클래스에선 메서드 사이에 쉼표를 넣지 않아도 됩니다.

<br>
<br>
<br>
<br>

## 2. 클래스(Class)란?

<br>

이 시점에서 "클래스가 정확히 뭔가요?"라는 의문이 생기실 겁니다. 클래스는 자바스크립트에서 새롭게 창안한 개체(entity)가 아닙니다.

클래스가 보여주는 다양한 마법의 원리를 하나씩 파헤치면서 클래스가 정확히 무엇인지 알아봅시다.

이 과정을 거치고 나면 자바스크립트의 복잡한 기능을 이해할 수 있을 겁니다. 자바스크립트에서 클래스는 함수의 한 종류입니다.

```
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// User가 함수라는 증거
alert(typeof User);     // function
```

`Class User {...}` 문법 구조가 진짜 하는 일은 다음과 같습니다.

1. User라는 이름을 가진 함수를 만듭니다. 함수 본문은 생성자 메서드 constructor에서 가져옵니다.
2. 생성자 메서드가 없으면 본문이 비워진 채로 함수가 만들어집니다.
3. sayHi같은 클래스 내에서 정의한 메서드를 User.prototype에 저장합니다.

new User를 호출해 객체를 만들고, 객체의 메서드를 호출하면 함수의 prototype 프로퍼티에서 설명한 것처럼 메서드를 프로토타입에서 가져옵니다.

<br>

이 과정이 있기 때문에 객체에서 클래스 메서드에 접근할 수 있습니다. class User 선언 결과를 그림으로 나타내면 아래와 같습니다.

![class](https://user-images.githubusercontent.com/67410919/104707052-3ce3be00-575f-11eb-9410-f5233c56b94e.PNG)

<br>
<br>

지금까지의 설명을 코드로 표현하면 다음과 같습니다.

```
class User {
  constructor(name) { this.name = name; }
  sayHi() { console.log(this.name); }
}

console.log(typeof User);           // function (클래스는 함수입니다.)

console.log(User === User.prototype.constructor);   // true (정확히는 생성자 메서드와 동일합니다.)

console.log(User.prototype.sayHi);  // sayHi(){console.log(this.name);} (클래스 내부에서 정의한 메서드는 User.prototype에 저장됩니다.)

console.log(Object.getOwnPropertyNames(User.prototype));  // constructor, sayHi (현재 프로토타입에는 메서드가 두 개입니다.)
```

<br>
<br>
<br>
<br>

## 3. 클래스(Class)는 단순한 편의 문법이 아니다.

<br>

어떤 사람들은 class라는 키워드 없이도 클래스 역할을 하는 함수를 선언할 수 있기 때문에 클래스는 '편의 문법’에 불과하다고 이야기합니다.

참고로 기능은 동일하나 기존 문법을 쉽게 읽을 수 있게 만든 문법을 편의 문법(syntactic sugar, 문법 설탕)이라고 합니다.

```
// class User와 동일한 기능을 하는 순수 함수를 만들어보겠습니다.
// 모든 함수의 프로토타입은 'constructor' 프로퍼티를 기본으로 갖고 있기 때문에
// constructor 프로퍼티를 명시적으로 만들 필요가 없습니다.

// 1. 생성자 함수를 만듭니다.
function User(name) {
  this.name = name;
}

// 2. prototype에 메서드를 추가합니다.
User.prototype.sayHi = function() {
  alert(this.name);
};

// 사용법:
let user = new User("John");
user.sayHi();
```

위 예시처럼 순수 함수로 클래스 역할을 하는 함수를 선언하는 방법과 class 키워드를 사용하는 방법의 결과는 거의 같습니다. class가 단순한 편의 문법이라고 생각하는 이유가 여기에 있습니다.

<br>
<br>

### &nbsp;&nbsp;# 두 방법의 차이점

<br>

1. class로 만든 함수엔 특수 내부 프로퍼티인 `[[FunctionKind]]:"classConstructor"`가 이름표처럼 붙습니다. 이것만으로도 두 방법엔 분명한 차이가 있음을 알 수 있습니다.

   ```
   class User {
     constructor() {}
   }

   alert(typeof User); // function
   User(); // TypeError: Class constructor User cannot be invoked without 'new'
   ```

   자바스크립트는 다양한 방법을 사용해 함수에 `[[FunctionKind]]:"classConstructor"`가 있는지를 확인합니다. 이런 검증 과정이 있기 때문에 클래스 생성자를 new와 함께 호출하지 않으면 에러가 발생합니다.

   대부분의 자바스크립트 엔진이 클래스 생성자를 문자열로 표현할 때 `class…`로 시작하는 문자열로 표현한다는 점 역시 다릅니다.

   <br>

2. 클래스 메서드는 열거할 수 없습니다(non-enumerable). 클래스의 prototype 프로퍼티에 추가된 메서드 전체의 enumerable 플래그는 `false`입니다.

   `for..in`으로 객체를 순회할 때, 메서드는 순회 대상에서 제외하고자 하는 경우가 많으므로 이 특징은 꽤 유용합니다.

  <br>

3. 클래스는 항상 엄격 모드로 실행됩니다(use strict). 클래스 생성자 안 코드 전체엔 자동으로 엄격 모드가 적용됩니다.

<br>
<br>
<br>
<br>

## 4. 클래스(Class) 표현식

<br>

함수처럼 클래스도 다른 표현식 내부에서 정의, 전달, 반환, 할당할 수 있습니다.

```
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

<br>

기명 함수 표현식(Named Function Expression)과 유사하게 클래스 표현식에도 이름을 붙일 수 있습니다.

클래스 표현식에 이름을 붙이면, 이 이름은 오직 클래스 내부에서만 사용할 수 있습니다.

```
// 기명 클래스 표현식(Named Class Expression)
// 명세서엔 없는 용어이지만, 기명 함수 표현식과 유사하게 동작합니다.

let User = class MyClass {
  sayHi() {
    alert(MyClass);     // MyClass라는 이름은 오직 클래스 안에서만 사용할 수 있습니다.
  }
};

new User().sayHi();     // 제대로 동작합니다(MyClass의 정의를 보여줌).

alert(MyClass);         // ReferenceError: MyClass is not defined, MyClass는 클래스 밖에서 사용할 수 없습니다.
```

<br>

아래와 같이 ‘필요에 따라’ 클래스를 동적으로 생성하는 것도 가능합니다.

```
function makeClass(phrase) {
  return class {                 // 클래스를 선언하고 이를 반환함
    sayHi() {
      alert(phrase);
    };
  };
}

let User = makeClass("Hello");   // 새로운 클래스를 만듦
new User().sayHi();              // Hello
```
