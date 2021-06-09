<br>

# 1. 리액트란

<br>
<br>

## 1.1 리액트 이해하기

<br>

MVC는 사용자 인터페이스, 데이터 및 논리 제어를 구현하는데 널리 사용되는 소프트웨어 디자인 패턴이다. 소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있다.

MVC에 기반을 둔 몇 가지 다른 디자인 패턴으로 MVVM (모델-뷰-뷰모델), MVP (모델-뷰-프리젠터), MVW (모델-뷰-왓에버)가 있다.

- Model: 어플리케이션에서 사용하는 데이터를 관리하는 영역.
- View: 사용자에게 보여지는 부분으로 사용자로부터 버튼 클릭, 텍스트 입력 등의 작업을 받게 된다.
- Controller: 사용자로부터 어떤 작업을 받게 되면 모델 데이터를 조회 하거나 수정하고 변경된 사항을 View에 반영한다.

<br>

리액트는 javascript 라이브러리로 사용자 인터페이스를 만드는 데 사용한다. 구조가 MVC, MVW 등인 프레임워크들과 달리 오직 View만 신경쓰는 라이브러리라고 할 수 있다.

리액트에서 컴포넌트는 특정부분이 어떻게 생길지 정하는 선언체로, 다른 프레임워크에서 사용자 인터페이스를 다룰 때 사용하는 템플릿과는 다른 개념이다.

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


// 2) 부모 요소로 감싸주어야 error가 발생하지 않는다.

import React, {Fragment} from 'react';

function App() {
  return (
    <>
      <h1>hello react</h1>
      <h2>Fragment test</h2>
    </>
  );
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
		padding: 16 								// 단위를 생략하면 px로 지정된다.
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