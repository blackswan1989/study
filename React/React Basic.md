<br>

# 1. 리액트란

<br>
<br>

## 1.1 리액트 이해하기

<br>

MVC는 사용자 인터페이스, 데이터 및 논리 제어를 구현하는데 널리 사용되는 소프트웨어 디자인 패턴이다. 소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있다. MVC에 기반을 둔 몇 가지 다른 디자인 패턴으로 MVVM (모델-뷰-뷰모델), MVP (모델-뷰-프리젠터), MVW (모델-뷰-왓에버)가 있다.

<br>

- Model: 어플리케이션에서 사용하는 데이터를 관리하는 영역.
- View: 사용자에게 보여지는 부분으로 사용자로부터 버튼 클릭, 텍스트 입력 등의 작업을 받게 된다.
- Controller: 사용자로부터 어떤 작업을 받게 되면 모델 데이터를 조회 하거나 수정하고 변경된 사항을 View에 반영한다.

<br>

리액트는 javascript 라이브러리로 사용자 인터페이스를 만드는 데 사용한다. 구조가 MVC, MVW 등인 프레임워크들과 달리 오직 View만 신경쓰는 라이브러리라고 할 수 있다. 리액트에서 컴포넌트는 특정부분이 어떻게 생길지 정하는 선언체로, 다른 프레임워크에서 사용자 인터페이스를 다룰 때 사용하는 템플릿과는 다른 개념이다. 

컴포넌트는 재사용이 가능한 API로 수많은 기능들을 내장하고 있으며, 컴포넌트 하나에서 해당 컴포넌트의 생김새와 작동 방식을 정의해준다.

<br>
<br>

### 1.1.1 렌더링

렌더링은 사용자 화면에 View를 보여주는 것을 뜻한다. 리액트에서 View를 어떻게 렌더링해야 데이터가 변할때마다 새롭게 리렌더링하며 성능을 아끼고 최적의 사용자 경험을 제공하는지의 이해가 필요한데, 이는 리액트 컴포넌트가 최초로 실행한 '초기 렌더링'과 컴포넌트의 데이터 변경으로 다시 실행되는 '리렌더링'개념을 이해해야 한다.

<br>
<br>

### 1.1.2 초기렌더링

맨 처음 어떻게 보이지를 정하는 '초기 렌더링'을 다루는 함수는 `render() {...}`가 있다. 

이 함수는 컴포넌트가 어떻게 생겼는지 정의하는 역할을 하며 html 형식의 문자열을 반환하지 않고, View가 어떻게 생겼고 어떻게 작동하는 지에 대한 정보를 지닌 객체를 반환해준다. 최상위 컴포넌트의 렝더링 작업이 끝나면, 지니고 있는 정보들을 사용하여 html 마크업을 만들고 이를 우리가 정하는 실제 페이지의 DOM요소 안에 주입한다. 

컴포넌트를 실제 페이지에 렌더링 할 때는 먼저 문자열 형태의 HTML 코드를 생성한 후 특정 DOM에 해당 내용을 주입하면 이벤트가 적용되는 절차를 따른다. 리액트 라이브러리에서 업데이트를 진행하는 방식은 컴포넌트에서 데이터에 변화가 있을 때 뷰가 변형되는 것이 아닌 새로운 요소로 갈아 끼운다는 표현이 더 적합하다.

새로운 데이터를 가지고 `render` 함수를 또 다시 호출하는데 이때 `render` 함수가 반환하는 결과를 곧바로 DOM에 반영하는 것이 아닌 이전에 `render` 함수가 만들었던 컴포넌트 정보와 현재 `render` 함수가 만든 컴포넌트 정보를 비교한다고 할 수 있다.

즉 자바스크립트를 사용하여 두 가지 뷰를 최소한의 연산으로 비교한 후 둘의 차이를 알아내어 최소한의 연산으로 DOM 트리를 업데이트 하는 것이라고 할 수 있다.

<br>
<br>
<br>

## 1.2 리액트의 특징

<br>

### 1.2.1 Virtual DOM

DOM은 Document Object Model의 약어로, 객체로 문서 구조를 표현하는 방법을 의미하며 XML이나 HTML로 작성한다.

웹브라우저는 위와 같은 DOM을 활용하여 객체에 자바스크립트와 CSS를 적용하는데, DOM은 트리 구조를 갖고 있어 특정 노드를 찾거나 수정, 제거하거나 원하는 곳에 삽입할 수 있다.

Virtual DOM을 사용하면 실제 DOM에 접근하여 조작하는 대신, 이를 추상화한 자바스크립트 객체를 구성하여 사용하게 된다. 리액트는 이 방식을 사용하여 DOM업데이트를 추상화함으로써 DOM 처리 횟수를 최소화 하고 효율적으로 진행한다.

<br>

1.2.2 기타 특징

리액트는 오직 View만을 담당하는 라이브러리이므로 Ajax, 데이터 모델링, 라우팅 등과 같은 기능은 직접 구현하여 사용해야한다. 해당 분야에서 마음에 드는 라이브러리를 사용하면 된다는 장점이있지만 여러 라이브러리를 접해야 한다는 단점 또한 존재한다. 하지만 리액트는 다른 웹 프레임워크나 라이브러리와 혼용도 가능하다고 할 수 있다.

<br>
<br>
<br>

## 1.3 작업 환경 설정

<br>

### 1.3.1 create-react-app으로 프로젝트 생성하기

`create-react-app`은 리액트 프로젝트를 생성할 때 필요한 웹팩, 바벨의 설치 및 설정 과정을 생략하고 바로 간편하게 프로젝트 작업 환경을 구축해 주는 도구이다. 

`yarn create react-app 프로젝트명`을 입력하면 react 프로젝트가 생성되고 `$cd 프로젝트명`으로 진입한 후 `$yarn start`를 입력하여 리액트 개발 전용 서버를 구동 할 수 있다. (npm 사용시 `npm init react-app 프로젝트명` & `npm start`)

<br>
<br>
<br>
<br>

# 2. JSX

<br>

## 2.1 JSX 이해하기

<br>

JSX는 자바스크립트의 확장 문법이며 XML과 매우 비슷하게 생겼다. 이 코드는 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환된다.

<br>

```
// 1) JSX 코드 예시

function App() {
  return (
    <div>
      Hello <b>react</b>
    </div>
  );
}


//2) 위와 같이 작성된 코드는 아래와 같이 변환된다.

function App() {
  return React.createElement("div", null, "Hello", React.createElement("b", null, "react"));
}
```

<br>

예제 2)의 코드처럼 매번 React.createElement 함수를 사용해야한다면 매우 불편하겠지만 JSX를 사용하면 매우 편하게 UI를 렌더링할 수 있다. 이러한 JSX는 보기 쉽고 익숙하다는 장점이 있다. 자바스크립트 코드와 비교했을 때 훨씬 가독성도 높고 HTML코드를 작성하는 것과 비슷하다.

그리고 JSX는 더욱 높은 활용도를 가지고 있는데 div나 span과 같은 HTML 태그를 사용할 수 있을 뿐만 아니라, 앞으로 만들 컴포넌트도 JXS 안에서 작성할 수 있다. App.js에서 만든 App 컴포넌트를 index.js에서 마치 HTML 태그 쓰듯이 그냥 작성할 수 있다.

<br>

```
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

<br>

위에서 `ReactDOM.render()`은 컴포넌트를 페이지에 렌더링하는 역할을 하며, react-dom 모듈을 불러와 사용할 수 있다. 이 함수의 첫번째 파라미터에는 페이지에 렌더링 할 내용을 JSX 형태로 작성하고, 두 번째 파라미터에는 해당 JSX를 렌더링할 document 내부 요소를 설정한다. 여기서 id가 root인 요소 안에 렌더링 하도록 설정되어 있는데, 이 요소는 public/index.html에서 확인 가능하다.

<br>

`React.StrictMod`는 리액트 프로젝트에서 리액트의 레거시 기능들을 사용하지 못하게 하는 기능으로, 이를 사용하면 문자열 ref, componentWillMount 등 나중에는 완전히 사라지게 될 옛날 기능을 사용했을때 경고를 출력하게 해준다. (해당 프로젝트에서는 StrictMod를 적용하지 않았다.)

<br>
<br>
<br>

## 2.2 JSX 문법

<br>

### 2.2.1 감싸인 요소

<br>

컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다. 그 이유는 Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야한다는 규칙이 있기 때문이다.

<br>

```
// 1) Error
function App() {
  return (
    <h1>hello react</h1>
    <h2>test test</h2>
  );
}

// 2) 부모 요소로 감싸주어야 error가 발생하지 않는다.

import React, {Fragment} from 'react';

function App() {
  return (
    <>
      <h1>hello react</h1>
      <h2>Fragment test</h2>
    </>
  );
} 
```

<br>

그런데 꼭 `div`를 사용하지 않고도 `Fragment` 라는 기능을 사용해도 된다. 코드 상단에 `import React, {Fragment} from 'react';` 컴포넌트를 불러오면 `<></>`와 같이 간단하게 표현할 수 있다.

<br>
<br>

### 2.2.2 자바스크립트 표현

<br>

JSX 내부에서 자바스크립트 표현식을 쓸 수 있는데, 작성하려면 JSX 내부에서 코드를 `{}`로 감싸면 된다. 

<br>

```
function App() {
  const name = 'react';
  return (
    <>
      <h1>{name} Hello!</h1>
      <h2>Javascript test</h2>
    </>
  )
}
```

<br>
<br>

### 2.2.3 If문 대신 조건부 연산자(삼항 연산자)

<br>

JSX 내부의 자바스크립트 포현식에서 if문을 사용할 수 없는데, 조건에 따라 다른 내용을 렌더링 해야 한다면 JSX 밖에서 if문을 사용하여 사전에 값을 설정하거나 `{}`안에 조건부 연산자를 사용하면 된다.

<br>

```
import React from 'react';

function App() {
  const name = 'React';
  return (
    <div>
      {name === 'React' ? (<h1>It's React</h1>) : (<h2>Not React</h2>)}
    </div>
  )
}

export default App;
```

<br>

위와 같이 작성하면 브라우저에 'It's React'라는 문구를 볼 수 있다. 하지만 name 값을 변경하면 'Not React'라는 문구가 나타나게 된다. 

<br>
<br>

### 2.2.4 AND 연산자(&&)를 사용한 조건부 렌더링

<br>

개발할 때 특정 조건을 만족할 때 내용을 보여주고, 만족하지 않을 때 아무것도 렌더링하지 않아야 하는 상황이 있을 수 있다.

```
// 1) 조건부 연산자로 구현 - null을 입력해 아무것도 보여 주지 않을 수 있다

function App() {
  const name = 'Reacttt';
  return <div> {name === 'React' ? <h1>It's React</h1> : null} </div>;
}

---

// 2) && 연산자로 구현 - 이렇게 작성하면 false 상태이기 때문에 아무것도 보여주지 않을 수 있다.

function App() {
  const name = 'Reacttt';
  return <div> {name === 'React' && <h1>It's React</h1>} </div>;
}
```

예제 2)처럼 `&&` 연산자로 조건부 렌더링을 할 수 있는 이유는 리액트에서 `false`를 렌더링 할 때 `null`과 마찬가지로 아무것도 나타내지 않기 때문이다. 다만 예외적으로 falsy한 값인 `0`은 예외적으로 화면에 나타날 수 있기 때문에 주의하자.

<br>
<br>

### 2.2.5 undefined를 렌더링 하지 않기

<br>

리액트 컴포넌트 함수에서 `undefined`만 반환하여 렌더링 하는 상황을 만들면 안된다. 예제 1)과 같이 입력할 경우 에러가 출력된다.

예제 2)처럼 어떤 값이 `undefined`일 수도 있다면 OR연산자(`||`)를 사용하면 해당 값이 `undefined` 일 때 사용할 값을 지정하여 에러를 방지할 수 있다.

<br>

```
// 1) Error: App(...): Nothing was returned from render. This usually means a return statement is missing Or, to render nothing, return null.

function App() {
  const name = undefined;
  return name;
}

---

// 2) Error 방지

function App() {
  const name = undefined;
  return name || '값이 undefined 이다.';
}
```

<br>

반면 예제3)처럼 JSX 내부에서 undefined를 렌더링 하는 것은 에러가 발생하지 않는다.

```
// 3) JSX 내부에서 undefined를 렌더링

function App() {
  const name = undefined;
  return <div>{name}</div>
}

---

// 4) 값이 undefined일 때 보여주고 싶은 문구가 있을 때

function App() {
  const name = undefined;
  return <div>{name || 'React'}</div>
}
```

<br>
<br>

### 2.2.6 인라인 스타일링

<br>

리액트에서 DOM 요소에 스타일을 적용할 때는 문자열 형태로 넣는 것이 아닌 객체 형태로 넣어 주어야 한다. 스타일 이름 중에 `backgound-color`의 경우 `-`를 없애고 카멜 표기법인 backgroundColor로 작성해야 한다.

<br>

```
// 1) style 객체를 미리 선언하고 div에 값을 지정

function App() {
  const name = 'React';
  const style = {
    backgroundColor: 'black', 	// 카멜 표기법으로 작성
    color: 'aqua'
    fontSize: '48px',
    fontWeight: 'bold',
    padding: 16 		// 단위를 생략하면 px로 지정된다.
  }

  return <div style={style}>{name}</div>
}

---

// 2) style값을 해당 태그에 바로 지정하는 것도 가능

function App() {
  const name = 'React';

  return (
    <div 
      style={{
	backgroundColor: 'black', 	
	color: 'aqua'
	fontSize: '48px',
	fontWeight: 'bold',
	padding: 16
      }}
    >
      {name}
    </div>
  );
}
```

<br>
<br>

### 2.2.7 class 대신 className

<br>

HTML에서 CSS 클래스를 사용할 때 `class` 속성을 사용하지만, JSX에서는 `className`으로 설정해주어야 한다. 

```
//App.js 파일
function App() {
  const name = 'React';
  return <div className="react">{name}</div>;
}

// App.css 파일
.react {
  backgroundColor: 'aqua', 	
  color: 'black'
  fontSize: '48px',
  fontWeight: 'bold',
  padding: 16px;
}
```

<br>
<br>

### 2.2.8 꼭 닫아야 하는 태그와 주석 사용 법

<br>

HTML에서 `<input>`이나 `<br>`태그는 닫는 태그를 입력하지 않아도 작동했으나 JSX에서는 `Failed to compile.`에러가 발생하게 된다. 다만 태그 사이에 별도의 내용이 들어가지 않는 경우에는 `<input/>`과 같이 self-closing 태그를 사용할 수 있다.

<br>

```
function App() {
  const name = 'React';
  return (
      <>
	<input></>
	<input/>

	// 이렇게 작성하면 페이지에 나타나게 된다.
	/* 이렇게 작성하면 페이지에 나타나게 된다. */

	{/* 주석은 이렇게 작성 */}

	<div
	  className="react"  // 시작 태그를 여러 줄로 작성하게 된다면 이렇게 주석 작성도 가능하다.
	>
	</div>
      </>
   );
}
```


<br>
<br>
<br>
<br>

# 3. 컴포넌트

<br>

## 3.1 클래스형 컴포넌트

<br>

지금까지 보았던 App 컴포넌트는 함수형 컴포넌트 방식이었고 다음은 클래스형 컴포넌트이다. 클래스형 컴포넌트에서는 `render`함수가 꼭 있어야 하고, 그 안에서 보여 줘야 할 JSX를 반환해야 한다.

<br>

```
// 1) 함수형 컴포넌트
import React from 'react';
import './App.css';

function App() {
  const name = 'react';
  return <div className="react">{name}</div>;
}

export default App;

---

// 2) 클래스형 컴포넌트
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return <div className="react">{name}</div>;
  }
}

export default App;
```

<br>

역할은 함수형 컴포넌트와 똑같지만 차이점은 클래스형 컴포넌트의 경우 `state` 기능 및 라이프사이클 기능을 사용할 수 있다는 것과 임시 메서드를 정의할 수 있다는 것입니다.

함수형 컴포넌트의 장점은, 클래스형 컴포넌트보다 선언하기가 훨씬 편하고 메모리 자원도 클래스형 컴포넌트보다 덜 사용한다. 또 배포할 때도 함수형 컴포넌트를 사용하는 것이 크기가 더 작다는 장점도 있다. 단점으로는, `state` 기능 및 라이프사이클 API의 사용이 불가능하다는 점으로 v16.8 버전 이후 `Hooks`라는 기능이 도입되며 해결되었다.

리액트 공식 매뉴얼에서는 함수형 컴포넌트와 Hooks를 사용하도록 권장하고 있다. 하지만 클래스형 컴포넌트가 사라지는 것은 아니기 때문에 함께 알아두도록 하자.

<br>

  - **EES6의 클래스 문법**

  ```
  // 1) ES6 이전 문법으로는 class 대신에 prototype 문법을 사용하여 아래처럼 작업해야 했다.

  function Dog(name) {
    this.name = name;
  }

  Dog.prototype.say = function() {
    console.log(this.name + ': 멍멍')
  }

  var dog = new Dog('흰둥이');
  dog.say()

  [LOG] 흰둥이: 멍멍

  ---

  // 2) ES6 class 문법은 아래와 같이 작성할 수 있다.

  class Dog {
    constructor(name) {
	  this.name = name;
    }
    say() {
      console.log(this.name + ': 멍멍')
    }
  }

  const dog = new Dog('검둥이');
  dog.say();

  [LOG] 검둥이: 멍멍
  ```
  
<br>
<br>

- **EES6의 화살표 함수**

화살표 함수는 주로 함수를 파라미터로 전달할 때 유용하게 쓰이며 function과 서로 가리키는 this 값이 다르다. `function()`을 사용했을 때는 푸들이 나타나고 `()=>`를 사용했을 때는 리트리버가 나타난다. 

즉, 일반 함수는 자신이 종속된 객체를 `this`로 가리키며 화살표 함수는 자신이 종속된 인스턴스를 `this`로 가리킨다.

```
// 1) 화살표 함수는 function과 서로 가리키는 this 값이 다르다.

function BlackDog() {
  this.name = '리트리버';
  return{
    name: '푸들',
    bark: function() {
      console.log(this.name + ': 멍멍');
    }
  }
}
const blackDog = new BlackDog();
blackDog.bark();   // [LOG] 푸들 멍멍


function WhiteDog() {
  this.name = '리트리버';
  return{
    name: '푸들',
    bark: () => {
      console.log(this.name + ': 멍멍');
    }
  }
}
const whiteDog = new WhiteDog();
whiteDog.bark();    // [LOG] 리트리버 멍멍


---


// 2) 화살표 함수는 값을 연산하여 바로 반환해야 할 때 사용하면 가독성을 높일 수 있다.

function twice(value) {
  return value * 2;
}

const triple = (value) => value * 3;
```

<br>
<br>
<br>

## 3.2 First Component

<br>

props 값은 `const MyComponent = (props) => {...}`처럼 컴포넌트 함수의 파라미터로 받아와서 사용할 수 있다.

`const {name, children} = props;`와 같은 비구조화 할당(destructuring assignment) 문법은 함수의 파라미터 부분에서도 사용할 수 있다. 아래의 경우 처럼 만약 함수의 파라미터가 객체라면 그 값을 바로 비구조화 해서 사용할 수 있다. 

이를 통해 내부 값을 바로 추출하여 `{props.name}`처럼 `props` 키워드를 앞에 붙이지 않고 `{name}`만으로 사용 가능하다.

```
// MyComponent.js

import React from 'react';
import PropTypes from 'prop-types';   // 컴포넌트의 필수 props를 지정하거나 props 타입을 지정할 때 사용

const MyComponent = ({name, children, favoriteNumber}) => {
  return (
    <div style={{fontSize:'48px', backgroundColor: 'black', color: 'aqua', padding: 16}}>
      Hello, My name is {name} <br/>
      children value is {children} <br/>
      My favorite Number is {favoriteNumber}
    </div>
  );
};

// App 컴포넌트에 name 값이 없을때 보여줄 default props 설정이 가능하다.
MyComponent.defaultProps = {
  name: 'Default Name'
}

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
}

export default MyComponent;

---

// App.js

import React from 'react';
import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name={"Kate"} favoriteNumber={2}> React </MyComponent>;
}

export default App;
```

- props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소이다.

- props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트(현재 App 컴포넌트)에서 설정할 수 있다. 

<br>
<br>
<br>

## 3.3 PropTypes

<br>

리액트에서는 아래 처럼 `propTypes` 사용하여 타입을 지정하여 코드 안전성을 높일 수 있다. `isRequired`를 사용하면 필수 항목으로 설정된다.

<br>

```
// MyComponent.js

...

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
}
```

<br>
<br>

### 3.3.1 더 많은 PropTypes 종류 (url: https://github.com/facebook/prop-types)

<br>

- array: 배열
- arrayOf(다른 PropType): 특정 PropType으로 이루어진 배열을 의미한다. 예를 들어 arrayOf(PropType.number)는 숫자로 이루어진 배열이다.
- bool: true & false 값
- func: 함수
- number: 숫자
- object: 객체
- string: 문자열
- symbol: ES6의 Symbol
- node: 렌더링 할 수 있는 모든 것(숫자, 문자열, JSX, children도 node PropType이다.)
- instanceOf(클래스): 특정 클래스의 인스턴스로 예를 들면 instanceOf(MyClass)
- oneOf(['dog', 'cat']): 주어진 배열 요소 중 값 하나
- oneOfType([React.PropTypes.string, PropTypes.number]): 주어진 배열 안의 종류 중 하나
- objectOf(React.PropTypes.number): 객체의 모든 키 값이 인자로 주어진 PropType인 객체
- shape({ name: PropTypes.string, num: PropTypes.number}): 주어진 스키마를 가진 객체
- any: 아무 종류

<br>
<br>

### 3.3.2 클래스형 컴포넌트에서 props 사용하기

<br>

클래스형 컴포넌트에서 `props`를 사용할 때는 `render` 함수에서 `this.props`를 조회하면 된다. 그리고 defaultPorps와 propTypes는 #3.2와 똑같은 방식으로 설정할 수 있다.

<br>

```
import React, {Component} from 'react';   // {Component} 추가
import PropTypes from 'prop-types';

class MyComponent extends Component {
  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당(destructuring assignment)

    return (
      <div style={{fontSize:'48px', backgroundColor: 'black', color: 'aqua', padding: 16}}>
        Hello, My name is {name} <br/>
        children value is {children} <br/>
        My favorite Number is {favoriteNumber}
      </div>
    )
  }
}

...
```

<br>

클래스형 컴포넌트에서 defaultProps와 propTypes를 설정할 때 아래 처럼 class 내부에서 지정하는 방법도 있다.

<br>

```
class MyComponent extends Component {
  static defaultProps = {
    name: 'Default Name' 
  };

  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
  };

  render() {
    const { name, favoriteNumber, children } = this.props;

    return (
      ...
    )
  }
}
```

<br>
<br>
<br>

## 3.4 state

<br>

리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다. `props`는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값이며, 컴포넌트 자신은 해당 `props`를 읽기 전용으로만 사용할 수 있다. 즉 `props`를 바꾸려면 부모 컴포넌트에서 바꾸어 주어야 한다.

리액트에는 두 가지 종류의 state가 있다. 하나는 클래스형 컴포넌트가 지니고 있는 state 이고, 다른 하나는 함수형 컴포넌트에서 useState라는 함수를 통해 사용하는 state 이다.

<br>

```
// Counter.js

import React, { Component } from 'react';

class Counter extends Component {
  // 컴포넌트에 state를 설정할 때는 다음과 같이 constructor 메서드를 작성하여 설정한다.
  // 이는 컴포넌트의 생성자 메서드로 반드시 super(props)를 호출해 주어야 한다. 
  // 이 함수가 호출되면 현재 클래스형 컴포넌트가 상속받고있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해 준다.
  constructor(props) {
    super(props);

    // state의 초기 값 설정 (컴포넌트의 state는 객체 형식이어야 한다.)
    this.state = {
      number: 0
    };
  }

  render() {
    const { number } = this.state;  // state르 조회할 때는 this.state로 조회한다.

    return (
      <div>
        <h1>{number}</h1>
        <button
          // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정한다. (이벤트 설정)
          onClick={ () => 
          {
            // this.setState를 사용하여 state에 새로운 값을 넣을 수 있다.
            this.setState({number: number + 1});
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
```

<br>
<br>

```
// Counter_edit.js

import React, { Component } from 'react';

class CounterEdit extends Component {
  // 아래 처럼 작성하면 counstructor 메서드를 선언하지 않고도 state 초기 값을 설정할 수 있다.
  state = {
    number: 0,
    fixedNumber: 0
  };

  render() {
    const { number, fixedNumber } = this.state;

    return (
      <div>
        <h1>Number: {number}</h1>
        <h2>Fixed Number: {fixedNumber}</h2>
        <button
          onClick={() => {
            // 1) `fixedNumber` 추가 후 `this.setState` 함수를 사용할 때 인자로 전달되는 개체 내부에
            //    `fixedNumber`를 넣어주지는 않는다. `this.setState` 함수는 인자로 전달된 객체 안에 들어 있는 값만 바꾸어 준다.
            // 2) `this.setState`를 두번 작성해도 버튼을 클릭할 때 숫자가 1씩 더해지는데,
            //    `this.setState`를 사용한다고 해서 `state` 값이 바뀌지는 않기 때문이다.
            // this.setState({number: number + 1});
            // this.setState({number: this.state.number + 1});

            // 2)에 대한 해결책으로 아래의 코드처럼 객체 대신에 함수를 인자로 넣어주는것이다.
            //   `this.setState((prevState, props) => {...}`에서 `prevState`는 기존 상태이고 
            //   `props`는 현재 지니고 있는 `props`를 가리킨다. 만약 업데이트 하는 과정에서 `props`가 필요하지 않다면 생략해도 된다.
            this.setState(prevState => {
              return {
                number: prevState.number + 1
              };
            });

            // 위 코드와 아래 코드는 완전히 똑같은 기능을 한다. 아래 코드는 함수에서 바로 객체를 반환해주고 있다.
            this.setState(prevState => ({
              number: prevState.number + 1
            }));
          }}
        >
          +1
        </button>

        <button
          // 3) setState를 사용하여 값을 업데이트 하고 난 다음에 특정 작업을 하고 싶을 때는 
          //    setState의 두 번째 파라미터로 콜백 함수를 등록하여 작업을 처리할 수 있다.
          onClick={() => {
            this.setState(
              {
                number: number + 1
              },
              () => {
                console.log('state가 호출되었다.')
                console.log(this.state); // {number: 1, fixedNumber: 0} 출력되며 버튼을 클릭할때마다 number값도 갱신되며 출력된다.
              }
            )
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default CounterEdit;
```

<br>
<br>

### 3.4.1 배열 비구조화 할당(Array destructuring assignment)

<br>

배열 비구조화 할당(Array destructuring assignment)은 이전에 배운 객체 비구조화 할당과 비슷한데, 배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해주는 문법이다.

<br>

```
const array = [1, 2];
const one = array[0];
const two = array[1];
```

위는 array 안에 있는 값을 one과 two에 담아 주는 코드로 이를 배열 비구조화 할당을 사용하면 다음과 같이 표현 가능하다

```
const array = [1, 2];
const [one, tow] = array;
```

<br>
<br>

### 3.4.2 useState 사용하기

<br>

`useState` 함수의 인자에는 상태의 초깃값을 넣어 준다. 클래스형 컴포넌트에서의 `state` 초기값은 객체 형태를 넣어 주어야 하지만 `useState`에서는 반드시 객체가 아니어도 상관 없다. 값의 형태는 숫자, 문자열, 객체, 배열과 같이 자유롭다.

함수를 호출하면 배열이 반환되는데 배열의 첫 번째 원소는 현재 상태이고, 두번째 원소는 상태를 바꾸어 주는 함수이다. 이 함수를 세터(Setter) 함수라고 부른다.

그리고 배열 비구조화 할당(Array destructuring assignment)을 통해 이름을 자유롭게 정해 줄 수 있다. 현재 `message`와 `setMessage`라고 설정 한 이름을 `text`와 `setText`라고 자유롭게 변경할 수 있다.

`useState`는 한 컴포넌트에서 여러 번 사용할 수도 있다.

```
// Say.js

import React, { useState } from 'react';

const Say = () => {
  const [message, setMessage] = useState('Click button');
  const onClickEnter = () => setMessage('Hello!');
  const onClickLeave = () => setMessage('Goodbye!');

  const [color, setColor] = useState('pink');   // 추가 useState로 message의 color를 변경시켜준다.

  return (
    <div>
      <button onClick={onClickEnter}> Enter </button>
      <button onClick={onClickLeave}> Leave </button>
      <h1 style={{ color }}>{message}</h1>

      <button style={{ color: 'red' }} onClick={() => setColor('red')}> Red </button>
      <button style={{ color: 'green' }} onClick={() => setColor('green')}> Green </button>
      <button style={{ color: 'blue' }} onClick={() => setColor('blue')}> Blue </button>
    </div>
  );
};

export default Say;
```

<br>
<br>
<br>

## 3.5 state를 사용할 때 주의 사항

<br>

`state` 값을 바꾸어야 할 때는 `setState` 혹은 `useState`를 통해 전달받은 세터(Setter) 함수를 사용해야 한다. 예를 들어 다음 코드는 잘못된 코드이다.

```
// 클래스형 컴포넌트의 잘못된 예시
this.state.number = this.state.number + 1;
this.state.array = this.array.push(2);
this.state.object.value = 5;

// 함수형 컴포넌트의 잘못된 예시
const [object, setObject] = useState{( a: 1, b: 1 )};
object.b = 2;
```

<br>

배열이나 객체를 업데이트 해야 한다면, 배열이나 객체 사본을 만들고 그 사본에 값을 업데이트 한 후 그 사본의 상태를 setState 혹은 Setter 함수를 통해 업데이트 해준다. 예시는 다음과 같다

```
// 객체 다루기
const object = { a: 1, b: 2, c: 3 };
const nextObject = { ...object, b: 2 };   // 사본을 만들어 b 값만 덮어 씌우기


// 배열 다루기
const array = [
  { id: 1, value: true },
  { id: 2, value: true },
  { id: 3, value: false }
];

let nextArray = array.concat({ id: 4 });    // 새 항목 추가
nextArray.filter(item => item.id != = 2);    // id가 2인 항목 제거
nextArray.map(item => (item.id === 1? { ...item, value: false } : item));   // id가 1인 항목의 value를 false로 설정
```

객체에 대한 사본을 만들때 spread 연산자(`...`)를 사용하여 처리하고, 배열에 대한 사본을 만들 때는 배열의 내장 함수들을 활용해 준다.

<br>
<br>
<br>

## 3.6 정리

<br>

props와 state는 둘 다 컴포넌트에서 사용하거나 렌더링할 데이터를 담고 있으므로 비슷해 보이지만, 역할은 매우 다르다. props는 부모 컴포넌트가 설정하고 state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트 할 수 있다.

props를 사용한다고 해서 값이 무조건 고정적이지는 않은데, 부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달하고 자식 컴포넌트에서 특정 이벤트가 발생할 때 부모 컴포넌트의 메서드를 호출하면 props도 유동적으로 사용 가능하다.

앞으로도 컴포넌트를 만들 때 useState 사용을 권장한다. 코드가 간결해질 뿐만 아니라 리액트 팀에서 함수형 컴포넌트와 Hooks를 사용하는 것이 주요 컴포넌트 개발 방식이 될 것으로 공지했기 때문이다.

<br>
<br>
<br>
<br>

# 4. 이벤트 핸들링

<br>

사용자가 웹 브라우저에서 DOM 요소들과 상호 작용 하는 것을 이벤트(event)라고 한다. 예를 들어 버튼에 마우스 커서를 올렸을 때는 `onmouseover` 이벤트를 실행하고, 클릭했을 때는 `onclick` 이벤트를, Form 요소는 값이 바뀔 때 `onchage`이벤트를 실행한다. HTML에서 사용한 적이 있다면 매우 익숙할 것이다.

<br>
<br>
<br>

## 4.1 리액트의 이벤트 시스템

<br>
<br>

### 4.1.1 이벤트를 사용할 때 주의 사항

<br>

리액트에서는 이벤트 이름을 카멜 표기법(`onClick`, `onKeyUp`)으로 작성해야 한다.

이벤트에서 실행할 자바스크립트 코드를 전달하는 것이 아닌, 함수 형태의 값을 전달한다. HTML에서는 큰따옴표 안에 실행할 코드를 넣었지만 리액트에서는 함수 형태의 객체를 전달한다.

DOM 요소에만 이벤트를 설정할 수 있다. 즉 `div`, `button`, `form` 등의 DOM 요소에는 이벤트를 설정할 수 있지만, `<MyComponent onClick={doSomething}/>`처럼 컴포넌트에 자체적으로 이벤트를 설정할 수는 없다. 

하지만 `<div onClick={this.props.onClick}>...</div>`와 같이 전달받은 props를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있다.

<br>

- **이벤트 종류: https://reactjs.org/docs/events.html**

<br>
<br>
<br>

## 4.2 예제로 이벤트 핸들링 익히기

<br>
<br>

### 4.2.1 `onChange` 이벤트 핸들링하기

<br>

EventPractice 컴포넌트에 input 요소를 렌더링하는 코드와 해당 요소에 `onChange` 이벤트를 설정하는 코드를 작성해보자. 아래처럼 작성 후 콘솔을 확인해보면 이벤트 객체(`e`)가 콘솔에 나타난다. 

여기서 `e` 객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체이다. 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 된다.

<br>

```
import React, { Component } from 'react';

class EventPractice extends Component {
  render() 
  {
    return (
      <div>
      <h1>Event Practice</h1>
      <input
	type="text"
	name="message"
	placeholder="Please enter text"
	onChange={
	  (e) => {
	    console.log(e)
	  }
	}
      >
      </input>
    </div>
    )
  }
}

export default EventPractice;


[LOG] SyntheticBaseEvent {_reactName: "onChange", _targetInst: null, type: "change", nativeEvent: InputEvent, target: input, …}
```
<br>

SyntheticEvent는 네이티브 이벤트와 달리 이벤트가 끝나고나면 초기화되므로 정보를 참조할 수 없다. 예를 들어 0.5초 뒤에 `e`객체를 참조하면 객체 내부의 모든 값이 비워지게 된다.

만약 비동기적으로 이벤트 객체를 참조할 일이 있다면 `e.persist()` 함수를 호출해 주어야 한다. 예를 들어 아래처럼 `onChange` 이벤트가 발생할 때, 앞으로 변할 인풋 값인 e.target.value를 콘솔에 기록해보자. 인풋의 값이 바뀔 때마다 바뀌는 값을 콘솔에 기록해주는 것을 확인할 수 있다.

<br>

```
onChange={
  (e) => {
    console.log(e.target.value);
  }
}
```

<br>
<br>

### 4.2.2 `state`에 input 값 담기

<br>

`state`에 input 값을 담아보자, 3장에서 배운 대로 생성자 메서드인 `constructor`에서 `state` 초기값을 설정하고, 이벤트 핸들링 함수 내부에서 `this.setState` 메서드를 호출하여 `state`를 업데이트 한 후 input의 value 값을 `state`에 있는 값으로 설정해보자.

아래 처럼 작성 후 input에 입력했을때 오류가 발생하지 않고 제대로 입력할 수 있다면 `state`에 텍스트를 잘 담은 것이다.

<br>

```
// EventPractice.js
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: ''
  }

  render() 
  {
    return (
      <div>
        <h1>Event Practice</h1>
        <input
          type="text"
          name="message"
          placeholder="Please enter text"
          value={this.state.message}		// state에 인풋 텍스트를 담아주도록
          onChange={
            (e) => {
              this.setState({
	      message: e.target.value
            })
           }
         }
        >
       </input>
       
       <button
          onClick={() => {
              alert(this.state.message);
              this.setState({
                message:''
              })
            }
          }
	>
         확인
	</button>
     </div>
    )
  }
}

export default EventPractice;
```

<br>

위 코드를 실행해보면 alert를 사용하여 input에 입력한 현재 message값을 화면에 표시하도록 만들었다.

<br>
<br>

### 4.2.3 임의 메서드 만들기

<br>

4.1에서 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달해주는 방법을 보았는데, 이 방법 대신 함수를 미리 준비하여 전달하는 방법도 있다. 성능상으로는 차이가 없으나 가독성이 높다.

`onChange`와 `onClick`에 전달한 함수를 따로 빼내서 컴포넌트 임의 메서드를 만들어보자. 아래 예제를 보면 constructor 함수에서 함수를 바인딩하는 작업을 해주고 있다.

<br>

```
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleClick() {
    alert(this.state.message);
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <div>
        <h1>Event Practice</h1>
        <input
          type="text"
          name="message"
          placeholder="Please enter text"
          value={this.state.message}		// state에 인풋 텍스트를 담아주도록
          onChange={this.handleChange}
        />
      	<button onClick={this.handleClick}> 확인 </button>
      </div>
    )
  }
}

export default EventPractice;
```

<br>

함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어져 버린다. 따라서 this를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩 하는 작업이 필요하다. 만약 바인딩되지 않으면 this가 undefined를 가리키게 된다.

<br>
<br>

### 4.2.3.1 Property Initializer Syntax를 사용한 메서드 작성

<br>

메서드 바인딩은 생성자 메서드에서 하는 것이 정석이다. 하지만 이 방법은 새 메서드를 만들 때마다 `counstructor`도 수정해야 되기 때문에 불편한 점이 있다.

이를 간단하게 하기 위해선 바벨의 transform-class-properties 문법을 사용하여 화살표 함수 형태로 메서드를 정의하는 것이다. `counstructor` 부분을 삭제 후 handle 코드를 아래처럼 변경할 수 있다.

<br>

```
  ...

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: ''
    })
  }

  ...
```

<br>
<br>

### 4.2.4 input 여러개 다루기

<br>

`event` 객체를 활용하면 input을 쉽게 여러개를 다룰 수 있는데 `e.target.name` 값을 사용하면 된다. 

`onChange` 이벤트 핸들러에서 `e.target.name`은 해당 인풋의 name을 가리킨다. 이 값을 사용하여 state를 설정하면 쉽게 해결할 수 있다.

다음 코드에서는 render 함수에서 name 값이 username 인 input을 렌더링해 주었고, state 쪽에도 username 이라는 값 추가 등을 해주었다.

<br>

```
// EventPractice_edit.js
import React, {Component} from 'react';

class EventPracticeEdit extends Component {
  state = {
    // 디폴트 메세지
    username:'',
    message:''
  }

  handleChange = (e) => {
    // `e.target.name`은 해당 인풋의 name을 가리킨다. 이 값을 사용하여 state를 설정하면 쉽게 해결할 수 있다.
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message);
    this.setState({
      // 버튼 클릭 이후 초기화를 시켜준다.
      username:'',
      message:''
    })
  }

  render() {
    return (
      <div>
        <h1>Event Practice "[e.target.name]"</h1>
        <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange}/>
        <input type="text" name="message" placeholder="Text Enter" value={this.state.message} onChange={this.handleChange}/>
        <button onClick={this.handleClick}> 확인 </button>
      </div>
    )
  }
}

export default EventPracticeEdit;
```

<br>

위 코드에서는 `handleChange` 함수가 핵심인데 객체 안에서 key를 `[]`로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key값으로 사용된다. 예를 들어 다음과 같은 객체를 만들고 콘솔창을 확인해보자.

<br>

```
const name = 'variantKey';
const object = {
  [name]: 'value'
};

console.log(object) // {variantKey: "value"}
```

<br>
<br>

### 4.2.5 onKeyPress 이벤트 핸들링

<br>

이번에는 키를 눌렀을 때 발생하는 KeyPress 이벤트를 처리하는 방법을 알아보자. comment 인풋에서 enter를 눌렀을때 `handleClick` 메서드를 호출하도록 하였다.

<br>

```
// EventPractice_edit.js

...

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <h1>Event Practice "[e.target.name]"</h1>
        <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange}/>
        <input type="text" name="message" placeholder="Text Enter" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
        <button onClick={this.handleClick}> 확인 </button>
      </div>
    )
  }

...
```


<br>
<br>
<br>

## 4.3 함수형 컴포넌트로 구현해 보기

<br>

아래 예제는 함수형 컴포넌트 방식으로 위와 똑같이 동작하는 코드를 작성하였다. 아래 코드에서는 `e.target.name`을 활용하지 않고 `onChange` 관련 함수 두 개를 따로 만들어 주었다.

<br>

```
import React, {useState} from 'react';

const EventPracticeEdit = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const onChangeUsername = e => setUsername(e.target.value);
  const onChangeMessage = e => setMessage(e.target.value);
  const onClick = () => {
    alert(username + ': ' + message);
    setUsername('');
    setMessage('');
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
      <h1>Event Practice</h1>
      <input type="text" name="username" placeholder="User Name" value={username} onChange={onChangeUsername}/>
      <input type="text" name="message" placeholder="Text Enter" value={message} onChange={onChangeMessage} onKeyPress={onKeyPress}/>
    </div>
  )
}

export default EventPracticeEdit;
```

<br>

위 처럼 인풋이 두 개 밖에 없다면 이런 코드도 나쁘지 않으나 인풋의 갯수가 많아질 것 같으면 `e.target.name`을 활용하는 것이 더 좋을 수도 있다. 다음으로는 `useState`를 통해 사용하는 상태에 문자열이 아닌 객체를 넣어보자

`e.target.name` 값을 활용하려면 아래와 같이 `useState`를 쓸 때 인풋 값들이 들어있는 form 객체를 사용해주면 된다.

<br>

```
// EventPractice_edit2.js
import React, {useState} from 'react';

const EventPracticeEdit2 = () => {
  const [form, setForm] = useState({
    username:'',
    message:''
  });

  const { username, message } = form;
  const onChange = e => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value
    };

    setForm(nextForm);
  };

  const onClick = () => {
    alert(username + ': ' + message);
    setForm({
      username: '',
      message: ''
    })
  }

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
    <h1>Event Practice</h1>
    <input type="text" name="username" placeholder="User Name" value={username} onChange={onChange}/>
    <input type="text" name="message" placeholder="Text Enter" value={message} onChange={onChange} onKeyPress={onKeyPress}/>
    <button onClick={onClick}> 확인 </button>
  </div>
  )
}

export default EventPracticeEdit2;
```

<br>
<br>
<br>
<br>

# 5. ref: DOM에 이름 달기

<br>

HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 있다. 이것이 바로 ref(reference) 개념이다.

리액트 컴포넌트 안에서 id를 사용할 수는 있지만 컴포넌트를 여러번 사용할 때 중복 id를 가진 DOM이 여러개 생기게 된다. 반면 ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하여 이러한 문제가 발생하지 않게 된다.

id를 사용해야 하는 상황이 발생하면 컴포넌트를 만들 때마다 id 뒷부분에 추가 텍스트나 숫자를 붙여 중복 id가 발생하는 것을 방지해줘야 한다.

<br>
<br>

## 5.1 ref는 어떤 상황에서 사용할까?

<br>

ref는 DOM을 꼭 직접적으로 건드려야 할 때 사용한다. 예를 들어 바닐라JS 및 JQuery로 만든 웹 사이트에서 input을 검증할때 특정 id 를 가진 input에 클래스를 설정해 준다.

<br>

```
<!DOCTYPE html>
  ...

  <style>
    .success {
      background-color: lightgreen;
    }

    .failure {
      background-color: lightcoral;
    }
  </style>
  
  <script>
    function validate() 
    {
      var input = document.getElementById('password');  // id 설정
      input.className='';
      if(input.value === '0000') {
        input.className='success';    // input입력값이 '0000' 과 일치하면 성공
      } else {
        input.className='failure';
      }
    }
  </script>
  
</head>
<body>
  <input type="password" id="password"></input>
  <button onclick="validate()">Validate</button>
</body>
</html>

url : https://jsbin.com/wihetituda/edit?html,output
```

<br>

하지만 리액트에서는 굳이 DOM에 접근하지 않아도 state로 구현할 수 있다. 클래스형 컴포넌트에서 ref를 사용하는 방법을 알아보자.

<br>
<br>

### 5.1.1 클래스형 컴포넌트에서 ref를 사용하기 - 예제 컴포넌트 생성

<br>

아래 예제를 보면 인풋에서는 `onChange` 이벤트가 발생하면 `handleChange`함수를 호출하여 `state`의 `password` 값을 업데이트 해준다. 버튼에서는 `handleButtonClick`함수를 호출하여 clicked 값을 true로 설정했고 `validated` 값을 검증 결과로 설정해주었다.

인풋의 `className` 값은 버튼을 누르기 전에는 비어 있는 문자열을 전달하고, 버튼을 누른 후에는 검증 결과에 따라 `success` 값 또는 `fail` 값을 설정해준다. 그리고 이 값에 따라 css는 `lightgreen` 색상 또는 `lightcoral` 색으로 나타난다.

<br>

```
// validationSomple.css
.success {
  background-color: lightgreen;
}

.fail {
  background-color: lightcoral;
}
```

```
import React, { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component {
  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = (e) => {
    this.setState({
    password: e.target.value
    });
  }

  handleButtonClick = () => {
    this.setState({
    clicked: true,
    validated: this.state.password === '0000'
    })
  }

  render() {
    return (
      <div className="input_box">
        <input 
          type="password" 
          value={this.state.password} 
          onChange={this.handleChange} 
          className={this.state.clicked ? (this.state.validated ? 'success' : 'fail') : ''}/>
          
        <button onClick={this.handleButtonClick}> Validate </button>
      </div>
    )
  }
}

export default ValidationSample;
```

<br>

그리고 App 컴포넌트에서 ref를 사용하기 위해 함수형 컴포넌트에서 클래스형 컴포넌트로 전환해주자. 

```
//App.js
...

class App extends Component {
  render() {
    return (
      <ValidationSample/>
    )
  }
}

...
```

<br>
<br>

### 5.1.2 DOM을 꼭 사용해야 하는 상황

<br>

앞 예제들에서는 `state`를 사용하여 기능 구현이 가능했지만, `state`만으로 해결할 수 없는 기능도 있다.

특정 input에 포커스 주거나 스크롤 박스 조작, Canvas 요소에 그림 그리기 등 이럴 때에는 어쩔 수 없이 DOM에 직접적으로 접근해야 하는데, 이를 위해 ref를 사용하게 된다.


<br>
<br>
<br>

## 5.2 ref 사용

<br>
<br>

### 5.2.1 콜백 함수를 통한 ref 설정

<br>

ref를 만드는 가장 기본적인 방법은 콜백 함수를 사용하는 것이다. ref를 달고자 하는 요소에 ref라는 콜백 함수를 `props`로 전달해 주면 된다. 이 콜백 함수는 ref 값을 파라미터로 전달받고 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해 준다.

<br>

```
<input ref={(ref) => {this.input=ref}}/>
```

<br>

위와 같이 작성 하면 앞으로 `this.input`은 input 요소의 DOM을 가리킨다. ref의 이름은 자유롭게 지정 가능하며, DOM 타입과 관계 없이 `this.superman = ref`처럼 자유롭게 지정한다.

<br>
<br>

### 5.2.2 createRef를 통한 ref 설정

<br>

ref f를 만드는 또 다른 방법은 리액트에 내장되어 있는 `createRef`라는 함수를 사용하는 것이다. 이 기능은 리액트 v16.3부터 도입되었고 이전 버전에서는 작동하지 않음으로 주의하자.

`createRef`를 사용하여  ref를 만들면 우선 컴포넌트 내부에서 멤버 변수로 `React.createRef()`를 담아 주어야 한다. 그리고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어주면 ref 설정이 완료된다.

설정한 뒤 나중에 ref를 설정해준 DOM에 접근하려면 `this.input.current`를 조회하면 된다. 콜백 함수를 사용할 때와 다른 점은 뒷부분에 `.current`를 넣어 주어야 한다는 것이다.

<br>

```
import React, { Component } from 'react';

class RefSample extends Component {
  input = React.createRef()

  handleFocus = () {
    this.input.current.focus()
  }

  render() {
    reutnr (
      <div>
        <input ref={this.input}/>
      </div>
    )
  }
}

export default RefSample;
```

<br>
<br>

### 5.2.3 적용하기 - input에 ref 달기

<br>

ref를 달아준 후 버튼에서 onClick 이벤트가 발생할 때 input에 포커스를 주도록 수정해보자. ref를 추가하면 `this.input`이 컴포넌트 내부의 input 요소를 가리키고 있어 일반 DOM을 다루듯이 코드를 작성할 수 있다.

<br>

```
  ...

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    });

    this.input.focus()    // 버튼 클릭 -> validated 이후에 input에 포커스가 가도록
  }

  render() {
    return (
      <div className="input_box">
        <input 
          type="password" 
          ref={(ref) => this.input=ref}   // ref 달아주기
          value={this.state.password} 
          onChange={this.handleChange} 
          className={this.state.clicked ? (this.state.validated ? 'success' : 'fail') : ''}/>

        <button onClick={this.handleButtonClick}> Validate </button>
      </div>
    )
  }
  ...
```

<br>
<br>
<br>

## 5.3 컴포넌트에 ref 달기

<br>

리액트에서는 컴포넌트에도 ref를 달 수 있는데, 이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓰게 된다. 

<br>

아래처럼 작성하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있다. 즉 `myComponent.handleClick`, `myComponent.input`등 내부의 ref에도 접근할 수있다.

```
<MyComponent ref={(ref) => {this.myComponent=ref}} />
```

다음으로는 스크롤 박스가 있는 컴포넌트를 하나 만들고, 스크롤바를 아래로 내리는 작업을 부모 컴포넌트에서 실행해보자.

<br>
<br>

### 5.3.1 컴포넌트 생성 및 렌더링

<br>

```
//App.js
...

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox/>
      </div>
    )
  }
}
```

```
//ScrollBox.js
import React, {Component} from 'react';

class ScrollBox extends Component {
  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative',
      margin: '30px'
    };

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    }

    return (
      <div style={style} ref={(ref) => (this.box=ref)}>
        <div style={innerStyle}></div>
      </div>
    )
  }
}

export default ScrollBox;
```

<br>
<br>

### 5.3.2 컴포넌트에 메서드 생성

<br>

위에서 만든 컴포넌트에 스크롤바를 맨 아래로 내리는 메서드를 추가해보자. 자바스크립트로 스크롤바를 내릴 때는 DOM 노드가 가진 다음 값들을 사용한다. 스크롤바를 맨 아래쪽으로 내리려면 `scrollHeight`에서 `clientHeight` 높이를 빼면 된다.

<br>

- scrollTop: 세로 스크롤바 위치 (0 ~ 350)
- scrollHeight: 스크롤 박스 내부의 div 박스 높이 (650)
- clientHeight: 스크롤 박스의 높이 (300)

<br>

```
...

class ScrollBox extends Component {
  scrollToBottom = () => {
    // 아래 비구조화 할당 문법을 풀이하면 const scrollHeight = this.box.scrollHeight; 와 같다.
    const { scrollHeight, clientHeight } = this.box;
    this.box.scrollTop = scrollHeight - clientHeight;
  }

  //추가로 스크롤을 상단으로 올려주는 버튼도 추가해보았다. (scrollTop의 1 위치로 보내주도록)
  scrollToTop = () => {
    this.box.scrollTop = 1;
  }
 
  render(){
   ... 
  }
}
```

<br>

`ScrollToBottom` 메서드는 부모 컴포넌트인 App 컴포넌트에서 ScrollBox에 ref를 달면 사용할 수 있게 된다. 

주의 할 점으로는 문법상 `onClick = {this.scrollBox.scrollBottom}` 같은 형식으로 작성해도 틀린 것은 아니지만, 컴포넌트가 처음 렌더링 될 때는 `this.scrollBox` 값이 undefined이므로 `this.scrollBox.scrollBottom` 값을 읽어오는 과정에서 에러가 발생한다.

따라서 화살표 함수 문법을 사용하여 아예 새로운 함수를 만들고 구 내부에서 `this.scrollBox.scrollBottom` 메서드를 실행하면 버튼을 누를 때, 이미 한번 렌더링을 해서 `this.scrollBox`를 설정한 시점에 `this.scrollBox.scrollBottom`값을 읽어 와서 실행하므로 오류가 발생하지 않는다.


<br>

```
class App extends Component {
  render() {
    return (
      <div>
        {/* <ValidationSample/> */}
        <ScrollBox ref={(ref) => this.scrollBox=ref} />
        <button onClick={() => this.scrollBox.scrollToBottom()}> Scroll To Bottom </button>
         <button onClick={() => this.scrollBox.scrollToTop()}> Scroll To Top </button>
      </div>
    )
  }
}
```

<br>

이렇게 컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용한다. 먼저 ref를 사용하지 않고도 원하는 기능을 구현할 수 있는지 반드시 고려한 후에 활용하길 추천한다.

하지만 주의해야 할 점은 서로 다른 컴포넌트끼리 데이터를 교류해야 할 때 ref를 사용하면 잘못된 사용이다. 물론 할 수는 있지만 앱 규모가  커지면 구조가 꼬여 버려 유지보수가 불가능해진다.

컴포넌트끼리 데이터 교류를 할 때는 언제나 데이터를 부모와 자식의 흐름으로 교류해야 한다. 이는 리덕스 혹운 Context API를 사용하여 효율적으로 교류하는 방법을 배울 것이다.

함수형 컴포넌트에서는 useRef라는 Hook 함수를 사용하는데, 사용법은 React.createRef와 유사하다.

<br>
<br>
<br>
<br>


# 6. 컴포넌트 반복

<br>

## 6.1 자바스크립트 배열의 map() 함수

<br>

웹 애플리케이션을 만들다 보면 다음과 같이 반복되는 코드를 작성할 때가 있다. 아래 예시를 보면 `<li></li>` 태그가 반복되는데, 코드가 좀 더 복잡해지고 유동적이라면 절대로 관리하지 못할 것이다. 리액트 프로젝트에서 반복적인 내용을 효율적으로 보여 주고 관리하는 방법을 알아보자.

<br>

```
// IterationSample.js
import React from 'react';

const IterationSample = () => {
  return (
    <ul>
      <li>Snowman</li>
      <li>Ice</li>
      <li>Snow</li>
      <li>Wind</li>
    </ul>
  )
}

export default IterationSample;
```

<br>

자바스크립트 배열 객체의 내장 함수인 `map` 함수를 사용하여 반복되는 컴포넌트를 렌더링 할 수 있다. `map` 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성해준다.

<small>map : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map</small>

<br>
<br>

### 6.1.1 문법

<br>

`arr.map(callback, [thisArg])` 이 함수의 파라미터는 다음과 같다.

<br>

- callback : 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세 가지 이다.

  - currentValue : 현재 처리하고 있는 요소
  - index : 현재 처리하고 있는 요소의 index 값
  - array : 현재 처리하고 있는 원본 배열

<br>

- thisArg(선택항목): callback 함수 내부에서 사용할 this 레퍼런스

<br>
<br>

### 6.1.2 예제

<br>

```
const numbers = [1,2,3,4,5];
const result = numbers.map(function(num) {
  return num * num
})

console.log(result)    // (5) [1, 4, 9, 16, 25]
```

<br>

위 코드처럼 map 함수는 기존 배열로 새로운 배열을 만드는 역할을 한다.

<br>
<br>
<br>

## 6.2 데이터 배열을 컴포넌트 배열로 변환하기

<br>

이전 예시에서 기존 배열에 있는 값들을 제곱하여 새로운 배열을 생성했는데, 이와 똑같은 원리로 기존 배열의 컴포넌트로 구성된 배열을 생성할 수도 있다.

<br>
<br>

### 6.2.1 컴포넌트 수정하기

<br>

문자열로 구성된 배열을 선언한 후, 그 배열 값을 사용하여 `<li>...</li>` JSX 코드로 된 배열을 새로 생성한 후 nameList에 담아주었다.

map 함수에서 JSX를 작성할 때는 앞에서 다룬 예제처럼 DOM 요소를 작성해도 되고 컴포넌트를 사용해도 된다.

<br>

```
// IterationSample.js
import React from 'react';

const IterationSample = () => {
  const names = ['Snowman', 'Ice', 'snow', 'Wind'];
  const nameList = names.map((name) => <li>{name}</li>);
  return <ul>{nameList}</ul>
}

export default IterationSample;
```

<br>

위 파일을 App.js에서 렌더링하면, 원하는데로 렌더링은 되지만 콘솔에 "key" prop이 없다는 에러메세지가 뜨게 된다. 여기서의 key를 알아보도록 하자.

<br>
<br>
<br>

## 6.3 key

<br>

리액트에서 key는 컴포넌트 배열을 렌더링 했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용한다. 

예를 들어 유동적인 데이터를 다룰 때는 원소를 생성하거나 수정할 수도 있는데, key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다. 하지만 key가 있다면 이 값을 사용하여 변화를 더욱 빠르게 알아낼 수 있다.

<br>
<br>

## 6.3.1 key 설정

<br>

key 값을 설정할 때는 map 함수의 인자로 전달되는 함수 내부에서 컴포넌트를 props를 설정하듯이 설정해준다. key값은 언제나 유일해야 하기 때문에 데이터가 가진 고유의 값을 key 값으로 설정해야 한다.

<br>

```
const articleList = articles.map((article) => (
  <Article 
    title={article.title}
    writer={article.writer}
    key={article.id}
  />
))
```

<br>

예를 들어 위과 같이 게시판의 게시물을 렌더링한다면 게시물 번호를 key 값으로 설정해야 한다. 

하지만 앞에서 만들었던 예제 컴포넌트에는 이런 고유 번호가 없기 때문에 이때는 map 함수에 전달되는 콜백 함수의 인수인 `index` 값을 아래 처럼 사용하면 된다.

<br>

```
// IterationSample.js
...
const IterationSample = () => {
  const names = ['Snowman', 'Ice', 'snow', 'Wind'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>
}
```

<br>

위와 같이 수정하면 콘솔에 더이상 에러메세지가 뜨지 않게 된다. 고유한 값이 없을 때만 index 값을 key로 사용해야 한다. index를 key로 사용하면 배열이 변경될 때 효율적으로 리렌더링 하지 못한다.

<br>
<br>
<br>

## 6.4 응용하기

<br>

동적인 배열을 렌더링하는 코드를 구현해보자. 그리고 index 값을 key로 사용하면 리렌더링이 비효율적이라고 했는데, 이러한 상황에 어떻게 고유의 값을 만들 수 있는지도 알아보자.

<br>
<br>

### 6.4.1 초기 상태 설정하기

<br>
