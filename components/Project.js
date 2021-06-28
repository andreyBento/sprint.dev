import styles from "/public/css/Project.module.scss";
import Modal from "./Modal";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import apiUrl from "../apiUrl/apiUrl";

export default function Project({project, small = false, active, onClick}) {

    const [modalOpen, setModalOpen] = useState(false);
    function toggleModal(){
        if(modalOpen === false){
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('body')[0].removeAttribute('style');
        }
        setModalOpen(!modalOpen);
    }

    const [newName, setNewName] = useState(project.name);
    const [newBgColor, setNewBgColor] = useState(project.bgColor);
    function updateBox(e) {
        e.preventDefault();
        if(newName === ''){
            setNewName(false);
        } else {
            const update = {
                name: newName,
                bgColor: newBgColor
            }
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            };
            const url = apiUrl(window.location.origin);
            return fetch(`${url}/projects/${project.id}`, options)
                .then((res) => res.json())
                .then((res) => {
                    location.reload();
                })
                .catch(err => console.error(err));
        }
    }

    function deleteProject(){
        if (window.confirm("Você realmente deseja remover esse projeto?")) {
            const options = {
                method: 'DELETE'
            };
            const url = apiUrl(window.location.origin);
            fetch(`${url}/projects/${project.id}`, options)
                .then((res) => {
                    location.reload();
                })
                .catch(err => console.error(err));
        }
    }

    return(
        <div className={styles.projectWrapper}>
            <div onClick={() => onClick()} className={`${styles.project} ${small === false ? styles.projectSmall : ''} ${active === true ? styles.active : ''}`} style={{backgroundColor: project.bgColor}}>
                <div className={styles.nomeWrapper}>
                    <p className={styles.nome}>{project.name}</p>
                </div>
            </div>
            <div className={styles.actions}>
                <ul className={styles.listaActions}>
                    <li className={`${styles.item} btn btn-primary`} onClick={() => toggleModal()}>
                        <FontAwesomeIcon icon={faPencilAlt} className={styles.action} />
                    </li>
                    <li className={`${styles.item} btn btn-danger`} onClick={() => deleteProject()}>
                        <FontAwesomeIcon icon={faTrash} className={styles.action} />
                    </li>
                </ul>
            </div>
            <Modal isVisible={modalOpen} close={() => toggleModal()}>
                <form onSubmit={(e) =>  updateBox(e)}>
                    <fieldset>
                        <label htmlFor="" className="label">Novo nome do Box</label>
                        <input type="text" className="input input-bordered" defaultValue={newName} onKeyUp={(e) => setNewName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="mt-2">
                        <label htmlFor="" className="label">Nova cor do Box</label>
                        <input type="color" className="input input-bordered" defaultValue={newBgColor} onChange={(e) => setNewBgColor(e.target.value)}/>
                    </fieldset>
                    <button className="btn btn-primary mt-2" type="submit">Confirmar atualização</button>
                </form>
            </Modal>
        </div>
    )
}