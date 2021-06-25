import styles from "../public/css/SprintInterna.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import React, {useEffect, useRef, useState} from "react";


export default function BacklogPage({dragEnd, colunm1Tasks, colunm2Tasks, colunm3Tasks, colunm4Tasks, maxHeight, updateSprint, user, disableDrag, teams, updateTeams, sprint}) {
    const form = useRef(null);
    const floaterRef = useRef(null);

    const colors = [
        '#ADE498',
        '#EDE682',
        '#FE91CA',
        '#FEBF63',
        '#7FDBDA'
    ];
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const [teamBox, setTeamBox] = useState({
        name: '',
        bgColor: ''
    });
    function inputTeam(item) {
        if(floater === false){
            setFloater(true);
        }
        const teamBoxNew = {
            name: item.target.value,
            bgColor: teamBox.bgColor
        };
        setTeamBox(teamBoxNew);
    }
    useEffect(() => {
        setTeamBox({
            name: teamBox.name,
            bgColor: colors[randomIntFromInterval(0, (colors.length - 1))]
        });
    }, []);

    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskPrioridade, setTaskPrioridade] = useState('');
    async function createTask(event) {
        event.preventDefault();

        if(taskName === '' || taskName === false){
            setTaskName(false);
        } else if(taskDesc === '' || taskDesc === false){
            setTaskDesc(false);
        } else if(teamBox.name === '' || teamBox === false){
            setTeamBox(false);
        } else if(taskPrioridade === '' || taskPrioridade === false || taskPrioridade === 'null'){
            setTaskPrioridade(false);
        } else {
            let task = {
                name: taskName,
                desc: taskDesc,
                idSprint: sprint.id,
                status: 'backlog',
                priority: taskPrioridade,
                idTeam: teamBox.id,
            };
            if(task.idTeam === undefined){
                let idTeam = await fetchCreateTeam();
                task = {
                    name: taskName,
                    desc: taskDesc,
                    idSprint: sprint.id,
                    status: 'backlog',
                    priority: taskPrioridade,
                    idTeam: idTeam,
                };
            }
            console.log(task);
            fetchCreateTask(task);
        }
    }

    function fetchCreateTeam(){
        const optionsTeam = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamBox)
        };
        return fetch(`http://localhost:8080/teams/add`, optionsTeam)
            .then((res) => res.json())
            .then((res) => {
                updateTeams();
                return res.id;
            })
            .catch(err => console.error(err));
    }

    function fetchCreateTask(task){
        const optionsTask = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        };
        console.log(task);
        fetch(`http://localhost:8080/tasks/add`, optionsTask)
            .then((res) => res.json())
            .then((res) => {
                updateSprint();
                setTeamBox({
                    name: '',
                    bgColor: ''
                });
                closeFloater();
                setTaskName('');
                setTaskDesc('');
                setTaskPrioridade('');
                setTaskForm(false);
                form.current.reset();
            })
            .catch(err => console.error(err));
    }

    const [taskForm, setTaskForm] = useState(false);
    function toggleTaskForm(event) {
        if(event){
            setTaskName('');
            setTaskDesc('');
            setTaskPrioridade('');
        }
        setTaskForm(!taskForm);
    }

    const [floater, setFloater] = useState(false);
    const [floaterTop, setFloaterTop] = useState('0px');
    const [floaterLeft, setFloaterLeft] = useState('0px');
    function openFloater(item){
        let topValue = item.target.parentNode.offsetTop + item.target.parentNode.offsetHeight + 'px';
        let leftValue = item.target.parentNode.offsetLeft + 'px';
        setFloaterTop(topValue)
        setFloaterLeft(leftValue);
        if(item.target.value !== ''){
            setFloater(true);
        }
    }
    function closeFloater(){
        setFloater(false);
    }
    useEffect(() => {
        let body = document.getElementsByTagName('body')[0];
        body.addEventListener('click', function (event) {
            const click = event.target;
            const clickChildren = floaterRef.current !== null ? [...floaterRef.current.children] : [];
            let shouldClose = true;

            if(document.getElementById('area') === click){
                shouldClose = false;
            } else {
                if(floaterRef.current === click){
                    shouldClose = false;
                } else {
                    clickChildren.map((item) => {
                        if(item === click){
                            shouldClose = false;
                        } else{
                            const itemChildren = [...item.children];
                            itemChildren.map((itemChild) => {
                                const itemChildrenChildren = [...itemChild.children];
                                if(itemChild === click){
                                    shouldClose = false;
                                } else {
                                    itemChildrenChildren.map((itemChildChild) => {
                                        if(itemChildChild === click){
                                            shouldClose = false;
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }

            if(shouldClose === true){
                closeFloater();
            }

        });
    }, []);

    function selectTeam(team){
        setTeamBox(team);
        closeFloater();
        document.getElementById('area').value = team.name;
    }

    const TeamFloater = () => {

        const [teamsFiltered, setTeamsFiltered] = useState(teams);

        useEffect(() => {
            let filter = teams.filter((item) => {
                return item.name.toLowerCase().includes(teamBox.name.toLowerCase());
            });
            setTeamsFiltered(filter);
        }, []);

        return (
            <ul ref={floaterRef} style={ floater ? {display: 'block', left: floaterLeft, top: floaterTop} : {display: 'none', left: floaterLeft, top: floaterTop} } className={styles.teamFloater}>
                {
                    teamsFiltered.length === 0 ?
                        <li>
                            <div>
                                <p onClick={() => selectTeam(teamBox)} className={styles.boxTeam} style={{backgroundColor: teamBox.bgColor}}>
                                    {teamBox.name}
                                </p>
                                <input type="color" value={teamBox.bgColor} className={styles.boxTeamColor} onChange={(item) => setTeamBox({ name: teamBox.name, bgColor: item.target.value })}/>
                            </div>
                            <div className={styles.teamFloaterInfo}>
                                <p>
                                    Ainda não existe um time com esse nome, mas você pode criar agora. Clique no box acima pra escolher uma cor.
                                    <small>Você pode adicionar as pessoas desse time na área de times.</small>
                                </p>
                            </div>
                        </li>
                        :
                        teamsFiltered.map((team, index) => {
                            return (
                                <li key={`tb${index}`} className={styles.floaterLi}>
                                    <p onClick={() => selectTeam(team)} className={styles.boxTeam} style={{backgroundColor: team.bgColor}}>
                                        {team.name}
                                    </p>
                                </li>
                            )
                        })
                }
            </ul>
        )

    };

    return(
        <DragDropContext onDragEnd={(result) => dragEnd(result)}>
            <div className={styles.tasksWrapper}>
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <h2 className={`titulo h2 ${styles.columnTitulo}`}>Tarefas</h2>
                        {colunm1Tasks.length > 0 && <span className={styles.columnLength}>{colunm1Tasks.length}</span>}
                    </div>
                    <div className={styles.overflow}>
                        <div className={`${styles.btnAddTask} ${taskForm === true ? styles.active : ''}`}>
                            <form ref={form} className={`${styles.btnAddTaskForm}`} onSubmit={(event) => createTask(event)}>
                                <fieldset className={`mt-1 ${taskName === false ? styles.error : ''}`}>
                                    <label className={styles.label} htmlFor="name">Título</label>
                                    <input type="text" className={styles.input} id="name" onKeyUp={(item) => setTaskName(item.target.value)}/>
                                </fieldset>
                                <fieldset className={`mt-1 ${taskDesc === false ? styles.error : ''}`}>
                                    <label className={styles.label} htmlFor="desc">Descrição</label>
                                    <textarea id="desc" className={styles.input} onKeyUp={(item) => setTaskDesc(item.target.value)} />
                                </fieldset>
                                <fieldset className={`mt-1 ${teamBox === false ? styles.error : ''}`}>
                                    <label className={styles.label} htmlFor="area">Qual time deve pegar essa tarefa?</label>
                                    <div className="position-relative">
                                        <input autoComplete={'off'} type="text" className={styles.input} id="area" onFocus={(item) => openFloater(item)} onKeyUp={(item) => inputTeam(item)}/>
                                    </div>
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
                            <button className={`${styles.btnAddTaskPlus}`} onClick={() => toggleTaskForm()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <Droppable droppableId="backlog">
                            {(provided) => (
                                <ul id="backlog" className={styles.listaTasks} {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {
                                        colunm1Tasks.map((item, index) => {
                                            if (item.status === 'backlog') {
                                                return (
                                                    <Draggable key={`t${index}`} draggableId={`bt${index}`}
                                                               index={index}
                                                               isDragDisabled={item.disabled === true}>
                                                        {
                                                            (providedDraggable) => (
                                                                <li
                                                                    className={styles.listaTasksItem}
                                                                    {...providedDraggable.draggableProps}
                                                                    {...providedDraggable.dragHandleProps}
                                                                    ref={providedDraggable.innerRef}
                                                                >
                                                                    <TaskItem userId={user.id} task={item}
                                                                              updateTeams={updateTeams}
                                                                              click={(status) => disableDrag(status, item, colunm1Tasks, 'setColunm1Tasks')}
                                                                              updateSprint={updateSprint}/>
                                                                </li>
                                                            )
                                                        }
                                                    </Draggable>
                                                );
                                            }
                                        })
                                    }
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <h2 className={`titulo h2 ${styles.columnTitulo}`}>Em andamento</h2>
                        {colunm2Tasks.length > 0 && <span className={styles.columnLength}>{colunm2Tasks.length}</span>}
                    </div>
                    <div className={styles.overflow}>
                        <Droppable droppableId="andamento">
                            {(provided) => (
                                <ul id="andamento"
                                    className={`${styles.listaTasks} ${styles.listaTasksAlt}`} {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {
                                        colunm2Tasks.map((item, index) => {
                                            if (item.status === 'andamento') {
                                                return (
                                                    <Draggable key={`at${index}`} draggableId={`at${index}`}
                                                               index={index}
                                                               isDragDisabled={item.disabled === true}>
                                                        {
                                                            (providedDraggable) => (
                                                                <li
                                                                    className={styles.listaTasksItem}
                                                                    {...providedDraggable.draggableProps}
                                                                    {...providedDraggable.dragHandleProps}
                                                                    ref={providedDraggable.innerRef}
                                                                >
                                                                    <TaskItem userId={user.id} task={item}
                                                                              updateTeams={updateTeams}
                                                                              click={(status) => disableDrag(status, item, colunm2Tasks, 'setColunm2Tasks')}
                                                                              updateSprint={updateSprint}/>
                                                                </li>
                                                            )
                                                        }
                                                    </Draggable>
                                                );
                                            }
                                        })
                                    }
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <h2 className={`titulo h2 ${styles.columnTitulo}`}>Em revisão</h2>
                        {colunm3Tasks.length > 0 && <span className={styles.columnLength}>{colunm3Tasks.length}</span>}
                    </div>
                    <div className={styles.overflow}>
                        <Droppable droppableId="revisão">
                            {(provided) => (
                                <ul id="revisão"
                                    className={`${styles.listaTasks} ${styles.listaTasksAlt}`} {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {
                                        colunm3Tasks.map((item, index) => {
                                            if (item.status === 'revisão') {
                                                return (
                                                    <Draggable key={`rt${index}`} draggableId={`rt${index}`}
                                                               index={index}
                                                               isDragDisabled={item.disabled === true}>
                                                        {
                                                            (providedDraggable) => (
                                                                <li
                                                                    className={styles.listaTasksItem}
                                                                    {...providedDraggable.draggableProps}
                                                                    {...providedDraggable.dragHandleProps}
                                                                    ref={providedDraggable.innerRef}
                                                                >
                                                                    <TaskItem userId={user.id} task={item}
                                                                              updateTeams={updateTeams}
                                                                              click={(status) => disableDrag(status, item, colunm3Tasks, 'setColunm3Tasks')}
                                                                              updateSprint={updateSprint}/>
                                                                </li>
                                                            )
                                                        }
                                                    </Draggable>
                                                );
                                            }
                                        })
                                    }
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <h2 className={`titulo h2 ${styles.columnTitulo}`}>Feito</h2>
                        {colunm4Tasks.length > 0 && <span className={styles.columnLength}>{colunm4Tasks.length}</span>}
                    </div>
                    <div className={styles.overflow}>
                        <Droppable droppableId="feito">
                            {(provided) => (
                                <ul id="feito"
                                    className={`${styles.listaTasks} ${styles.listaTasksAlt}`} {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {
                                        colunm4Tasks.map((item, index) => {
                                            if (item.status === 'feito') {
                                                return (
                                                    <Draggable key={`ft${index}`} draggableId={`ft${index}`}
                                                               index={index}
                                                               isDragDisabled={item.disabled === true}>
                                                        {
                                                            (providedDraggable) => (
                                                                <li
                                                                    className={styles.listaTasksItem}
                                                                    {...providedDraggable.draggableProps}
                                                                    {...providedDraggable.dragHandleProps}
                                                                    ref={providedDraggable.innerRef}
                                                                >
                                                                    <TaskItem userId={user.id} task={item}
                                                                              updateTeams={updateTeams}
                                                                              click={(status) => disableDrag(status, item, colunm4Tasks, 'setColunm4Tasks')}
                                                                              updateSprint={updateSprint}/>
                                                                </li>
                                                            )
                                                        }
                                                    </Draggable>
                                                );
                                            }
                                        })
                                    }
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </div>
            </div>
            <TeamFloater />
        </DragDropContext>
    )
}