import React, {useState} from 'react';
import clsx from 'clsx';
import './ParametersSection.scss';

interface ParametersSectionProps {
    onClickForm: (size: number, mode: string) => void;
}

const ParametersSection: React.FC<ParametersSectionProps> = (props) => {
    const [mode, setMode] = useState('');
    const [size, setSize] = useState(0);

    return (
        <div className={'parameters-wrapper'}>
            <div className={'parameters-wrapper-row'}>
                <span className={'parameters-wrapper-label'}>Введите размер массива данных:</span>
                <input type={'number'} min={0} onChange={e => setSize(parseInt(e.target.value, 10))}/>
            </div>
            <div className={'parameters-wrapper-row'}>
                <span className={'parameters-wrapper-label'}>Выберите режим ввода данных:</span>
                <div>
                    <label>
                        <div>
                            <input
                                type="radio"
                                value={'manual'}
                                name={'mode'}
                                onChange={e => setMode('manual')}
                            />
                            Ручной
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        <div>
                            <input
                                type="radio"
                                value={'auto'}
                                name={'mode'}
                                onChange={e => setMode('auto')}
                            />
                            Автоматический
                        </div>
                    </label>
                </div>
            </div>
            <div className={'parameters-wrapper-row'}>
                <div
                    className={clsx('parameters-wrapper-button', {'is-disabled': !mode || !size})}
                    onClick={() => props.onClickForm(size, mode)}
                >
                    Построить начальную матрицу
                </div>
            </div>
        </div>
    );
};

export default ParametersSection;
