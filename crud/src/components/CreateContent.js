import React, { Component } from 'react';

class ReadContent extends Component {
    render() {
        return (
            <article>
                <h2>Create</h2>
                <form action="/create_process" method="post"
                    onSubmit={function (e) {
                        e.preventDefault();
                        this.props.onSubmit(e.target.title.value, e.target.desc.value);
                    }.bind(this)}
                >
                    <p>
                        <input type="text" name="title" placeholder="title" />
                    </p>
                    <p>
                        <textarea rows="5" cols="40" name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit" value="작성" />
                    </p>
                </form>
            </article>
        );
    }
}

export default ReadContent;