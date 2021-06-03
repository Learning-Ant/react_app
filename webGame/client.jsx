const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./components/WordRelay');
import NumberBaseball from './components/NumberBaseball';
import ResponseCheck from './components/ResponseCheck';
import RSP from './components/RSP';
import Lotto from './components/Lotto';
import TicTacToe from './components/TicTacToe';
// import Lotto_hooks from './components/Lotto_hooks';

ReactDom.render(
    <>
        <h1>끝말잇기</h1>
        <WordRelay />
        <br />
        <br />
        <h1>숫자야구</h1>
        <NumberBaseball />
        <br />
        <br />
        <h1>반응속도 체크</h1>
        <ResponseCheck />
        <br />
        <br />
        <h1>가위바위보</h1>
        <RSP />
        <br />
        <br />
        <h1>로또번호 생성기</h1>
        <Lotto />
        {/* <Lotto_hooks /> */}
        <br />
        <br />
        <h1>Tic Tac Toe</h1>
        <TicTacToe />
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