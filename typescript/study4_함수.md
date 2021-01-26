<br>

# TypeScript Quick Start - 04. 함수

<br>
<br>
<br>

# 1. 타입스크립트 함수 사용

<br>

타입스크립트의 함수는 자바스크립트 함수와 비교해 매개변수나 반환값에 타입을 추가할 수 있습니다. 또한 함수를 변수에 할당할 때 함수 타입을 추가해 타입 안전성(Type Safety)을 강화할 수 있습니다.

또 함수는 애플리케이션의 코드를 구성하는 기본 요소로, 타입스크립트의 함수는 클래스나 네임스페이스 내에서 선언할 수 있고 때론 모듈로서 사용됩니다.

타입스크립트는 자바스크립트에서 함수를 선언했던 것과 동일한 방식으로 선언해 사용자가 원하는 단위 기능을 수행할 수 있습니다.

<br>
<br>
<br>
<br>

## 1) 자바스크립트 함수

<br>
<br>

### 1.1 기명 함수와 익명 함수의 선언

<br>

자바스크립트의 함수는 함수의 이름을 명시에 선언하는 '기명 함수(Named Function)'와 '익명 함수(Anonymous Function)'로 나뉩니다.

먼저 기명 함수는 `function`키워드와 함수명을 기입해 `function namedFunction(a, b)`와 같이 선언합니다.

기명 함수는 호출될 때 호이스팅이 발생합니다. 따라서 함수를 선언하기 전과 함수를 선언한 후에도 호출할 수 있습니다.

<br>
<br>

- **Example: 기명 함수 예제**

  ```
  namedFunction(1, 2);                  // 함수를 선언하기 전에도 호출 가능

  function namedFunction(a, b) {}       // 함수 선언

  namedFunction(1, 2);                  // 호출 가능
  ```

  위처럼 함수가 호출될 때 호이스팅 문제로 인해 함수 호출이 복잡해질 수 있습니다. 이를 보완하는 방법은 변수에 익명 함수를 할당하는 것입니다.

<br>
<br>

- **Example: 변수에 익명 함수 할당 예제**

  ```
  resultMulti(1, 2);        // Problem : 'resultMulti'가 정의되기 전에 사용되었습니다.(정의 전 사용 안함)

  let resultMulti = function(a, b) {
    return a * b
  };

  resultMulti(1, 2);        // 호출 가능
  ```

  위처럼 변수에 익명 함수를 할당해 호출하면 익명 함수를 할당한 뒤에만 함수를 호출할 수 있도록 시점을 제한할 수 있습니다.

  또 `let` 선언자도 익명 함수를 변수에 할당한 후에만 호출할 수 있도록 제한해줍니다.

<br>
<br>
<br>

### 1.2 자바스크립트 함수의 불안전성

<br>

자바스크립트는 타입을 명시하지 않아 함수에서 연산을 수행할 때 문자열 연산이 될지 숫자 연산이 될지 예측할 수 없습니다.

<br>

```
function test(str) {
  return str + 1000;
}

let result = test("1000");
console.log(typeof result, result);     // string, 10001000
```

<br>

위 예제의 실행결과로 보면 문자열 타입인 `"1000"`과 숫자 값 `1000`에 대해 문자열 결합 연산이 이루어졌음을 추측할 수 있습니다.

이처럼 타입을 명시하지 않아 위와 같은 상황이 발생하는 문제를 방지하기 위해 아래와 같은 내용으로 불필요한 매개변수의 검증이나 타입 캐스팅을 수행합니다.

<br>

- 함수의 매개변수에 대한 타입 검증(타입이 일치하지 않으면 타입 캐스팅)

- 함수의 연산을 수행한 후에 반환값에 대한 타입 캐스팅

- 함수 호출 결과에 대한 타입 캐스팅

<br>
<br>

- **Example: 검증 및 캐스팅 수행 코드 예제**

  ```
  function test(num) {
    if (typeof num !== "number") {        // 의도치 않은 타입 입력을 대비한 타입 검증
      num = Number(num);                  // 타입이 일치하지 않으면 강제로 타입 캐스팅
    }

    // 연산 수행
    return Number(num) + 1000;            // Number()로 연산 후 타입 변경을 대비해 최종적으로 타입 캐스팅
  }

  let result = Number(test("1000"));      // 연산후 타입 변경을 대비해 최종적으로 타입 캐스팅
  console.log(typeof result, result);     // number, 2000
  ```

  타입 검사와 캐스팅이 과도하게 느껴지는 코드지만 위와 같은 상황이 꽤 자주 일어나게 됩니다. 어찌보면 위처럼 타입 검증 코드를 추가하는것은 당연한 작업으로 인식될 수 있으나, 이는 반복적인 작업이고 타입 캐스팅으로 인해 불필요한 자원을 소비해 성능에도 악영향을 줍니다.

  반면 타입스크립트는 함수의 매개변수나 반환값에 타입을 지정할 수 있어 타입 안전성이 있고, 코드를 더욱 간결하게 만들 수 있습니다.

<br>
<br>
<br>
<br>

## 2) 타입 안전성을 갖춘 타입스크립트 함수

<br>

타입스크립트는 함수의 매개변수나 반환 타입을 추가해 타입 안전성을 강화합니다.

예를 들면 매개변수에 숫자 타입을 지정해 숫자 값만 받을 수 있도록 제한하거나, 함수의 반환 타입을 지정하여 잘못된 타입의 값이 반환되지 않도록 합니다.

<br>

#### &nbsp;&nbsp; # Typing: `function max(x: number, y: number): number{...}`

<br>

위와 같이 함수의 매개변수 타입이나 반환 타입을 추가하는 과정을 함수에 대한 타입 지정(Typing)이라고 합니다.

<br>

- **Example: 함수에 매개변수 타입과 반환 타입을 지정한 예제**

  ```
  function max(x: number, y: number): number {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  let a = max(1, 2);

  console.log(`a = ${a}`);        // a = 2
  ```

  위 예제에서는 `max`함수의 매개변수 타입과 함수의 반환 타입을 `number`로 지정했습니다. 이렇게 하면 매개변수로 숫자 값만 전달되므로 함수에서 안전하게 숫자 값만 반환할 수 있습니다.

  만약 문자열 타입의 값을 매개변수로 전달하면 선언한 타입과 전달하려는 타입이 일치하지 않다는 오류 메세지가 나타나게 됩니다.

<br>
<br>
<br>
<br>
<br>

# 2. 매개변수의 활용

<br>
<br>

## 1) 기본 초기화 매개 변수

<br>

기본 초기화 매개변수(default-initialized parameter)는 함수의 특징 매개변수에 인수가 전달되지 않으면 매개변수에 설정된 초깃값으로 값을 초기화하는 기능입니다.

<br>

#### &nbsp;&nbsp; # Default-initialized Parameter: `y: number = 2`

<br>

위의 선언 형식을 보면 y는 매개변수이고 number는 매개변수의 타입입니다. 그리고 2는 초깃값입니다.

기본 초기화 매개변수는 함수의 매개변수 목록에 선언합니다. 매개변수 목록에는 일반 매개 변수와 기본 초기화 매개변수를 함께 선언할 수 있습니다.

<br>

- **Example:**

  ```
  function pow(x: number, n: number = 2): number {
    return x ** n;
  }

  console.log(pow(10));             // 100 (10*10)
  console.log(pow(10, 3));          // 1000 (10*10*10)
  ```

  <br>

  위 예제에서 `pow`함수는 `n`제곱 값을 돌려주는 함수입니다. 이 함수는 숫자만 전달하고 `n`제곱 값을 생략하면 숫자의 제곱 값을 반환해주고, 숫자와 `n`제곱 값을 함께 전달하면 숫자를 `n`제곱한 결과 값을 반환해줍니다.

  <br>

  - 매개변수 목록: `x: number, n: number = 2`

  - 기본 초기화 매개변수: `n: number = 2`

  - 함수의 반환 타입: `number {...}`

<br>
<br>
<br>
<br>

## 2) 나머지 매개변수(Rest Parameter)

<br>

나머지 매개변수는 개수가 정해지지 않은 인수(Arguments)를 배열(Array)로 받을 수 있는 기능입니다.

개수가 정해지지 않은 만큼 순서가 크게 중요하지 않은 여러 요소를 전달하는 데 유용합니다. 나머지 매개변수는 "`...`"형태로 선언합니다.

<br>

#### &nbsp;&nbsp; # Rest Parameter: `function concat(...restParameter) {...}`

<br>
<br>

나머지 매개변수는 0개 이상의 요소를 받을 수 있습니다. 따라서 위 예제의 concat 함수를 호출하려면 최소한 0개 이상의 인수를 전달해야 합니다.

만약 함수에서 첫 번째와 두 번째 매개변수의 순서가 중요하고, 세 번째 부터는 순서가 중요하지 않다면 아래 처럼 세 번째 매개변수를 나머지 매개변수로 선언해줍니다.

<br>

```
function concat(a, b, ...restParameter) {
  return a + b + restParameter.join("")
}

console.log(concat("a", "b", 1, 2, true, false))        // ab12truefalse
```

<br>

위 `concat`함수는 매개변수 `a, b`가 먼저 선언되어 있기 때문에 매개변수 갯수보다 많은 최소 2개 이상의 인수를 전달해야 합니다. 3개 이상의 인수를 전달하면 나머지 매개변수 `...restParameter`가 배열 형태로 받습니다.

그리고 `concat`함수는 여러 개의 인수를 받는 나머지 매개변수 `...restParameter`를 선언해 문자열 합치기를 수행합니다. 주목할 점은 선언된 나머지 매개변수는 타입이 없기 때문에 타입 구분 없이 여러 인수를 전달받아 '문자열 합치기'를 수행한다는 것입니다.

<br>
<br>

- **Example: 일반 매개변수와 나머지 매개변수에 타입 선언 예제**

  ```
  function colors(a: string, ...rest: string[]) {
    return a + " " + rest.join(" ");
  }

  colors();                               // Problem: 'a'에 대해 1 개 이상의 인수가 제공되지 않았습니다.
  let color1 = colors("red");
  let color2 = colors("red", "orange");
  let color3 = colors("red", "orange", "yellow");

  console.log(colors());                  // undefined: 인수가 1 개 이상 필요하지만 0 개가 있습니다.
  console.log(`color1 = ${color1}`);      // color1 = red
  console.log(`color2 = ${color2}`);      // color2 = red orange
  console.log(`color3 = ${color3}`);      // color3 = red orange yellow
  ```

  `colors`함수의 매개변수 목록을 보면 첫 번째 매개변수는 1개의 인수를 받고 두번째 매개변수는 0개 이상의 인수를 받을 수 있는 나머지 매개변수입니다.

  따라서 `colors`함수를 호출할 때 최소한 1개 이상의 인수를 전달해야 합니다. 따라서 전달할 인수가 없는 `colors()`와 같은 호출은 유효하지 않습니다.

<br>
<br>
<br>
<br>

## 3) 선택 매개변수(Optional Parameter)

<br>

선택 매개변수(Optional Parameter)는 함수 호출 시 매개변수를 선언한 만큼 인수를 전달해야 합니다. 예를 들어 minus 함수에 두 개의 매개변수가 선언돼 있다면 minus(1, 2)에 대한 호출만 유효합니다.

<br>

```
function minus(a: number, b: number) {
  return a - b;
}

let minusResult1 = minus(1);              // Problem: 인수가 1개 이상 필요하지만 0 개가 있습니다.
let minusResult2 = minus(1, 2);
let minusResult3 = minus(1, 2, 3);        // Problem: 인수가 2개만 필요하지만 3개가 있습니다.

console.log(minusResult1, minusResult2, minusResult3)   // NaN, -1, -1
```

앞서 살펴봤던 나머지 매개변수는 최대 개수가 정해져 있지 않기 때문에 불필요한 인수들이 함께 전달될 수 있습니다. 따라서 전달할 인수의 개수를 0개 이상 ~ 1개 미만으로 제한하려면 '선택 매개변수'를 이용해야 합니다.

<br>
<br>

선택 매개변수는 변수명 뒤에 물음표를 붙이는 식으로 선언합니다. 선택 매개변수를 이용하면 선택 매개변수로 지정한 매개변수는 생략할 수 있습니다.

예를 들어 매개변수로 2개의 인수를 받기로 하고 이 가운데 두 번째 매개변수는 선택 매개변수로 정의했다고 가정해봅시다.

```
function sum(a: number, b?: number):number { ... }
```

위는 두 번째 매개변수를 선택 매개변수로 선언했기 때문에 함수 호출 시 선택 매개변수에 전달할 인수는 생략할 수 있습니다.

<br>
<br>

- **Example: 선택 매개변수를 지정해 함수 호출 시 인수를 생략하는 예제**

  ```
  function sum(a: number, b?: number): number {
    return a + b;                   // Problem: (parameter) b: number | undefined
  }
  console.log(sum(1));              // NaN
  ```

  실행결과를 보면 두 번째 매개변수를 선택 매개변수로 사용함으로써 인수 하나를 생략해 호출하더라도 에러가 발생하지 않습니다(strict 모드에서는 problem발생).

  다만 선택 매개변수로 지정된 b가 초기화되지 않았기 때문에 숫자가 아닌 NaN 값이 되어 함수의 반환값도 NaN이 됩니다.

  초기화를 시켜주기 위한 기본 초기화 매개변수는 인수가 생략돼 있을 때 매개변수의 초깃값을 설정할 수 있었지만, 선택 매개변수와 결합해서는 사용할 수 없습니다.

<br>
<br>

- **Example: 함수 내부에서 초기값을 설정하기**

  ```
  // 1)
  function sum2(a: number, b?: number) {
    if (b === undefined) {
      b = 0;
    }

    return a + b;
  }
  console.log(sum2(1));             // 1


  // 2)
  function sum(a: number, b?: number): number {
    const c: number = typeof b === 'number' ? b : 0;
    return a + c;
  }
  console.log(sum(1));              // 1
  ```

  위 예제 `1)`에서는 매개변수 b를 선택 매개변수로 지정했고, 선택 매개변수 b의 초깃값을 함수 내부에서 설정하게 했습니다.

  즉 선택 매개변수 b가 아무것도 전달받지 못했을 때 어떤 값으로 초기화할 것인지에 대한 처리 로직을 추가해야 합니다.

  예제 `2)`는 `1)`의 코드를 더 간략하게 만든 예제 입니다.

<br>
<br>
<br>
<br>

## 4) 함수 오버로드(function overloads)

<br>

함수 오버로드(function overloads)는 함수명은 같지만 매개변수와 반환 타입이 다른 함수를 여러 개 선언할 수 있는 특징을 말합니다.

```
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: boolean, b: boolean): boolean;
function add(a: any, b: any): any {
  return a + b;
}

console.log(add(1, 2));                   // 3
console.log(add(false, false));           // 0
console.log(add("hello", " world"));      // hello world
```

컴파일 시간에 가장 적합한 오버로드를 선택해 컴파일하므로 자바스크립트 실행 시에는 런타임 비용이 발생하지 않습니다.

<br>
<br>

주의할 점은 타입스크립트는 자바스크립트로 변환되고 나서도 동일한 형태를 유지해야 한다느 것입니다. 따라서 각 오버로드를 아래처럼 독립된 블록으로 선언해선 안 됩니다.

```
// X
function add(a: string, b: string): string { ... }
function add(a: number, b: number): number { ... }
function add(a: any, b: any): any { ... }
```

매개변수를 any타입으로 선언한 가장 일반적인 함수의 시그니처를 가장 아래에 선언하고, 그 위로 구체적인 타입을 명시한 함수의 시그니처를 쌓는 방식으로 선언해야 합니다.

그러면 선언된 함수의 시그니처에 맞게 인수를 넘겨 호출할 수 있습니다.

<br>
<br>

- **Example: 매개변수의 개수가 다른 오버로드를 지정할 때**

  ```
  function add(a: number): number;
  function add(a: number, c: number): number;
  function add(a: any, b?: any): any {
    if (b === undefined) {
      return a;
    } else {
      return a + b;
    }
  }

  console.log(add(1, 2));         // 3
  console.log(add(1));            // 1
  ```

  위 예제처럼 매개변수의 개수가 다른 오버로드를 지정할 때는 선택 매개변수를 둬 매개변수 개수에 변화를 줄 수 있도록 허용할 수 있습니다.

  또 `add` 함수의 두 번째 매개변수 `b`에 `?`를 사용해 선택 매개변수로 선언했습니다. 그리고 선택 매개변수는 전달받은 값이 없을 수 있으므로 `undefined`인지를 검사하는 로직을 추가해주었습니다.

  이 코드는 간단하므로 오버로드에 선언한 타입별로 처리하지는 않았습니다. 다음 예제는 오버로드를 선언하고 매개변수의 타입별로 서로 다른 처리를 하도록 오버로드 함수 내부에 로직을 추가해보겠습니다.

<br>
<br>

- **Example: 함수 오버로드의 선언과 처리**

  ```

  ```
