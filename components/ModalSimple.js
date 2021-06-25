import styles from "../public/css/ModalSimple.module.scss";

export default function ModalSimple({isVisible = false, children, position = 'bottom', center = false}) {
    return(
        <div className={`${styles.modal} ${isVisible === true ? styles.open : ''} ${position === 'bottom' ? styles.bottom : styles.top} ${center === true ? styles.center : ''}`}>
            {children}
        </div>
    )
}