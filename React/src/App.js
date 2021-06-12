import React, { Component } from 'react';
// import MyComponent from './MyComponent'
// import Counter from './Counter';
// import CounterEdit from './Counter_edit';
// import Say from './Say';
// import EventPractice from './EventPractice';
// import EventPracticeEdit from './EventPractice_edit';
import ValidationSample from './ValidationSample';

// const App = () => {
//   return <MyComponent name={"Kate"} favoriteNumber={2}> React </MyComponent>;
//   return <Counter></Counter>;
//   return <CounterEdit></CounterEdit>;
//   return <Say/>;
//   return <EventPractice/>
//   return <EventPracticeEdit/>
//   return <ValidationSample/>
// }

class App extends Component {
  render() {
    return (
      <ValidationSample/>
    )
  }
}

export default App;

