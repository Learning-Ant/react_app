import React, { Component } from 'react';
import Subject from "./components/Subject"
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Control from "./components/Control"
import './App.css';

// 리턴되는 것은 최상위 노드는 항상 하나만 존재해야한다.
// App이라는 클래스 내부에서 사용할 정보들은 state로써 저장한다
class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'world wide web' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }
  getReadContent() {
    // this.state.contents.forEach(content => {
    //   if (content.id === this.state.selected_content_id) {
    //     return content;
    //   }
    // })
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i]
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i += 1;
    }
  }
  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id += 1;
        // 기존 state를 직접적으로 변경하는 것보단
        // 기존에 새로운 데이터를 추가한 데이터를 반환받아 사용하는 것이 좋다.
        var _contents = this.state.contents.concat(
          { id: this.max_content_id, title: _title, desc: _desc }
        );
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while (i < _contents.length) {
          if (_contents[i].id === _id) {
            _contents[i] = { id: _id, title: _title, desc: _desc };
            break;
          }
          i += 1;
        }
        this.setState({
          contents: _contents,
          mode: 'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        // 사용자 정의 이벤트 설치  
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            })
          }.bind(this)}
          data={this.state.contents}
        ></TOC >
        <Control onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm("삭제 하시겠습니까?")) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i += 1;
              }
              this.setState({
                mode: 'welcome',
                contents: _contents
              });
              alert('삭제되었습니다');
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div >
    );
  }
}
export default App;
