import styles from "../public/css/TaskItem.module.scss";
import {useRef, useState} from "react";
import Modal from "./Modal";
import Comment from "./Comment";

export default function TaskItem ({task, keyValue, click, userId}) {
    const commentForm = useRef(null);

    const [modal, setModal] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [comments, setComments] = useState(task.comments)

    function openModal() {
        setModal(true);
        click(true);
    }

    function closeModal() {
        setModal(false);
        click(false);
        commentForm.current.reset();
    }

    function updateComments() {
        const options = {
            method: 'GET',
        };
        fetch(`http://localhost:8080/tasks/${task.id}`, options)
            .then((res) => res.json())
            .then((res) => {
                setComments(res.comments);
            })
            .catch(err => console.error(err));
    }

    function commentAdd(event) {
        event.preventDefault();
        if(commentValue.trim() === '' || commentValue === false){
            setCommentValue(false);
        } else {
            const comment = {
                msg: commentValue.trim(),
                date: new Date(),
                idTask: task.id,
                idUser: userId,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            };
            fetch(`http://localhost:8080/comments/add`, options)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    updateComments();
                    commentForm.current.reset();
                })
                .catch(err => console.error(err));
        }
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
            <Modal isVisible={modal} close={() => closeModal()} bigModal={true}>
                <div className={styles.modalTask}>
                    <div className={styles.infoSide}>
                        <div className="d-flex align-items-center">
                            <p className={styles.taskArea}>{task.area}</p>
                            <p className={`ml-2 ${styles.priority} ${task.priority === 'alta' ? styles.alta : task.priority === 'baixa' ? styles.baixa : ''}`}>Prioridade {task.priority}</p>
                        </div>
                        <h3 className={styles.taskName}>{task.name}</h3>
                        <p className={styles.taskDesc}>{task.msg}</p>
                        <p className={`my-1 ${styles.label}`}>Pessoa que esta trabalhando nesta tarefa:</p>
                        {
                            task.status !== 'backlog' &&
                            task.workers.map((item, index) => {
                                return(
                                    <p className={styles.worker} key={`w${index}`}>{item.firstName.slice(0,1)}</p>
                                )
                            })
                        }
                    </div>
                    <div className={styles.commentsSide}>
                        <div className={styles.comments}>
                            {comments.map((item, index) => {
                                if(item.owner.id === userId){
                                    return <Comment isMine={true} comment={item} keyValue={`com${index}`}/>
                                } else {
                                    return <Comment comment={item} keyValue={`com${index}`}/>
                                }
                            })}
                        </div>
                        <form onSubmit={(event) => commentAdd(event)} ref={commentForm}>
                            <fieldset className={`d-flex align-items-center ${commentValue === false ? 'error' : ''}`}>
                                <input type="text" className="input mt-0 mr-3" id="comment" onKeyUp={(event) => setCommentValue(event.target.value)}/>
                                <button className="btn btn-primary">Comentar</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}