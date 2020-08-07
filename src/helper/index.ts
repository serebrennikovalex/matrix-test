import {
    MatrixCountProps,
    TMatrix,
    TMatrixCount,
} from "../components/MatrixTemplate/MatrixTemplate";

const buildMatrix = (size: number, mode: string) => {
    const result: TMatrix = [];

    for (let x = 0; x < size; x++) {
        result[x] = [];

        for (let y = 0; y < size; y++) {
            result[x][y] = mode === 'auto' ? Math.floor(Math.random() * 10) : 0;
        }
    }

    return result;
};

const getCountInListByValue = (list: number[], value: number) => {
    return list.reduce((acc, el) => {
        if (el === value) {
            acc++;
        }

        return acc;
    }, 0)
};

const calculateParamsMatrix = (matrix: TMatrix): TMatrixCount => {
    // получим матрицу, где значения из столбцов будут записаны в строки
    const tMatrix = matrix.reduce<TMatrix>((prev, next) => next.map((item, i) => {
        const res = prev[i] || [];

        return res.concat(next[i]);
    }), []);

    const result: TMatrixCount = [];

    for (let x = 0; x < matrix.length; x++) {
        result[x] = [];

        for (let y = 0; y < matrix.length; y++) {
            const value = matrix[x][y];
            const countInRow = getCountInListByValue(matrix[x], value);
            const countInColumn = getCountInListByValue(tMatrix[y], value);

            result[x][y] = {
                countInRow,
                countInColumn,
            };
        }
    }

    return result;
};

const getEntryClassName = (props: MatrixCountProps) => {
    const {countInColumn, countInRow} = props;
    let result = '';

    if (countInRow > 1 && countInColumn > 1) {
        result = 'in-row-column';
    } else if (countInRow > 1) {
        result = 'in-column';
    } else if (countInColumn > 1) {
        result = 'in-row';
    }

    return result;
};

const calculatedValue = (props: MatrixCountProps, value: number) => {
    const {countInColumn, countInRow} = props;
    let result = value;

    if (countInRow > 1 && countInColumn > 1) {
        result = value * (countInRow + countInColumn);
    } else if (countInRow > 1) {
        result = value * countInRow;
    } else if (countInColumn > 1) {
        result = value * countInColumn;
    }

    return result;
};

const getCalculatedValue = (props: MatrixCountProps, value: number) => {
    const {countInColumn, countInRow} = props;
    let result = 'Без изменений';

    if (countInRow > 1 && countInColumn > 1) {
        result = `${value} * (${countInColumn} + ${countInRow})`;
    } else if (countInRow > 1) {
        result = `${value} * ${countInRow}`;
    } else if (countInColumn > 1) {
        result = `${value} * ${countInColumn}`;
    }

    return result;
};

const setMatrixToStorage = (matrix: TMatrix, resultMatrix: TMatrix) => {
    const historyFromStorage = window.localStorage.getItem('history');
    let history = [];

    if (historyFromStorage) {
        history = JSON.parse(historyFromStorage);
    }

    history.push({
        init: matrix,
        result: resultMatrix,
    });

    window.localStorage.setItem('history', JSON.stringify(history));
};

export {
    buildMatrix,
    getCountInListByValue,
    calculateParamsMatrix,
    calculatedValue,
    getEntryClassName,
    getCalculatedValue,
    setMatrixToStorage,
};
