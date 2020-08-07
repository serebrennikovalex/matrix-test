import React from "react";
import clsx from "clsx";
import {MatrixCountProps} from '../MatrixTemplate/MatrixTemplate';
import {getEntryClassName, calculatedValue} from '../../helper';
import './CellTemplate.scss';

export interface CellProps {
    value: number;
    isEditable?: boolean;
    entityParams?: MatrixCountProps;
    onChangeCell?: (value: string) => void;
}

const CellTemplate: React.FC<CellProps> = (props) => {
    const {entityParams, onChangeCell} = props;
    const entry = entityParams ? getEntryClassName(entityParams) : undefined;
    const value = entityParams ? calculatedValue(entityParams, props.value) : props.value;

    return (
        <div className={'matrix-wrapper-column'}>
            <span
                className={clsx(
                    'matrix-wrapper-value',
                    {
                        'is-row': entry === 'in-row',
                        'is-column': entry === 'in-column',
                        'is-row-column': entry === 'in-row-column',
                    }
                )}
                contentEditable={props.isEditable}
                onBlur={e => onChangeCell && onChangeCell(e.currentTarget.textContent || '')}
                suppressContentEditableWarning={true}
            >{value}</span>
        </div>
    );
};

export default CellTemplate;
