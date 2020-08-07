import React from 'react';
import './Modal.scss';

interface ModalProps {
    isShow?: boolean;
    template: string;
    onCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
    const {isShow} = props;

    if (!isShow) {
        return null;
    }

    return (
        <div className={'modal'}>
            <div className={'modal-actions'}>
                <button className={'modal-close-button'} onClick={() => props.onCloseModal()}>
                    close
                </button>
            </div>
            <div className={'modal-content'} dangerouslySetInnerHTML={{__html: props.template}} />
        </div>
    )
};

export default Modal;
