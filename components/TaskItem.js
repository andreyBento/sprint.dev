import styles from "/public/css/TaskItem.module.scss";
import React, {useRef, useState} from "react";
import Modal from "./Modal";
import Comment from "./Comment";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function TaskItem ({task, keyValue, click, userId, updateSprint, updateTeams}) {
    const commentForm = useRef(null);

    const [commentValue, setCommentValue] = useState('');
    const [comments, setComments] = useState(task.comments);

    function openModal() {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        click(true);
    }
    function closeModal() {
        document.getElementsByTagName('body')[0].removeAttribute('style');
        click(false);
        setCommentValue('');
        commentForm.current.reset();
        updateSprint();
    }

    const [alterar, setAterar] = useState(false);
    function formAlterar(){
        setAterar(!alterar);
    }

    const [nomeNovo, setNomeNovo] = useState(task.name);
    const [descNovo, setDescNovo] = useState(task.msg);
    function submitForm(){
        const updateTask = {
            name: nomeNovo,
            desc: descNovo
        }
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        };
        fetch(`http://localhost:8080/tasks/${task.id}/simples`, options)
            .then((res) => res.json())
            .then((res) => {
                updateSprint();
                formAlterar();
            })
            .catch(err => console.error(err));
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
                    updateComments();
                    setCommentValue('');
                    commentForm.current.reset();
                })
                .catch(err => console.error(err));
        }
    }

    function deletarTask(){
        if (window.confirm("Você realmente deseja deletar essa task?")) {
            const options = {
                method: 'DELETE'
            };
            fetch(`http://localhost:8080/tasks/${task.id}`, options)
                .then((res) => {
                    updateTeams();
                    updateSprint();
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div>
            <div className={styles.task} key={keyValue} onClick={() => openModal()}>
                <p className={styles.taskArea} style={{backgroundColor: task.area.bgColor}}><span>{task.area.name}</span></p>
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
                {
                    task.comments.length > 0 || comments.length > 0 ?
                        <div className={styles.baixo}>
                            <ul className={styles.icones}>
                                <li className={styles.icone}>
                                    <FontAwesomeIcon icon={faComment} />
                                </li>
                            </ul>
                        </div>
                        : ''
                }
            </div>
            <Modal isVisible={task.modal === undefined ? false : task.modal} close={() => closeModal()} bigModal={true}>
                <div className={styles.modalTask}>
                    <div className={styles.infoSide}>
                        <div className={styles.cima}>
                            <div className="d-flex align-items-center">
                                <p className={styles.taskArea} style={{backgroundColor: task.area.bgColor}}>{task.area.name}</p>
                                <p className={`ml-2 ${styles.priority} ${task.priority === 'alta' ? styles.alta : task.priority === 'baixa' ? styles.baixa : ''}`}>Prioridade {task.priority}</p>
                            </div>
                            <form className={`${styles.formAlterar} ${alterar === true ? styles.active : ''}`}>
                                <input type="text" defaultValue={nomeNovo} className={`input ${styles.taskName}`} onKeyUp={(e) => setNomeNovo(e.target.value)}/>
                                <textarea name="" id="" className={`input ${styles.taskDesc}`} defaultValue={descNovo} onKeyUp={(e) => setDescNovo(e.target.value)} />
                            </form>
                            <div className={`${styles.infoView} ${alterar === false ? styles.active : ''}`}>
                                <h3 className={styles.taskName}>{task.name}</h3>
                                <p className={styles.taskDesc}>{task.msg}</p>
                            </div>
                            {
                                task.status !== 'backlog' &&
                                <p className={`my-1 ${styles.label}`}>Pessoa que esta trabalhando nesta tarefa:</p>
                            }
                            {
                                task.status !== 'backlog' &&
                                task.workers.map((item, index) => {
                                    return(
                                        <p className={styles.worker} key={`w${index}`}>{item.firstName.slice(0,1)}</p>
                                    )
                                })
                            }
                        </div>
                        <div className={`${styles.actionWrapper} ${alterar === true ? styles.active : ''}`}>
                            <button className={`btn btn-primary`} onClick={() => submitForm()}>Confirmar alteração</button>
                            <button className={`btn btn-cinza ml-2`} onClick={() => formAlterar()}>Cancelar alteração</button>
                        </div>
                        <div className={`${styles.actionWrapper} ${alterar === false ? styles.active : ''}`}>
                            <button className={`btn btn-cinza`} onClick={() => formAlterar()}>Alterar task</button>
                            <button className={`btn btn-danger ml-2`} onClick={() => deletarTask()}>Deletar task</button>
                        </div>
                    </div>
                    <div className={styles.commentsSide}>
                        <div className={styles.comments}>
                            {comments.map((item, index) => {
                                if(item.owner.id === userId){
                                    return (
                                        <div key={`com${index}`}>
                                            <Comment isMine={true} comment={item}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={`com${index}`}>
                                            <Comment comment={item}/>
                                        </div>
                                    )
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