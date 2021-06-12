import React from 'react';

const IterationSample = () => {
  const names = ['Snowman', 'Ice', 'snow', 'Wind'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>
}

// const articleList = articles.map(article => (
//   <Article 
//     title={article.title}
//     writer={article.writer}
//     key={article.id}
//   />
// ))

export default IterationSample;