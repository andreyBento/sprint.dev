import styles from '../../public/css/Home.module.scss';
import Aside from "../../components/Aside";
import React, {useState, useEffect} from "react";
import MobileMenu from "../../components/MobileMenu";
import Project from "../../components/Project";
import BoxOrganizador from "../../components/BoxOrganizador";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ModalSimple from "../../components/ModalSimple";
import Modal from "../../components/Modal";
import UserBar from "../../components/UserBar";

export default function Home() {

    const [user, setUser] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET'
        };

        const userID = window.localStorage.getItem('AUTH_TOKEN');

        fetch(`http://localhost:8080/users/${userID}`, options)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
                updateProjects(res)
            })
            .catch(err => console.error(err))
    }, []);

    const [ projects, setProjects ] = useState(user.projects);
    function updateProjects(res) {
        if(res !== undefined){
            fetch(`http://localhost:8080/users/${res.id}`, { method: 'GET' })
                .then((res) => res.json())
                .then((res) => {
                    setProjects(res.projects);
                })
                .catch(err => console.error(err))
        } else {
            fetch(`http://localhost:8080/users/${user.id}`, { method: 'GET' })
                .then((res) => res.json())
                .then((res) => {
                    setProjects(res.projects);
                })
                .catch(err => console.error(err))
        }
    }

    const [projectName, setProjectName] = useState('');
    const [color, setColor] = useState('');
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

    useEffect(() => {
        setColor(colors[randomIntFromInterval(0, (colors.length - 1))]);
    }, []);

    const [boxName, setBoxName] = useState('');
    const [boxProject, setBoxProject] = useState('');

    const [modalNew, setModalNew] = useState(false);
    function toggleModalNew() {
        setModalNew(!modalNew);
    }

    function selectProject(project) {
        if(project.boxes !== undefined){
            setProjectActive(project);
        } else {
            let newProject = project;
            let newBox;
            user.teams.map((team) => {
                team.sprints.map((otherSprint) => {
                    if(otherSprint.project.id === project.id){
                        newBox = otherSprint.box;
                        newBox.sprints = team.sprints;
                        newProject.boxes = [newBox];
                    }
                });
            });
            setProjectActive(newProject);
        }
    }

    const [projectActive, setProjectActive] = useState(false);
    const ListProjects = ({listProjects}) => {
        let projectsArray = listProjects;

        user.teams.map((team) => {
            if(team.sprints.length > 0){
                team.sprints.map((notMine) => {
                    let newProject = true;
                    projectsArray.map((item) => {
                        if(item.id === notMine.project.id){
                            newProject = false;
                        }
                    })
                    if(newProject === true){
                        projectsArray.push(notMine.project)
                    }
                });
            }
        });

        return (
            projectsArray.length === 0 ?
                <ul className={styles.projectsList}>
                    <li>
                        <p className={styles.empty}>Olá <strong>{user.firstName.split(' ')[0]}</strong>, você ainda não possui projetos.</p>
                        <p className={styles.empty}>Para criar um projeto acione o botão interativo ao lado do título "<strong>Crie algo novo</strong>"</p>
                    </li>
                </ul>
                :
                <ul className={styles.projectsList}>
                    {
                        listProjects.map((item, index) => {
                            if(projectActive.id === item.id){
                                return(
                                    <li className={styles.project} key={index} >
                                        <Project project={item} active={true} onClick={() => selectProject(item)} />
                                    </li>
                                )
                            } else {
                                return(
                                    <li className={styles.project} key={index} >
                                        <Project project={item} onClick={() => selectProject(item)} />
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
        )
    };

    const [modalProject, setModalProject] = useState(false);
    function toggleModalProject() {
        setModalProject(!modalProject);
        setModalNew(false);
    }

    function createProject(event) {
        event.preventDefault();
        if(projectName === ''){
            setProjectName(false);
        } else if(color === ''){
            setColor(false);
        } else {
            const project = {
                name: projectName,
                bgColor: color,
                idUser: user.id
            };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            };

            fetch(`http://localhost:8080/projects/add`, options)
                .then((res) => res.json())
                .then((res) => {
                    updateProjects();
                    location.reload();
                })
                .catch(err => console.error(err))

            setModalProject(false);
            setModalNew(false);
        }
    }

    const [modalBox, setModalBox] = useState(false);
    function toggleModalBox() {
        setModalBox(!modalBox);
        setModalNew(false);
    }

    const ListBoxes = ({boxes}) => {
        return(
            boxes.length === 0 ?
                <ul className={styles.boxesList}>
                    <li>
                        <p className={styles.empty}>Você ainda não possui nenhum Box Organizador</p>
                        <p className={styles.empty}>Para criar um Box Organizador acione o botão interativo ao lado do título "<strong>Crie algo novo</strong>"</p>
                    </li>
                </ul>
                :
                <ul className={styles.boxesList}>
                    {boxes.map((item, index) => {
                        return (
                            <li key={item.name + index}>
                                <BoxOrganizador box={item} />
                            </li>
                        )
                    })}
                </ul>
        )
    };

    function createBox(event) {
        event.preventDefault();
        if(boxProject === '' || boxProject === 'null' || boxProject === false){
            setBoxProject(false);
        } else if (boxName === '') {
            setBoxName(false);
        } else {
            const box = {
                name: boxName,
                idProject: Number(boxProject)
            };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(box)
            };
            fetch(`http://localhost:8080/boxes/add`, options)
                .then((res) => res.json())
                .then((res) => {
                    updateProjects();
                    location.reload();
                })
                .catch(err => console.error(err))

            setModalBox(false);
            setModalNew(false);
        }
    }

    const [modalSprint, setModalSprint] = useState(false);
    const [sprintName, setSprintName] = useState('');
    const [sprintProject, setSprintProject] = useState('');
    const [sprintDate, setSprintDate] = useState('');
    const [sprintBox, setSprintBox] = useState('');
    function toggleModalSprint() {
        setModalSprint(!modalSprint);
        setModalNew(false);
    }

    function createSprint(event) {
        event.preventDefault();
        if (sprintName === '' || sprintName === false) {
            setSprintName(false);
        } else if(sprintProject === '' || sprintProject === 'null' || sprintProject === false){
            setSprintProject(false);
        } else if(sprintBox === '' || sprintBox === 'null' || sprintBox === false){
            setSprintBox(false);
        } else if (sprintDate === '' || sprintDate === false) {
            setSprintDate(false);
        } else {
            const sprint = {
                name: sprintName,
                createdAt: new Date().toString(),
                expiresAt: new Date(`${sprintDate} 18:00`).toString(),
                idBox: Number(sprintBox)
            };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sprint)
            };
            fetch(`http://localhost:8080/sprints/add`, options)
                .then((res) => res.json())
                .then((res) => {
                    updateProjects();
                    location.reload();
                })
                .catch(err => console.error(err));

            setModalSprint(false);
            setModalNew(false);
        }
    }

    function toggleModal(tipo) {
        switch (tipo) {
            case 'sprint':
                toggleModalSprint();
                break;

            case 'box':
                toggleModalBox();
                break;

            case 'project':
                toggleModalProject();
                break;
        }
    }

    return (
        <div className="d-flex">
            <Aside/>

            <div className={`conteudo`}>
                <div className={styles.userbarMobile}>
                    <UserBar user={user}/>
                </div>
                <h2 className="titulo h2 d-flex align-items-center">
                    <span>Crie algo novo!</span>
                    <button className={`btn btn-primary btn-icone ${styles.btnAdd} position-relative`} onClick={() => toggleModalNew()}>
                        <FontAwesomeIcon icon={faPlus} className={styles.addIcon} />
                        <ModalSimple isVisible={modalNew} position={"bottom"}>
                            <p className={styles.link} onClick={() => toggleModalProject()}>Criar novo Projeto</p>
                            <p className={styles.link} onClick={() => toggleModalBox()}>Criar novo Box Organizador</p>
                            <p className={styles.link} onClick={() => toggleModalSprint()}>Criar novo Sprint</p>
                        </ModalSimple>
                    </button>
                </h2>
                <p className="subtitulo">Seus projetos, pastas organizadoras e sprints</p>
                {
                    projects !== undefined && user.teams !== undefined ?
                        <ListProjects listProjects={projects}/>
                        : ''
                }
                {
                    projectActive !== false && <ListBoxes boxes={projectActive.boxes} />
                }
                <Modal isVisible={modalProject} close={() => toggleModalProject()}>
                    <h2 className="titulo h2 c-dark mb-2">Vamos criar seu novo projeto!</h2>
                    <form onSubmit={(event) => createProject(event)}>
                        <p className="errorMsg" style={projectName === false || color === false ? {display: 'block'} : {display: 'none'}}>
                            {
                                color === false && 'Por favor, escolha uma cor para o seu Projeto.'
                            }
                            {
                                projectName === false && 'Por favor, nomeie o seu Projeto.'
                            }
                        </p>
                        <fieldset className="mb-2">
                            <label htmlFor="nome" className={styles.label}>Nome do projeto</label>
                            <input type="text" className="input input-bordered" id="nome" onKeyUp={(item) => setProjectName(item.target.value)}/>
                        </fieldset>
                        <fieldset className="mb-2">
                            <label htmlFor="cor" className={styles.label}>Vamos colorir um pouco?</label>
                            <input type="color" id="cor" className="input input-bordered" value={color} onChange={(item) => setColor(item.target.value)}/>
                        </fieldset>
                        <button className="btn btn-primary"><span>Enviar</span></button>
                    </form>
                </Modal>
                <Modal isVisible={modalBox} close={() => toggleModalBox()}>
                    <h2 className="titulo h2 c-dark mb-2">Vamos organizar um pouco as coisas!</h2>
                    <form onSubmit={(event) => createBox(event)}>
                        <p className="errorMsg" style={boxProject === false || boxName === false ? {display: 'block'} : {display: 'none'}}>
                            {
                                boxProject === false && 'Por favor, escolha um projeto para o seu Box Organizador.'
                            }
                            {
                                boxName === false && 'Por favor, nomeie o seu Box Organizador.'
                            }
                        </p>
                        <fieldset className={`mb-2 ${boxName === false ? 'error' : ''}`}>
                            <label htmlFor="nome" className="label">Nome do box organizador</label>
                            <input type="text" className="input input-bordered" id="nome" onKeyUp={(item) => setBoxName(item.target.value)}/>
                        </fieldset>
                        <fieldset className={`mb-2 ${boxProject === false ? 'error' : ''}`}>
                            <label htmlFor="projectID" className="label">Selecione o projeto ao qual o Box irá pertencer</label>
                            <select className="input input-bordered" id="projectID" onChange={(item) => setBoxProject(item.target.value)}>
                                <option value="null">Selecione um projeto</option>
                                {
                                    projects !== undefined && projects.map((item,index) => {
                                        return(
                                            <option value={item.id} key={`p${index}`}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </fieldset>
                        <button className="btn btn-primary"><span>Enviar</span></button>
                    </form>
                </Modal>
                <Modal isVisible={modalSprint} close={() => toggleModalSprint()}>
                    <h2 className="titulo h2 c-dark mb-2">Vamos criar seu sprint!</h2>
                    <form onSubmit={(event) => createSprint(event)}>
                        <p className="errorMsg" style={sprintProject === false || sprintBox === false || sprintDate === false || sprintName === false ? {display: 'block'} : {display: 'none'}}>
                            {
                                sprintProject === false && 'Por favor, escolha um projeto para que possa escolher um Box para o seu sprint.'
                            }
                            {
                                sprintBox === false && 'Por favor, escolha um Box para o seu sprint.'
                            }
                            {
                                sprintDate === false && 'Por favor, você precisa definir uma data final para o seu sprint.'
                            }
                            {
                                sprintName === false && 'Por favor, nomeie o seu Sprint.'
                            }
                        </p>
                        <fieldset className={`mb-2 ${sprintName === false ? 'error' : ''}`}>
                            <label htmlFor="sprintNome" className="label">Nome do sprint</label>
                            <input type="text" className="input input-bordered" id="sprintNome" onKeyUp={(item) => setSprintName(item.target.value)}/>
                        </fieldset>
                        <fieldset className={`mb-2 ${sprintProject === false ? 'error' : ''}`}>
                            <label htmlFor="sprintProjectID" className="label">Selecione o projeto ao qual o Sprint irá pertencer</label>
                            <select className="input input-bordered" id="sprintProjectID" onChange={(item) => setSprintProject(item.target.value)}>
                                <option value="null">Selecione um projeto</option>
                                {
                                    projects !== undefined && projects.map((item,index) => {
                                        return(
                                            <option value={item.id} key={`p${index}`}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </fieldset>
                        <fieldset className={`mb-2 ${sprintBox === false ? 'error' : ''}`}>
                            <label htmlFor="sprintBoxID" className="label">Selecione o box ao qual o Sprint irá pertencer</label>
                            <select className="input input-bordered" id="sprintBoxID" onChange={(item) => setSprintBox(item.target.value)}>
                                <option value="null">Selecione um box</option>
                                {
                                    projects !== undefined && projects.map((item,index) => {
                                        if(item.id === Number(sprintProject)){
                                            return item.boxes.map((box, key) => {
                                                return(
                                                    <option value={box.id} key={`p${key}`}>{box.name}</option>
                                                )
                                            })
                                        }
                                    })
                                }
                            </select>
                        </fieldset>
                        <fieldset className={`mb-2 ${sprintDate === false ? 'error' : ''}`}>
                            <label htmlFor="sprintData" className="label">Até quando esse Sprint irá correr?</label>
                            <input type="date" className="input input-bordered" id="sprintData" onChange={(item) => setSprintDate(item.target.value)}/>
                        </fieldset>
                        <button className="btn btn-primary"><span>Enviar</span></button>
                    </form>
                </Modal>
            </div>

            <MobileMenu user={user} toggleModal={(tipo) => toggleModal(tipo)} />

        </div>
    )
}
