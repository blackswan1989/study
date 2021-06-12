import React, { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component {
  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = (e) => {
      this.setState({
      password: e.target.value
    });
  }

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    });

    this.input.focus()
  }

  render() {
    return (
      <div className="input_box">
        <input 
          type="password" 
          ref={(ref) => this.input=ref}
          value={this.state.password} 
          onChange={this.handleChange} 
          className={this.state.clicked ? (this.state.validated ? 'success' : 'fail') : ''}/>

        <button onClick={this.handleButtonClick}> Validate </button>
      </div>
    )
  }
}

export default ValidationSample;