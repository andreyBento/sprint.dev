import styles from "../public/css/BoxOrganizador.module.scss";

export default function BoxOrganizador({box}) {

    return (
        <div className={styles.box}>
            <p className={styles.boxName}>{box.name}</p>
        </div>
    )
}