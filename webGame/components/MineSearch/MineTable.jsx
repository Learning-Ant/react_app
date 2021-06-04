import React, { useContext } from 'react';
import MineTr from './MineTr';
import { TableContext } from './MineSearch';

const MineTable = () => {
    const { tableData } = useContext(TableContext);
    return (
        <table className="mine">
            {Array(tableData.length).fill().map((tr, i) => <MineTr key={i} className="mine" rowIndex={i} />)}
        </table>
    )
};

export default MineTable;