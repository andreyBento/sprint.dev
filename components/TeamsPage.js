import styles from "/public/css/SprintInterna.module.scss";
import TeamCard from "./TeamCard";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

export default function TeamsPage({teams, updateTeams, updateSprint}) {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET'
        };
        fetch(`http://localhost:8080/users/`, options)
            .then((res) => res.json())
            .then((res) => {
                let newArray = [];
                res.map((item) => {
                    const option = {
                        value: item.id,
                        label: item.username
                    }
                    newArray.push(option);
                });
                setUsers(newArray);
            })
            .catch(err => console.error(err))
    }, []);

    const [teamName, setTeamName] = useState('');
    const [teamBgColor, setTeamBgColor] = useState('');
    const [teamPeople, setTeamPeople] = useState([]);

    function createTeam(e) {
        e.preventDefault();
        const sprintId = Number(window.localStorage.getItem('SPRINT_TOKEN'));

        const createTeam = {
            name: teamName,
            bgColor: teamBgColor,
            people: teamPeople,
            team_sprints: [sprintId]
        }
        const optionsWorkersStatus = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createTeam)
        };
        return fetch(`http://localhost:8080/teams/addComplete`, optionsWorkersStatus)
            .then((res) => res.json())
            .then((res) => {
                updateTeams();
            })
            .catch(err => console.error(err));
    }

    const [createTeamForm, setCreateTeamForm] = useState(false);
    function toggleTaskForm() {
        setCreateTeamForm(!createTeamForm);
    }

    function selectedOption(e){
        let arrayPeople = [];
        e.map((person) => {
            arrayPeople.push(person.value);
        });
        setTeamPeople(arrayPeople);
    }

    return (
        <div className={styles.teamWrapper}>
            <div className={styles.btnAddTeam}>
                <form onSubmit={(e) => createTeam(e)} className={`${styles.btnAddTeamForm} ${createTeamForm === true ? 'd-block' : ''}`}>
                    <div className="row">
                        <fieldset className={`mt-1 col ${teamName === false ? styles.error : ''}`}>
                            <label className={styles.label} htmlFor="name">Nome do time</label>
                            <input type="text" className={styles.input} id="name" onKeyUp={(item) => setTeamName(item.target.value)}/>
                        </fieldset>
                        <fieldset className={`mt-1 col ${teamBgColor === false ? styles.error : ''}`}>
                            <label className={styles.label} htmlFor="cor">Cor do time</label>
                            <input type="color" className={`${styles.input} ${styles.inputColor}`} id="cor" value={teamBgColor} onChange={(item) => setTeamBgColor(item.target.value)}/>
                        </fieldset>
                    </div>
                    <fieldset className={`mt-1 ${teamPeople === false ? styles.error : ''}`}>
                        <label htmlFor="pessoas" className={`label mb-1`}>Adicionar pessoas:</label>
                        <Select
                            className="basic-single"
                            isSearchable
                            name="pessoas"
                            isMulti
                            options={users}
                            onChange={(e) => selectedOption(e)}
                        />
                    </fieldset>
                    <button className="btn btn-sm btn-primary mt-2">Criar time</button>
                </form>
                <button className={`${styles.btnAddTaskPlus} ${createTeamForm === true ? 'd-none' : ''}`} onClick={() => toggleTaskForm()}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {
                teams.map((item, index) => {
                    return (
                        <div key={`team${index}`} className={styles.teamItem}>
                            <TeamCard updateSprint={updateSprint} updateTeams={updateTeams} team={item}/>
                        </div>
                    )
                })
            }
        </div>
    )
}