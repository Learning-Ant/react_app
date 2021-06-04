import React, { useReducer, createContext, useMemo } from 'react';
import MineTable from './MineTable';
import Form from './Form';

// Context API

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => { },
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    // 지뢰 후보 뽑기
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    // 지뢰판 만들기
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 지뢰심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL'

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];

            const checkArround = (row, cell) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { // 상하좌우 칸이 아닌 경우 필터링
                    return;
                }
                if (checked.includes(row + ',' + cell)) { // dp. 이미 검사한 칸인지 검사
                    return;
                } else {
                    checked.push(row + ',' + cell);
                }
                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];
                if (tableData[row - 1]) {
                    around = around.concat(tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]);
                }
                if (tableData[row + 1]) {
                    around = around.concat(tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]);
                }
                const count = around.filter((v) => [CODE.MINE, CODE, FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                if (count === 0) {
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 > tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.filter(v => !!v).forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkArround(n[0], n[1]);
                            }
                        });
                    }
                }
                tableData[row][cell] = count;
            };
            checkArround(action.row, action.cell);
            return {
                ...state,
                tableData,
            }
        }
        case CLICK_MINE:
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        case FLAG_CELL:
            const tableData1 = [...state.tableData];
            tableData1[action.row] = [...state.tableData[action.row]];
            if (tableData1[action.row][action.cell] === CODE.MINE) {
                tableData1[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData1[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData1,
            }
        case QUESTION_CELL:
            const tableData2 = [...state.tableData];
            tableData1[action.row] = [...state.tableData[action.row]];
            if (tableData2[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData2[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData2[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData2,
            }
        case NORMALIZE_CELL:
            const tableData3 = [...state.tableData];
            tableData3[action.row] = [...state.tableData[action.row]];
            if (tableData3[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData3[action.row][action.cell] = CODE.MINE;
            } else {
                tableData3[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData3,
            }

        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => {
        { tableData, halted, dispatch };
    }, [tableData, halted]);

    return (
        // 묶어줘야 아래 컴포넌트들이 데이터에 접근이 가능하다.
        // 하지만 아래처럼 value에 객체형태로 전달하게 되면 매번 새로운 객체를 전달하게 되므로
        // 이 값을 따로 캐싱해주어야 한다.(useMemo사용)
        // <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <MineTable />
            <div>{result}</div>
        </TableContext.Provider>
    );
}

export default MineSearch;