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

## 2) 클래스 선언과 객체 생성

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

### 2.1 객체 생성

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

  _용어 참조 : https://ryusae.tistory.com/9_

<br>
<br>
<br>
<br>

## 3) 상속 관계와 포함 관계

<br>

객체지향 프로그래밍에서 클래스 간의 관계는 크게 '상속 관계'와 '포함 관계' 이렇게 두 가지로 나눠 볼 수 있습니다.

먼저 '상속(inheritance)'은 코드의 재사용성을 높입니다. 예를 들어 자식 클래스가 부모 클래스를 상속하면 자식은 부모에 선언된 멤버 변수나 멤버 메서드를 상속받아 사용할 수 있습니다.

<br>

상속 관계를 다른 말로 'IS-A관계'라고도 합니다. '포함'은 한 클래스에 다른 클래스를 멤버 변수로 선언하는 것으로 'HAS-A 관계'로 표현됩니다.

> 클래스를 구성하는(클래스 내에 선언된) 변수를 가리켜 ‘멤버 변수’라 하고, 클래스를 구성하는(클래스 내에 정의된)함수를 가리켜 ‘멤버 함수’라 한다. 멤버 변수는 특정 객체와 연결된 변수의 하나이며, 해당 변수의 모든 메소드(멤버 함수)에 접근이 가능하다.

<br>
<br>
<br>

### 3.1 상속 관계

<br>

상속은 클래스 계층을 만들어서 코드 중복을 줄이는 객체지향 프로그래밍 방법입니다. 상속에서 부모 클래스를 '기반 클래스(Base Class)' 또는 '슈퍼 클래스(Super Class)'라 하며 이를 상속 받는 자식 클래스를 '파생 클래스(Derived Class)' 또는 '서브 클래스(Sub Class)'라 부릅니다.

<br>

자식 클래스는 부모 클래스에 공개된 메서드나 변수를 상속받아 IS-A 관계가 생깁니다.

```
class 동물 { ... }
class 공룡 extends 동물 { ... }
```

위의 두 클래스 간의 관계를 'IS-A 관계'로 문장을 만들면 "공룡은 동물이다"라고 읽을 수 있는데, 문장이 어색하지 않다면 부모와 자식 클래스는 'IS-A 관계'에 있다고 봅니다.

<br>
<br>

타입스크립트는 상속을 위해 `extends` 키워드를 지원하며, 예를 들어 부모 클래스를 자식 클래스가 상속하려면 다음과 같이 선언합니다.

```
class <자식 클래스명> extends <부모 클래스명> {
  constructor() {
    super();
  }
}
```

주의할 점은 타입스크립트는 클래스에 대해 단일 상속만 지원하므로 자식 클래스는 하나의 부모 클래스만 상속받을 수 있습니다.

자식 클래스가 부모 클래스를 상속받을 때는 자식 클래스의 생성자에서 `super()` 메서드를 호출해 부모 클래스의 생성자를 호출해 줘야 합니다.

<br>
<br>
<br>

### 3.2 포함 관계

<br>

포함 관계는 클래스가 다른 클래스를 포함하는 'HAS-A 관계'입니다. 클래스 내부에 다른 클래스를 포함하는 관계는 대표적으로 '합성(composition)관계'와 '집합(aggregation)관계'로 나뉩니다.

<br>

먼저 합성 관계는 전체가 부분을 포함하며 강한 관계입니다.

```
class Engine { }
class Car {
  private engine;
  constructor() {
    this.engine = new Engine();
  }
}

let myCar = new Car();
myCar = null;
```

`Car`클래스에 선언된 `engine`객체는 `Car`객체(`myCar`)가 `new`로 생성될 때 함께 생성되고, 객체(`myCar`)가 `null`이 되면 함께 제거됩니다. 즉 수명주기를 함께 하므로 강한 관계가 됩니다.

<br>
<br>

집합 관계는 전체가 부분을 포함하며 약한 관계입니다.

```
class Engine { }
class Car {
  private engine: Engine;
  constructor(engine: Engine) {
    this.engine = engine;
  }
}

let engine = new Engine();
let car = new Car(engine);
```

`Car`클래스의 `car`객체가 생성될 때 외부에서 생성된 `engine`객체를 전달하고 있습니다.

따라서 `car`객체에 `null`이 할당돼 제거되더라도 `engine`객체는 `Car`클래스 외부에 선언돼있으므로 제거되지 않습니다. 즉, `engine`객체와 `car`객체가 수명주기를 함께 하지 않으므로 약한 관계가 됩니다.

<br>
<br>
<br>

### 3.3 상속 관계와 포함 관계를 모두 고려해 구현하기

<br>

부모 클래스에서는 공통 기능에 해당하는 일반적인 메서드를 추가하고 자식 클래스에는 부모 클래스에서 구현하지 못한 세부적인 메서드를 추가해 구현합니다.

<br>
<br>

상속 관계는 부모 클래스와 부모 클래스를 상속받는 자식 클래스의 관계로 정의할 수 있습니다.

부모 클래스를 `Bicycle`(자전거)이라 하고 자식 클래스는 부모 클래스를 상속받은 `MountainBike`(산악용 자전거)클래스라 하겠습니다.

```
class Bicycle { ... }
class MountainBike extends Bicycle { ... }
```

<br>

`MountainBike` 클래스는 `extends` 키워드를 이용해 `Bicycle` 클래스를 상속받습니다.

이러한 상속 관계에서 부모인 `Bicycle` 클래스는 자식 클래스보다 일반적인 기능을 제공하고, 자식 클래스인 `MountainBike`는 부모 클래스보다 구체적인 기능을 제공하게 됩니다.

<br>
<br>

포함 관계는 하나의 클래스가 내부에 다른 클래스를 포함하는 관계입니다. 산악용 자전거가 손전등(flashlight)을 포함하고 있을 때 HAS-A 관계는 다음처럼 나타납니다.

```
class Flashlight {
  ...
  constructor(public lightIntensity) {
  }
}

class MountainBike extends Bicycle {
  ...
  flashlight: Flashlight;
}
```

`Flashlight` 클래스의 생성자 매개변수 `lightIntensity`는 빛의 밝은 정도를 숫자로 나타냅니다.

<br>
<br>

- **Example: IS-A 관계와 HAS-A 관계를 동시에 구현**

  ```
  // Flashlight 클래스
  class Flashlight {
    constructor(public lightIntensity: number) {}
  }


  // Bicycle 클래스
  class Bicycle {
    constructor(public numberOfWheel: number) {}

    getNumberOfWheel(): number {
      return this.numberOfWheel;
    }
  }


  // Bicycle 클래스를 상속함(IS-A)관계
  class MountainBike extends Bicycle {
    flashlight: Flashlight;

    constructor(public numberOfWheel: number, public saddle: boolean) {
      super(numberOfWheel);

      // Bicycle이 Flashlight를 포함함(HAS-A 관계)
      this.flashlight = new Flashlight(90);
    }

    getSaddle() {
      return this.saddle;
    }

    getNumberOfWheel() {
      return this.numberOfWheel;
    }
  }

  let saddle = true;
  let numberOfWheel = 2;
  let mountainBike = new MountainBike(numberOfWheel, saddle);

  console.log(`Bicycle의 안장 유무 : ${mountainBike.getSaddle()}`);           // true
  console.log(`Bicycle의 바퀴 개수 : ${mountainBike.getNumberOfWheel()}`);    // 2
  ```

  <br>

  위 예제는 총 3개의 클래스가 정의되어 있습니다. 이 중 `MountainBike` 클래스가 `Bicycle` 클래스를 상속받으므로 IS-A 관계가 존재하며, `MountainBike` 클래스가 `Flashlight` 객체를 생성해 포함하므로 HAS-A 관계도 존재합니다.

<br>
<br>
<br>
<br>

## 4) 접근 제한자의 사용법

<br>

자바스크립트(ES6)에서는 `private`, `public`, `protected`와 같은 접근 제한자(access modifier)를 제공하지 않습니다.

반면 타입스크립트에서는 객체지향 프로그래밍을 제대로 구현할 수 있도록 접근 제한자의 대부분을 제공합니다. 타입스크립트에서 사용할 수 있는 접근 제한자는 다음과 같습니다.

<br>

- `public` : `public`으로 설정된 멤버(멤버 변수, 멤버 메서드 등)는 자식 클래스에서 접근할 수 있다. 상속과 외부객체를 통한 접근도 가능하다.

- `protected`: `protected`로 설정된 멤버는 자식 클래스에서 접근 가능하다. 하지만 외부 객체를 통한 접근은 불가능하다.

- `private`: `private`로 설정된 멤버는 현재 클래스에서만 접근할 수 있고 자식클래스에서 접근할 수 없다. 물론 상속과 외부 객체를 통한 접근도 불가능하다.

<br>

위에서 알 수 있듯 접근 제한자 중에서 `public`으로 선언된 요소는 상속과 객체를 통한 외부 접근이 가능해 개방 정도가 가장 크며, `private`은 가장 패쇄적입니다.

`protected`는 중간정도의 개방성이 있습니다. `protected`와 `private`은 은닉성이 있어 객체를 통한 외부 접근을 제한하여 객체 내부를 캡슐화 합니다.

<br>
<br>
<br>

### 4.1 `public` & `private`

<br>

먼저 **`public` 제한자**는 클래스 내부와 외부에서 모두 접근할 수 있게 공개하는 접근 제한자입니다.

객체 내부에서 접근할 수 있을 뿐만 아니라 객체 외부에서도 접근할 수 있으며, 부모 클래스로부터 상속도 가능합니다.

<br>

- **Example: `public` 접근 제한자로 선언된 멤버의 접근**

  ```
  class Base {
    public defaultAge = 0;                  // Base 부모 클래스의 멤버 변수 defaultAge
  }

  class Member extends Base {
    age = 0;                                // Member 자식 클래스의 내부 코드

    public getAge() {                       // 외부에서도 접근 가능한 public 제한자사용
      return this.age + this.defaultAge;    // 1)age, 2)defaultAge
    }
  }

  let member = new Member();
  console.log(member.getAge());       // 3)getAge(), 출력값:0
  ```

  - 1)의 `age`는 Member 클래스 내부`에 접근 가능하다

  - 2)의 `defaultAge`는 상속받은 부모 클래스의 멤버 변수에 접근 가능하다.

  - 3)의 `getAge()`는 외부 `public getAge()`에 접근가능하다.

  - 만약 클래스에 선언된 메서드나 멤버 변수의 외부 접근을 차단하려면 `private` 제한자를 지정해주어야 합니다.

<br>
<br>
<br>

**`private` 제한자**는 클래스 내부에서는 접근할 수 있지만 외부에서는 접근할 수 없게 하는 접근 제한자입니다.

만약 클래스에 선언된 메서드나 멤버 변수의 외부 접근을 차단하려면 `private`을 지정해줍니다.

<br>

- **Example: `private` 접근 제한자로 선언된 멤버의 접근(외부 접근시 error 발생)**

  ```
  class Base {
    private birthYear = 2017;
  }

  class Member extends Base {
    private age = 0;

    private getBirthYear() {
      return this.birthYear;             // 부모 클래스의 멤버 변수(birthYear)에 접근 불가
    }

    private getAge() {
        return this.age;                 // 내부 접근 가능(age)
    }
  }

  let member = new Member();

  console.log(member.age);               // 외부 접근 불가(age)
  console.log(member.getBirthYear());    // 외부 접근 불가(getBirthYear())
  console.log(member.getAge());          // 외부 접근 불가(getAge())

  // Error: Property 'age, getBirthYear, getAge'는 비공개이며 'Member'클래스 내에서만 액세스 할 수 있습니다.
  ```

  클래스 멤버 변수나 메서드에 `private`을 지정하면 객체를 통한 접근이 비공개로 설정되며, 오직 `class` 내부 접근만 허용합니다.

  자식 클래스에서도 부모 클래스에 `private`으로 선언된 멤버 변수(또는 멤버 메서드)에 접근할 수 없고, 객체를 통한 외부 접근도 할 수 없습니다.

<br>
<br>
<br>

### 4.2 생성자 매개변수에 접근 제한자 추가

<br>

생성자의 매개변수에 접근 제한자를 추가하면 매개변수 속성(parameter properties)이 되어 멤버 변수가 되는 효과가 있습니다.

<br>

아래 예제를 보면 생성자 매개변수에 접근 제한자를 추가한 것만으로도 생성자 매개변수가 클래스의 멤버 변수가 되는 효과가 있습니다.

```
class Cube {
  constructor(public width: number, private length: number, protected height: number) {
    ...
  }
}
```

<br>
<br>

- **Example: 생성자 매개변수에 접근 제한자를 추가해 멤버 변수처럼 사용하기**

  ```
  class Cube {
    constructor(public width: number, private length: number, protected height: number) {
    }

    getVolume() {
      return this.width * this.length * this.height;
    }
  }

  let [cubeWidth, cubeLength, cubeHeight] = [1, 2, 3];
  let cube = new Cube(cubeWidth, cubeLength, cubeHeight);

  console.log(`Length : ${cube.length}cm`);        // Error 1)
  console.log(`Height : ${cube.height}cm`);        // Error 2)

  console.log(`Width : ${cube.width}cm`);          // Width : 1cm
  console.log(`Volume : ${cube.getVolume()}ml`);   // Volume : 6ml

  // 1) Error: 속성 'length'는 비공개이며 'Cube'클래스 내에서만 액세스 할 수 있습니다.
  // 2) Error: 속성 'height'는 보호되며 'Cube'클래스와 하위 클래스 내에서만 액세스 할 수 있습니다.
  ```

  `Cube` 클래스는 생성자 매개변수(`constructor`)에 접근 제한자를 지정하여, 내부 메서드(`getVolume()`)에서 `this` 키워드를 이용해 모두 접근할 수 있습니다.

  그러나 외부에서 생성된 객체 (`cube`변수)는 `public`으로 공개된 생성자 매개변수인 `width`의 접근은 허용하지만, `private`과 `protected`가 설정된 `length`와 `height`에 대한 접근은 하용하지 않습니다.

<br>
<br>
<br>

### 4.3 `protected` 제한자의 사용법

<br>

`protected` 제한자는 타입스크립트 1.3 버전에 추가된 특징으로, 객체를 통한 외부 접근을 허용하지 않지만 상속 관계에서는 부모 클래스에 `protected`로 선언된 메서드나 멤버 변수의 접근을 허용합니다.

<br>

- **Example: `protected` 제한자의 사용법**

  ```
  class Base {
    protected birthYear = "2000"
  }

  class Member extends Base {
    protected getBirthYear() {
      return this.birthYear;            // 자식 클래스에서 접근 가능(getBirthYear)
    }
  }

  let member = new Member();
  console.log(member.getBirthYear());   // 외부 접근 불가(getBirthYear)

  // Error: 속성 'getBirthYear'는 보호되며 'Member'클래스 및 해당 하위 클래스 내에서만 액세스 할 수 있습니다.
  ```

  자식클래스 `Member`의 `getBirthYear()` 메서드에서 부모로부터 상속받은 멤버 변수 `birthYear`를 `this`로 접근해 반환하고 있습니다.

  이때 `getBirthYear()` 메서드는 `protected`가 선언돼 있으므로 외부 객체 `member`를 통해 접근 할 수 없습니다.

<br>
<br>
<br>

### 4.4 부모 클래스의 멤버를 이용하기

<br>

상속 관계가 있을 때 자식 클래스에서 부모 클래스에 선언된 멤버 메서드나 멤버 변수 등을 이용할 수 있는 방법은 '`super`' 키워드와 '`this`' 키워드를 이용하는 것입니다.

`super` 키워드는 부모 클래스의 공개 멤버에만 접근할 수 있으며, `this` 키워드는 부모 클래스에서 상속받은 멤버와 현재 클래스의 멤버 모두에 접근할 수 있습니다.

<br>

- **Example: `super`와 `this` 키워드를 이용하여 부모 클래스의 멤버에 접근하기**

  ```
  class PC {
    constructor(public hddCapacity: string) { }

    private ram: string = "0GB";
    set ramCapacity(value: string) {      // set 프로퍼티
      this.ram = value;
    }
    get ramCapacity() {                   // get 프로퍼티
      return this.ram;
    }

    protected getHddCapacity() {
      return this.hddCapacity;
    }
  }


  class Desktop extends PC {
    constructor(public hddCapacity: string) {
      // 부모 클래스의 생성자 호출
      super(hddCapacity);
    }

    getInfo() {
      console.log(`1) HDD 용량: ${super.getHddCapacity()}, ${super.hddCapacity}`);
      console.log(`2) HDD 용량: ${this.getHddCapacity()}, ${this.hddCapacity}`);

      this.hddCapacity = "2TB";
      console.log(`3) HDD 용량: ${super.getHddCapacity()}, ${super.hddCapacity}`);
      console.log(`4) HDD 용량: ${this.getHddCapacity()}, ${this.hddCapacity}`);

      super.ramCapacity = "16GB";
      console.log(`5) RAM 용량: ${this.ramCapacity}, ${super.ramCapacity}`);

      this.ramCapacity = "8GB";
      console.log(`6) RAM 용량: ${this.ramCapacity}, ${super.ramCapacity}`);
    }
  }

  let myDesktop = new Desktop("1TB");
  myDesktop.getInfo();


  [LOG]: "1) HDD 용량: 1TB, undefined"
  [LOG]: "2) HDD 용량: 1TB, 1TB"
  [LOG]: "3) HDD 용량: 2TB, undefined"
  [LOG]: "4) HDD 용량: 2TB, 2TB"
  [LOG]: "5) RAM 용량: 16GB, 16GB"
  [LOG]: "6) RAM 용량: 8GB, 8GB"
  ```

  - 실행 결과에서 1번, 3번은 `super` 키워드로 부모 클래스의 멤버에 접근한 결과를 출력했습니다.

  - 2번, 4번은 `this` 키워드로 현재 클래스의 멤버에 접근한 결과를 출력했습니다.

  <br>

  위 예제에서 유의 해서 볼 점은 1, 3번에서 `super.hddCapacity`의 출력 결과가 `undefined`라는 점입니다. 이는 `super`키워드가 부모 클래스의 멤버 변수를 직접 호출해 가져올 수 없음을 의미합니다.

  부모 클래스의 멤버 변수 `hddCapacity` 값을 가져오려면 부모 클래스의 멤버 메서드나 getter를 통해 가져와야 합니다.

  <br>

  실제 부모 클래스의 메서드 `getHddCapacity()`의 호출 결과(1번, 3번)은 정상적으로 1TB로 출력됐음을 확인할 수 있고, getter를 이용한 `super.ramCapacity`의 호출 결과(5번, 6번)도 정상적으로 이루어 집니다.

<br>
<br>
<br>

### 4.5 기본 접근 제한자(p.199)

<br>

기본 접근 제한자(Default Access Modifier)는 접근 제한자 선언을 생략할 때 적용됩니다. 기본 접근 제한자가 적용될 수 있는 대상은 '클래스 멤버 변수', '멤버 메서드', '클래스 Get/Set 프로퍼티', '생성자의 매개변수' 입니다.

<br>

다음 예시는 Account 클래스에 선언된 멤버들이 접근 제한자를 생략했을 때 기본 접근 제한자가 무엇인지를 나타냅니다.

```
class Account {
  public balance: number;

  public get getBalance() { }

  public set setBalance(amount: number) { }

  deposite(depositeAmount: number) { }

  constructor (
    // 접근 제한자를 생략하면 기본 접근 제한자가 없기 때문에 생성자 내부에서만 사용 가능하다.
    defaultBalance:number = 1000,               // 여기서 'defaultBalance'는 생성자 매개변수이다.
    protected bankName: string = "happy bank",  // 접근 제한자가 선언되면 매개변수 속성이 되어 '멤버 변수'가 된다.
    readonly interestRate: number = 0.1         // readonly가 선언되면 매개변수 속성이 되어 '멤버 변수'가 된다.
  ) { }

  getInterestRate() {
      return this.interestRate;
    }

  getDefaultBalance() {
      return this.defaultBalance;   // 'defaultBalance'에 접근 불가
    }
}
```

- 기본 접근 제한자는 대체로 `public`으로, 위에서도 `public`은 접근 제한자의 선언을 생략할 때 적용되는 기본 접근 제한자를 의미합니다.

- 예외로 생성자 매개변수 `constructor parameter`에 접근 제한자가 생략되면 생성자 내부에서만 접근할 수 있게 됩니다. 그러나 접근 제한자(`public`, `protected`, `private`)나 `readonly`가 붙으면 매개변수 속성이 되어 멤버 변수가 됩니다.

<br>
<br>

매개변수는 생성자 내부에서도 접근할 수 있지만, 현재 클래스의 다른 메서드에서도 `this` 키워드를 이용해 접근할 수 있게 공개됩니다.

`public`은 상속 관계 뿐만 아니라 객체를 통한 외부 접근을 허용하지만, `protected`는 상속 관계에서만 접근을 허용합니다.

`readonly`는 선언한 변수를 읽기 전용 속성으로 만들며 상속이나 객체를 통한 외부 접근도 허용합니다.

<br>
<br>

- **Example: 기본 접근 제한자인 `public`**

  ```
  class Account {
    balance: number;

    // get 프로퍼티를 이용하여 적금액 얻기
    get getBalance() {
      return this.balance;
    }

    // set 프로퍼티를 이용하여 적금 하기
    set setBalance(amount: number) {
      this.balance += amount;
    }

    // 메서드를 이용하여 적금 하기
    deposite(depositeAmount: number) {
      this.setBalance = depositeAmount;
    }

    // 기본 적금(balance)액을 설정하기
    constructor(
      defaultBalance: number = 0,
      protected bankName: string = "Hana bank",
      readonly interestRate: number = 0.1
    ) {
      this.balance = defaultBalance;
    }

    // 생성자 매개변수 interestRate는 public으로 설정됐으므로 호출 가능하다.
    getInterestRate() {
      return this.interestRate;
    }

    // 생성자 매개변수 defaultBalance는 private(기본 접근 제한자) 이므로 호출 불가
    getDefaultBalance() {
      return this.defaultBalance;       // Error: 'Account' 유형에 'defaultBalance' 속성이 없습니다.
    }
  }

  class MyAccount extends Account {
    // Test
    constructor() {
      super();
      this.deposite(1000);
      this.setBalance = 1000;

      console.log(
        `2번) 적금 : ${this.balance}원, ${this.getBalance}원 | 이율 : ${
          this.interestRate
        }, ${this.getInterestRate()}% | ${this.bankName}`
      );
    }
  }


  let account = new Account();
  console.log(
    `1번) 적금 : ${account.balance}원, ${account.getBalance}원 | 이율 : ${
      account.interestRate
    }, ${account.getInterestRate()}%`
  );

  let myAccount = new MyAccount();
  }


  class MyAccount extends Account {
    // Test
    constructor() {
      super();
      this.deposite(1000);
      this.setBalance = 1000;

      console.log(`2번) 적금 : ${this.balance}원, ${this.getBalance}원 | 이율 : ${this.interestRate}, ${this.getInterestRate()}% | ${this.bankName}`);
    }
  }


  let account = new Account();
  console.log(`1번) 적금 : ${account.balance}원, ${account.getBalance}원 | 이율 : ${account.interestRate}, ${account.getInterestRate()}%`);

  let myAccount = new MyAccount();


  [LOG]: "1번) 적금 : 0원, 0원 | 이율 : 0.1, 0.1%"
  [LOG]: "2번) 적금 : 2000원, 2000원 | 이율 : 0.1, 0.1% | Hana bank"
  ```

  실행 결과를 토대로 정리해보면 접근 제한자를 생략할 경우 생성자 외부에서 생성자 매개변수에 접근할 수 없습니다.

  위 예제에서 `Account` 클래스의 생성자 매개변수인 `defaultBalance`는 접근 제한자를 생략해 기본 접근 제한자인 `private`가 적용됩니다. 따라서 생성자 외부에서 접근할 수 없게 되고 생성자 내부 접근만을 허용합니다.

  (매개변수에서 접근 제한자를 생략하면 `private`가 적용되고, 매개변수를 제외한 나머지 요소에서 접근 제한자를 생략할 경우 기본 접근 제한자는 `public`입니다.)

  `bankName`은 `protected`접근 제한자가 설정돼 있으므로 자식 클래스에서 접근할 수 있지만, 객체를 통한 외부 접근을 허용하지 않습니다.

  `interestRate`는 읽기 전용으로 자식 클래스에서 접근할 수 있고 객체를 통한 외부 접근도 허용됩니다.

<br>
<br>
<br>
<br>

## 5) 추상 클래스(abstract class)를 이용한 공통 기능 정의

<br>

추상 클래스(abstract class)는 '구현 메서드'와 '추상 메서드'가 동시에 존재할 수 있습니다. 구현 메서드는 실제 구현 내용을 포함한 메서드이고 추상 메서드는 선언만 된 메서드입니다.

이처럼 추상 클래스(abstract class)는 구현 내용이 없는 추상 메서드를 포함하기 때문에 불완전한 클래스입니다. 따라서 추상 클래스는 단독으로 객체를 생성할 수 없고, 추상 클래스를 상속하고 구현 내용을 추가하는 자식 클래스를 통해 객체를 생성해야 합니다.

<br>

추상 클래스는 `abstract` 키워드를 `class` 선언 앞에 붙여 선언해주며, 추상 메서드를 선언할 때도 사용할 수 있습니다.

```
// 형식
abstract class 추상클래스 {
  abstract 추상메서드();
  abstract 추상멤버변수: string;
  public 구현메서드(): void {
    // 공통적으로 사용할 로직을 추가
    // 로직에서 필요 시 추상 메서드를 호출해 구현 클래스의 메서드가 호출되도록 한다
    this.추상메서드();
  }
}


class 자식클래스 extends 추상클래스 {
    public 추상멤버변수: string;
    public 구현메서드(): void {
        // '추상메서드'의 실제 구현 내용
    }
}
```

구현하지 않은 추상 메서드가 선언됐으므로 자식 클래스에서는 추상 메서드를 받아 구현해줘야 합니다. 추상 클래스에 추상 멤버 변수가 선언돼 있으면 자식 클래스에서도 선언해야 합니다.

<br>

구현 메서드에서는 '추상 멤버 변수'나 '추상 메서드'를 호출할 수 있습니다. 추상 클래스를 작성할 때 유의 사항으로 `abstract` 키워드는 `static`이나 `private`과 함께 선언할 수 없습니다.

<br>

- (X) `static abstract a: string` : `abstract` 키워드는 `static`과 함께 선언할 수 없다.
- (X) `private abstract a: string` : `abstract` 키워드는 `private`과 함께 선언할 수 없다.
- (O) `abstract a: string`
- (O) `public abstract a: string`

<br>

따라서 `abstract`가 추가된 추상 메서드나 추상 멤버 변수는 자식 클래스에서 구현할 수 있게 모두 `public`으로 선언해야 합니다.

추상 클래스에 선언한 추상 메서드는 '오버라이딩(Overriding)'해서 자식 클래스에 반드시 구현해서 사용해야 합니다.

<br>

> 오버라이딩(Overriding)이란 부모 class에 정의된 method를 자식 class에서 재정의 하는 개념이다.
>
> 이를 사용하는 이유는 상속받은 부모 method를 무시하고 새로운 method를 정의하고, 추상 class를 구현하기 위해 사용한다.
>
> ```
> // 부모클래스
> class Gun {
>   shot(time: number) {...}      // Overridden method
> }
>
> // 자식클래스
> class RailGun extends Gun {
>   shot(time2: number) {...}     // Overriding method
> }
>
> let railgun = new RailGun();
> railgun.shot(3);
> ```
>
> - 주의 할 점으로 Overridden method끼리 서로 같은 타입이거나 하위 타입이어야 한다.
> - 위 조건이 성립된다는 전제 하에 overriden method의 매개변수 개수가 overrding method의 매개변수 개수와 같거나 많아야 한다

<br>
<br>

추상 클래스는 구현이 완료되지 않은 클래스이므로 구현 클래스를 통해 추상 클래스에 선언된 추상 메서드를 구현해 줘야 합니다.

> 구현 클래스(Concrete Class)란 추상 클래스가 아닌 클래스라 할 수있는데, 정의한 모든 연산에 대한 구현을 가지고 있는 완전한 클래스로 인스턴스를 만들 수 있다.

이와 같은 추상 클래스에 기반을 둔 구현 방식은 '템플릿 메서드 패턴(Template Method Pattern)'으로 많이 알려져 있습니다.

이 패턴은 추상클래스의 구현메서드에서 추상멤버변수나 추상메서드를 활용해 가상의 공통 로직을 구현 해 두고 추상멤버변수나 추상메서드에 대한 세부 로직은 '구현클래스'에서 구현합니다.

<br>
<br>

- **Example: `abstract` 키워드를 이용해 템플릿 메서드 패턴(Template Method Pattern)을 구현**

  ```
  abstract class AbstractBird {
    // 추상멤버변수
    abstract birdName: string;
    abstract habitat: string;

    // 추상메서드
    abstract flySound(sound: string);

    // 구현메서드
    fly(): void {
        this.flySound("파닥 파닥");
    }

    // 구현메서드
    getHabitat(): void {
        console.log(`<${this.birdName}>의 서식지는 <${this.habitat}>입니다.`)
    }
  }

  class WildGoose extends AbstractBird {
    // 추상멤버변수를 상속함
    constructor(public birdName: string, public habitat: string) {
        super();
    }

    // 추상메서드를 오버라이딩
    flySound(sound: string) {
        console.log(`<${this.birdName}>가 <${sound}> 날아갑니다.`);
    }
  }

  let wildGoose = new WildGoose("기러기", "순천만 갈대밭");
  wildGoose.fly();
  wildGoose.getHabitat();


  [LOG]: "<기러기>가 <파닥 파닥> 날아갑니다."
  [LOG]: "<기러기>의 서식지는 <순천만 갈대밭>입니다."
  ```

  위 예제는 추상클래스 `AbstractBird`에 공통 기능을 담은 구현메서드 `fly()`를 추가하고 추상메서드 `flySound()`는 자식클래스 `WildGoose`가 상속하여 구현합니다.

  이때 추상클래스 `AbstractBird`에서는 추상메서드 `abstract flySound()`를 호출하는 방식으로 구현하며 추상메서드의 실제 동작은 구현클래스인 `WildGoose`에 추가한 구현 메서드 `flySound()`를 통해 이루어 집니다.
