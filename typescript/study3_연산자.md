<br>

# TypeScript Quick Start - 03. 연산자

<br>
<br>
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
  console.log(10 / "2");          // 5 (arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.)



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

<img src="https://user-images.githubusercontent.com/67410919/105436469-9c335800-5ca2-11eb-9f9b-fb7073806edb.png" width="800">

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

&nbsp;&nbsp; `&&`은 피연산자가 모두 true일때 조건식도 true가 된다는 의미로 x가 5일때, `x == 5 && x > 0`은 `true` 입니다.

<br>
<br>

### &nbsp; 3.2) ||

&nbsp;&nbsp; `||`은 피연산자 중에 하나 이상이 true일때 조건식도 true가 된다는 의미로, `x == 5 || x == 6`은 `true` 입니다.

<br>
<br>

### &nbsp; 3.3) !

&nbsp;&nbsp; `!`은 부정 연산자로 `!true`와 같이 true를 부정하면 false이고 `!false`와 같이 false를 부정하면 true가 됩니다.

<br>
<br>

### &nbsp; 3.4) ?:

&nbsp;&nbsp; `?:`는 조건연산자로 피연산자 3개를 사용하는 삼항 연산자로 `판별조건 ? 표현식1 : 표현식2` 형식으로 사용합니다.

&nbsp;&nbsp; 판별 조건의 결과는 true 또는 false여야 하며 true일때는 `표현식1`이 실행되고 false일때는 `표현식2`가 실행됩니다.

<br>
<br>
<br>
<br>

# 2. 객체 디스트럭처링(Object Destructuring)

<br>

타입스크립트는 ES6의 디스트럭처링(destructuring)을 지원합니다. 이 말의 뜻은 객체의 구조(structure)를 제거(de)한다는 의미로 객체의 구조를 분해 후 할당이나 확장과 같은 연산을 수행합니다.

즉, 구조화된 배열 또는 객체 를 비구조화 해서 개별적인 변수에 할당하는 방법이다. 배열이나 객체에서 필요한 값을 추출하여 변수에 할당하거나 반환하는 경우에 사용됩니다.

<br>

디스트럭처링(destructuring)은 자료형에따라 객체 디스트럭처링과 배열 디스트럭처링으로 나뉩니다.

<br>
<br>
<br>

## 1) 객체 디스트럭처링(object destructuring)의 기본

<br>

객체 디스트럭처링은 객체 리터럴에서 변수명에 대응하는 속성 값을 추출해 변수로 할당하는데 유용합니다.

이렇게 객체의 속성값을 변수에 할당하는 것을 디스트럭처링 할당(destructuring assignment)이라고 합니다.

예를 들어 객체를 변수에 디스트럭처링 할당는 과정은 아래처럼 이루어 집니다.

<br>

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

아래 코드에서 디스트럭처링 할당 시 `id` 속성값은 새로운 이름인 `newId`로 할당되고 `country`속성은 새로운 이름인 `newCountry`로 할당됩니다.

```
let {id: newId, country: newCountry} = {
  id: "hello",
  country: 88
  };

console.log(newId);          // "hello"
console.log(newCountry);     // 88
```

<br>
<br>
<br>

## 2) 디스트럭처링(destructuring) 매개변수 선언

<br>

함수 호출시 객체 리터럴을 전달하고 객체 리터럴의 속상을 검사하는것은 번거로운 작업입니다. 아래 코드를 봅시다.

<br>

- **Example: 1**

  ```
  function profile(obj) {
      var name = "";
      var nationality = "";

      name = (obj.name == undefined) ? "anoymous" : obj.name;
      nationality = (obj.nationality == undefined) ? "?" : obj.nationality

      console.log(name);                    // happy
      console.log(nationality);             // ? (nationality는 지정해준 값이 없어 undefined가 되므로 ?가 출력된다.)
  }

  profile({ name: "happy"});
  ```

  - 위 코드의 `profile` 함수 내부를 보면 obj객체 속성에 name 속성이 있는지 검사하고, 검사 결과 `undefined`면 `"anoymous"`를 할당하고 `undefined`가 아니라면 객체의 속성을 할당받습니다.

  - 속성이 여럿이면 객체의 속성 검사를 위한 중복 코드가 발생하므로, 객체의 특정 속성이 있는지 없는지를 타입에서 검사하고 없다면 기본값을 할당할 수 있게 만들면 편리할 것입니다.

  - 이때 아래 예제처럼 `function profile({매개변수1, 매개변수2, ...}) {...}`와 같은 형태로 함수에 디스트럭처링 매개변수를 선언합니다.

<br>
<br>

- **Example: 2**

  디스트럭처링 매개변수명은 객체의 속성명에 대응합니다. 예제로 함수 `Profile`에 디스트럭처링 매개변수`(name, nationality)`를 선언해봅시다

  ```
  function profile({name, nationality = "?"}) {
      console.log(name);                // happy
      console.log(nationality);         // ?
  }

  profile({ name: "happy"});
  ```

  - 위 코드에서는 디스트럭처링 매개변수인 name과 nationality는 전달 받을 객체의 name 속성과 nationality속성에 대응합니다. 이때 디스트럭처링 매개변수는 기본값을 설정할 수 있습니다.

  - 여기서는 nationality의 기본값을 `"?"`로 설정함으로써 전달 받은 객체에 속성이 없을때를 대비했습니다. 위 코드에서 `profile`함수는 반드시 객체를 전달해야 합니다.

  - 만약 객체 전달을 생략하려면 아래 예제처럼 우항에 할당식을 추가해야합니다.

<br>
<br>

- **Example: 3**

  ```
  // 함수의 매개변수에 인수를 전달할 때 객체 디스트럭처링 적용

  function profile({name, nationality = "none"} = {name: "anonymous"}) {
      console.log(name, nationality);
  }

  profile();                                          // anonymous none
  profile({ name: "happy"});                          // happy none
  profile({ name: "happy", nationality: "korea"});    // happy korea
  ```

  - 위 예제는 디스트럭처링 매개변수가 할당받을 수 있게 우항에 객체를 뒀습니다.

  - `profile();` 이때 name은 우항식의 name 속성값을 할당받고 nationality는 기본값인 "none"이 설정돼 있으므로 생략할 수 있습니다.

  - `profile({ name: "happy"}); `에서는 만약 객체에 name 속성만 포함한다면 nationality는 기본값이 있으므로 생략할 수 있습니다.

  - 반면 `profile({ name: "happy", nationality: "korea"});`처럼 nationality 값을 객체에 담아 전달하려면 기본값은 무시되고 전달한 nationality의 값인 `"korea"`가 전달됩니다.

<br>
<br>
<br>

## 3) 객체 디스트럭처링시 type 키워드 활용

<br>

type 키워드를 이용해 매개변수의 타입을 선언함으로써 객체 디스트럭처링을 수행할 수 있습니다.

<br>

- **syntax : `type C = { a: string, b?: number }`**

<br>
<br>

아래 예제에서 객체 디스트럭처링을 수행할 때 매개변수 a, b의 타입을 미리 정의한 타입 변수 `Test`를 이용해 지정합니다.

<br>

- **Example:**

  ```
  type Test = { a: string, b?: number };

  function fruit( { a, b }: Test ): void {
      console.log(a, b);
  }

  fruit({ a: "apple", b: 10});    // apple 10
  fruit({ a: "apple"});           // apple undefined
  fruit({ a: 10});                // 10(Error:Type 'number' is not assignable to type 'string'.), undefined
  fruit({ b: "banana"});          // undefined, "banana"(Error:Type 'string' is not assignable to type 'number | undefined')
  ```

  예제의 실행결과에서 알 수 있듯이 디스트럭처링에 사용되는 매개변수 a는 string 타입이고 생략할 수 없으며, 매개변수 b는 number 타입이고 선택 연산자인 `?`로 선언했으므로 생략할 수 있습니다.

<br>
<br>
<br>
<br>

# 3. 배열 디스트럭처링 (Array Destructuring)

<br>

배열 디스트럭처링은 배열 요소를 간결한 방법으로 변수에 할당하는 방법을 제공합니다.

만약 배열 디스트럭처링을 사용하지 않는다면 아래 예제 처럼 배열 인덱스를 통해 얻은 값을 각 변수에 할당해야 합니다.

```
let numbers = [1, 2, 3, 4, 5];

let num1 = numbers[0];
let num2 = numbers[1];

console.log(num1, num2)     // 1, 2
```

<br>
<br>

아래 1)의 `let numbers = [1, 2, 3, 4, 5];`처럼 배열 디스트럭처링을 이용하면 더욱 간결한 방법으로 배열 요소를 변수에 할당할 수 있습니다.

<br>

- **Example:**

  ```
  let numbers = [1, 2, 3, 4, 5];


  // 1) 위치에 따라 순서대로 디스트럭처링 수행
  let [nums1, nums2] = numbers;
  console.log(nums1, nums2);                                    // 1, 2


  // 2) 쉼표를 이용해 부분 생략 가능
  let [, , nums3, nums4, nums5] = numbers;
  console.log(nums3, nums4, nums5);                             // 3, 4, 5


  // 3) 디스트럭처링을 이용해 변수값 교체
  [nums4, nums3] = [nums3, nums4];
  console.log(nums3, nums4);                                    // 4, 3


  // 4) 기본값 지정 가능
  let [color1, color2 = "blue"] = ["black"];
  console.log(color1, color2);                                  // black, blue

  let [color3 = "red", color4 = "blue"] = ["black", "pink"];
  console.log(color3, color4);                                  // black, pink

  let [color5 = "red", color6] = ["pink", ,];
  console.log(color5, color6);                                  // pink, undefined
  ```

  - 2)의 예제 처럼 `numbers` 배열의 3번째, 4번째 요소를 변수에 할당하려면 앞의 요소는 쉼표로 건너 뛰고 원하는 위치에 있는 요소만 변수로 지정할 수 있습니다.

  - 3)에서는 `nums3`, `nums4`의 변수값을 손쉽게 서로 교환할 수 있음을 알 수 있습니다.

<br>
<br>
<br>

## 1) 배열 요소를 함수의 디스트럭처링 매개변수로 전달

<br>

배열 디스트럭처링을 이용하면 함수에 배열을 전달할 때 배열 요소를 디스트럭처링 매개변수로 전달할 수 있다는 장점이 있습니다.

함수 호출시 배열을 전달받아 처리하는 함수는 다음과 같이 선언합니다.

```
function test([first, second]: [number, string]) {
  console.log(first);
  console.log(second);
}

test([100, "hello"]);             // 100, hello
```

`test`라는 함수를 호출할 때 인수로 `[100, "hello"]` 배열을 전달하면 배열의 요소가 순서대로 매개변수 `first`와 `second`에 전달됩니다.

<br>
<br>
<br>
<br>

# 3. 전개 연산자(Spread Operator)

<br>

타입스크립트는 ES6의 전개 연산자를 지원합니다. 전개 연산자는 `...`로 나타내는데 다음과 같은 세 가지 경우에 사용됩니다.

<br>
<br>

1. 첫번째로 **나머지 매개변수를 선언할 때** 나머지 매개변수는 여러 인수를 배열로 받는데 '`...restParameter`'와 같은 형태로 선언해 받습니다. 이는 함수를 다루는 장에서 자세히 설명합니다.

<br>

1. 두번째 **배열 요소를 확장할 때** 전개 연산자를 사용하는데, 배열 합치기(Array Concatenation)와 배열 디스트럭처링(Array Destructuring)에서 사용됩니다.

<br>

1. 세번째로 **객체 요소를 확장할 때** 전개 연산자를 사용하는데, 객체 합치기(Object Concatenation)과 객체 디스트럭처링(Object Concatenation)에서 사용됩니다.

<br>
<br>
<br>

## 1) 전개 연산자를 이용한 배열 요소 확장

<br>

먼저 배열 합치기(Array Concatenation)에 전개 연산자를 사용하는 예를 살펴보면, 전개 속성에 전개 연산자를 사용해 배열을 합칠 수 있습니다.

```
let arr = [3, 4, 5];

let arr2 = [1, 2, ...arr];    // arr + arr2 (...arr에서 '...'는 전개연산자이며 'arr'은 전개 속성이다.)
let arr3 = [...arr, 6, 7];
let arr4 = [5, ...arr, 10];

console.log(arr2);            // (5) [1, 2, 3, 4, 5]
console.log(arr3);            // (6) [3, 4, 5, 6, 7, 8]
console.log(arr4);            // (5) [5, 3, 4, 5, 10]
```

위처럼 전개 연산자를 활용하면 배열을 쉽게 합칠 수 있으며, 전개 속성의 위치도 조정할 수 있습니다.

<br>
<br>

이어서 배열 디스트럭처링에 전개 연산자를 사용한 예를 살펴보자

```
let [first , ...second] = [1, 2, 3, 4, 5];      // second에 전개연산자 "..." 사용

console.log(first);         // 1
console.log(second);        // [2, 3, 4, 5]
```

배열 디스트럭처링이 수행되면 배열을 해체해 여러 변수에 할당하는데, 할당받는 변수에 전개 연산자인 "`...`"을 사용하면 배열의 나머지 요소를 배열로 받을 수 있습니다.

<br>

- **Example: 전개 연산자를 활용한 배열 합치기와 배열 디스트럭처링**

  ```
  let arr: number[] = [1, 2];
  let arr2: number[] = [...arr, 3, 4];
  console.log("1번 :", arr2);             // (4) [1, 2, 3, 4])

  let data: number[] = [10, 11, 12];
  let test: number[] = [8, 9, ...data];
  console.log("테스트: ", test);          // 테스트: (5) [8, 9, 10, 11, 12]


  let [firstItem, ...rest]: [number, number, number] = [10, 20, 30];

  console.log(`2번 :`, firstItem);        // 10
  console.log(`3번 :`, rest);             // (2) [20, 30])
  console.log(`4번 :`, rest[0]);          // 20
  ```

<br>
<br>
<br>

## 2) 전개 연산자를 이용한 객체 요소 확장

<br>

객체 합치기를 수행할 때는 전개 속성에 전개 연산자인 "`...`"를 사용해 합칠 수 있습니다.

<br>

```
let test = { a: 1, b: 2, c: 3 };
let test2 = { ...test, d: 4, e: 5 };

console.log(test2);                         // {a: 1, b: 2, c: 3, d: 4, e: 5}
```

<br>

위 예제에서 두 객체인 `test`와 `test2`를 합칠 때 전개속성 `...`을 이용합니다. 전개 연산자는 얕은 복사(shallow copy) 방식으로 값을 `test2` 객체로 복사합니다.

<br>
<br>

다음으로 객체 디스트럭처링에서 전개 연산자가 사용되는 예를 보면, 객체 디스트럭처링은 객체를 해체해 속성값을 변수에 할당할 수 있습니다.

예를 들어 지정한 속성 외 나머지 요소들을 객체로 받고 싶다면 객체의 속성에 전개 연산자를 붙여서 받습니다.

```
let numGroup = { n1: 1, n2: 2, n3: 3, n4: 4};
let { n2, ...n } = numGroup;

console.log(n2, n);       // 2, {n1: 1, n3: 3, n4: 4}
```

위 예제에서 속성 `n`에 전개 연산자가 사용됐으므로 `n`은 객체의 레스트 속성(Rest Properties)이 됩니다.

`n`은 `n2`속성을 제외한 나머지에 해당하는 객체(`{ n1: 1, n3: 3, n4: 4}`)를 받습니다.
