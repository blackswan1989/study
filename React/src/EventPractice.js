import React, { Component } from 'react';

class EventPractice extends Component {
	state = {
		message: ''
	}

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleClick() {
    alert(this.state.message);
    this.setState({
      message: ''
    })
  }

	render() {
		return (
			<div>
				<h1>Event Practice</h1>
				<input
					type="text"
					name="message"
					placeholder="Please enter text"
					value={this.state.message}		// state에 인풋 텍스트를 담아주도록
					onChange={this.handleChange}
				/>
				<button onClick={this.handleClick}> 확인 </button>
			</div>
		)
	}
}

export default EventPractice;