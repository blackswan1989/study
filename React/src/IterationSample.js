import React, {useState} from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: 'Snowman' },
    { id: 2, text: 'Ice' },
    { id: 3, text: 'Snow' },
    { id: 4, text: 'Wind' }
  ]);

  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);    // 새로운 항목을 추가할 때 사용할 id
  
  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,           // 1) nextId 값을 id로 설정하고
      text: inputText
    });

    setNextId(nextId + 1);  // 2) nextId 값에 1을 더해 준다.
    setNames(nextNames);    // 3) names 값을 업데이트 해준다.
    setInputText('');       // 4) inputText를 비워 준다.
  }

  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
    console.log(nextNames);
  }

  const nameList = names.map((name) => 
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}> {name.text} </li>
  );

  return (
    <div style={{padding:'30px'}}>
      <ul>{nameList}</ul>
      <input value={inputText} onChange={onChange}></input>
      <button onClick={onClick}>Add</button>
    </div>
  )
}

export default IterationSample;