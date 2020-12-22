<br>

# 1. Angular 애플리케이션의 처리 흐름

<br>

## &nbsp;&nbsp;1) index.html

- 웹 프라우저가 가장 먼저 로딩하는 프로젝트 파일은 `dist/index.html`이다. 이것은 `ng build` 명령어로
  프로젝트를 빌드했을때 `src/index.html`에 번들링된 자바스크립트 파일이 추가되어 자동으로 생성되는 파일이다.

- Angular애플리케이션을 부트스트랩(기동)하기 위해서는 수많은 의존성 모듈과 TypeScript파일의 컴파일 결과물인 자바스크립트 파일을 로드할 필요가 있다.

- Angular는 모듈 번들러인 Webpack을 사용하여 의존성 모듈과 자바스크립트 파일을 번들링한 후, 수작업 없이 간편하게 로드할 수 있도록 자동화 기능을 제공한다.

<br>
<br>

## &nbsp;&nbsp;2) main.ts

- main.ts는 프로젝트의 메인 진입점이다. 루트 모듈(src/app/app.module.ts)을 사용하여 애플리케이션을 부트스트랩(기동)한다.  
   이는 angular.json의 main 프로퍼티의 설정에 의해 로드 된다.

- Example:

  ```
  "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:browser",
        "options": {
            "outputPath": "dist",
            "index": "src/index.html",
            "main": "src/main.ts",
              ...
  ```

<br>
<br>

## &nbsp;&nbsp;3) app.module.ts

- @NgModule 데코레이터의 인자로 전달되는 메타데이터에 애플리케이션 전체의 설정 정보를 기술한 루트 모듈이다.
- 루트 모듈은 루트 컴포넌트(/src/app/app.component.ts)를 부트스트랩(기동) 한다.

<br>
<br>

## &nbsp;&nbsp;4) app.component.ts

- 모든 컴포넌트의 부모 역할을 담당하는 루트 컴포넌트

<br>
<br>
<br>
<br>
<br>
<br>

# 2. Angular의 구성요소

<br>

## &nbsp;&nbsp;1) Component

- 컴포넌트는 '템플릿', '메타데이터', '컴포넌트 클래스'로 구성되며 데이터 바인딩에 의해 연결된다.

- 컴포넌트는 화면을 구성하는 View를 생성하고 관리하는것이 주된 역할이며 화면은 1개 이상의 컴포넌트를 조립하여 구성한다.

  > Angular 애플리케이션에는 페이지 DOM의 최상위에 위치하는 컴포넌트가 존재하는데, 이 컴포넌트를 최상위 컴포넌트라고 합니다. 그리고 모든 컴포넌트는 컴포넌트 클래스와 템플릿으로 구성하는데, 컴포넌트 클래스는 애플리케이션 데이터와 로직을 처리하고 템플릿은 화면에 표시할 HTML을 정의합니다.
  >
  > Angular 컴포넌트는 컴포넌트 클래스에 @Component() 데코레이터를 사용해서 컴포넌트에 대한 메타데이터를 지정하면서 템플릿도 함께 지정합니다.
  >
  > 데코레이터는 JavaScript 클래스를 변형하는 함수입니다. Angular에서 제공하는 데코레이터를 어떻게 사용하는지에 따라 클래스의 동작이 달라집니다. (Decorators: https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0)

<br>
<br>

## &nbsp;&nbsp;2) Directive

- 애플리케이션 전역에서 사용할 수 있는 View에 관련한 공통 관심사를 컴포넌트에서 분리하여 구현한 것으로 컴포넌트의 복잡도를 낮추고 가독성을 높인다.

- 구조 디렉티브(Structural Directive)와 어트리뷰트 디렉티브(Attribute Directive)로 구분할 수 있으며 큰 틀에서 컴포넌트 또한 디렉티브로 구분할 수 있다.

- 템플릿, 디렉티브, 데이터 바인딩 : https://angular.kr/guide/architecture#%ED%85%9C%ED%94%8C%EB%A6%BF-%EB%94%94%EB%A0%89%ED%8B%B0%EB%B8%8C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%94%EC%9D%B8%EB%94%A9

<br>
<br>

## &nbsp;&nbsp;3) Service

- 다양한 목적의 애플리케이션 공통 로직을 담당한다.

- 컴포넌트에서 애플리케이션 전역 관심사를 분리하기 위해 사용하며 '의존성 주입(dependency injection)이 가능한 클래스로 작성된다.

- 서비스 클래스는 @Inejctable 데코레이터를 사용해서 정의하며, 이를 사용하면 컴포넌트나 다른 서비스에 의존성으로 주입하기 위해 다른 구성요소보다 먼저 처리된다.

- 의존성 주입(Dependency injection, DI)을 사용하면 컴포넌트 클래스를 유연하면서도 효율적으로 구성할 수 있다.

- 서버에서 데이터를 받아오거나, 사용자의 입력을 검증한다던지, 콘솔에 로그를 출력하는 로직은 특정 뷰와 직접적인 관련이 없기 때문에 서비스에서 처리하는 것이 좋다.

<br>
<br>

## &nbsp;&nbsp;4) Router

- 컴포넌트를 교체하는 방법으로 View를 전환하여 화면 간 이동을 구현해준다. 즉 View간 탐색 및 URL 조작 기능을 제공하는 서비스.

- Angular에서 제공하는 Router NgModule을 사용하면 네비게이션 주소를 전환하면서 애플리케이션의 상태를 변경할 수 있다.

- 페이지를 전환하는 것도 애플리케이션의 상태를 변경하는 것이며, Angular의 페이지 전환 방식은 브라우저의 페이지 전환 방식을 바탕으로 구현된다.

  > Angular의 라우터는 페이지 대신 뷰를 URL과 맵핑합니다. 사용자가 링크를 클릭했다면 브라우저에서 새로운 페이지로 전환하려고 하겠지만, 라우터는 이 동작을 중지시키고 페이지 이동 없이 뷰만 전환합니다.
  >
  > 그리고 아직 로드되지 않은 모듈에 있는 페이지로 전환하려고 하면, 라우터가 지연 로딩 을 사용해서 모듈을 불러오고 난 후에 뷰를 전환합니다.
  >
  > 라우터는 미리 정의된 네비게이션 룰과 데이터 상태에 따라 해당되는 뷰로 전환합니다. 뷰 전환은 사용자가 버튼을 클릭했을 때 일어날 수도 있고, 드롭 박스를 선택했을 때, 다른 로직에서 발생한 결과에 의해서도 일어날 수 있습니다. 이 때마다 라우터는 브라우저의 히스토리에 로그를 저장하며, 이 로그를 활용해서 뒤로 가기/앞으로 가기 버튼에도 반응할 수 있습니다.
  >
  > 네비게이션 룰은 네비게이션 경로를 컴포넌트와 연결해서 정의합니다. 이 때 네비게이션 경로는 URL과 비슷한 형식으로 정의하며, 뷰에 있는 데이터를 활용할 수도 있습니다. 사용자의 입력이나 애플리케이션의 규칙에 따라 어떤 뷰로 전환할지 선택할 수 있고, 뷰를 추가로 표시하거나 숨길 수도 있습니다.

<br>
<br>

## &nbsp;&nbsp;5) NgModule

- 기능적으로 관련된 구성요소를 하나의 단위로 묶는 메커니즘을 말한다.

- Module은 다른 Module과 결합할 수 있으며 Angular는 여러 Module을 조합하여 애플리케이션을 구성한다.

- Component, Directive, Pipe, Service 등의 Angular의 구성요소는 Module에 등록되어야 사용할 수 있다.

- 비슷한 코드를 하나의 기능 모듈로 관리하면 코드를 더 효율적으로 관리할 수 있다. 이렇게 만든 모듈은 코드를 재사용하는 측면에서도 더 효율적이다.

- 그리고 코드를 모듈로 관리하면 애플리케이션이 실행될 때 모든 모듈을 한 번에 불러오지 않고, 필요할 때 불러오는 지연 로딩 을 활용할 때도 유리하다.

<br>
<br>

## &nbsp;&nbsp;5) Diagram

> ![overview2](https://user-images.githubusercontent.com/67410919/102861992-c90e0880-4473-11eb-9120-25d199fb547c.png)

- 컴포넌트와 템플릿은 Angular의 View를 정의한다.

  - 데코레이터는 컴포넌트 클래스에 메타데이터를 추가하며, 이 때 템플릿을 지정해준다.

  - 컴포넌트 템플릿에 사용하는 디렉티브와 바인딩 마크업은 데이터와 프로그램 로직에 따라 템플릿을 조작한다.

- 서비스는 컴포넌트에 의존성으로 주입해서 사용한다. 예를 들어 View에서 네비게이션 기능을 사용하려면 라우터 서비스를 주입 받아 사용하면 된다.

<br>
<br>
<br>
<br>

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
