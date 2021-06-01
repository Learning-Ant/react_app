import React, { PureComponent } from 'react';

class Try extends PureComponent {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     PureComponent의 커스터마이징이 가능
    // }
    render() {
        const { tryInfo } = this.props
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

// Hooks
// Hooks에서의 shouldComponentUpdate -> memo
// const Try = memo(({tryInfo}) => {
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li>
//     );
// });

export default Try;