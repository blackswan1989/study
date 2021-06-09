import React from 'react';
import PropTypes from 'prop-types'; // 4) 컴포넌트의 필수 props를 지정하거나 props 타입을 지정할 때 사용

//1) props 값은 컴포넌트 함수의 파라미터로 받아와서 사용할 수 있다.
//3) const {name, children} = props;와 같은 비구조화 할당(destructuring assignment) 문법은 함수의 파라미터 부분에서도 사용할 수 있다. 
//   아래의 경우 처럼 만약 함수의 파라미터가 객체라면 그 값을 바로 비구조화 해서 사용할 수 있다.
//   이를 통해 내부 값을 바로 추출하여 {props.name}처럼 props 키워드를 앞에 붙이지 않고 {name}만으로 사용 가능하다.
const MyComponent = ({name, children, favoriteNumber}) => {
  return (
    <div style={{fontSize:'48px', backgroundColor: 'black', color: 'aqua', padding: 16}}>
      Hello, My name is {name} <br/>
      children value is {children} <br/>
      My favorite Number is {favoriteNumber}
    </div>
  );
};

//2) App 컴포넌트에 name 값이 없을때 보여줄 default props 설정이 가능하다.
MyComponent.defaultProps = {
  name: 'Default Name'
}

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
}

export default MyComponent;

/* NOTE 
- props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소이다.
- props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트(현재 App 컴포넌트)에서 설정할 수 있다. 
*/