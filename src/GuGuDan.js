import React, { Component } from 'react';

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

export default GuGuDan;