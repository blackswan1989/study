import React, { useState } from 'react';

const Say = () => {
  // useState('');는 기본 메세지
  // 함수를 호출하면 배열이 반환되는데 배열의 첫 번째 원소는 현재 상태이고,
  // 두번째 원소는 상태를 바꾸어 주는 함수이다. 이 함수를 세터(Setter) 함수라고 부른다.
  const [message, setMessage] = useState('Click button');
  const onClickEnter = () => setMessage('Hello!');
  const onClickLeave = () => setMessage('Goodbye!');

  const [color, setColor] = useState('pink');

  return (
    <div>
      <button onClick={onClickEnter}> Enter </button>
      <button onClick={onClickLeave}> Leave </button>
      <h1 style={{ color }}>{message}</h1>

      <button style={{ color: 'red' }} onClick={() => setColor('red')}> Red </button>
      <button style={{ color: 'green' }} onClick={() => setColor('green')}> Green </button>
      <button style={{ color: 'blue' }} onClick={() => setColor('blue')}> Blue </button>
    </div>
  );
};

export default Say;