import styles from "../public/css/SprintInterna.module.scss";
import TeamCard from "./TeamCard";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export default function TeamsPage({teams}) {

    const [teamName, setTeamName] = useState('');
    const [teamPeople, setTeamPeople] = useState([]);

    function createTeam(e) {
        e.preventDefault();
    }

    return (
        <div className={styles.teamWrapper}>
            <div className={styles.btnAddTeam}>
                <form onSubmit={(e) => createTeam(e)} className={styles.btnAddTeamForm}>
                    <fieldset className={`mt-1 ${teamName === false ? styles.error : ''}`}>
                        <label className={styles.label} htmlFor="name">Nome do time</label>
                        <input type="text" className={styles.input} id="name" onKeyUp={(item) => setTeamName(item.target.value)}/>
                    </fieldset>
                    <fieldset className={`mt-1 ${teamPeople === false ? styles.error : ''}`}>
                        <label className={styles.label} htmlFor="pessoas">Pessoas desse time</label>
                        <select className={styles.input} id="pessoas" multiple onChange={(item) => setTeamPeople(item.target.value)}>
                            <option value="null">Qual a prioridade dessa tarefa?</option>
                        </select>
                    </fieldset>
                </form>
                <button className={`${styles.btnAddTaskPlus}`} onClick={() => toggleTaskForm()}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {
                teams.map((item, index) => {
                    return (
                        <div key={`team${index}`} className={styles.teamItem}>
                            <TeamCard team={item}/>
                        </div>
                    )
                })
            }
        </div>
    )
}