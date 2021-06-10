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
            // 1) `fixedNumber` 추가 후 `this.setState` 함수를 사용할 때 인자로 전달되는 개체 내부에 `fixedNumber`를 넣어주지는 않는다. `this.setState` 함수는 인자로 전달된 객체 안에 들어 있는 값만 바꾸어 준다.
            // 2) `this.setState`를 두번 작성해도 버튼을 클릭할 때 숫자가 1씩 더해지는데 `this.setState`를 사용한다고 해서 `state` 값이 바뀌지는 않기 때문이다.
            // this.setState({number: number + 1});
            // this.setState({number: this.state.number + 1});

            // 2)에 대한 해결책으로 아래의 코드처럼 객체 대신에 함수를 인자로 넣어주는것이다.
            //   `this.setState((prevState, props) => {...}`에서 `prevState`는 기존 상태이고 `props`는 현재 지니고 있는 `props`를 가리킨다. 만약 업데이트 하는 과정에서 `props`가 필요하지 않다면 생략해도 된다.
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
          // 3) setState를 사용하여 값을 업데이트 하고 난 다음에 특정 작업을 하고 싶을 때는 setState의 두 번째 파라미터로 콜백 함수를 등록하여 작업을 처리할 수 있다.
          onClick={() => {
            this.setState(
              {
                number: number + 1
              },
              () => {
                console.log('state가 호출되었다.')
                console.log(this.state);            // {number: 1, fixedNumber: 0} 출력되며 버튼을 클릭할때마다 number값도 갱신되며 출력된다.
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