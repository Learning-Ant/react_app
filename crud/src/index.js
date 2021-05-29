import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GuGuDan from './GuGuDan';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <br />
    <br />
    <br />
    <h2>구구단 게임</h2>
    <GuGuDan />
  </React.StrictMode>,
  document.getElementById('root')
);
// 함수형 컴포넌트에서도 state와 ref를 사용할 수 있도록 나온 것이 hooks

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
