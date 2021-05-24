import styles from "../public/css/ModalSimple.module.scss";

export default function ModalSimple({isVisible = false, children, position = 'bottom'}) {
    return(
        <div className={`${styles.modal} ${isVisible === true ? styles.open : ''} ${position === 'bottom' ? styles.bottom : styles.top}`}>
            {children}
        </div>
    )
}