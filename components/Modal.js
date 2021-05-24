import styles from "../public/css/Modal.module.scss";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function Modal({isVisible = false, children, close}) {

    return (
        <div className={`${styles.modal} ${isVisible === true ? styles.open : ''}`}>
            <div className={styles.overlay} onClick={() => close()} />
            <div className={styles.modalContent}>
                <button className={`btn btn-primary btn-icone ${styles.btnClose}`} onClick={() => close()}><FontAwesomeIcon icon={faTimes} /></button>
                {children}
            </div>
        </div>
    )
}