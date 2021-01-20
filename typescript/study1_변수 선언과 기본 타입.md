<br>

# TypeScript Quick Start - 02. 변수 선언과 기본 타입

<br>

---

<br>

# 02. 변수 선언과 기본 타입

<br>

## 1. let 선언자

<br>

let 선언자는 변수를 선언할 때 호이스팅(hoisting: 끌어올림의 의미)을 방지하고 블록 레벨 스코프(변수가 블록"`{}`" 내에서만 유효범위를 갖는 스코프)를 지원합니다.

<br>
<br>

### 1) 특징 (p.78)

<br>

- 같은 블록 내에서 같은 이름의 변수를 중복해서 선언할 수 없다.

- 변수를 초기화하기 전에는 변수에 접근할 수 없게 해서 호이스팅 방지.

- 선언할 변수에 블록 레벨 스코프를 적용.

<br>
<br>

### 2) 예제

<br>

```
let myName = "Kate";    // 전역 스코프

if (true) {
  let myName;           // 스코프가 달라 전역 스코프에 영향이 없다.
  myName = "Jane";      // 변수 선언 뒤에만 할당 가능(var의 호이스팅 문제 해결)

  console.log(myName);  // "Jane"이 출력 된다.
}

console.log(myName);    // "Kate"가 출력된다.
```

<br>
<br>
<br>

## 2. const(상수) 선언

<br>

let 선언자처럼 변수 선언에 사용할 수 있지만, let과 다른 점은 const는 변수를 '상수'로 선언할 때 사용한다는 것입니다.

const를 이용해 변수를 상수로 선언하면 선언할 때 초기화는 가능하지만 재할당은 되지 않는 읽기 전용 변수가 됩니다.

<br>

```
const birthMonth = 9;         // 할당한 값에 따라 number타입으로 추론되었다.

if (true) {
  const birthMonth = 12;      // 블록 레벨 스코프가 적용되어 if문 외부에 선언한 birthMonth에 영향X

  console.log(birthMonth);    // 12가 출력 된다.
}

console.log(birthMonth);      // 9가 출력 된다.
```

<br>

const는 입력 값의 타입에 상관없이 변수를 읽기 전용으로 만들 수 있습니다. 예를 들어 할당 값이 객체 리터럴이면 다음과 같이 const를 이용해 초기화할 수 있습니다.

```
const profile = {
  name: "Kate",
  month: birthMonth,
}

profile.name                  // "Kate"
prifile.month                 // 9 (위 예제에서 선언한 전역 스코프가 할당됨.)
```

위처럼 const를 통해 `profile`변수가 읽기 전용이 되면 아래와 같이 에러가 발생하며 값을 새로 할당할 수 없습니다.

```
profile = {
  name: "Jane"
  month: 1
}

// Uncaught SyntaxError: Unexpected identifier
```

<br>
<br>

위처럼 const로 선언한 변수는 재할당 할 수 없어 오류가 발생합니다. 하지만 예외적으로 const로 선언한 변수라도 객체 리터럴의 속성으로는 변경할 수 있습니다.

이는 타입스크립트가 값 자체를 재할당하는 것은 허용하지 않지만, 속성값의 변경을 허용하는 특성이 있기 때문입니다.

```
profile.name = "Jane";        // 할당 가능
profile.name = "Monica";      // 할당 가능
profile.month--;              // 할당 가능
```

<br>
<br>

위와 관련된 const로 선언한 변수의 값이 객체 리터럴일 때의 속성값 변경 예제

```
const birthMonth = 9;

if(true) {
  const birthMonth = 12;      // const는 블록 레벨 스코프가 적용됨
}

console.log(birthMonth);      // 9


const profile = {
  name: "Kate",
  month: birthMonth,
};

//const profile = "Kate";     // profile 변수에 대한 재할당은 불가능
profile.name = "Jane";
profile.month--;

console.log(profile);         // {name: "Jane", month: 8}
```

<br>
<br>
<br>

## 3. 타입 검사와 타입 선언

<br>

### 1) 점진적 타입 검사 (p.82)

<br>

언어에 따라 수행하는 타입 검사의 종류는 크게 '정적 타입 검사(statically type checking)'와 '동적 타입 검사(dynamically type checking)'로 나뉩니다.

정적 타입 검사는 자바, C++등의 언어에서 사용하는 방식이며, 동적 타입 검사는 실행 시간에 타입 검사를 수행하며 대표적인 예로 자바스크립트가 있습니다.

반면 타입스크립트는 점진적 타입 검사(gradually type checking)를 수행합니다. 이러한 언어의 대표적인 예로 타입스크립트와 파이썬 등이 있습니다.

<br>
<br>

점진적 타입 검사는 컴파일 시간에 타입 검사를 수행하면서 필요에 따라 타입선언의 생략을 허용합니다.

타입 선언을 생략하면 암시적(implicit) 형변환이 일어나게 됩니다. 예를 들어 타입 선언이 생략된 매개변수 a가 선언된 add함수를 보겠습니다.

```
function add(a) {
  return a + 10;
}

add(1);
```

매개변수 a에는 타입을 선언하지 않았지만, 타입스크립트 컴파일러가 매개변수 a를 오류로 취급하지 않으며 변환된 자바스크립트는 동적으로 타입이 결정되어 오류 없이 실행됩니다.

즉, 필요에 따라 타입을 생략할 수도 있지만 점진적으로 타입을 추가할 수도 있습니다.

<br>
<br>
<br>

### 2) 자바스크립트의 동적 타이핑

<br>

자바스크립트에는 기본 타입(primitive types)과 객체 타입(object types)이 있습니다. 기존타입은 Number, Boolean, String과 같은 타입을 말하고, 객체 타입으로는 객체 리터럴, 배열, 내장 객체가 있습니다.

자바스크립트에서는 타입이 있지만 타입을 강제할 수는 없고 값을 할당할 때 타입이 추론됩니다.

```
var v = 100;          // Number type
var v = "hello";      // String type
var v = true;         // Boolean type
```

이처럼 값을 변수에 할당할 때 타입이 정해지는 것을 동적 타이핑(dynamic typing)이라고 합니다.

타입스크립트에서는 타입을 선언하지 않으면 입력값에 따라 타입이 결정됩니다.

<br>
<br>
<br>

### 3) 타입스크립트의 타입 계층도

<br>

### &nbsp; 3.1) 기본 타입

<br>

&nbsp;&nbsp;기본 타입(primitive types)은 보편적으로 많이 사용되는 내장 타입으로서 종류는 다음과 같습니다.

<br>

- string, number, boolean

  - string 타입은 큰따옴표(`"string"`) 사용 권장되며 백틱(` `` `)과 백틱안의 내장 표현식(${expressions}) 사용 가능

  - number타입은 10진수 뿐만 아니라 16진수, 2진수, 8진수도 지원한다. (16진수 -> `let decimal: number = 0xf00d;`)

  - boolean타입에는 true 또는 false 값을 할당할 수 있다. (`let isShow: boolean = false;`)

<br>

- symbol(ES6)

  - symbol은 `Symbol()`함수를 이용해 생성한 고유하고 수정 불가능한 데이터 타입으로 객체 속성의 식별자로 사용된다.

  - 예제: `let hello = Symbol()`

<br>

- enum

  - enum은 number에서 확장된 타입으로 첫번째 Enum 요소에는 숫자 0 값이 할당된다. 그다음 값은 초기화 하지 않는 이상 1씩 증가한다.

  - ```
    enum WeekDay { Mon, Tue, Wed, Thu }
    let day: WeekDay = WeekDay.Mon;
    ```

<br>

- 문자열 리터럴

  - 문자열 리터럴 타입은 string 타입의 확장 타입으로 사용자 정의 타입에 정의한 문자열만 할당받을 수 있다.

  - 다음은 type 키워드를 이용해 "keyup" 문자열 또는 "mouseover"문자열만 허용하는 문자열 리터럴 타입을 정의했다.

  - `type EventType = "keyup" | "mouseover";`

<br>
<br>
<br>

### &nbsp; 3.2) 객체 타입 종류 (p.88)

<br>

&nbsp;&nbsp; 객체 타입은 속성을 포함하고 있으며, 호출(call) 시그니처와 생성자(construct) 시그니처 등으로 구성된 타입이다.

<br>

- #### Array 타입

  - 배열 요소에 대응하는 타입으로 배열 요소가 1,2,3과 같은 숫자값이면 `number[]`가 array타입이 된다.

  - `let items: number[] = [1, 2, 3]`

<br>

- #### Tuple 타입

  - 배열 요소가 n개로 정해질 때 각 요소별로 타입을 지정한 타입이다.

  - 배열 요소가 문자 문자열과 숫자라면 `[string, number]` 같은 형태로 타입을 정의한다.

  - ```
     let x: [string, number];
     x = ["tuple", 100];
    ```

<br>

- #### Function 타입

  - 함수 타입은 시그니처를 포함하도록 정의한 타입이다. (이후 자세히 다룬다)

<br>

- #### 생성자 타입

  - 하나의 객체(클래스로부터 생성)가 여러 생성자의 시그니처로 구성될 때 포함될 수 있는 타입으로 생성자 타입 리터럴을 사용해 정의한다.

  - 생성자 타입 리터럴은 생성자 시그니처를 구성하는 타입 매개변수, 매개변수 목록, 반환 타입으로 구성된다.

  - 선언 형식: `new <타입1, 타입2, ...> (매개변수1, 매개변수2, ...) => 타입`

<br>

- #### Class와 Interface 타입

  - 객체타입(object type)으로 분류되고 객체지향 프로그래밍이나 구조 타이핑 등에 활용된다.

<br>

- #### 유니언(union) 타입

  - 2개 이상의 타입을 하나의 타입으로 정의한 타입이다

  - `var x : string | number;`

<br>

- #### 인터섹션 타입

  - 두 타입을 합쳐 하나로 만들 수 있는 타입이다.

  - 예를 들어 Cat 인터페이스와 Bird 인터페이스에 선언된 속성을 합치기 위해 Cat & Bird와 같은 방식으로 선언할 수 있다.

  - ```
    interface Cat { leg: number; }
    interface Bird { wing: number; }

    let birdCat: Cat & Bird = { leg: 4, wing: 2 };
    ```

  - 위 코드에서 `birdCat`변수가 인터섹션 타입인 `Cat & Bird`로 선언돼 있으므로 할당 객체는 `leg`, `wing` 속성만 허용한다.

<br>

- #### Void 타입

  - 빈 값을 나타내는 타입으로 함수에 반환값이 없을 때 `void` 타입을 선언할 수 있다.

  - `any`의 반대 타입 같은 개념으로 undefined나 null 값을 받을 때 사용한다.

  - ```
    function say(): void {
      alert("hello");
    }

    let unusable: void = undefined;
    ```

  - undefined는 어떠한 빈 값으로도 초기화가 되지 않는 타입이고, null은 빈 객체로 초기화 되는 타입이다.

<br>
<br>

&nbsp;&nbsp; 정리하자면 위와 같은 타입스크립트의 타입 계층도는 기존 자바스크립트의 타입을 확장한 형태로 자바스크립트 타입과 비교했을 때 다음과 같은 타입이 추가되었다.

<br>

- 객체 타입의 상위 타입으로 `any` 추가

- `any` 타입의 특수 타입으로 유니언 타입과 인터섹션 타입 추가

- 객체(object)타입의 하위 타입으로 `Array`, `Interface`, `Tuple` 추가

- `void` 타입 추가

<br>
<br>
<br>

### 4) 변수에 타입 지정

<br>

타입스크립트는 강력한 타입을 지원하며, 변수에 타입을 지정하려면 다음과 같은 형식으로 선언합니다.

<br>

- ### `var <변수 식별자> : <타입> = 값`

<br>

- **Example: 변수 선언시 boolean, number, string타입으로 지정 예제**

  ```
  var isTrue: boolean = true;
  var width: number = 10;
  var country: string = "korea";
  ```

  위와 같이 변수에 타입을 명시적으로 지정할 수 있습니다. 이처럼 '명시적 타입 표기(explicit type annotation)'을 하면 변수에 어떤 값이 할당될지 직관적으로 알 수 있습니다.

  <br>

  ```
  var width: number = 10;
  var height: number = 10.0;

  console.log(`area: ${width * height}`);       // "area: 100"
  ```

  위 예제에서 변수를 선언할때 number 타입을 지정했습니다. 따라서 입력값은 반드시 숫자 타입이어야 합니다.

  숫자가 아니면 코드 어시스트가 동작하며 타입이 일치하지 않는다는 오류를 표시하고, 컴파일을 할 때에도 오류가 발생합니다.

  이처럼 타입을 지정하면 변수에 할당되는 값의 타입을 쉽게 예측할 수 있게 합니다.

<br>
<br>
<br>
<br>

## 4. 자바스크립트의 타입

<br>

타입을 지정할 수 있는 타입스크립트와 달리 자바스크립트에서는 별도로 타입을 지정하는 절차가 없고, 런타임시 변수에 값이 할당되면 동적으로 타입이 결정됩니다.

<br>
<br>

### 1) 자바스크립트의 내장 타입

<br>

- **Example: 자바스크립트의 내장 타입 지정 방식 비교**

  ```
  // 자바스크립트의 타입 지정 방식

  let myBoolean = true;
  let myNumber = 10;
  let myString = "hello";
  let myObject = { name: "happy" };
  let myObject2 = [1, 2, 3];
  let myFunction = function (a) { return a; };


  // 타입스크립트의 타입 지정 방식

  let myBoolean: boolean = true;
  let myNumber: number = 10;
  let myString: string = "hello";
  let myObject = { name: string } = { name: "happy" };
  let myObject2: number[] = [1, 2, 3];
  let myFunction: (a: number) => number = function (a) { return a; };
  ```

  자바스크립트에서는 타입을 지정할 때 런타임시 값 할당과 동시에 동적으로 타입이 결정되는 '느슨한 타입' 체계를 사용하는 반면, 타입스크립트는 지정된 타입 값만을 할당받도록 '엄격한 타입' 체계를 사용합니다.

<br>
<br>
<br>

### 2) symbol 타입

<br>

symbol 타입은 ES6에서 추가된 특징으로서 객체 속성(object property)의 유일하고 불변적인 식별자로 사용됩니다.

symbol 타입은 `Symbol()`함수를 이용해 다음과 같은 형태로 선언합니다.

<br>

- ### `let hello = Symbol("hello"); `
- ### `const hello = Symbol(); `
  // const를 사용하면 유일(`Symbol()`사용)하면서 불변(`const`사용)한 특성을 지닌다.

<br>

`Symbol()`함수는 심벌 객체를 반환하며, 이때 `Symbol()`함수가 유일한 식별자를 생성하는 팩토리 함수의 역할을 하게 됩니다.

`Symbol()`함수를 호출할때 `"hello"` 인수는 심벌의 설명을 의미하며, 설명은 심벌에 접근할 때 사용할 수 있으며 생략할 수도 있습니다.

<br>

- **Example: 심벌 객체 간 비교**

  ```
  let hello = Symbol("hello");
  let hello2 = Symbol("hello");

  console.log(hello === hello2);      // 1) false
  console.log(hello, hello2);         // 2) Symbol(hello), Symbol(hello)
  console.log(typeof hello);          // 3) symbol
  ```

<br>

실행 결과의 1,2번에서 확인할 수 있듯이 심벌 객체는 호출될 때마다 새 심벌 객체를 만듭니다. 즉, 유일한 심벌 객체가 만들어 집니다.

따라서 `hello`와 `hello2`는 서로 다른 심벌 객체가 되며, 3번 실행 결과에서 확인할 수 있듯이 symbol 타입이라는 별도의 타입을 지닙니다.

이러한 심벌 객체는 아래 예제 처럼 '객체 리터럴의 속성 키'로도 사용할 수 있습니다.

<br>

- **Example: 속성 키로 사용할 수 있는 심벌 객체**

  ```
  const uniqueKey = Symbol();
  let obj = {};

  obj[uniqueKey] = 1234;

  console.log(obj[uniqueKey]);        // 1234
  console.log(obj);                   // {Symbol(): 1234}
  ```

  위 예제에서 보다시피 obj 객체에 유일한 식별자로 `uniqueKey`를 사용해 `1234`라는 값을 할당했습니다.

  그다음 `obj[uniqueKey]`의 결과를 출력해보면 `1234`가 정상 출력되지만 `obj`를 출력해보면 결과가 없음을 확인할 수 있습니다.

  그 이유는 `uniqueKey` 심벌 키는 충돌을 피할 목적으로 생성했으므로 객체에서 심벌키는 무시되고 출력되기 때문입니다.

<br>
<br>

`Symbol()`함수의 반환값은 별다른 값을 취하지 않아도 그 자체로 식별자가 됩니다.

예를 들어 `const`로 선언한 세 변수에 Symbol 객체를 할당하면 각 변수는 유일한 심벌 객체로 구분되는 유일한 식별자가 됩니다.

```
const colorRed = Symbol();
const colorOrange = Symbole();
const colorYellow = Symbole();
```

위처럼 `Symbol()`함수로 초기화된 변수는 객체 속성에 대한 유일한 식별자로서 값을 읽고 할당하는 용도로 사용할 수 있습니다.

<br>
<br>
<br>

### 3) enum 타입 (p.97)

<br>

enum 타입은 ES6에 제안된 타입으로, 컴파일 시간에 평가됩니다.

타입 계층도에서는 number 타입의 하위 타입으로 자바스크립트로 컴파일된 후에는 객체 리터럴이나 배열처럼 객체 타입이 됩니다.

typeof를 통해 타입 이름을 표시하면 object로 표시되며, enum은 명명된 숫자 상수(named numeric constants)의 집합을 정의할 때 사용합니다.

<br>

- ### `enum Day { 속성: 값, 속성: 값, 속성: 값 ...}`

<br>

위 형식에서 `Day`는 바인딩 식별자라 하고 `{ ... }`자체는 enum 객체라고 합니다. 이는 익명 객체 타입으로 `(속성: 값)`의 목록을 포함합니다.

<br>
<br>

`enum`은 숫자 상수를 기억하기 좋은 키워드로 변환해서 사용할 수 있습니다. 예를 들어 월~금에 대한 enum을 선언하려면 아래처럼 할 수 있습니다.

<br>

- EX) `enum WeekDay { Mon, Tue, Wed, Thu, Fri}`

<br>

각 속성은 상수와 연결되며 첫 번째 속성값의 인덱스는 0부터 시작합니다. 즉 위 코드에서 `Mon`은 상수 0과 연결되어있고 명시하지 않는 이상 순차적으로 인덱스가 증가하게 됩니다.

<br>
<br>

각 속성에는 초기값을 할당할 수 있는데 기본적으로 숫자를 할당할 수 있습니다. `enum`은 `const` 제한자를 붙여 상수 `enum`으로 선언할 수 있습니다.

<br>

- EX) `const enum WeekDay { Mon = 1, Tue =2, Wed = 3, Thu = 4, Fri = 5}`

<br>
<br>

상수 `enum`인 `WeekDay`는 읽기 전용이므로 속성이나 인덱스 접근 표현식으로 속성값을 읽어야 합니다.

```
let day1 = WeekDay.Mon;               // 유효(속성으로 접근 가능)
let day2 = WeekDay["Tue"];            // 유효(인덱스 접근 표현식은 문자열 리터럴("Tue")을 사용해야함)
let day2 = WeekDay[WeekDay.Tue];      // 에러("Tue"같은 문자열 리터럴만 허용됨)
let day3 = WeekDay;                   // 에러(속성으로 접근하거나 인덱스 접근 표현식만 허용됨)
```

<br>
<br>

타입스크립트 2.4부터는 문자열 enum이 추가되어 아래처럼 초깃값으로 문자열도 할당할 수 있습니다.

```
enum WeekDay {
  Mon = "Monday",
  Tue = "Tuesday"
  }
```

다만 문자열을 초깃값으로 설정할 때는 하나의 속성을 문자열로 설정했다면, 다른 속성의 초깃값도 문자열 또는 숫자가 되어야 하고 연산식은 할당할 수 없습니다.

<br>
<br>

#### 3.1) enum 타입을 선언하는 방법

<br>

참조: `JSON.stringify()` 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환합니다.

<br>

- **Example: 1**

  ```
  enum WeekDay { Mon, Tue, Wed, Thu = Tue + Wed }

  console.log(JSON.stringify(WeekDay));
  // 결과: {"0":"Mon","1":"Tue","2":"Wed","3":"Thu", "Mon":0,"Tue":1,"Wed":2,"Thu":3}"
  ```

  - WeekDay의 속성으로 Mon, Tue, Wed, Thu를 선언하였고, 초깃값이 없으므로 대응하는 상수값은 0, 1, 2, 3으로 결정된다.

  - 예제 1,2의 출력 결과는 WeekDay와 WeekDay2의 내용을 보여준다. 보다시피 enum 객체는 속성의 인덱스가 키가 되기도 하고 속성의 이름이 값이 되기도 한다. 따라서 객체에 할당되는 속성은 enum 객체의 속성 개수보다 2배 더 많게 된다.

  <br>

- **Example: 2**

  ```
  let thu2: number = 10 * 2;

  enum WeekDay2 { Mon = 10, Tue, Wed = 10 << 2, Thu = thu2 }

  console.log(JSON.stringify(WeekDay2));
  // 결과: {"10":"Mon","11":"Tue","20":"Thu","40":"Wed", "Mon":10,"Tue":11,"Wed":40,"Thu":20}"
  ```

  - WeekDay2의 속성은 WeekDay와 같지만 일부 속성은 초깃값을 할당했다. Mon은 10을 할당했고, Tue는 초깃값은 없지만 Mon 다음에 위치하므로 11로 결정된다.

  - Wed 속성은 초깃값을 할당할 때 연산자를 사용할 수 있음을 보여주며, `10 << 2`와 같이 왼쪽 시프트 연산을 수행해 `40(10*22)`가 할당된다.

  - 마지막 Tue속성은 외부에 선언한 변수를 할당할 수 있다는 것을 보여준다.

  <br>

- **Example: 3**

  ```
  enum WeekDay3 { Mon = "Monday", Tue = "Tuesday"}

  console.log(JSON.stringify(WeekDay3));
  // 결과: {"Mon":"Monday","Tue":"Tuesday"}
  ```

  - WeekDay3 속성은 초깃값으로 문자열을 할당해주었다.

  - 이는 문자열이 할당된 enum 객체의 내용으로 유의할 점은 속성값으로 문자열이 할당될 경우 속성값으로 속성 이름을 알 수 없다는 점이다. 즉 리버스 매핑(reverse mappiing)이 적용되지 않는다.

  - 따라서 출력 결과에서도 리버스 매핑 결과가 반영되지 않는다. `WeekDay3["Monday"]`와 같은 문자열 값을 이용해 속성 이름을 역으로 얻을 수 없다.

<br>
<br>
<br>
<br>

## 5. 타입스크립트의 내장 타입 (p.102)

<br>

자바스크립트에서 호환되지 않는 타입스크립트에서만 지원되는 내장타입을 살펴보자.

<br>

### 1) any 타입

<br>

any 타입은 제약이 없는 타입으로 어떤 타입의 값도 받아들일 수 있다. 자바스크립트가 최소한의 정적 타입 검사를 수행하듯이 최소한의 타입 검사만 수행한다.

예를 들어 임의 값을 받아들일 때 any 타입은 any 키워드로 선언할 수 있다.

<br>

```
var basket: any = 10;
basket = true;
basket = "banana";
console.log(basket);                       // banana

let vList: any[] = [ 1, false, "happy" ];
console.log(vList[0]);                     // 1
```

<br>

위처럼 any는 확정된 타입은 아니지만 어떤 값이든 할당받을 수 있다. 이러한 any 타입은 외부 라이브러리의 연산 결과를 받는 것과 같이 타입 결과를 예측할 수 없을 때 유연한 대처가 가능해진다.

실행 결과에서도 마지막으로 할당된 문자열인 "banana"가 정상적으로 출력되고, 배열을 담은 vList 변수는 배열 타입을 any[]로 선언하여 배열 값의 타입이 다양해서 한 가지 타입으로 고정할 수 없을 때 활용할 수 있다.

<br>
<br>
<br>

### 2) any 타입을 이용해 컴파일 시간에 타입 검사 생략하기

<br>

any 타입은 모든 타입의 가장 최상위 타입으로 자바스크립트의 모든 값을 할당받을 수 있다. 그리고 자바스크립트의 변수 선언과 동일한 동작을 수행한다.

예를 들어 변수 a를 선언해보면 `var a;`는 `a: any`와 동일하다. 즉 a 변수는 `var a: any`로 선언하는 것과 같다. 다만 any 타입으로 선언하면 명시적으로 타입을 선언한 것이고, any 타입을 생략하면 타입이 없는 것이된다.

<br>

자바스크립트 변수는 타입이 없으면 어떤 값이든 받아들이게 된다. any 타입으로 선언된 변수도 '최소한의 정적 타입 검사'만 수행하기 때문에 마찬가지로 어떤 값이든 받아들일 수 있게 된다.

하지만 '최소한의 정적 타입 검사'는 선언 돼 있지 않는 속성에 접근하더라도 컴파일 오류가 발생하지 않는다는 차이점이 있다.

<br>

```
let number = 50;
let number2: any = 50;

console.log(number.toFixed(2));       // "50.00"
console.log(number2.toFixed(2));      // "50.00"

number.notExistMethod();              // Property 'notExistMethod' does not exist on type 'number'.
number2.notExistMethod();
```

위처럼 두 변수를 모두 number 타입인 숫자 50으로 초기화 했다. 이제 숫자 타입에서만 사용할 수 있는 `toFixed()` 메서드(숫자 값에 대해 소수점 이하의 자리를 지정하는 기능의 메서드)를 사용해보면, 두 선언은 50.00으로 출력된다.

하지만 any 타입으로 선언되지 않은 number 변수에서 선언되지 않은 임의 메서드인 `notExistMethod()`을 호출하면 컴파일 오류가 발생한다.

<br>
<br>
<br>

### 3) any 타입과 유사하지만 동작 방식이 다른 object 타입

<br>

object 타입은 any 타입처럼 타입 구분 없이 값을 할당할 수 있는 특성이 있어 any 타입과 비슷하지만 '속성 유무를 검사하는 시점'이 다르다.

즉 any 타입으로 선언한 변수는 런타임 시에 속성의 유무를 검사하지만, object 타입으로 선언한 변수는 컴파일 시간에 속성의 유무를 검사한다.

따라서 object 타입의 변수에 숫자를 할당하더라도 컴파일 시 숫자 메서드를 인식하지 못하므로, 컴파일 시간에 에러가 발생한다.

<br>

```
let number: Object = 50;
number.toFixed(1);            // Property 'toFixed' does not exist on type 'Object'.
```

<br>

`number`의 변수 타입은 object 이므로 어떤 타입의 값이든 할당 받을 수 있다. 하지만 이때 변수에 할당된 값의 타입이 number인지 string인지 할 수 없기 때문에 위와 같은 에러가 발생한다.

즉 object타입은 컴파일 과정에서만 유효한 타입이므로 실제 자바스크립트로 컴파일 뒤에는 타입이 사라지게 된다. 따라서 컴파일 후에는 타입을 지정하지 않은 것과 같게 된다.

하지만 any 타입으로 선언한다면 컴파일과 실행에 오류가 발생하지 않는다.

<br>
<br>
<br>

### 4) 배열 타입과 제네릭 배열 타입

<br>

배열은 여러 개의 값을 하나의 변수에 담아 관리하는 자료 구조로, 타입스크립트에서 배열 타입은 두가지 형태로 나뉘는데 '배열 타입(Array Type)'과 '제네릭 배열 타입(Generic Array Type)'으로 나뉜다.

<br>
<br>

### 4.1 배열

<br>

- `let myVar: number[] = [1, 2, 3, 4, 5];`

- 위에서 `number`는 요소 타입이며 `number[]`는 배열 타입이다. 그리고 `[1, 2, 3, 4, 5]`는 배열의 요소이다.

<br>

- 요소 타입으로는 string, number, boolean과 같은 내장 타입 뿐만 아니라 클래스나 인터페이스도 올 수 있다.

<br>

- 배열에 값을 나중에 할당하려면 먼저 빈 배열인 `[]`를 이용해 초기화 한 후 `push()` 메서드로 배열 요소를 추가할 수도 있다.

  ```
  let fruits: string[] = [];

  fruits.push("banana");
  fruits.push("apple");
  fruits.push("mango");
  ```

<br>

- 배열 요소의 타입이 정해져 있지 않다면 `let myVar: any[] = [1, "h1", true];`처럼 any 타입으로 지정할 수 있다.

- 타입을 제약하려면 유니언 타입을 이용해 선언할 수도 있다 `let myVar: (number | string | boolean)[] = [1, "h1", true]`

<br>
<br>

### 4.2 제네릭 배열

<br>

- 제네릭 배열 타입은 `Array<T>` 형태로 선언합니다. 이때 `T`는 타입을 의미합니다.

<br>

- 제네릭 배열 타입에 `[1,2,3]`배열을 할당하면 `let num: Array<number> = [1, 2, 3];`와 같이 선언합니다.

<br>

- 타입을 숫자나 문자열로 제약하려면 `let num: Array<number | string> = [1, "hello"];`와 같이 유니언 타입으로 선언합니다.

<br>

- 타입을 참조할 때는 타입 쿼리(type queries)를 이용합니다. 타입 쿼리는 `typeof` 연산자를 이용해 참조할 변수의 타입을 얻어와 지정합니다.

  ```
  let num: Array<number | string> = [1, "hello"];
  let num2: typeof num = [1, "hello"];              // 타입 쿼리로 num 변수의 타입을 참조
  ```

<br>

- 제네릭 배열 타입은 내장 타입 외에 객체 타입도 받을 수 있다. 예를 들어 배열요소로 익명 함수를 받으려면 타입을 `() => string`으로 선언한다.

  ```
  let nums: Array<() => string> = [() => "one", () => "two"];

  console.log(nums[0]());    // "one" 출력
  ```

<br>

- 배열을 선언하는 부분과 요소를 추가하는 부분을 분리하려면 다음과 같이 작성한다.

  ```
  let num2: Array<number> = new Array<number>();

  num2.push(1)
  num2.push(2)
  num2.push(3)
  ```

  제네릭 타입 인수로 사용된 number는 컴파일 시점에 타입을 검사합니다. 배열 타입과 제네릭 타입은 컴파일 시 타입 검사를 위해 필요하고, 컴파일 후(ES5)에는 타입이 제거된 배열만 남는다.

<br>
<br>
<br>

### 5) 튜플(Tuple) 타입

<br>

튜플 타입은 n개의 요소로 이루어진 배열에 대응하는 타입을 의미한다.

튜플은 배열과 비슷한데, 배열은 배열 요소의 개수에 제한이 없고 `let x: string[] = ["tuple", "tuple2"];`에서 `string[]`처럼 특정 타입으로 배열 요소의 타입을 강제할 수 있다.

<br>

반면 튜플 타입은 배열 요소에 대응하는 n개에 대한 타입이다. 예를들어 `["tuple", 100]`배열에 대한 튜플 타입은 아래와 같이 선언 된다.

<br>

```
let x: [string, number] = ["tuple", 100];

console.log(typeof x, typeof x[0], typeof x[1]);    // "object", "string", "number"
console.log(x[0].substr(0, 2), x[1].toFixed(2));    // "tu", "100.00"
```

- 위에서 `[string, number]`는 튜플 타입이며 `["tuple", 100]`는 배열이다.

- 튜플타입중 `string`은 배열의 첫 번째 요소인 `tuple`에 대응하는 타입이고, 튜플타입`number`는 두번째 요소인 `100`에 대응한다.

- 즉, 튜플에 선언된 타입 수와 할당될 배열의 요소 수가 정확히 일치돼야 할당이 가능해졌다.

<br>
<br>

- **Example:**

  ```
  // 튜플 타입으로 선언
  let x: [string, number];

  // 초기화
  x = ["hello", 10];          // 성공

  // 잘못된 초기화
  x = [10, "hello"];          // 오류


  // 정해진 인덱스에 위치한 요소에 접근하면 해당 타입이 나타납니다.
  console.log(x[0].substring(1));     // 성공
  console.log(x[1].substring(1));     // 오류 'number'에는 'substring' 이 없습니다


  // 정해진 인덱스 외에 다른 인덱스에 있는 요소에 접근하면, 오류가 발생하며 실패합니다.
  x[3] = "world";                     // 오류 '[string, number]' 타입에는 프로퍼티 '3'이 없습니다
  console.log(x[5].toString());       // '[string, number]' 타입에는 프로퍼티 '5'가 없습니다
  ```

<br>
<br>
<br>

### 6) Void, Null, Undefined

<br>

`void`는 함수의 반환 값이 없을 때 지정하는 타입으로, `void` 타입에는 `null`이나 `undefined`만 할당할 수 있습니다.

그 이유는 `void` 타입이 `null`과 `undefined`의 상위 타입이기 때문입니다. 예를 들어 `hello`라는 함수에 반환값이 없다고 가정해봅시다.

<br>

```
function hello() {
  console.log("hello world");
  // 반환값이 없음
}
```

위처럼 반환값이 없을 때 이를 명시적으로 나타내기 위해 `void`를 지정합니다.

<br>
<br>

만약 아래처럼 변수에 `void` 타입을 지정한다면 반환값이 없는 채로 받습니다.

이때 `myhello` 변수는 `void` 타입으로 지정했으므로 `void`나 `undefined`를 할당할 수 있습니다.

```
function hello(): void {
  console.log("hello world");               // "hello world"
  // 반환값이 없음
}

let myhello:void = hello();

console.log(myhello, typeof myhello);       // undefined,  "undefined"
```

<br>

`hello()`함수의 반환 타입은 `void`이지만 반환값이 없으므로 실제로는 `undefined`가 할당되어 출력됩니다.

출력 결과만 보더라도 함수는 반환값이 없으므로 `void` 타입으로 선언하지만 반환값 없이 `myhello` 변수에 할당됐으므로 `undefined`가 됩니다.
