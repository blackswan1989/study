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
          onClick={ () => {
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