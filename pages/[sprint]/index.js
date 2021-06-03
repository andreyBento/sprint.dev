import styles from '../../public/css/SprintInterna.module.scss';
import Aside from "../../components/Aside";
import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import TaskItem from "../../components/TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SprintInterna() {
    const form = useRef(null);

    const [user, setUser] = useState([]);
    const [sprint, setSprint] = useState({});
    const [colunm1Tasks, setColunm1Tasks] = useState([]);
    const [colunm2Tasks, setColunm2Tasks] = useState([]);
    const [colunm3Tasks, setColunm3Tasks] = useState([]);
    const [colunm4Tasks, setColunm4Tasks] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET'
        };
        const userID = window.localStorage.getItem('AUTH_TOKEN');

        fetch(`http://localhost:8080/users/${userID}`, options)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            })
            .catch(err => console.error(err))

        updateSprint()
    }, []);

    function updateSprint(){
        const options = {
            method: 'GET'
        };
        const sprintId = window.localStorage.getItem('SPRINT_TOKEN');
        fetch(`http://localhost:8080/sprints/${sprintId}`, options)
            .then((res) => res.json())
            .then((res) => {
                setSprint(res);
                let array1 = [];
                let array2 = [];
                let array3 = [];
                let array4 = [];
                res.tasks.map((item, index) => {
                    if(item.status === 'backlog'){
                        array1.push(item)
                    } else if(item.status === 'andamento'){
                        array2.push(item)
                    } else if(item.status === 'revisao'){
                        array3.push(item)
                    } else if(item.status === 'feito'){
                        array4.push(item)
                    }
                });
                setColunm1Tasks(array1);
                setColunm2Tasks(array2);
                setColunm3Tasks(array3);
                setColunm4Tasks(array4);
            })
            .catch(err => console.error(err))
    }

    const [taskName, setTaskName] = useState('');
    const [taskArea, setTaskArea] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskPrioridade, setTaskPrioridade] = useState('');
    function createTask(event) {
        event.preventDefault();

        if(taskName === '' || taskName === false){
            setTaskName(false);
        } else if(taskDesc === '' || taskDesc === false){
            setTaskDesc(false);
        } else if(taskArea === '' || taskArea === false){
            setTaskArea(false);
        } else if(taskPrioridade === '' || taskPrioridade === false || taskPrioridade === 'null'){
            setTaskPrioridade(false);
        } else {
            const task = {
                name: taskName,
                desc: taskDesc,
                idSprint: sprint.id,
                status: 'backlog',
                priority: taskPrioridade,
                area: taskArea,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            };
            fetch(`http://localhost:8080/tasks/add`, options)
                .then((res) => res.json())
                .then((res) => {
                    updateSprint();
                    setTaskArea('');
                    setTaskName('');
                    setTaskDesc('');
                    setTaskPrioridade('');
                    setTaskForm(false);
                    form.current.reset();
                })
                .catch(err => console.error(err));
        }

    }

    const [taskForm, setTaskForm] = useState(false);
    function toggleTaskForm(event) {
        if(event){
            setTaskArea('');
            setTaskName('');
            setTaskDesc('');
            setTaskPrioridade('');
        }
        setTaskForm(!taskForm);
    }

    const [maxHeight, setMaxHeight] = useState(0);
    useEffect(() => {
        const value = 32 + document.querySelector(`.${styles.conteudo} > div`).getBoundingClientRect().height + 32 + document.querySelector(`.${styles.columnTitulo}`).getBoundingClientRect().height + 16;
        const height = window.innerHeight - value;
        setMaxHeight(height);
    }, []);

    function dragEnd(result) {
        if(result.source.droppableId !== result.destination.droppableId){
            const loser = document.getElementById(result.source.droppableId);
            const loserChildrens = [...loser.childNodes];

            loserChildrens.map((item, index) => {
                if(index === result.source.index){
                    const myId = Number(item.getAttribute('id'));
                    const options = {
                        method: 'GET'
                    };

                    fetch(`http://localhost:8080/tasks/${myId}`, options)
                        .then((res) => res.json())
                        .then((res) => {

                            const newStatus = result.destination.droppableId;

                            let taskUpdate,
                                taskStatus,
                                workersArray = [],
                                option = 0,
                                urlFetch = '';

                            if(workersArray.length > 0){
                                workersArray.map((worker) => {
                                    if(newStatus === 'backlog'){
                                        option = 1;
                                        urlFetch = `http://localhost:8080/tasks/${res.id}`;
                                        workersArray.push(user.id);
                                    } else {
                                        if(worker.id !== user.id){
                                            option = 1;
                                            urlFetch = `http://localhost:8080/tasks/${res.id}`;
                                            workersArray.push(user.id);
                                        } else {
                                            option = 2;
                                            urlFetch = `http://localhost:8080/tasks/${res.id}/status`;
                                        }
                                    }
                                });
                            } else {
                                option = 1;
                                urlFetch = `http://localhost:8080/tasks/${res.id}`;
                                workersArray.push(user.id);
                            }

                            taskUpdate = {
                                name: res.name,
                                desc: res.msg,
                                priority: res.priority,
                                area: res.area,
                                status: newStatus,
                                workers: workersArray
                            };
                            taskStatus = {
                                status: newStatus
                            };

                            const optionsFetch = {
                                method: 'put',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(taskUpdate)
                            };
                            const optionsStatusFetch = {
                                method: 'put',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(taskStatus)
                            };

                            fetch(urlFetch, option === 1 ? optionsFetch : optionsStatusFetch )
                                .then((incomming) => incomming.json())
                                .then((incomming) => {
                                    updateSprint();
                                })
                                .catch(error => console.error(error))

                        })
                        .catch(err => console.error(err))
                }
            });
        }
    }

    function disableDrag(status, taskIncomming, array, updateArray) {
        let newArray = [];
        array.map((item) => {
            if(item.id === taskIncomming.id){
                item.disabled = status;
                newArray.push(item);
            } else {
                newArray.push(item);
            }
        });
        updateArray(newArray);
    }

    return (
        <div className="d-flex">
            <Aside user={user}/>
            <div className={styles.conteudo}>
                <div>
                    <Link href={'/'}>
                        <a className={styles.btnVoltar} tabIndex={0} aria-label={"Clique para retornar para a página inicial,"}>
                            <FontAwesomeIcon icon={faArrowLeft} className={styles.btnVoltarIcone} />
                            <span>Home</span>
                        </a>
                    </Link>
                    <h2 className={`titulo h2 ${styles.titulo}`}>{sprint.name}</h2>
                    <nav className={styles.navPrincipal}>
                        <ul className={styles.listaLinks}>
                            <li className={`${styles.item} ${styles.active}`}>
                                <Link href={"/"}>
                                    <a tabIndex={0} aria-label={"Clique para acessar a área de tarefas deste sprint"} className={styles.link}>Tarefas do sprint</a>
                                </Link>
                            </li>
                            <li className={`${styles.item}`}>
                                <Link href={"/"}>
                                    <a tabIndex={0} aria-label={"Clique para acessar a área de gráficos deste sprint"} className={styles.link}>Gráficos de rendimento</a>
                                </Link>
                            </li>
                            <li className={`${styles.item}`}>
                                <Link href={"/"}>
                                    <a tabIndex={0} aria-label={"Clique para acessar a área de times deste sprint"} className={styles.link}>Times</a>
                                </Link>
                            </li>
                            <li className={`${styles.item}`}>
                                <Link href={"/"}>
                                    <a tabIndex={0} aria-label={"Clique para acessar a área de reuniões deste sprint"} className={styles.link}>Reuniões</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <DragDropContext onDragEnd={(result) => dragEnd(result)}>
                    <div className={styles.tasksWrapper}>
                        <div className={styles.column}>
                            <div className={styles.columnHeader}>
                                <h2 className={`titulo h2 ${styles.columnTitulo}`}>Tarefas</h2>
                                {colunm1Tasks.length > 0 && <span className={styles.columnLength}>{colunm1Tasks.length}</span>}
                            </div>
                            <div className={styles.overflow} style={{maxHeight: maxHeight}}>
                                <div className={styles.btnAddTask}>
                                    <form ref={form} className={`${styles.btnAddTaskForm} ${taskForm === true ? styles.active : ''}`} onSubmit={(event) => createTask(event)}>
                                        <fieldset className={`mt-1 ${taskName === false ? styles.error : ''}`}>
                                            <label className={styles.label} htmlFor="name">Título</label>
                                            <input type="text" className={styles.input} id="name" onKeyUp={(item) => setTaskName(item.target.value)}/>
                                        </fieldset>
                                        <fieldset className={`mt-1 ${taskDesc === false ? styles.error : ''}`}>
                                            <label className={styles.label} htmlFor="desc">Descrição</label>
                                            <textarea id="desc" className={styles.input} onKeyUp={(item) => setTaskDesc(item.target.value)} />
                                        </fieldset>
                                        <fieldset className={`mt-1 ${taskArea === false ? styles.error : ''}`}>
                                            <label className={styles.label} htmlFor="area">Qual time deve pegar essa tarefa?</label>
                                            <input type="text" className={styles.input} id="area" onKeyUp={(item) => setTaskArea(item.target.value)}/>
                                        </fieldset>
                                        <fieldset className={`mt-1 ${taskPrioridade === false ? styles.error : ''}`}>
                                            <label className={styles.label} htmlFor="prioridade">Prioridade</label>
                                            <select className={styles.input} id="prioridade" onChange={(item) => setTaskPrioridade(item.target.value)}>
                                                <option value="null">Qual a prioridade dessa tarefa?</option>
                                                <option value="baixa">Prioridade baixa</option>
                                                <option value="normal">Prioridade normal</option>
                                                <option value="alta">Prioridade alta</option>
                                            </select>
                                        </fieldset>
                                        <fieldset className={`mt-1`}>
                                            <button type="submit" className="btn btn-primary btn-sm">Criar</button>
                                            <button type="reset" className="btn btn-cinza btn-sm ml-1" onClick={(event) => toggleTaskForm(event)}>Cancelar</button>
                                        </fieldset>
                                    </form>
                                    <button className={`${styles.btnAddTaskPlus} ${taskForm === false ? styles.active : ''}`} onClick={() => toggleTaskForm()}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                {
                                    colunm1Tasks !== undefined &&
                                        <Droppable droppableId="backlog">
                                            {(provided) => (
                                                <ul id="backlog" className={styles.listaTasks} {...provided.droppableProps} ref={provided.innerRef}>
                                                    {
                                                        colunm1Tasks.map((item, index) => {
                                                            if(item.status === 'backlog'){
                                                                return (
                                                                    <Draggable key={`t${index}`} draggableId={`bt${index}`} index={index} isDragDisabled={item.disabled === true}>
                                                                        {
                                                                            (providedDraggable) => (
                                                                                <li
                                                                                    id={item.id}
                                                                                    className={styles.listaTasksItem}
                                                                                    {...providedDraggable.draggableProps}
                                                                                    {...providedDraggable.dragHandleProps}
                                                                                    ref={providedDraggable.innerRef}
                                                                                >
                                                                                    <TaskItem userId={user.id} task={item} click={(status) => disableDrag(status, item, colunm1Tasks, setColunm1Tasks)} />
                                                                                </li>
                                                                            )
                                                                        }
                                                                    </Draggable>
                                                                );
                                                            }
                                                        })
                                                    }
                                                    { provided.placeholder }
                                                </ul>
                                            )}
                                        </Droppable>
                                }
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.columnHeader}>
                                <h2 className={`titulo h2 ${styles.columnTitulo}`}>Em andamento</h2>
                                {colunm2Tasks.length > 0 && <span className={styles.columnLength}>{colunm2Tasks.length}</span>}
                            </div>
                            <div className={styles.overflow} style={{maxHeight: maxHeight}}>
                                {
                                    colunm2Tasks !== undefined &&
                                    <Droppable droppableId="andamento">
                                        {(provided) => (
                                            <ul id="andamento" className={`${styles.listaTasks} ${styles.listaTasksAlt}`} {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    colunm2Tasks.map((item, index) => {
                                                        if(item.status === 'andamento'){
                                                            return (
                                                                <Draggable key={`at${index}`} draggableId={`at${index}`} index={index} isDragDisabled={item.disabled === true}>
                                                                    {
                                                                        (providedDraggable) => (
                                                                            <li
                                                                                id={item.id}
                                                                                className={styles.listaTasksItem}
                                                                                {...providedDraggable.draggableProps}
                                                                                {...providedDraggable.dragHandleProps}
                                                                                ref={providedDraggable.innerRef}
                                                                            >
                                                                                <TaskItem userId={user.id} task={item} click={(status) => disableDrag(status, item, colunm2Tasks, setColunm2Tasks)} />
                                                                            </li>
                                                                        )
                                                                    }
                                                                </Draggable>
                                                            );
                                                        }
                                                    })
                                                }
                                                { provided.placeholder }
                                            </ul>
                                        )}
                                    </Droppable>
                                }
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.columnHeader}>
                                <h2 className={`titulo h2 ${styles.columnTitulo}`}>Em revisão</h2>
                                {colunm3Tasks.length > 0 && <span className={styles.columnLength}>{colunm3Tasks.length}</span>}
                            </div>
                            <div className={styles.overflow} style={{maxHeight: maxHeight}}>

                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.columnHeader}>
                                <h2 className={`titulo h2 ${styles.columnTitulo}`}>Feito</h2>
                                {colunm4Tasks.length > 0 && <span className={styles.columnLength}>{colunm4Tasks.length}</span>}
                            </div>
                            <div className={styles.overflow} style={{maxHeight: maxHeight}}>

                            </div>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        </div>
    )
}
