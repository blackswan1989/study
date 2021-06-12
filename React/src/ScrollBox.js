import React, {Component} from 'react';

class ScrollBox extends Component {

  scrollToBottom = () => {
    // 아래 비구조화 할당 문법을 풀이하면 const scrollHeight = this.box.scrollHeight; 와 같다.
    const { scrollHeight, clientHeight } = this.box;
    this.box.scrollTop = scrollHeight - clientHeight;
  }

  scrollToTop = () => {
    this.box.scrollTop = 1;
  }

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