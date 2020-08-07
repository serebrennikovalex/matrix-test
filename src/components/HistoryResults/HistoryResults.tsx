import React from 'react';
import MatrixReadonlyTemplate from '../MatrixReadonlyTemplate/MatrixReadonlyTemplate';
import {TMatrix} from "../MatrixTemplate/MatrixTemplate";
import './HistoryResults.scss';

type THistoryData = ReadonlyArray<{
    init: TMatrix;
    result: TMatrix;
}>

const HistoryResults: React.FC = () => {
    const dataStorage = window.localStorage.getItem('history');
    const data: THistoryData = dataStorage ? JSON.parse(dataStorage) : [];

    if (!data.length) {
        return (
            <span>История пуста</span>
        );
    }

    return (
        <div className={'history-wrapper'}>
            <h3>История результатов</h3>
            {data.slice(-3).map((matrix, index) => (
                <div key={'matrix-readonly-' + index} className={'history-wrapper-row'}>
                   <MatrixReadonlyTemplate matrix={matrix.init} />
                   <MatrixReadonlyTemplate matrix={matrix.result} />
                </div>
            ))}
        </div>
    );
};

export default HistoryResults;
