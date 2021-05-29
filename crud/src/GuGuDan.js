import React /* { Component } */ from 'react';

// Hooks
const GuGuDan = () => {
    // 구조 분해 할당(Destructuring)
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');
    // ref
    const inputRef = React.useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setResult('정답 : ' + value);
            // 위 방법도 가능하지만 이전에 작성했던 class형에서와 같이 prevState와 같은 방식으로도 가능하다
            // setResult((prevResult) => {
            //     return '정답 : ' + value;
            // });
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            // 이렇게 state값들을 바꾸는 set이 각 state값마다 호출된다.
            // 이러면 렌더링이 계속일어나지 않나싶지만 React는 위의 set들을
            // 한번에 모아서 비동기적으로 처리한다.
            // 공식문서에 모두 나와 있는 내용
            // 항상 공식문서 참고를 생활화하자.
        } else {
            setResult('땡');
            setValue('');
        }
        // hooks에서 ref 사용
        inputRef.current.focus();
    }
    return (
        <>
            <div>{first} 곱하기 {second} 는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value} />
                <button>입력</button>
            </form>
            <div id="result">{result}</div>
        </>
    )

}
/*
// class형 Componenet
class GuGuDan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
            value: '',
            result: '',
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                // 이전의 값을 써야 할 때는
                // setState가 비동기 인점을 감안해
                // 예전 값을 인자로 받는 함수를 사용하는 방법을
                // 사용해야 한다.
                return {
                    result: '정답 : ' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: ''
                }
            });
        } else {
            this.setState({
                result: '땡',
                value: ''
            });
        }
        // f-3. 해당 객체의 input에 focus()를 실행하면 focus가 된다.
        this.input.focus();
    }
    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    // f-2. class내부에 선언해준 후
    input;

    render() {
        return (
            <React.Fragment>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input
                        // f-1. focus를 사용하려고 하면
                        ref={(c) => { this.input = c; }}
                        type="number"
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </React.Fragment>
        )
    }
}
*/
export default GuGuDan;