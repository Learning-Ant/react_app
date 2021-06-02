import React, { Component, useState, useRef, useEffect, memo } from 'react';

//                ┌────────┐
//                │ result │ imgCoord    score
// ┌──────────────┼────────┼──────────────────┐
// │comDidMount   │        │                  │ class
// └──────────────┼────────┼──────────────────┘
// comDidUpdate   │        │
// comWillUnmnt   │        │
//                └────────┘
//                   hooks

const rspCoord = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoord).find(function (v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP_hooks = memo(() => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoord.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // hooks는 class에서는 render()가 다시 실행되는 것과 달리
    // 모든 부분이 rednering되므로 useEffect가 계속 실행된다.
    useEffect(() => { // componenetDidMount, componenetDidUpdate 역할(1:1 대응은 아님)
        interval.curret = setInterval(changeHand, 100);
        return () => { // componenetWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]); // 2번째 parameter -> closure
    // imgCoord가 바뀔 때마다 useEffect가 실행된다.

    // 각 State마다 원하는 로직을 useEffect로 적용시킬 수 있다.
    // 즉 useEffect 중복 사용

    const changeHand = () => {
        if (imgCoord === rspCoord.바위) {
            setImgCoord(rspCoord.가위);
        } else if (imgCoord === rspCoord.가위) {
            setImgCoord(rspCoord.보);
        } else if (imgCoord === rspCoord.보) {
            setImgCoord(rspCoord.바위);
        }
    };

    const onClickBtn = (choice) => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다.');
            setScore((prevScore) => {
                return prevScore + 1;
            });
        } else {
            setResult('졌습니다.');
            setScore((prevScore) => {
                return prevScore - 1;
            });
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    }

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );

});
export default RSP_hooks;