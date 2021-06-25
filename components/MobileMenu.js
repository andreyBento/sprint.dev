import styles from '../public/css/MobileMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCalendar, faComment, faColumns, faHome } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
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
            {/*<nav className={styles.nav}>*/}
            {/*    <ul className={styles.navList}>*/}
            {/*        <li className={styles.navItem}>*/}
            {/*            <Link href="/">*/}
            {/*                <a className={styles.navLink}><FontAwesomeIcon icon={faCalendar}/></a>*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={styles.navItem}>*/}
            {/*            <Link href="/">*/}
            {/*                <a className={styles.navLink}><FontAwesomeIcon icon={faComment}/></a>*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={styles.navItem}>*/}
            {/*            <Link href="/">*/}
            {/*                <a className={styles.navLink}><FontAwesomeIcon icon={faColumns}/></a>*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={styles.navItem}>*/}
            {/*            <Link href="/">*/}
            {/*                <a className={styles.navLink}><FontAwesomeIcon icon={faHome}/></a>*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}
            {/*{user.firstName !== undefined && <button className={`btn ml-2 ${styles.btnUser}`} style={{backgroundColor: user.bgColor}}>{user.firstName.slice(0,1)}</button>}*/}
        </div>
    )
}