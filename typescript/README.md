<br>

# TypeScript Quick Start Study

<br>

---

<br>

# 01. 개발 환경 구축 관련

<br>

## # 컴파일러(p.16)

<br>

타입스크립트의 아키텍처는 언어 변환 기능을 수행하는 코어 타입스크립트 컴파일러를 기반으로 한다.

코어 타입스크립트 컴파일러는 파서, 바인더, 타입체커, 에미터, 전처리기로 구성되어 있다.

<br>

- 파서(parser): 읽어 들인 소스코드를 해석해 구문 트리를 만들고, 구문 트리를 다시 해석해 추상 구문 트리를 생성한다. 이때 추상 구문 트리(AST: Abstract Syntax Tree)는 구문 분석으로 생성된 파스 트리(Parse Tree)에서 불필요한 중복 내용을 제거한 트리이다.

- 바인더(binder): 인터페이스나 모듈, 혹은 함수와 같은 모듈에 선언이 있을 때 이러한 선언을 심벌(symbol)로 보고 심벌 간의 규칙을 정의한다. 타입 시스템은 바인더를 통해 명명된 선언을 추론할 수 있게 된다.

- 타입 체커(type checker): 타입이 선언된 구문을 분석하고 타입이 적절한지 체크한다.

- 에미터(emitter): 입력된 `*.ts` 같은 타입스크립트 파일을 `*.js`, `*.d.ts`, `*.js.map` 유형의 파일로 생성하는 기능을 수행한다.

- 전처리기(pre-processor): 타입스크립트 파일에 선언된 import문이나 `"/// <reference path = 경로/>"` 와 같은 외부 호출 선언이 있을 때 참조할 수 있는 파일을 가져와 정렬된 파일 목록을 생성한다. 파일 목록을 만들 때는 `.d.ts`보다는 `.ts` 파일을 우선으로 호출해 가져온다. 이때 앰비언트 모듈이 이미 선언돼 있다면 모듈을 가져오지 못하더라도 에러를 발생시키지 않는다. 결국 컴파일러는 전처리기로부터 생성된 파일 목록을 이용해 파일을 호출하고 컴파일을 수행한다.

<br>
<br>
<br>
<br>

## # 타입스크립트 설치 및 버전 업그레이드(p.41)

<br>

1. npm을 이용한 타입스크립트 설치

   - 설치: `npm install -g typescript`
   - 버전확인: `tsc -v`
   - 업데이트: `npm outdated -g typescript`

<br>

2. 타입스크립트 최신 버전 업데이트 방법

   - 타입스크립트 제거: `npm uninstall -g typescript`
   - 패키지 관련 기존 파일 삭제: `npm cache clean`
   - 타입스크립트 새로 설치: `npm install -g typescript`

<br>
<br>
<br>
<br>

---

<br>
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

### &nbsp; 3.1 기본 타입

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

### &nbsp; 3.2 객체 타입

<br>

&nbsp;&nbsp; 객체 타입은 속성을 포함하고 있으며, 호출(call) 시그니처와 생성자(construct) 시그니처 등으로 구성된 타입이다.

<br>

#### &nbsp; # 타입스크립트에서 지원하는 객체 타입의 종류

<br>

- Array 타입

  - 배열 요소에 대응하는 타입으로 배열 요소가 1,2,3과 같은 숫자값이면 `number[]`가 array타입이 된다.

  - `let items: number[] = [1, 2, 3]`

<br>

- Tuple 타입

  - 배열 요소가 n개로 정해질 때 각 요소별로 타입을 지정한 타입이다.

  - 배열 요소가 문자 문자열과 숫자라면 `[string, number]` 같은 형태로 타입을 정의한다.

  - ```
     let x: [string, number];
     x = ["tuple", 100];
    ```

<br>

- Function 타입

  - 함수 타입은 시그니처를 포함하도록 정의한 타입이다. (이후 자세히 다룬다)

<br>

- 생성자 타입

  - 하나의 객체(클래스로부터 생성)가 여러 생성자의 시그니처로 구성될 때 포함될 수 있는 타입으로 생성자 타입 리터럴을 사용해 정의한다.

  - 생성자 타입 리터럴은 생성자 시그니처를 구성하는 타입 매개변수, 매개변수 목록, 반환 타입으로 구성된다.

  - 선언 형식: `new <타입1, 타입2, ...> (매개변수1, 매개변수2, ...) => 타입`

<br>

- Class와 Interface 타입

  - 객체타입(object type)으로 분류되고 객체지향 프로그래밍이나 구조 타이핑 등에 활용된다.

<br>

- 유니언(union) 타입

  - 2개 이상의 타입을 하나의 타입으로 정의한 타입이다

  - `var x : string | number;`

<br>

- 인터섹션 타입

  - 두 타입을 합쳐 하나로 만들 수 있는 타입이다.

  - 예를 들어 Cat 인터페이스와 Bird 인터페이스에 선언된 속성을 합치기 위해 Cat & Bird와 같은 방식으로 선언할 수 있다.

  - ```
    interface Cat { leg: number; }
    interface Bird { wing: number; }

    let birdCat: Cat & Bird = { leg: 4, wing: 2 };
    ```

  - 위 코드에서 `birdCat`변수가 인터섹션 타입인 `Cat & Bird`로 선언돼 있으므로 할당 객체는 `leg`, `wing` 속성만 허용한다.
