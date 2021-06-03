import React, { useCallback, memo } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';


const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    // 최적화할 때 사용할 수 있는 방법
    // 어떤 props가 변경될 때 렌더링이 발생하는지 확인
    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    //     console.log(cellData, ref.current[3]);
    //     ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // }, [rowIndex, cellIndex, dispatch, cellData]);

    const onClickTd = useCallback(() => {
        if (cellData) {
            return;
        }
        console.log('click_cell');

        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;