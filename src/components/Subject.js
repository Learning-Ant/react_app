import React, { Component } from 'react'

/*
    바인드에 대해
    위의 상화에서 bind(this)를 하면 App이라는 컴포넌트가 this로 함수 내부에 주입된다.
    그렇기에 function안에서 this.setState()함수로 직접 state의 값을 변경하는 것이다.
*/
class Subject extends Component {
    render() {
        return (
            <header>
                <h1><a href="/" onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangePage();
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;