<br>

# # switch & case

<br>

MDN : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch

<br>

---

<br>

## 문법

<br>

```
switch (expression) {

  case value1:
    //표현식(expression)의 결과가 value1과 일치할 때 실행되는 문(Statements)
    [break;]

  case value2:
    //표현식(expression)의 결과가 value2과 일치할 때 실행되는 문(Statements)
    [break;]

  ...

  case valueN:
    //표현식(expression)의 결과가 valueN과 일치할 때 실행되는 문(Statements)
    [break;]

  [default:
    //값이 표현식(expression)의 값과 아무것도 일치하지 않을 때 실행되는 문(Statements)
    [break;]]

}
```

- expression : 각각의 case 절에 맞추어 볼 결과에 대한 표현식

- case valueN(Optional) : 어떤 case절은 expression와 맞추어보는데 사용된다. 만약 expression 이 특정 valueN과 일치 된다면, switch statement 문이 끝나거나 break가 오떄까지 case절 내부가 실행된다.

- default(Optional) : default절이 만약 존재한다면 -> 어떤 case절도 expression 값과 일치되지 않는다면 -> default 절이 실행된다.

<br>
<br>

- **Examples: Statement - Switch**

  ```
  const expr = 'Papayas';

  switch (expr) {
    case 'Oranges':
      console.log('Oranges are $0.59 a pound.');
      break;

    case 'Mangoes':

    case 'Papayas':
      console.log('Mangoes and papayas are $2.79 a pound.');
      break;

    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }

  // output: "Mangoes and papayas are $2.79 a pound."
  ```

  - 식의 값이 case 절과 일치하는지 식을 평가하고 case 절과 관련된 문을 실행해준다.

  - 즉 switch 문은 표현식을 평가하여 표현식의 값을 case 절에 일치시키고 해당 case와 관련된 문은 물론 일치하는 case 다음에 오는 case의 문을 실행해준다.

<br>
<br>

## Description

- switch 문은 먼저 해당 식을 평가합니다. 그런 다음 식이 입력 식의 결과와 동일한 값으로 평가되는 첫 번째 case 절을 ​​찾고 (엄격한 비교, === 사용) 제어를 해당 절로 전송하여 연결된 문을 실행합니다. (여러 케이스가 제공된 값과 일치하는 경우 케이스가 서로 같지 않더라도 일치하는 첫 번째 케이스가 선택됩니다.)

- 일치하는 case 절이 없으면 프로그램은 default절을 찾고, 발견되면 해당 절로 제어를 전송하여 연관된 명령문을 실행합니다. default절을 찾을 수 없는 경우 프로그램은 스위치가 끝난 다음 명령문에서 계속 실행됩니다. 관례상 기본 절은 마지막 절이지만 반드시 그럴 필요는 없습니다.

- 각 case 레이블과 연관된 선택적 break 문은 일치하는 문이 실행되면 프로그램이 스위치에서 벗어나고 스위치 다음 문에서 실행을 계속하도록합니다. break가 생략되면 프로그램은 switch 문의 다음 문에서 실행을 계속합니다. return 문이 앞에 오는 경우 break 문은 필요하지 않습니다.
