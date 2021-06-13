import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number : 0,
    color: null,
  }

  myRef = null; // ref를 설정할 부분

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  // props로 받아 온 값을 state에 동기화시키는 용도로 사용, 컴포넌트가 마운트될 때와 업데이트될 때 호출 된다.
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');

    if(nextProps.color !== prevState.color) // 새로 설정될 컬러 !== 이전의 컬러
    {
      return { color: nextProps.color };
    }

    return null;
  }

  // componentDidMount는 컴포넌트를 만들고 첫 렌더링을 다 마친 후 실행
  componentDidMount() {
    console.log('componentDidMount');
  }

  // props 또는 state를 변경했을 때 리렌더링을 시작할지 여부를 지정하는 메서드로, 반드시 true 값이나 false 값을 반환
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링 하지 않도록 설정
    return nextState.number % 10 !== 4;
  }

  //컴포넌트를 DOM에서 제거할 때 실행. 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 한다.
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  // 주로 업데이트 하기 직전의 값을 참고할 일이 있을 때 활용, render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출 된다.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if(prevProps.color !== this.props.color)
    {
      return this.myRef.style.color;
    }

    return null;
  }

  // 리렌더링을 완료한 후 실행된다. `prevProps`, `prevState`를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수있다.
  // `componentDidUpdate`에서 반환한 값이 있다면 여기서 `snapshot` 값을 전달받을 수 있다.
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState)

    if(snapshot)
    {
      console.log('업데이트되기 직전의 색상: ', snapshot);
    }
  }

  render() {
    console.log('render');

    const style = {
      color: this.props.color
    };


    // render함수에서 에러는 주로 존재하지 않는 함수를 사용하거나 존재하지 않는 객체의 값을 조회할때 발생된다.
    // {this.props.missing.value}로 의도적인 에러를 발생시켜 보았다. 이 에러를 잡아주는 ErrorBoundary 컴포넌트 참조
    return (
      <div>
        {/* {this.props.missing.value} */}
        <h1 style={style} ref={ref => this.myRef=ref}>{this.state.number}</h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    )
  }
}

export default LifeCycleSample;


/*
이 컴포넌트는 각 라이프사이클 메서드를 실행할 때 마다 콘솔 디버거에 기록하고, 
부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 `state.number` 값을 1씩 더해준다.

`getDerivedStateFromProps`는 부모에게서 받은 color 값을 state에 동기화하고 있다.
그리고 `getSnapshotBeforeUpdate`는 DOM에 변화가 일어나기 직전의 색상 속성을 
`snapshot`값으로 변환하여 이것을 `componentDidUpdate`에서 조회할 수 있도록 했다.

추가로 `shouldComponentUpdate` 메서드에서 `state.number` 값의 
마지막 자리 수가 4가 되면 리렌더링이 취소되도록 설정했다.
*/