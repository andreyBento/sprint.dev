import styles from "../public/css/TaskItem.module.scss";

export default function TaskItem ({task, keyValue}) {

    return (
        <div className={styles.task} key={keyValue}>
            <p className={styles.taskArea}>{task.area}</p>
            <h3 className={styles.taskName}>{task.name}</h3>
            <p className={`${styles.priority} ${task.priority === 'alta' ? styles.alta : task.priority === 'baixa' ? styles.baixa : ''}`}>Prioridade {task.priority}</p>
        </div>
    )
}