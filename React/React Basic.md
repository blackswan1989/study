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

## 4.2.1 `onChange` 이벤트 핸들링하기

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

## 4.2.2 `state`에 input 값 담기

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

	render() {
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
                console.log(message);
							})
						}
					}
				>
				</input>
			</div>
		)
	}
}

export default EventPractice;
```
