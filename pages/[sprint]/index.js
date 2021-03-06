import styles from '/public/css/SprintInterna.module.scss';
import Aside from "/components/Aside";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import BacklogPage from "/components/BacklogPage";
import TeamsPage from "/components/TeamsPage";
import EventPage from "/components/EventPage";
import GraphPage from "/components/GraphPage";
import apiUrl from "../../apiUrl/apiUrl";
import Loading from "../../components/Loading";

export default function SprintInterna() {

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
        const url = apiUrl(window.location.origin);
        fetch(`${url}/users/${userID}`, options)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            })
            .catch(err => console.error(err))
    }, []);

    useEffect(() => {
        updateSprint()
    }, []);

    function updateSprint(){
        const options = {
            method: 'GET'
        };
        const sprintId = window.localStorage.getItem('SPRINT_TOKEN');
        const url = apiUrl(window.location.origin);
        fetch(`${url}/sprints/${sprintId}`, options)
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
                    } else if(item.status === 'revis??o'){
                        array3.push(item)
                    } else if(item.status === 'feito'){
                        array4.push(item)
                    }
                });

                array1 = shuffleTasks(array1);
                array2 = shuffleTasks(array2);
                array3 = shuffleTasks(array3);
                array4 = shuffleTasks(array4);

                setColunm1Tasks(array1);
                setColunm2Tasks(array2);
                setColunm3Tasks(array3);
                setColunm4Tasks(array4);

                setTeams(res.teams);
                document.getElementById('loader').style.display = 'none';
            })
            .catch(err => console.error(err))
    }

    function shuffleTasks(array){
        let newArray = [];
        let arrayBaixas = array.filter((item) => item.priority === 'baixa');
        let arrayNormais = array.filter((item) => item.priority === 'normal');
        let arrayAltas = array.filter((item) => item.priority === 'alta');
        return newArray = arrayAltas.concat(arrayNormais).concat(arrayBaixas);
    }

    async function updateColumn(number, value){
        switch (number){
            case 1:
                await setColunm1Tasks(value);
                break;
            case 2:
                await setColunm2Tasks(value);
                break;
            case 3:
                await setColunm3Tasks(value);
                break;
            case 4:
                await setColunm4Tasks(value);
                break;
        }
    }

    function defineColumn(id){
        let obj = {};
        switch (id){
            case 'backlog':
                obj = {
                    value: colunm1Tasks,
                    array: 1
                };
                break;

            case 'andamento':
                obj = {
                    value: colunm2Tasks,
                    array: 2
                };
                break;

            case 'revis??o':
                obj = {
                    value: colunm3Tasks,
                    array: 3
                };
                break;

            case 'feito':
                obj = {
                    value: colunm4Tasks,
                    array: 4
                };
                break;
        }
        return obj;
    }

    function fetchWorkers(value, id) {
        const updateWorkers = {
            workers: value
        };
        const optionsWorkersStatus = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateWorkers)
        };
        const url = apiUrl(window.location.origin);
        return fetch(`${url}/tasks/${id}/workers`, optionsWorkersStatus)
            .then((res) => res.json())
            .then((res) => {
                return res.workers;
            })
            .catch(err => console.error(err));
    }

    async function dragEnd(result) {
        if(result.destination !== null){
            if(result.source.droppableId !== result.destination.droppableId){
                if(document.getElementById('loader').getAttribute('style') !== null){
                    document.getElementById('loader').removeAttribute('style');
                }

                let sourceArray = defineColumn(result.source.droppableId),
                    destinationArray = defineColumn(result.destination.droppableId);

                let loser = [],
                    winner = [];

                const updateStatus = {
                    status: result.destination.droppableId,
                    updatedAt: new Date().toString()
                }
                const optionsUpdateStatus = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateStatus)
                };

                sourceArray.value.map(async (item, index) => {
                    if (index === result.source.index) {
                        destinationArray.value.map((destItem) => {
                            if(destItem.id !== item.id){
                                winner.push(destItem);
                            }
                        });
                        item.status = result.destination.droppableId;
                        winner.push(item);
                        const url = apiUrl(window.location.origin);
                        fetch(`${url}/tasks/${item.id}/status`, optionsUpdateStatus)
                            .catch(err => console.error(err));

                        let newWorkers = [];
                        let isNew = true;

                        if(item.status !== 'backlog'){
                            if (item.workers.length > 0) {
                                item.workers.map((worker) => {
                                    if (worker.id === user.id) {
                                        isNew = false;
                                    }
                                    newWorkers.push(item.id);
                                });
                            } else {
                                newWorkers.push(user.id);
                            }
                        }

                        if(isNew === true){
                            item.workers = await fetchWorkers(newWorkers, item.id);
                        }

                    } else {
                        loser.push(item);
                    }
                });

                await updateColumn(sourceArray.array, loser);
                await updateColumn(destinationArray.array, winner);
                location.reload();
            }
        }
    }

    function disableDrag(status, taskIncomming, array, updateArray) {
        let newArray = [];
        array.map((item) => {
            if(item.id === taskIncomming.id){
                item.disabled = status;
                item.modal = status;
                newArray.push(item);
            } else {
                newArray.push(item);
            }
        });
        switch (updateArray) {
            case 'setColunm1Tasks':
                setColunm1Tasks(newArray);
                break;

            case 'setColunm2Tasks':
                setColunm2Tasks(newArray);
                break;

            case 'setColunm3Tasks':
                setColunm3Tasks(newArray);
                break;

            case 'setColunm4Tasks':
                setColunm4Tasks(newArray);
                break;
        }
    }

    const [activeUrl, setActiveUrl] = useState('backlog');
    function changeUrl(url) {
        setActiveUrl(url);
        updateSprint();
    }

    const [teams, setTeams] = useState([]);
    function loadTeams() {
        const options = {
            method: 'GET'
        };
        const url = apiUrl(window.location.origin);
        fetch(`${url}/sprints/${sprint.id}`, options)
            .then((res) => res.json())
            .then((res) => {
                setTeams(res.teams);
            })
            .catch(err => console.error(err));
    }

    const Content = function () {
        switch (activeUrl) {
            case 'backlog':
                return <BacklogPage dragEnd={(result) => dragEnd(result)}
                                    colunm1Tasks={colunm1Tasks}
                                    colunm2Tasks={colunm2Tasks}
                                    colunm3Tasks={colunm3Tasks}
                                    colunm4Tasks={colunm4Tasks}
                                    user={user}
                                    teams={teams}
                                    sprint={sprint}
                                    updateTeams={() => loadTeams()}
                                    disableDrag={(status, taskIncomming, array, updateArray) => disableDrag(status, taskIncomming, array, updateArray)}
                                    updateSprint={() => updateSprint()}/>;

            case 'teams':
                return <TeamsPage teams={teams} updateTeams={() => loadTeams()} updateSprint={() => updateSprint()} />;

            case 'meetings':
                return <EventPage updateSprint={() => updateSprint()} sprint={sprint} />

            case 'graphs':
                return <GraphPage updateSprint={() => updateSprint()} sprint={sprint} />
        }
    };

    return (
        <div className="d-flex">
            <Aside/>
            <Loading id={'loader'} />
            <div className={`conteudo`}>
                <div>
                    <Link href={'/'}>
                        <a className={`btnVoltar`} tabIndex={0} aria-label={"Clique para retornar para a p??gina inicial,"}>
                            <FontAwesomeIcon icon={faArrowLeft} className={`btnVoltarIcone`} />
                            <span>Home</span>
                        </a>
                    </Link>
                    <h2 className={`titulo h2 ${styles.titulo}`}>{sprint.name}</h2>
                    <nav className={styles.navPrincipal}>
                        <ul className={styles.listaLinks}>
                            <li className={`${styles.item} ${activeUrl === 'backlog' ? styles.active : ''}`}>
                                <button onClick={() => changeUrl('backlog')} tabIndex={0} aria-label={"Clique para acessar a ??rea de tarefas deste sprint"} className={styles.link}>Tarefas do sprint</button>
                            </li>
                            <li className={`${styles.item} ${activeUrl === 'graphs' ? styles.active : ''}`}>
                                <button onClick={() => changeUrl('graphs')} tabIndex={0} aria-label={"Clique para acessar a ??rea de gr??ficos deste sprint"} className={styles.link}>Gr??ficos de rendimento</button>
                            </li>
                            <li className={`${styles.item} ${activeUrl === 'teams' ? styles.active : ''}`}>
                                <button onClick={() => changeUrl('teams')} tabIndex={0} aria-label={"Clique para acessar a ??rea de times deste sprint"} className={styles.link}>Times</button>
                            </li>
                            <li className={`${styles.item} ${activeUrl === 'meetings' ? styles.active : ''}`}>
                                <button onClick={() => changeUrl('meetings')} tabIndex={0} aria-label={"Clique para acessar a ??rea de reuni??es deste sprint"} className={styles.link}>Reuni??es</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Content />
            </div>
        </div>
    )
}
