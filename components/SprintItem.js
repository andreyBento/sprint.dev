import styles from "../public/css/SprintItem.module.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
import React, {useState} from "react";
import {useRouter} from 'next/router';
import Modal from "./Modal";

export default function SprintItem({sprint, keyValue}) {
    const router = useRouter();
    const arrayName = sprint.name.split(' ');
    let url = '';
    arrayName.map((item, index) => {
        if(index > 0){
            url += `-${item.toLowerCase()}`;
        } else {
            url += item.toLowerCase();
        }
    });

    function diasRestantes() {
        const sprintDate = new Date(sprint.expiresAt);
        const today = new Date();
        const time = sprintDate.getTime() - today.getTime();
        return Math.floor(time / (1000 * 3600 * 24));
    }

    function changePage(event) {
        if(event){
            event.preventDefault();
        }

        window.localStorage.setItem('SPRINT_TOKEN', sprint.id);

        router.push(`/${url}`);
    }

    function deleteSprint() {
        if (window.confirm("Você realmente deseja remover esse sprint?")) {
            const options = {
                method: 'DELETE'
            };
            fetch(`http://localhost:8080/sprints/${sprint.id}`, options)
                .then((res) => {
                    location.reload();
                })
                .catch(err => console.error(err));
        }
    }

    const [newName, setNewName] = useState(sprint.name);
    const [newDate, setNewDate] = useState('');
    function updateSprint(e){
        e.preventDefault();
        if(newDate === ''){
            setNewDate(false);
        } else {
            const update = {
                name: newName,
                expireAt: new Date(`${newDate} 18:00`).toString()
            }
            const optionsTeam = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            };
            return fetch(`http://localhost:8080/sprints/${sprint.id}`, optionsTeam)
                .then((res) => res.json())
                .then((res) => {
                    location.reload();
                })
                .catch(err => console.error(err));
        }
    }

    const [modalOpen, setModalOpen] = useState(false);
    function toggleModal(){
        if(modalOpen === false){
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('body')[0].removeAttribute('style');
        }
        setModalOpen(!modalOpen);
    }

    return (
        <div className={styles.sprint} key={keyValue} >
            <div className={styles.sprintBox} onClick={() => changePage()}>
                <p className={styles.sprintName}>{sprint.name}</p>
                <p className={styles.sprintTime}>Faltam {diasRestantes()} dias pro fim do Sprint!</p>
            </div>
            <div className={styles.nav}>
                <ul className={styles.listaLinks}>
                    <li className={styles.linkItem} onClick={() => toggleModal()}>
                        <FontAwesomeIcon icon={faPencilAlt} className={styles.link} />
                    </li>
                    <li className={styles.linkItem} onClick={() => deleteSprint()}>
                        <FontAwesomeIcon icon={faTrash} className={styles.link} />
                    </li>
                </ul>
            </div>
            <Modal isVisible={modalOpen} close={() => toggleModal()}>
                <form onSubmit={(e) =>  updateSprint(e)}>
                    <fieldset>
                        <label htmlFor="" className="label">Novo nome do Sprint</label>
                        <input type="text" className="input input-bordered" defaultValue={newName} onKeyUp={(e) => setNewName(e.target.value)}/>
                    </fieldset>
                    <fieldset className={`mt-2 ${newDate === false ? 'error' : ''}`}>
                        <label htmlFor="" className="label">Nova data de término Sprint</label>
                        <input type="date" className="input input-bordered" onChange={(e) => setNewDate(e.target.value)}/>
                    </fieldset>
                    <button className="btn btn-primary mt-2" type="submit">Confirmar atualização</button>
                </form>
            </Modal>
        </div>
    )
}