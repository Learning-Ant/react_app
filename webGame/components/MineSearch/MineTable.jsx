import React, { memo, useContext } from 'react';
import MineTr from './MineTr';
import { TableContext } from './MineSearch';

const MineTable = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <table className="mine">
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => <MineTr key={i} className="mine" rowIndex={i} />)}
            </tbody>
        </table>
    )
});

export default MineTable;