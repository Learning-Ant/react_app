import React, { Component } from 'react';

// class의 경우
// constructor -> render -> ref -> componentDidMount
// -> {setState/props} 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate
// 부모가 자식 컴포넌트를 없앨 때 -> componentWillUnmount -> 소멸

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

class RSP extends Component {
    state = {
        result: '',
        imgCoord: rspCoord.바위,
        score: 0,
    };

    interval;

    // render가 성공적으로 실행됐다면 componentDidMount()가 실행된다.
    // re-rendering시에는 실행되지 않는다.
    // 보통 비동기 요청을 여기에 많이 작성한다.
    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    // re-rendering 후 실행
    // componentDidUpdate() {

    // }

    // component가 제거되기 직전 실행
    // 비동기 요청 정리를 여기서 많이 작성한다.
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoord.바위) {
            this.setState({
                imgCoord: rspCoord.가위
            });
        } else if (imgCoord === rspCoord.가위) {
            this.setState({
                imgCoord: rspCoord.보
            });
        } else if (imgCoord === rspCoord.보) {
            this.setState({
                imgCoord: rspCoord.바위
            });
        }
    }

    // pattern () => () => {}
    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1,
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다',
                    score: prevState.score - 1,
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    }

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;