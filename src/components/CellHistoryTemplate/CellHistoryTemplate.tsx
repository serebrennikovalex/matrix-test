import React from "react";
import {MatrixCountProps} from "../MatrixTemplate/MatrixTemplate";
import {calculatedValue, getCalculatedValue} from '../../helper';
import './CellHistoryTemplate.scss';

export interface CellHistoryProps {
    value: number;
    entityParams?: MatrixCountProps;
}

const CellHistoryTemplate: React.FC<CellHistoryProps> = (props) => {
    const {value, entityParams} = props;
    let result = value;
    let history = 'без изменений';
    let percent = 0;

    if (entityParams) {
        result = calculatedValue(entityParams, value);
        history = getCalculatedValue(entityParams, value);
        percent = (result * 100 / value) - 100;
    }

    return (
        <div className={'cell-history-wrapper'}>
            <span>Значение было: {value}</span>
            <span>Значение стало: {result}</span>
            <span>Ход вычислений: {history}</span>
            <span>Процент увеличения: {percent < 0 ? 0 : percent}</span>
        </div>
    );
};

export default CellHistoryTemplate;
