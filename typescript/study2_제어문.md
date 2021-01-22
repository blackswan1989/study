---
title: "TypeScript Quick Start - 02. 변수 선언과 기본 타입"
---

<br>
<br>

타입스크립트는 조건문에 타입 제약을 할 수 있고 컴파일러 옵션을 통해 switch문에서 폴스루(fall-through)허용 여부를 설정할 수 있습니다. 또한 최신 자바스크립트 반복문을 이용해 객체를 더욱 쉽게 다룰수도 있습니다.

<br>
<br>

# 1. 조건문의 타입 제약과 폴스루(fall-through)

<br>

타입스크립트는 자바스크립트에서 사용했던 조건문인 if문과 switch문을 사용할 수 있습니다.

if문은 조건의 참과 거짓에 따라 분기를 수행하는 조건문이고 switch문은 입력값에 따라 분기를 결정하는 조건문입니다.

<br>
<br>
<br>

## 1) if문 사용지 타입 제약

<br>

if문은 조건이 참인지 거짓인지 판단하고 분기를 수행하며 다음과 같이 작성합니다.

```
if(조건) {
  명령문;
}
else {
  명령문;
}
```

이때 if문에 지정하는 조건은 불리언(boolean) 타입이어야 합니다.

따라서 if문에 사용할 변수도 `var inEnabled: boolean = true;`와 같이 명시적으로 불리언타입으로 선언해주어야 합니다.

<br>

- **Example: if문의 조건으로 사용될수 있는 불리언 타입과 숫자 타입**

  ```
  let text: string = "";

  let statusActive: number = 0;
  let isEnabled: boolean = true;

  if (statusActive || text) {           // 1) 출력 x
    console.log("1");
  }

  if (isEnabled && 2 > 1) {             // 2) "2" 출력
    console.log("2");
  }
  ```

  - `statusActive` 변수는 숫자 타입인데 숫자가 0이면 `false`이고, 나머지값은 `true`가 됩니다.

  - 변수 `text`의 문자열 타입은 빈 값일 때는 `false`이고, 값이 있을 때는 `true`가 됩니다.

  - 따라서 1)번 if문의 `statusActive || text`두 조건은 모두 false이므로 if문이 실행되지 않습니다.

  - 위와 같은 문자열, 숫자 타입은 true & false를 판별하는 과정을 위해 해석이 필요하므로 명시적이지 `isEnabled`변수는 불리언 타입으로 명시적입니다.

  - 2)번 if문은 `isEnabled`가 `true`인 동시에(&&) `2 > 1`도 `true`이기 때문에 if문이 실행되었습니다.

<br>
<br>
<br>
<br>

## 2) switch 문과 폴스루(fall-through)

<br>

switch 문은 비교할 대상이 많을 때 단순한 형태로 비교를 수행하기 위해 사용합니다. 자바스크립트의 switch 문과 형식이 같습니다.

```
switch (표현식) {
  case 값1:
    명령문;
    break;

  case 값2:
    명령문;
    break;

  case 값3:
    명령문;
    break;
}
```

`switch / case` 절에서는 `break` 문을 통해 switch 문을 벗어날 수 있어야 하고, `case`절에 부합하지 않는 예외 조건을 처리하기 위해 때로는 `default` 절을 추가할 필요가 있습니다.

switch문의 표현식에는 변수가 올 수 있고 표현식 값과 일치하는 case절이 실행됩니다. 이때 case절에 선언한 값에 표현식 값과 다른 타입이 오는 것을 방지하기 위해 표현식에 사용할 변수에 타입을 지정할 수 있습니다.

이렇게하면 switch문에 있는 표현식 값과 case절에 오는 값의 타입이 일치하게 됩니다.

<br>
<br>

아래 소스에서는 switch문의 조건이 number 타입이므로 case절의 값은 모두 number 타입이어야 합니다.

만약 case절 타입이 정해져 있지 않다면 case절 값의 타입을 제한하지 않을 수 있습니다.

```
let command: number = 0;

switch (command) {
  case 1:
    console.log("number 1")       // number 타입이지만 0이 아니므로 출력되지않고 case 0으로 이동
    break;

  case 0:
    console.log("number 0")       // "number 0" 출력
    break;
}
```

<br>
<br>

- **Example: switch 문의 조건 변수가 any타입이면 case절 값의 타입 제약이 사라진다**

  ```
  let command: any = "hi";

  switch (command) {
      case "hi":
          console.log("hi");
          break;

      case 0:
          console.log(0);
          break;
  }
  ```

  위 예제에서 switch문의 표현식에 사용한 조건이 any 타입이므로 case 절의 값은 "hi", 0과 같이 여러 타입을 허용합니다.

  따라서 switch문을 사용할 때 case절에 사용할 타입이 고정적이라면 반드시 입력 변수에 타입을 선언해야 하고, 그렇지 않다면 any타입을 지정해야 합니다.

<br>
<br>
<br>

### 2)-1 폴스루(fall-through)에 대한 이해와 폴스루 사용 여부 설정

<br>

case절은 break문을 사용해서 switch 문을 벗어납니다. 그런데 때에 따라 break문을 생략할 수 있습니다. 만약 break문을 생략하면 다음 case절이 실행됩니다. 이러한 상태를 폴스루(fall-through)라고 합니다.

폴스루는 떨어져서(fall) 통과했다(through)는 의미로 case문 내에 break문이 선언되지 않아 case문이 종료되지 않고 다음 case문이 이어서 실행되는 현상입니다.

<br>

- **Example:**

  ```
  let input = 2;

  switch (input % 2) {
      case 0:
          console.log("number 0");      // "number 0"

      case 1:
          console.log("number 1");      // "number 1"
          break;
  }
  ```

  위 예제는 break문이 누락되어 폴스루가 발생해 case 1절이 자동으로 실행됐습니다. 폴스루를 개발자가 고의로 발생시키는 경우도 있고 실수로 발생할 수도 있지만 원인이 무엇이든 타입스크립트에서 폴스루의 사용 여부를 설정하고 싶다면 "noFallthroughCaseInSwitch"를 컴파일 설정에서 아래처럼 수정하면 됩니다.

  - `{ "compilerOptions": { "noFallthroughCaseInSwitch": true } }` (디폴트값은 false = 폴스루 허용)

<br>
<br>
<br>
<br>
<br>
<br>

# 2. 반복문의 다양한 사용법

<br>
<br>

## 1) 기본적인 for문

<br>

타입스크립트의 for문은 자바스크립트의 for문과 형식이 같으며 for문에서 사용할 변수에 let 키워드 사용과 타입 지정도 할 수 있습니다.

```
// 형식
for (변수 초기화; 조건식; 증감식) {
  명령문;
}

// ES5
for (var i = 0; i < 2; i++) { }
console.log("i : " + i);                // "i : 2" (var를 사용하여 for문 밖에서도 i 초기화 변수를 사용 가능)

// 타입스크립트
for (let j: number = 0; j < 2; j++) {
  console.log("j : " + j);              // "j : 0", "j : 1" (let과 타입지정으로 블록레벨스코프 + 안전성 강화)
}
```

<br>
<br>
<br>
<br>

## 2) for in 문

<br>

for in문은 자바스크립트에서 배열이나 객체를 순회할 때 사용했습니다. 아래 예제를 보면 islands 배열을 for in 문을 이용해 순회합니다.

이때 배열의 요소를 가져오려면 `islands[index]`와 같이 인덱스를 통해 값에 접근할 수 있습니다.

```
let islands = ["Jejudo1", "Jejudo2", "Jejudo3", "Jejudo4"];

for (let index in islands) {
  console.log(index, islands[index]);
}

// 0 Jejudo1
// 1 Jejudo2
// 2 Jejudo3
// 3 Jejudo4
```

<br>
<br>

하지만 만약 인덱스가 숫자가 아닌 key라고 한다면 객체 리터럴을 이용하여 문자열을 key로 사용해 값을 가져올 수 있습니다.

```
let fruit = { a: 'apple', b: 'banana', c: 'cherry'};

for (let property in fruit) {
  console.log(property, fruit[property])
}

// a apple
// b banana
// c cherry
```

위 예제에서는 `fruit`변수를 객체 리터럴로 초기화 했고 for in 문을 이용해 객체 리터럴을 순회했습니다.

이때 `property`변수를 통해 숫자 인덱스가 아닌 키값으로 접근했으며, `fruit[property]`와 같은 방식으로 문자열 키를 이용해 키에 대응하는 값을 가져왔습니다.

<br>
<br>
<br>
<br>

## 3) ES6의 for of 문

<br>

for of문은 인덱스를 이용해 값을 가져올 수 있는 for in 문과 달리, 곧바로 값을 가져올 수 있습니다.

이터러블(iterable)은 반복 가능한 객체인 배열, 문자열, DOM 컬렉션, 맵(Map)과 셋(Set) 등을 말합니다. 예를들어 문자열을 for of 문을 이용해 출력하면 다음과 같이 할 수 있습니다.

```
// 형식
for (변수 of 이터러블) {
  명령문;
}


// 이터러블 객체가 문자열인 경우
for (let value of "hi") {
  console.log(value);
}

// h
// i
```

위 예제에서는 let 선언자를 이용해 문자열로부터 value를 받아 출력합니다.

<br>
<br>

반면 이터러블 객체가 배열인 경우 아래와 같이 각 element를 출력할 수 있습니다. 여기서 눈여겨볼 것은 let이 아닌 const를 사용한 점입니다.

일반적인 for문에서는 const를 사용하면 상수가 되어 증가 값이 바뀌지 않기 때문에 무한루프가 됩니다.

그런데 for of문은 `Symbol.iterator`의 구현을 통해 각 이터레이션 값의 요소를 가져오기 때문에 const를 사용할 수 있습니다.

```
for (const value of [1, 2, 3]) {
  console.log(value);
}

// 1
// 2
// 3
```

<br>
<br>
<br>
<br>

## 4) while문과 do-while문

<br>

### 4.1 while문

<br>

while문은 조건이 참이면 명령문을 실행하며 조건이 거짓이면 명령문의 실행을 끝내는 반복문입니다.

```
while ( 참/거짓을 판별할 수 있는 조건문 ) {
  명령문;
}
```

<br>
<br>

- **Example: while 루프를 이용해 1부터 100까지 더하기**

  ```
  let count: number = 1;
  let sum: number = 0;

  while (count <= 100) {
    sum += count;
    count++;
  }

  console.log(sum)            // 5050
  ```

  위 예제에서는 while 루프를 통해 0부터 100까지 더하며, count 변수값이 101이 되면 반복문은 종료됩니다.

  while문은 for문과 달리 while문에서 변수를 초기화 할 순 없지만 루프를 반복할지 여부를 내부에서 결정할 수 있다는 장점이 있습니다.

<br>
<br>
<br>

### 4.2 do-while문

<br>

do-while문은 명령문을 실행하고나서 조건이 참이면 명령문을 실행하고 거짓이면 명령문 실행을 끝내는 반복문입니다.

```
do {

  명령문;

} while ( 반복 조건 );
```

<br>
<br>

while 문법과 크게 다르지 않지만 차이점은 명령문을 먼저 실행하고 조건을 검사하기 때문에 최소한 한 번 이상은 명령문의 실행이 보장된다는 특징이 있습니다.

<br>

- **Example: do-while 문의 사용법**

  ```
  let cnt: number = 0;

  do {
    console.log(cnt);
    cnt++;
  } while (cnt != 4);

  // 0
  // 1
  // 2
  // 3
  ```

  명령문을 실행한 후 조건을 검사하는 방식으로 0부터 3까지 숫자를 출력합니다. 즉, do-while 문은 조건에 상관없이 do 블록에 위치한 명령문을 최소한 1번 이상 수행합니다.
