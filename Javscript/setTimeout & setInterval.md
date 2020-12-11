# setTimeout과 setInterval을 이용한 호출 스케줄링

URL : https://ko.javascript.info/settimeout-setinterval

---

일정 시간이 지난 후에 원하는 함수를 예약 실행(호출)할 수 있게 하는 것을 '호출 스케줄링(scheduling a call)'이라고 합니다.

호출 스케줄링을 구현하는 방법은 두 가지가 있습니다.

- setTimeout을 이용해 일정 시간이 지난 후에 함수를 실행하는 방법
- setInterval을 이용해 일정 시간 간격을 두고 함수를 실행하는 방법

자바스크립트 명세서엔 setTimeout과 setInterval가 명시되어있지 않습니다.  
하지만 시중에 나와 있는 모든 브라우저와 Node.js를 포함한 자바스크립트 호스트의  
환경 대부분이 이와 유사한 메서드와 내부 스케줄러를 지원합니다.

<br>
<br>

## 01. setTimeout

- 문법

  `let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)`

- 매개변수

  - `func|code` : 실행하고자 하는 코드, 함수 또는 문자열 형태로 대개는 이 자리에 함수가 들어갑니다.
  - `delay` : 실행 전 대기 시간으로, 단위는 밀리초(millisecond, 1000밀리초 = 1초)이며 기본값은 0입니다.
  - `arg1, arg2…` : 함수에 전달할 인수들로, IE9 이하에선 지원하지 않습니다.

<br>

- **Examples 1 : 아래 예제 코드를 실행하면 1초 후에 sayHi()가 호출됩니다.**

  ```
  function sayHi() {
    alert('안녕하세요.');
  }

  setTimeout(sayHi, 1000);
  ```

<br>

- **Examples 2 : 아래와 예제와 같이 함수에 인수를 넘겨줄 수도 있습니다.**

  ```
  function sayHi(who, phrase) {
    alert(`${who}님 ${phrase}`);
  }

  setTimeout(sayHi, 1000, "홍길동", "안녕하세요."); // 홍길동님, 안녕하세요.
  ```

<br>

- **Caution: 함수를 실행하지 말고 넘기세요.**

  ```
  // 잘못된 코드
  // 결과 : ["undefined님 undefined" 내용의 알람창이 즉시 호출된다.]

  setTimeout(sayHi(), 2000);
  ```

  setTimeout은 함수의 참조 값을 받도록 정의되어 있는데 sayHi()를 인수로 전달하면 함수 실행 결과가 전달되어 버립니다.  
  그런데 sayHi()엔 반환문이 없습니다. 호출 결과는 undefined가 되겠죠. 따라서 setTimeout은 스케줄링할 대상을 찾지 못하고, 원하는 대로 코드가 동작하지 않습니다.

<br>
<br>
<br>

## 02. setInterval

setInterval 메서드는 setTimeout과 동일한 문법을 사용합니다. 인수 역시 동일합니다.  
다만, setTimeout이 함수를 단 한 번만 실행하는 것과 달리 setInterval은 함수를 주기적으로 실행하게 만듭니다.  
함수 호출을 중단하려면 clearInterval(timerId)을 사용하면 됩니다.

<br>

- **Examples : 메시지가 2초 간격으로 보이다가 5초 이후에는 더 이상 메시지가 보이지 않습니다.**

  ```
  // 2초 간격으로 메시지를 보여줌

  let timerId = setInterval(() => alert('째깍'), 2000);



  // 5초 후에 정지

  setTimeout(() => { clearInterval(timerId); alert('정지'); }, 5000);
  ```

  **Tip :** alert창이 떠 있더라도 타이머는 멈추지 않습니다.

<br>
<br>
<br>

## 03. 중첩 setTimeout

무언가를 일정 간격을 두고 실행하는 방법에는 크게 2가지가 있습니다.  
하나는 `setInterval`을 이용하는 방법이고, 다른 하나는 아래 예시와 같이 중첩 `setTimeout`을 이용하는 방법입니다.

```
// setInterval을 이용하지 않고 아래와 같이 중첩 setTimeout을 사용함

let timerId = setTimeout(function tick() {  // 여기의 setTimeout은 (*)로 표시한 줄의 실행이 종료되면 다음 호출을 스케줄링합니다.
  alert('째깍');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);
```

중첩`setTimeout`을 이용하는 방법은 `setInterval`을 사용하는 방법보다 유연합니다.  
호출 결과에 따라 다음 호출을 원하는 방식으로 조정해 스케줄링 할 수 있기 때문입니다.

5초 간격으로 서버에 요청을 보내 데이터를 얻는다고 가정해 봅시다.  
서버가 과부하 상태라면 요청 간격을 10초, 20초, 40초 등으로 증가시켜주는 게 좋을 겁니다.

아래는 이를 구현한 의사 코드입니다.

```
let delay = 5000;

let timerId = setTimeout(function request() {
  ...요청 보내기...

  if (서버 과부하로 인한 요청 실패) {
    // 요청 간격을 늘립니다.
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```

<br>
<br>
<br>

## 04. 요약

- `setInterval(func, delay, ...args)`과 `setTimeout(func, delay, ...args)`은  
  `delay`밀리초 후에 `func`을 규칙적으로, 또는 한번 실행하도록 해줍니다.

- `setInterval` & `setTimeout`을 호출하고 반환 받은 값을 `clearInterval` & `clearTimeout`에 넘겨주면 스케줄링을 취소할 수 있습니다.

- 중첩 `setTimeout`을 사용하면 `setInterval`을 사용한 것보다 유연하게 코드를 작성할 수 있습니다.  
  여기에 더하여 지연 간격 보장이라는 장점도 있습니다.

- 대기 시간이 0인 `setTimeout(setTimeout(func, 0)` 혹은 `setTimeout(func))`을 사용하면  
  ‘현재 스크립트의 실행이 완료된 후 가능한 한 빠르게’ 원하는 함수를 호출할 수 있습니다.

- 지연 없이 중첩 `setTimeout`을 5회 이상 호출하거나 지연 없는 `setInterval`에서 호출이 5회 이상 이뤄지면,  
  4밀리초 이상의 지연 간격이 강제로 더해집니다. 이는 브라우저에만 적용되는 사항이며, 하위 호환성을 위해 유지되고 있습니다.

<br>
<br>

- 스케줄링 메서드를 사용할 땐 명시한 지연 간격이 보장되지 않을 수도 있다는 점에 유의해야 합니다.

- 아래와 같은 상황에서 브라우저 내 타이머가 느려지면 지연 간격이 보장되지 않습니다.

  - CPU가 과부하 상태인 경우
  - 브라우저 탭이 백그라운드 모드인 경우
  - 노트북이 배터리에 의존해서 구동 중인 경우
  - 이런 상황에서 타이머의 최소 지연 시간은 300밀리초에서 심하면 1,000밀리초까지 늘어납니다.
  - 연장 시간은 브라우저나 구동 중인 운영 체제의 성능 설정에 따라 다릅니다.
