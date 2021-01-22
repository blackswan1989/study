<br>

# TypeScript Quick Start - 03. 연산자

<br>

---

<br>
<br>

# 1. 기본 연산자

<br>
<br>

## 1) 산술 연산자

<br>

타입스크립트는 자바스크립트와 동일한 산술 연산자(arithmetic operator)를 지원합니다.

산술 연산자로는 더하기, 빼기, 곱하기, 나누기 같은 사칙연산과 나머지 연산을 수행할 수 있는 `%` 연산자가 있습니다.

이에 더해 타입스크립트는 ES7의 지수 연산자인 `**`를 지원하므로 `Math.pow`를 대체해 사용할 수 있습니다.

<br>

타입스크립트는 아래 예제 처럼 산술 산술 연산자를 사용할 때 자바스크립트보다 엄격한 타입 검사를 함으로써 연산의 안전성을 높입니다.

<br>

- **Example:**

  ```
  1) 산술 연산자

  console.log(10 + 2, 10 -2, 10 * 2, 10 / 2, 10 % 2);       // 12,  8,  20,  5,  0
  console.log(10 ** 3);                                     // 1000



  2) 타입이 다른 피연산자 간의 더하기 연산

  console.log(1 + "happy");       // "1happy"
  console.log(false + "happy");   // "falsehappy"
  console.log(10 + "2");          // "102"
  console.log(10 / "2");          // 5 (The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.)



  3) 타입스크립트에서는 불리언 값 끼리 연산시 에러가 발생.

  console.log(1 + false)         // 1 (JS)
  console.log(false + false)     // 0 (JS)
  console.log(1 + false)         // 1 (Operator '+' cannot be applied to types 'number' and 'boolean')
  console.log(false + false)     // 0 (Operator '+' cannot be applied to types 'boolean' and 'boolean')
  ```

  - `예제1)`에서 산술연산자가 포함된 첫번째 코드를 컴파일하면 식이 변하지 않지만, 지수 연산자가 포함된 `10**3`은 ES6 또는 ES5로 컴파일시 `Math.pow(10, 3)`로 변환돼 컴파일 됩니다.

  - `예제2)`에서는 문자열 간의 더하기 연산은 자바스크립트처럼 '문자열 결합(concatenation)'으로 인식합니다. 하지만 타입스크립트에서는 '문자열 타입의 숫자'를 연산식에 사용하면 에러가 발생합니다.

  - 하지만 `예제3)`에서 자바스크립트는 불리언 값인 `false`를 0값으로 인식해 `1 + false`를 하면 정상적으로 1이 출력됩니다.

  - 반면 타입스크립트에서는 타입 오류가 있는것으로 판별하여 숫자 값과 불리언 값은 연산할 수 없고, `false` 값도 0으로 인식하지 않기 때문에 불리언 간의 덧셈도 오류가 발생합니다.

<br>
<br>
<br>

## 2) 비교 연산자

<br>

![ts](https://user-images.githubusercontent.com/67410919/105436469-9c335800-5ca2-11eb-9f9b-fb7073806edb.png)

<br>

자바스크립트에서는 피연산자 간에 타입이 달라도 비교할 수 있습니다. 하지만 타입스크립트에서는 `1 == true` 또는 `1 == '1'`과 같이 타입이 다르면 연산을 허용하지 않습니다.

이는 피연산자 간의 비교 연산을 할 때 타입의 안전성을 고려하기 때문입니다. 특히 `==`연산자 대신 `===`를, `!=` 연산자 대신 `!==`을 사용하기를 권장합니다. 왜냐하면 자바스크립트로 컴파일 하고 나서도 타입 안전성을 보장할 수있기 때문입니다.

<br>
<br>
<br>

## 3) 논리 연산자

<br>

논리 연산자는 피연산자끼리 타입이 일치하지 않아도 됩니다. 따라서 `1 && "true"`와 같이 피연산자 간에 타입이 달라도 계산됩니다.

<br>
<br>

### &nbsp; 3.1) &&

&nbsp;&nbsp; `&&`은 피연산자가 모두 true일때 true가 된다는 의미로 x가 5일때, `x == 5 && x > 0`은 `true` 입니다.

<br>
<br>

### &nbsp; 3.2) ||

&nbsp;&nbsp; `||`은 피연산자 중에 하나 이상이 true일때 true가 된다는 의미로, `x == 5 || x == 6`은 `true` 입니다.

<br>
<br>

### &nbsp; 3.3) !

&nbsp;&nbsp; `!`은 부정 연산자로 `!true`와 같이 true를 부정하면 false이고 `!false`와 같이 false를 부정하면 true가 됩니다.

<br>
<br>

### &nbsp; 3.4) ?:

&nbsp;&nbsp; `?:`는 조건연산자로 피연산자 3개를 사용하는 삼항 연산자로 `판별조건 ? 표현식1 : 표현식2` 형식으로 사용합니다.

&nbsp;&nbsp; 판별 조건의 결과는 true or false여야 하며 true일때는 `표현식1`이 실행되고 false일때는 `표현식2`가 실행됩니다.

<br>
<br>
<br>
<br>

# 2. 디스트럭처링(destructuring)

<br>

타입스크립트는 ES6의 디스트럭처링(destructuring)을 지원합니다. 이 말의 뜻은 객체의 구조(structure)를 제거(de)한다는 의미로 객체의 구조를 분해 후 할당이나 확장과 같은 연산을 수행합니다.

즉, 구조화된 배열 또는 객체 를 비구조화 해서 개별적인 변수에 할당하는 방법이다. 배열이나 객체에서 필요한 값을 추출하여 변수에 할당하거나 반환하는 경우에 사용됩니다.

<br>

디스트럭처링(destructuring)은 자료형에따라 객체 디스트럭처링과 배열 디스트럭처링으로 나뉩니다.

<br>
<br>
<br>

# 1) 객체 디스트럭처링(object destructuring)의 기본

<br>

객체 디스트럭처링은 객체 리터럴에서 변수명에 대응하는 속성 값을 추출해 변수로 할당하는데 유용합니다.

이렇게 객체의 속성값을 변수에 할당하는 것을 디스트럭처링 할당(destructuring assignment)이라고 합니다.

<br>

예를 들어 객체를 변수에 디스트럭처링 할당는 과정은 아래처럼 이루어 집니다.

```
let {id, country} = {     // 디스트럭처링 할당 표현식 {id, country}
  id: "hello",            // 할당 표현식 내부의 id 변수는 hello 속성값과 대응하는 변수로 할당
  country: 88             // 할당 표현식 내부의 country 변수는 88 속성값과 대응하는 변수로 할당
  };

console.log(id);          // "hello"
console.log(country);     // 88
```

<br>
<br>

디스트럭처링 할당시 할당 받을 속성이 없다면 표현식에 새롭게 정의한 변수 `(country = 88)`를 선언해 초기화해 둘 수 있습니다.

```
let {id, country = 88} = {
  id: "hello",
  };

console.log(id);          // "hello"
console.log(country);     // 88
```

<br>
<br>

디스트럭처링 할당시 할당할 객체 속성에 새로운 이름을 부여해 할당하려면 속성 재명명(property renaming)을 이용할 수 있습니다.

```
let {id: newId, country: newCountry} = {
  id: "hello",
  country: 88
  };

console.log(newId);          // "hello"
console.log(newCountry);     // 88
```

위 코드에서 디스트럭처링 할당 시 `id` 속성값은 새로운 이름인 `newId`로 할당되고 `country`속성은 새로운 이름인 `newCountry`로 할당됩니다.
