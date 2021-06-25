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
        </div>
    )
}