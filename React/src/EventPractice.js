import React, { Component } from 'react';

class EventPractice extends Component {
	state = {
		message: ''
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
					onChange={
						(e) => {
							this.setState({
								message: e.target.value
							})
						}
					}
				>
				</input>

				<button
					//4.2.2.3
				>
				</button>
			</div>
		)
	}
}

export default EventPractice;