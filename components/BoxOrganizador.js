import styles from "/public/css/BoxOrganizador.module.scss";
import SprintItem from "./SprintItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import Modal from "./Modal";

export default function BoxOrganizador({box}) {

    const [modalOpen, setModalOpen] = useState(false);
    function toggleModal(){
        if(modalOpen === false){
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('body')[0].removeAttribute('style');
        }
        setModalOpen(!modalOpen);
    }

    const [newName, setNewName] = useState(box.name);
    function updateBox(e) {
        e.preventDefault();
        if(newName === ''){
            setNewName(false);
        } else {
            const update = {
                name: newName
            }
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            };
            return fetch(`http://localhost:8080/boxes/${box.id}`, options)
                .then((res) => res.json())
                .then((res) => {
                    location.reload();
                })
                .catch(err => console.error(err));
        }
    }

    function deleteBox(){
        if (window.confirm("Você realmente deseja remover esse box?")) {
            const options = {
                method: 'DELETE'
            };
            fetch(`http://localhost:8080/boxes/${box.id}`, options)
                .then((res) => {
                    location.reload();
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div className={styles.box}>
            <p className={styles.boxName}>{box.name}</p>
            <div className={styles.actions}>
                <ul className={styles.listaActions}>
                    <li className={`${styles.item} btn btn-primary`} onClick={() => toggleModal()}>
                        <FontAwesomeIcon icon={faPencilAlt} className={styles.action} />
                    </li>
                    <li className={`${styles.item} btn btn-danger`} onClick={() => deleteBox()}>
                        <FontAwesomeIcon icon={faTrash} className={styles.action} />
                    </li>
                </ul>
            </div>
            {
                box.sprints !== undefined && box.sprints.map(((item, index) => {
                    return(
                        <SprintItem sprint={item} keyValue={`sp${index}`} />
                    )
                }))
            }
            <Modal isVisible={modalOpen} close={() => toggleModal()}>
                <form onSubmit={(e) =>  updateBox(e)}>
                    <fieldset>
                        <label htmlFor="" className="label">Novo nome do Box</label>
                        <input type="text" className="input input-bordered" defaultValue={newName} onKeyUp={(e) => setNewName(e.target.value)}/>
                    </fieldset>
                    <button className="btn btn-primary mt-2" type="submit">Confirmar atualização</button>
                </form>
            </Modal>
        </div>
    )
}