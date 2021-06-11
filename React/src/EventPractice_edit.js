import React, {Component} from 'react';

class EventPracticeEdit extends Component {
  state = {
    // 디폴트 메세지
    username:'',
    message:''
  }

  handleChange = (e) => {
    // `e.target.name`은 해당 인풋의 name을 가리킨다. 이 값을 사용하여 state를 설정하면 쉽게 해결할 수 있다.
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message);
    this.setState({
      // 버튼 클릭 이후 초기화를 시켜준다.
      username:'',
      message:''
    })
  }

  render() {
    return (
      <div>
        <h1>Event Practice "[e.target.name]"</h1>
        <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={this.handleChange}/>
        <input type="text" name="message" placeholder="Text Enter" value={this.state.message} onChange={this.handleChange}/>
        <button onClick={this.handleClick}> 확인 </button>
      </div>
    )
  }
}

export default EventPracticeEdit;