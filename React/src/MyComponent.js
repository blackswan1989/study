import React, {Component} from 'react';
import PropTypes from 'prop-types'; // 4) 컴포넌트의 필수 props를 지정하거나 props 타입을 지정할 때 사용

class MyComponent extends Component {
  static defaultProps = {
    name: 'Default Name' 
  };

  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
  };

  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당(destructuring assignment)

    return (
      <div style={{fontSize:'48px', backgroundColor: 'black', color: 'aqua', padding: 16}}>
        Hello, My name is {name} <br/>
        children value is {children} <br/>
        My favorite Number is {favoriteNumber}
      </div>
    )
  }
}

export default MyComponent;