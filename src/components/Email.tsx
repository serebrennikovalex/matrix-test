import React from 'react';
import {Email, Item, Box, Span} from 'react-html-email';
import {TMatrix} from "./MatrixTemplate/MatrixTemplate";

interface MatrixEmailProps {
    matrix: TMatrix;
    resultMatrix: TMatrix;
}

const MatrixEmail: React.FC<MatrixEmailProps> = (props) => {
    return (
        <Email title='email' bgcolor={'#ffffff'} width={'80%'} align={'center'}>
            <Item>
                Здравствуйте!
            </Item>
            <Item align={'center'}>
                <Span style={{display: 'block'}}>Исходные данные:</Span>
                <Box cellSpacing={20} style={{ backgroundColor: '#ffffff' }}>
                    <Item>
                        {props.matrix.map((row, rowIndex) => (
                            <Box key={'row-' + rowIndex} cellPadding={24} cellSpacing={10}>
                                {row.map((val, valIndex) => (
                                    <Item key={'val-' + valIndex}>
                                        {val}
                                    </Item>
                                ))}
                            </Box>
                        ))}
                    </Item>
                </Box>
            </Item>
            <Item align={'center'}>
                <Span style={{display: 'block'}}>Полученные данные:</Span>
                <Box cellSpacing={20} style={{ backgroundColor: '#ffffff' }}>
                    <Item>
                        {props.resultMatrix.map((row, rowIndex) => (
                            <Box key={'row-' + rowIndex} cellPadding={24} cellSpacing={10}>
                                {row.map((val, valIndex) => (
                                    <Item key={'val-' + valIndex}>
                                        {val}
                                    </Item>
                                ))}
                            </Box>
                        ))}
                    </Item>
                </Box>
            </Item>
        </Email>
    )
};

export default MatrixEmail;
