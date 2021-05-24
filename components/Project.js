import styles from "../public/css/Project.module.scss";

export default function Project({project, small = false, active}) {

    return(
        <div className={`${styles.project} ${small === false ? styles.projectSmall : ''} ${active === true ? styles.active : ''}`} style={{backgroundColor: project.bgColor}}>
            <div className={styles.nomeWrapper}>
                <p className={styles.nome}>{project.name}</p>
            </div>
        </div>
    )
}