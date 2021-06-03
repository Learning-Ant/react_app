import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers'); // 반복실행 확인
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

// Hooks는 re-rendering 시 전체를 다시 실행하게 된다.
// 그렇기에 getWinNumbers 함수가 계속 실행되는데, 이를 방지하기 위해 
// 캐싱개념의 useMemo를 사용한다.
// Hooks를 사용할 때는 각 함수마다 console.log를 사용해
// 진정 필요할 때만 실행이 되는지 확인하는 것을 추천

// useMemo: 복잡한 함수 리턴을 기억
// useRef : 일반 값 기억
// useCallBack : 함수 자체를 기억
const Lotto_hooks = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    // componentDidMount만 ajax 요청을 하고 싶을 때
    // 즉, 컴포넌트가 생성될때만 요청
    // useEffect(() => {
    //     // ajax code
    // }, []); // 이렇게 빈 배열을 두번째 인자로 넘겨주면 된다.

    // componentDidUpdate에서 ajax요청을 하고 싶을 때
    // 즉, 어떤 State가 변경되는 것을 감지해 ajax 요청
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if(!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         // ajax code
    //     }
    // }, [바뀌는 State]); // componentDidUpdate만 실행, DidMount는 실행되지 않는다.
    // 약간의 꼼수

    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 500);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 3500);
        return () => {  // componentWillUnmount
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // inputs 자리가 빈 배열이면 componentDidMount와 동일
    // 배열의 요소가 있으면 componentDidMount와 componentDidUpdate 모두 수행
    // timeouts.current는 onClickRedo일때만 바뀌는 것이다.
    // useEffect의 timeouts는 참조객체가 바뀌지 않는다.
    // onClickRedo에서는 참조 객체가 교체된다. 이 때를 변화로 인식한다.

    // useCallBack에서 사용하는 State는 두번째 인자로 전달해주어야 한다.
    // 자식 component에 함수를 넘겨줄 때는 useCallback을 사용해야한다.
    // props로 넘겨줄 때 함수가 새로 생성되는데, 이렇게되면 자식 component는 props가
    // 계속해서 바뀌는 것으로 인식되고, 이로인한 쓸데없는 re-rendering이 일어난다.
    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );


}

export default Lotto_hooks;