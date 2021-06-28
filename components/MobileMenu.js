import styles from '/public/css/MobileMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ModalSimple from "./ModalSimple";
import React, {useState} from "react";

export default function MobileMenu({user, toggleModal}) {
    const [modalNew, setModalNew] = useState(false);

    function toggleCreate(){
        setModalNew(!modalNew);
    }

    return(
        <div className={styles.menu}>
            <button className={`btn btn-primary ${styles.btnAdd}`} onClick={() => toggleCreate()}>
                <FontAwesomeIcon icon={faPlus}/>
                <ModalSimple isVisible={modalNew} position={"top"} center={true}>
                    <p className={styles.link} onClick={() => toggleModal('project')}>Criar novo Projeto</p>
                    <p className={styles.link} onClick={() => toggleModal('box')}>Criar novo Box Organizador</p>
                    <p className={styles.link} onClick={() => toggleModal('sprint')}>Criar novo Sprint</p>
                </ModalSimple>
            </button>
        </div>
    )
}