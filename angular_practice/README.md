## # constructor

_MDN : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/constructor_

- constructor는 인스턴트를 생성하고 클래스 프로퍼티를 초기화하기 위한 특수한 메소드이다.
- 클래스 내에 한 개만 존재할 수 있으며, 만약 클래스가 2개 이상의 constructor를 포함하면 문법 에러가 발생한다.
- 인스턴스를 생성할 때 new 연산자와 함께 호출한 것이 바로 constructor이다.
- constructor의 파라미터에 전달한 값은 클래스 프로퍼티에 할당한다.

  ```
  class Foo {}
  const foo = new Foo();

  //클래스 프로퍼티의 동적 할당 및 초기화
  foo.num = 1;
  console.log(foo) // Foo {num: 1}


  //constructor는 인스턴스의 생성과 동시에 클래스 프로퍼티의 생성과 초기화를 실행한다.
  class Foo {
    constructor(num) {
      this.num = num;
    }
  }

  const foo = new Foo(1);
  console.log(foo) // Foo {num: 1}
  ```
