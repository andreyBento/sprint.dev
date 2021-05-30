import styles from "../public/css/TaskItem.module.scss";
import {useState} from "react";
import Modal from "./Modal";

export default function TaskItem ({task, keyValue, click}) {
    const [modal, setModal] = useState(false);

    function openModal() {
        setModal(true);
        click(true);
    }

    function closeModal() {
        setModal(false);
        click(false);
    }

    return (
        <div>
            <div className={styles.task} key={keyValue} onClick={() => openModal()}>
                <p className={styles.taskArea}>{task.area}</p>
                <h3 className={styles.taskName}>{task.name}</h3>
                <p className={`${styles.priority} ${task.priority === 'alta' ? styles.alta : task.priority === 'baixa' ? styles.baixa : ''}`}>Prioridade {task.priority}</p>
                {
                    task.status !== 'backlog' &&
                        task.workers.map((item, index) => {
                            return(
                                <p className={styles.worker} key={`w${index}`}>{item.firstName.slice(0,1)}</p>
                            )
                        })
                }
            </div>
            <Modal isVisible={modal} close={() => closeModal()}>
                <p className={styles.taskArea}>{task.area}</p>
                <h3 className={styles.taskName}>{task.name}</h3>
                <p className={styles.taskDesc}>{task.msg}</p>
                <p className={`${styles.priority} ${task.priority === 'alta' ? styles.alta : task.priority === 'baixa' ? styles.baixa : ''}`}>Prioridade {task.priority}</p>
                <p className={`my-1 ${styles.label}`}>Pessoa que esta trabalhando nesta tarefa:</p>
                {
                    task.status !== 'backlog' &&
                    task.workers.map((item, index) => {
                        return(
                            <p className={styles.worker} key={`w${index}`}>{item.firstName.slice(0,1)}</p>
                        )
                    })
                }
            </Modal>
        </div>
    )
}