const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./components/WordRelay');
import NumberBaseball from './components/NumberBaseball';
import ResponseCheck from './components/ResponseCheck';
import RSP from './components/RSP';
import Lotto from './components/Lotto';

ReactDom.render(
    <>
        <WordRelay />
        <br />
        <br />
        <NumberBaseball />
        <br />
        <br />
        <ResponseCheck />
        <br />
        <br />
        <RSP />
        <br />
        <br />
        <Lotto />
    </>,
    document.querySelector('#root')
);
// jsx는 js문법이 아니다.
// 그렇기에 추가해주었던 것이 바벨인데, 이런 설정을 webpack에도 설정을 해주어야한다.
// 이제 바벨을 인스톨해본다.
// @babel/core - 바벨의 기본적인 것이 들어있음
// @babel/preset-env - 각자의 브라우저에 맞게 최신문법을 예전 문법으로 바꿔줌
// @babel/preset-react - jsx를 지원
// babel-loader - babel과 webpack 연결