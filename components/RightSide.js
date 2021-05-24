import styles from "../public/css/RightSide.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Project from "./Project";
import React, {useState, useEffect} from "react";
import Modal from "./Modal";
import ModalSimple from "./ModalSimple";
import BoxOrganizador from "./BoxOrganizador";

export default function RightSide({user}) {

    const [projectName, setProjectName] = useState('');
    const [color, setColor] = useState('');

    const [boxName, setBoxName] = useState('');

    const [modalNew, setModalNew] = useState(false);
    function openModalNew() {
        setModalNew(true);
    }

    console.log(user.projects);

    function selectProject(project) {
        setProjectActive(project);
    }

    const [projectActive, setProjectActive] = useState(false);
    const ListProjects = () => {

        return (
            user.projects.length === 0 ?
                <ul className={styles.projectsList}>
                    <li>
                        <p className={styles.empty}>Olá <strong>{user.firstName.split(' ')[0]}</strong>, você ainda não possui projetos.</p>
                        <p className={styles.empty}>Para criar um projeto acione o botão interativo ao lado do título "<strong>Crie algo novo</strong>"</p>
                    </li>
                </ul>
                :
                <ul className={styles.projectsList}>
                    {
                        user.projects.map((item, index) => {
                            if(projectActive.id === item.id){
                                return(
                                    <li className={styles.project} key={index} onClick={() => selectProject(item)} >
                                        <Project project={item} active={true} />
                                    </li>
                                )
                            } else {
                                return(
                                    <li className={styles.project} key={index} onClick={() => selectProject(item)} >
                                        <Project project={item} />
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
                console.log(res);
            })
            .catch(err => console.error(err))

        setModalProject(false);
        setModalNew(false);
    }

    const [modalBox, setModalBox] = useState(false);
    function toggleModalBox() {
        setModalBox(!modalBox);
        setModalNew(false);
    }

    const ListBoxes = () => {
        return(
            projectActive.boxes.length === 0 ?
                <ul className={styles.boxesList}>
                    <li>
                        <p className={styles.empty}>Você ainda não possui nenhum Box Organizador</p>
                        <p className={styles.empty}>Para criar um Box Organizador acione o botão interativo ao lado do título "<strong>Crie algo novo</strong>"</p>
                    </li>
                </ul>
                :
                <ul className={styles.boxesList}>
                    {projectActive.boxes.map((item, index) => {
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
        const box = {
            name: boxName,
            idProject: projectActive.id
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
                console.log(res);
            })
            .catch(err => console.error(err))

        setModalBox(false);
        setModalNew(false);
    }

    function toggleModalSprint() {

    }

    return (
        <div className={styles.rightSide}>
            <h2 className="titulo h2 d-flex align-items-center">
                <span>Crie algo novo!</span>
                <button className={`btn btn-primary btn-icone ${styles.btnAdd} position-relative`} onClick={() => openModalNew()}>
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
                user.projects !== undefined && <ListProjects/>
            }
            {
                projectActive !== false && <ListBoxes />
            }
            <Modal isVisible={modalProject} close={() => toggleModalProject()}>
                <h2 className="titulo h2 c-dark mb-2">Vamos criar seu novo projeto!</h2>
                <form onSubmit={(event) => createProject(event)}>
                    <fieldset className="mb-2">
                        <label htmlFor="nome" className={styles.label}>Nome do projeto</label>
                        <input type="text" className="input input-bordered" id="nome" onKeyUp={(item) => setProjectName(item.target.value)}/>
                    </fieldset>
                    <fieldset className="mb-2">
                        <label htmlFor="cor" className={styles.label}>Vamos colorir um pouco?</label>
                        <input type="color" id="cor" className="input input-bordered" onChange={(item) => setColor(item.target.value)}/>
                    </fieldset>
                    <button className="btn btn-primary"><span>Enviar</span></button>
                </form>
            </Modal>
            <Modal isVisible={modalBox} close={() => toggleModalBox()}>
                <h2 className="titulo h2 c-dark mb-2">Vamos organizar um pouco as coisas!</h2>
                <form onSubmit={(event) => createBox(event)}>
                    <fieldset className="mb-2">
                        <label htmlFor="nome" className={styles.label}>Nome do box organizador</label>
                        <input type="text" className="input input-bordered" id="nome" onKeyUp={(item) => setBoxName(item.target.value)}/>
                    </fieldset>
                    <button className="btn btn-primary"><span>Enviar</span></button>
                </form>
            </Modal>
        </div>
    )
}