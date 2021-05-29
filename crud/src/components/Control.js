import React, { Component } from 'react'

/*
    바인드에 대해
    위의 상화에서 bind(this)를 하면 App이라는 컴포넌트가 this로 함수 내부에 주입된다.
    그렇기에 function안에서 this.setState()함수로 직접 state의 값을 변경하는 것이다.
*/
class Control extends Component {
    render() {
        return (
            <ul>
                <li><a href="/create" onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)} >create</a></li>
                <li><a href="/update" onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}>update</a></li>
                <form>
                    <input onClick={function (e) {
                        e.preventDefault();
                        this.props.onChangeMode('delete');
                    }.bind(this)} type="button" value="delete" />
                </form>
            </ul>
        );
    }
}

export default Control;