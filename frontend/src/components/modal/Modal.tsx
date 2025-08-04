import React from 'react';
import styles from 'src/components/modal/modal.module.css';

const Modal = ({
    isOpen,
    onClose,
    children
}: { 
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
                <button className={styles['modal-close']} onClick={onClose}>
                    x
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;