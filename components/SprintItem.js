import styles from "../public/css/SprintItem.module.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar, faChartBar, faColumns, faUsers} from '@fortawesome/free-solid-svg-icons'
import React from "react";
import Link from "next/link";
import {useRouter} from 'next/router';

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
        const sprintDate = new Date(`${sprint.expiresAt}, 18:00`);
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

    return (
        <div className={styles.sprint} key={keyValue} onClick={() => changePage()}>
            <p className={styles.sprintName}>{sprint.name}</p>
            <p className={styles.sprintTime}>Faltam {diasRestantes()} dias pro fim do Sprint!</p>
            <nav className={styles.nav}>
                <ul className={styles.listaLinks}>
                    <li className={styles.linkItem}>
                        <Link href={`/sprints/${url}`}>
                            <a onClick={(event) => changePage(event)} className={styles.link} tabIndex={0} aria-label={"Clique para acessar a página de tarefas deste sprint."}>
                                <FontAwesomeIcon icon={faColumns} className={styles.addIcon} />
                            </a>
                        </Link>
                    </li>
                    <li className={styles.linkItem}>
                        <Link href={`/sprints/${url}`}>
                            <a onClick={(event) => changePage(event)} className={styles.link} tabIndex={0} aria-label={"Clique para acessar a página de times deste sprint."}>
                                <FontAwesomeIcon icon={faUsers} className={styles.addIcon} />
                            </a>
                        </Link>
                    </li>
                    <li className={styles.linkItem}>
                        <Link href={`/sprints/${url}`}>
                            <a onClick={(event) => changePage(event)} className={styles.link} tabIndex={0} aria-label={"Clique para acessar a página de gráficos deste sprint."}>
                                <FontAwesomeIcon icon={faChartBar} className={styles.addIcon} />
                            </a>
                        </Link>
                    </li>
                    <li className={styles.linkItem}>
                        <Link href={`/sprints/${url}`}>
                            <a onClick={(event) => changePage(event)} className={styles.link} tabIndex={0} aria-label={"Clique para acessar a página de reuniões deste sprint."}>
                                <FontAwesomeIcon icon={faCalendar} className={styles.addIcon} />
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}