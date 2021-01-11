<br>

# 04. 객체(Object) - 'new' 연산자와 생성자 함수(constructor function)

<br>

URL : https://ko.javascript.info/constructor-new

<br>

---

<br>

객체 리터럴 `{...}` 을 사용하면 객체를 쉽게 만들 수 있습니다. 그런데 개발을 하다 보면 유사한 객체를 여러 개 만들어야 할 때가 생기곤 합니다. 복수의 사용자, 메뉴 내 다양한 아이템을 객체로 표현하려고 하는 경우가 그렇죠.

`new` 연산자와 `constructor` 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다.

<br>
<br>

## 1. 생성자 함수(constructor function)

<br>

constructor function과 일반 함수에 기술적인 차이는 없지만, constructor function은 아래 두 관례를 따릅니다.

- 함수 이름의 첫 글자는 대문자로 시작합니다.

- 반드시 "new" 연산자를 붙여 실행합니다.

<br>

- **Example:**

  ```

  function User(name) {
    this.name = name;
    this.isAdmin = false;
  }

  let user = new User("Jack");

  alert(user.name); // Jack
  alert(user.isAdmin); // false
  ```

  new User(...)를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작합니다.

  - 빈 객체를 만들어 this에 할당합니다.

  - 함수 본문을 실행합니다. this에 새로운 프로퍼티를 추가해 this를 수정합니다.

  - this를 반환합니다.

  <br>

  위 예시를 이용해 `new User(...)`가 실행되면 무슨 일이 일어나는지 살펴 보도록 하겠습니다.

  ```
  function User(name) {
    // this = {};  (빈 객체가 암시적으로 만들어짐)

    // 새로운 프로퍼티를 this에 추가함
    this.name = name;
    this.isAdmin = false;

    // return this;  (this가 암시적으로 반환됨)
  }

  ```

  이제 `let user = new User("Jack")`는 아래 코드를 입력한 것과 동일하게 동작합니다.

  ```
  let user = {
    name: "Jack",
    isAdmin: false
  };
  ```

<br>

이러한 생성자 함수를 사용하면 손쉽게 사용자 객체를 만들 수 있습니다. 객체 리터럴 문법으로 일일이 객체를 만드는 방법보다 훨씬 간단하고 읽기 쉽게 객체를 만들 수 있게 되었죠.

생성자 함수의 의의는 바로 여기에 있습니다. **재사용할 수 있는 객체 생성 코드를 구현하는 것이죠.**

잠깐! 모든 함수는 생성자 함수가 될 수 있다는 점을 잊지 마시기 바랍니다. new를 붙여 실행한다면 어떤 함수라도 위에 언급된 알고리즘이 실행됩니다. 이름 "첫 글자가 대문자"인 함수는 new를 붙여 실행해야 한다는 점도 잊지 마세요. 공동의 약속이니까요.

<br>
<br>

### &nbsp;# 익명 생성자 함수

<br>

&nbsp;&nbsp; 재사용할 필요가 없는 복잡한 객체를 만들때 아래와 같이 코드를 익명 생성자 함수로 감싸주는 방식을 사용할 수 있습니다.

<br>

- **Example:**

  ```
  let user = new function() {
    this.name = "John";
    this.isAdmin = false;

    // 사용자 객체를 만들기 위한 여러 코드.
    // 지역 변수, 복잡한 로직, 구문 등의
    // 다양한 코드가 여기에 들어갑니다.
  };
  ```

  위 생성자 함수는 익명 함수이기 때문에 어디에도 저장되지 않습니다. 처음 만들 때부터 단 한 번만 호출할 목적으로 만들었기 때문에 재사용이 불가능합니다.

  이렇게 **익명 생성자 함수를 이용하면 재사용은 막으면서 코드를 "캡슐화"** 할 수 있습니다.

<br>
