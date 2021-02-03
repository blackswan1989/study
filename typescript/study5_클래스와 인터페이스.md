<br>

# TypeScript Quick Start - 05. 클래스와 인터페이스

<br>
<br>
<br>
<br>

# 1. 객체지향 프로그래밍과 클래스 기초

<br>
<br>

## 1) 타입스크립트의 객체지향 프로그래밍(OOP) 지원

<br>

객체지향 프로그래밍(OOP, object-Oriented Programming)은 애플리케이션을 개발할 때 중복을 획기적으로 줄일 수 있는 방법입니다.

이는 커다란 문제를 클래스라는 단위로 나누고 클래스 간의 관계를 추가하면서 코드 중복을 최소화하는 개발 방식입니다. 클래스 간의 관계는 상속이나 포함 관계를 고려해 추가합니다.

<br>

아래 키워드를보면 ES6는 객체지향 프로그래밍을 하기에는 지원이 다소 부족하지만 타입스크립트는 부족함이 없습니다.

<br>

- 타입스크립트가 지원하는 개체 지향 프로그래밍 키워드

  - 클래스 : `class`
  - 인터페이스 : `interface` (ES6 지원X)
  - 인터페이스 구현 : `implements` (ES6 지원X)
  - 상속 : `extends`
  - 생성자 : `constructor(){...}`
  - 접근 제한자 : `private`, `public`, `protected` (ES6 지원X)
  - final 제한자 : `readonly` (ES6 지원X)
  - static 키워드 : `static`
  - super 키워드 : `super`

<br>
<br>
<br>

## 1) 타입스크립트의 객체지향 프로그래밍(OOP) 지원

<br>

타입스크립트에서 클래스를 선언할 때는 클래스명 앞에 `class` 키워드를 붙여 선언합니다.

```
class Rectangle {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getArea(): number { return this.x * this.y; }
}
```

<br>

이렇게 선언한 `Rectangle` 클래스는 "Class Type"이 됩니다. `Rectangle` 클래스 타입은 아래의 인터페이스 타입과 일치합니다.

```
interface Ractangle {
  x: number;
  y: number;
  getArea(): number
}
```

클래스 내부에는 생성자인 `constructor`를 정의합니다. `constructor`는 객체를 생성할 때 클래스에 필요한 설정을 매개변수로 전달받아 멤버 변수를 초기화합니다.

클래스를 선언할 때 생성자를 생략하면 기본 생성자(default constructor)를 호출합니다. 만약 클래스에 초기화할 내용이 없다면 `class Rectangle {}`과 같이 클래스 선언 때 생성자를 생략할 수 있습니다.

<br>
<br>
<br>

### 1.1 객체 생성

<br>

클래스는 멤버 변수와 멤버 메서드 등으로 구성된 '틀'이며 클래스를 실제로 사용하려면 객체로 생성해야 합니다.

<br>

예를 들어 `Rectangle` 클래스를 객체로 생성하려면 아래 처럼 `let rectangle = new Rectangle(1, 5);`와 같이 선언해주어야 합니다.

```
let rectangle: Rectangle;          // rectangle은 객체를 선언한 것이며 Rectangle은 클래스 타입이다.
rectangle = new Rectangle(1, 5);   // 여기서 rectangle은 객체 참조 변수(인스턴스)이다.

console.log(rectangle);            // Rectangle {x: 1, y: 5, getArea: ƒ (), constructor: Object}
```

<br>

위에서 `rectangle = new Rectangle(1, 5);`를 보면 `new` 키워드를 이용해 `Rectangle` 객체를 생성해주었고, 객체 참조 변수(Object Reference Variable)에 할당했습니다.

생성된 객체는 실제 메모리에 위치하고 객체의 참조가 객체 참조변수에 할당되는 과정을 인스턴스화(instantiate)라고 합니다.

<br>

비유하자면 클래스는 집의 설계 도면과 같고 객체는 도면의 실제 집으로, 이러한 객체는 메모리에 존재하는 실제 내용입니다. 위 예제에서 객체는 메모리에 생성되고 객체의 참조는 객체 참조변수에 할당했습니다.

아래에서는 `Rectangle` 객체를 생성하는 예제를 살펴보겠습니다.

<br>

- **Example: `Rectangle` 클래스 선언과 객체 생성**

  ```
  class Rectangle {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    getArea(): number { return this.x * this.y; }
  }

  let rectangle = new Rectangle(2, 5);
  let area: number = rectangle.getArea();

  console.log(area);      // 10
  ```

  예제에서는 `Rectangle` 클래스와 `Rectangle` 객체를 생성합니다. 클래스를 객체로 생성할 때는 `new` 키워드를 이용해야 합니다. 이때 생성자의 매개변수를 `x, y`로 선언했으므로 객체를 생성할 때 생성자로 인수 값을 전달해야 합니다.

  생성된 객체의 참조는 객체 참조변수인 `rectangle`에 할당됩니다. 그 후 `rectangle` 변수를 통해 객체의 멤버 변수나 멤버 메서드에 접근할 수 있습니다.

<br>
<br>

- **Example: 위의 `Rectangle` 클래스를 컴파일(ES5)후 생성된 코드**

  ```
  var Rectangle = (function () {
    function Rectangle(x, y) {
      this.x = x;
      this.y = y;
    }

    Rectangle.prototype.getArea = function () {
      return this.x * this.y;
    };

    return Rectangle;
  })();

  var rectangle = new Rectangle(2, 5);
  var area = rectangle.getArea();

  console.log(area);      // 10
  ```

  위의 컴파일된 코드를 보면 생성자 함수에 모듈 패턴(접근 제한자가 따로 없을 때 캡슐화를 구현할 때 사용하는 방법론)을 적용해 클래스에 대응하는 구조입니다.

  모듈 패턴은 클로저(closures)를 이용해 비공개된 내부 메서드를 캡슐화(encapsulation)하는데, 전역 이름 공간을 더럽히지 않는다는 장점이 있습니다.

  변환된 코드를 보면 내부 메서드는 생성자 역할을 하는 `Rectangle` 함수에 `prototype` 속성과 연결(chaining)된 형태로 선언됩니다.
