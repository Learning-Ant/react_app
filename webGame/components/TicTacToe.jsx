import React, { useState, useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

// useReducer의 등장

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME:
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1],
            };
    }

};

// dispatch에는 action이 전달되고, action이 실행될 때 마다
// reducer가 실행된다.
// 어떻게 바꿀지를 reducer에서 작성(return 객체로)


const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { winner, tableData, turn, recentCell } = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [TableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            // 초기화했을 때는 useEffect의 실행을 막는다.
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        if (win) { // 승리시
            console.log('set_winner');
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true; // all이 true면 무승부
            tableData.forEach((row) => {
                row.forEach(cell => {
                    if (!cell) {
                        all = false;
                    }
                })
            })
            if (all) {
                console.log('reset_game');
                dispatch({ type: RESET_GAME });
            } else {
                console.log('change_turn');
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]); // tableData가 바꼈을 때 실행

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
        </>
    );
};

export default TicTacToe;