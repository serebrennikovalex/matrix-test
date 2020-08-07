import React from "react";
import CellTemplate from '../CellTemplate/CellTemplate';
import {TMatrix} from '../MatrixTemplate/MatrixTemplate';
import '../MatrixTemplate/MatrixTemplate.scss';

interface MatrixTemplateProps {
    matrix: TMatrix;
}

const MatrixReadonlyTemplate: React.FC<MatrixTemplateProps> = (props) => {
    return (
        <div className={'matrix-wrapper'}>
            {props.matrix.map((row, rowIndex) => (
                <div className={'matrix-wrapper-row'} key={'row-' + rowIndex}>
                    {row.map((column, valueIndex) => {
                        return (
                            <div
                                key={'column-' + valueIndex}
                                className={'matrix-wrapper-cell-wrapper'}
                            >
                                <CellTemplate
                                    value={column}
                                    isEditable={false}
                                />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
};

export default MatrixReadonlyTemplate;
