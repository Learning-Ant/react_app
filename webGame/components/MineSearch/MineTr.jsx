import React, { memo, useContext } from 'react';
import MineTd from './MineTd';
import { TableContext } from './MineSearch';

const MineTr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <MineTd key={i} rowIndex={rowIndex} cellIndex={i} />)}
        </tr>
    );
});

export default MineTr;