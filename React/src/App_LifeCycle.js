import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LifeCycleSample from './LifeCycleSample';

// 랜덤 color 생성 (16777215를 hex로 표현하면 ffffff가 되어 해당 코드는 000000 부터 ffffff값을 반환해준다.)
function getRandomColor() {
  let randomColorMath = '#' + Math.floor(Math.random() * 16777215).toString(16);
  console.log(randomColorMath);
  return randomColorMath;
}

class AppLifeCycle extends Component {
  state = {
    color: '#000000'
  }

  handleClick = () => {
    this.setState({
      color: getRandomColor()
    })
  }

  // 1) render 내부의 버튼을 렌더링하고 클릭 할 때마다 handleClick 메서드가 호출되도록 이벤트를 설정하여
  //    불러온 LifeCycleSample 컴포넌트에 color 값을 props 로 설정했다.
  // 2) <LifeCycleSample> 컴포넌트는 에러를 잡아주는 코드를 넣은 <ErrorBoundary>로 감싸준다.
  render() 
  {
    return(
      <div>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color}/>
        </ErrorBoundary>
        <button onClick={this.handleClick}>Random Color</button>
      </div>
    )
  }
}

export default AppLifeCycle;

