<br>

# 03. 객체(Object) - 메서드와 'this'

<br>

URL : https://ko.javascript.info/object-methods#ref-312

<br>

---

<br>

객체는 사용자(user), 주문(order) 등과 같이 실제 존재하는 개체(entity)를 표현하고자 할 때 생성됩니다.

```
let user = {
  name: "John",
  age: 30
};
```

사용자는 현실에서 장바구니에서 물건 선택하기, 로그인하기, 로그아웃하기 등의 행동을 합니다. 이와 마찬가지로 사용자를 나타내는 객체 user도 특정한 행동을 할 수 있습니다.

자바스크립트에선 객체의 프로퍼티에 함수를 할당해 객체에게 행동할 수 있는 능력을 부여해줍니다.

<br>
<br>
<br>

## 1) 메서드 만들기

<br>

객체 user에게 인사할 수 있는 능력을 부여해 줍시다. 함수 표현식으로 함수를 만들고, 객체 프로퍼티 user.sayHi에 함수를 할당해 주었습니다. 이제 객체에 할당된 함수를 호출하면 user가 인사를 해줍니다.

이렇게 객체 프로퍼티에 할당된 함수를 메서드(method) 라고 부릅니다.

```
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!
```

<br>

위 예시에선 user에 할당된 sayHi가 메서드이죠. 메서드는 아래와 같이 이미 정의된 함수를 이용해서 만들 수도 있습니다.

```
let user = {
  // ...
};

// 함수 선언
function sayHi() {
  alert("안녕하세요!");
};

// 선언된 함수를 메서드로 등록
user.sayHi = sayHi;

user.sayHi(); // 안녕하세요!
```

<br>
<br>
<br>

## 2) 메서드 단축 구문

<br>

아래처럼 function을 생략해도 메서드를 정의할 수 있습니다.

```
// 아래 두 객체는 동일하게 동작합니다.

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 단축 구문을 사용하니 더 깔끔해 보이네요.
user = {
  sayHi() {           // "sayHi: function()"과 동일합니다.
    alert("Hello");
  }
};
```

<br>
<br>
<br>

## 3) 메서드와 ‘this’

<br>

메서드는 객체에 저장된 정보에 접근할 수 있어야 제 역할을 할 수 있습니다. 모든 메서드가 그런 건 아니지만, 대부분의 메서드가 객체 프로퍼티의 값을 활용합니다.

`user.sayHi()`의 내부 코드에서 객체 `user`에 저장된 이름(name)을 이용해 인사말을 만드는 경우가 이런 경우에 속합니다.

메서드 내부에서 `this` 키워드를 사용하면 객체에 접근할 수 있습니다. 이때 '점 앞’의 `this`는 객체를 나타냅니다. 정확히는 메서드를 호출할 때 사용된 객체를 나타내죠.

```
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(this.name);   // 'this'는 '현재 객체'를 나타냅니다.
  }

};

user.sayHi(); // John
```

user.sayHi()가 실행되는 동안에 this는 user를 나타냅니다.

<br>

아래 처럼 this를 사용하지 않고 외부 변수를 참조해 객체에 접근하는 것도 가능합니다.

```
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // 'this' 대신 'user'를 이용함
  }

};

let admin = user;
user = null; // user를 null로 덮어씁니다.

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
```

alert 함수가 user.name 대신 this.name을 인수로 받았다면 에러가 발생하지 않았을 겁니다.

<br>
<br>
<br>

## 4) 자유로운 “this”

<br>

자바스크립트의 this는 다른 프로그래밍 언어의 this와 동작 방식이 다릅니다. 자바스크립트에선 모든 함수에 this를 사용할 수 있습니다.

this 값은 런타임에 결정됩니다. 컨텍스트에 따라 달라지죠. 동일한 함수라도 다른 객체에서 호출했다면 'this’가 참조하는 값이 달라집니다.

```
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에 this 값이 달라진다.
user.f();         // alert "John"  | John  (this == user)
admin.f();        // alert "Admin" | Admin  (this == admin)

admin['f']();     // Admin (점과 대괄호는 동일하게 동작함)
```

규칙은 간단합니다. obj.f()를 호출했다면 this는 f를 호출하는 동안의 obj입니다. 위 예시에선 obj가 user나 admin을 참조하겠죠.

<br>
<br>
<br>

## 5) 'this’가 없는 화살표 함수

<br>

화살표 함수는 일반 함수와는 달리 ‘고유한’ this를 가지지 않습니다. 화살표 함수에서 this를 참조하면, 화살표 함수가 아닌 ‘평범한’ 외부 함수에서 this 값을 가져옵니다.

아래 예시에서 함수 arrow()의 this는 외부 함수 user.sayHi()의 this가 됩니다.

```
let user = {
  firstName: "보라",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // 보라
```

별개의 this가 만들어지는 건 원하지 않고, 외부 컨텍스트에 있는 this를 이용하고 싶은 경우 화살표 함수가 유용합니다.

<br>
<br>
<br>

## 6) 요약

<br>

1. 객체 프로퍼티에 저장된 함수를 '메서드’라고 부릅니다.

2. object.doSomthing()은 객체를 '행동’할 수 있게 해줍니다.

3. 메서드는 this로 객체를 참조합니다.

4. this 값은 런타임에 결정됩니다.

5. 함수를 선언할 때 this를 사용할 수 있습니다. 다만, 함수가 호출되기 전까지 this엔 값이 할당되지 않습니다.

6. 함수를 복사해 객체 간 전달할 수 있습니다.

7. 함수를 객체 프로퍼티에 저장해 object.method()같이 ‘메서드’ 형태로 호출하면 this는 object를 참조합니다.

8. 화살표 함수는 자신만의 this를 가지지 않는다는 점에서 독특합니다. 화살표 함수 안에서 this를 사용하면, 외부에서 this 값을 가져옵니다.

<br>
<br>
<br>

## 7) 연습 - 계산기 만들기

<br>

- **Q) calculator라는 객체를 만들고 세 메서드를 구현해 봅시다.**

  ```
  let calculator = {
    // ... 여기에 답안 작성 ...
  };

  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );
  ```

  - read()에선 프롬프트 창을 띄우고 더할 값 두 개를 입력받습니다. 입력받은 값은 객체의 프로퍼티에 저장합니다.

  - sum()은 저장된 두 값의 합을 반환합니다.

  - mul()은 저장된 두 값의 곱을 반환합니다.

<br>

- **A) 해답**

  ```
   let calculator = {
    read() {
      this.a = parseInt(prompt("첫번째 숫자를 입력하세요"));
      this.b = parseInt(prompt("두번째 숫자를 입력하세요"));
    },

    sum() {
      return this.a + this.b
    },

    mul() {
      return this.a * this.b
    },

    divi() {
      return this.a / this.b
    }
  };

  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );
  alert( calculator.divi() );
  ```

<br>
<br>
<br>
<br>
<br>
<br>

---
