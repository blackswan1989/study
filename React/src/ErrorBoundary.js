import React, {Component} from 'react';

class ErrorBoundary extends Component {
  state = {
    error: false
  }

  // `error`는 파라미터에 어떤 에러가 발생했는지 알려 주고 `info` 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 넘겨준다.
  // 자신의 `this.props.children`으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다.
  // 에러가 발생하면 componentDidCatch 메서드가 호출되며 this.state.error 값을 true로 업데이트 시켜준다.
  componentDidCatch(error, info) {
    this.setState({
      error: true
    });

    console.log({error, info})
  }

  render() {
    // this.state.error 값이 true가 되면 에러 문구를 보여준다.
    if(this.state.error) return <div>페이지에 에러가 발생했습니다.</div>
    return this.props.children;
  }
}

export default ErrorBoundary;