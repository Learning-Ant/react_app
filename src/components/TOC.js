import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        var data = this.props.data;
        var lists = [];
        data.forEach(element => {
            lists.push(
                <li key={element.id} >
                    <a
                        href={"/content/" + element.id}
                        // data-{이름} : dataset 안에 "이름"이라는 명칭으로 저장되는 프로퍼티
                        // 속성을 이용한 방법임
                        // data-id={element.id}
                        onClick={function (id, e) {
                            e.preventDefault();
                            this.props.onChangePage(id);
                        }.bind(this, element.id)}
                    >{element.title}</a>
                </li>);
        });
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;