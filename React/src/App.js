import React, { Fragment } from 'react';


// App 이라는 컴포넌트를 만들어주며 function 키워드를 사용하여 함수형 컴포넌트를 만들었다.
// 프로젝트에서 컴포넌트를 렌더링하면 함수에서 반환하고 있는 내용을 나타낸다. 
// 함수에서 반환해주는 내용을보면 HTML 같지만, 이러한 코드를 JSX라고 부른다.
function App() {
  const name = 'react';
  
  return (
    <>
      <h1>{name} Hello!</h1>
      <h2>Javascript test</h2>
    </>
  )
}

export default App;

