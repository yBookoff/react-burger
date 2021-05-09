import React from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import PropTypes from "prop-types";


const modalRoot = document.getElementById('react-modals') as HTMLElement;

const Modal = (children, title, onClick) => {

    return createPortal((
        <>
            <div className={styles.Modal}>
                <div className={styles.CloseButton}>
                    <p className="text text_type_main-default">{title}</p>
                    <span>
                        <CloseIcon onClick={onClick} type="primary"/>
                    </span>
                </div>
                <div className={styles.ModalCard}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClick={onClick}/>
        </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    onClick: PropTypes.func
}

export default Modal;