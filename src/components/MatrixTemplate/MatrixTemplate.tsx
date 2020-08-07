import React from "react";
import clsx from 'clsx';
import CellTemplate from '../CellTemplate/CellTemplate';
import CellHistoryTemplate from '../CellHistoryTemplate/CellHistoryTemplate';
import './MatrixTemplate.scss';

export type TEntry = 'in-row' | 'in-column' | 'in-row-column' | undefined;

export interface MatrixCountProps {
    entry?: TEntry;
    countInRow: number;
    countInColumn: number;
}

export type TMatrixCount = Array<Array<MatrixCountProps>>;

export type TMatrix = Array<Array<number>>;

interface MatrixTemplateProps {
    matrix: TMatrix;
    mode: string;
    countMatrix?: TMatrixCount;
    onEditableCell?: (value: number, columnIndex: number, rowIndex: number) => void;
    isResultData?: boolean;
}

const MatrixTemplate: React.FC<MatrixTemplateProps> = (props) => {
    const handleChange = (value: string, columnIndex: number, rowIndex: number) => {
        if (props.onEditableCell) {
            const val = parseInt(value, 10) || 0;

            props.onEditableCell(val, columnIndex, rowIndex);
        }
    };

    return (
        <div className={'matrix-wrapper'}>
            {props.matrix.map((row, rowIndex) => (
                <div className={'matrix-wrapper-row'} key={'row-' + rowIndex}>
                    {row.map((column, valueIndex) => {
                        const entityParams = props.countMatrix ? props.countMatrix[rowIndex][valueIndex] : undefined;

                        return (
                            <div
                                key={'column-' + valueIndex}
                                className={clsx('matrix-wrapper-cell-wrapper', {'is-result': props.isResultData})}
                            >
                                <CellTemplate
                                    value={column}
                                    entityParams={entityParams}
                                    isEditable={props.mode === 'manual'}
                                    onChangeCell={(val) => handleChange(val, rowIndex, valueIndex)}
                                />
                                <div className={'matrix-wrapper-cell-history'}>
                                    <CellHistoryTemplate
                                        value={column}
                                        entityParams={entityParams}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
};

export default MatrixTemplate;
