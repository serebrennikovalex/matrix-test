import React, {useEffect, useState} from 'react';
import { renderEmail } from 'react-html-email';
import ParametersSection from './components/ParametersSection/ParametersSection';
import MatrixTemplate, {TMatrix, TMatrixCount} from './components/MatrixTemplate/MatrixTemplate';
import HistoryResults from './components/HistoryResults/HistoryResults';
import MatrixEmail from './components/Email';
import Modal from './components/Modal/Modal';
import {
    buildMatrix,
    calculateParamsMatrix,
    calculatedValue,
    setMatrixToStorage,
} from './helper';
import './App.scss';

const App: React.FC = () => {
    const [size, setSize] = useState(0);
    const [mode, setMode] = useState('');
    const [matrix, setMatrix] = useState<TMatrix>([]);
    const [countMatrix, setCountMatrix] = useState<TMatrixCount>([]);
    const [isOpenModal, toggleModal] = useState(false);
    const [msgTemplate, updateMsg] = useState('');

    useEffect(() => {
        setMatrix(buildMatrix(size, mode));
    }, [size, mode]);

    const onClickForm = (size: number, mode: string) => {
        setSize(size);
        setMode(mode);
    };

    const onEditableCell = (value: number, columnIndex: number, rowIndex: number) => {
        if (matrix) {
            const copyMatrix = Array.from(matrix);

            copyMatrix[columnIndex][rowIndex] = value;

            setMatrix(copyMatrix);
        }
    };

    const getResult = () => {
        const countMatrix = calculateParamsMatrix(matrix);

        const resultMatrix = matrix.map((row, rowIndex) => {
            return row.map((column, valueIndex) => {
                const entityParams = countMatrix ? countMatrix[rowIndex][valueIndex] : undefined;

                return entityParams ? calculatedValue(entityParams, column) : column;
            });
        });

        setMatrixToStorage(matrix, resultMatrix);
        setCountMatrix(countMatrix);
    };

    const newMatrix = () => {
        setSize(0);
        setMode('');
        setMatrix([]);
        setCountMatrix([]);
    };

    const sendEmail = () => {
        const countMatrix = calculateParamsMatrix(matrix);

        const resultMatrix = matrix.map((row, rowIndex) => {
            return row.map((column, valueIndex) => {
                const entityParams = countMatrix ? countMatrix[rowIndex][valueIndex] : undefined;

                return entityParams ? calculatedValue(entityParams, column) : column;
            });
        });

        const messageHtml =  renderEmail(<MatrixEmail matrix={matrix} resultMatrix={resultMatrix} />);

        updateMsg(messageHtml);
        toggleModal(true);
    };

    return (
        <div className={'app'}>
            <header className={'app-header'}>
                Матрица
            </header>
            <div className={'app-content'}>
                <div>
                    {!size && !mode &&
                        <ParametersSection
                            onClickForm={onClickForm}
                        />
                    }
                    {!!matrix.length &&
                        <>
                            <MatrixTemplate
                                matrix={matrix}
                                mode={mode}
                                onEditableCell={onEditableCell}
                            />
                            <div className={'parameters-wrapper-row'}>
                                <div
                                    className={'parameters-wrapper-button'}
                                    onClick={() => getResult()}
                                >
                                    Результат
                                </div>
                            </div>
                            {!!countMatrix.length &&
                                <>
                                    <MatrixTemplate
                                        matrix={matrix}
                                        countMatrix={countMatrix}
                                        mode={'auto'}
                                        isResultData={true}
                                    />
                                    <div className={'parameters-wrapper-row'}>
                                        <div
                                            className={'parameters-wrapper-button'}
                                            onClick={() => sendEmail()}
                                        >
                                            Отправить письмо
                                        </div>
                                    </div>
                                    <div className={'parameters-wrapper-row'}>
                                        <div
                                            className={'parameters-wrapper-button'}
                                            onClick={() => newMatrix()}
                                        >
                                            Новый результат
                                        </div>
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
                <HistoryResults />
            </div>
            {isOpenModal &&
                <Modal
                    template={msgTemplate}
                    onCloseModal={() => toggleModal(false)}
                    isShow={isOpenModal}
                />
            }
        </div>
    );
};

export default App;
