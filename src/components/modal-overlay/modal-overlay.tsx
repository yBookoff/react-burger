import React from "react";
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({onClick}) => {



    return (
        <div className={styles.ModalOverlay} onClick={onClick} onKeyUp={onClick}/>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}


export default ModalOverlay;