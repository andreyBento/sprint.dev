import styles from '../public/css/EventPage.module.scss';
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export default function EventPage({updateSprint, sprint}){

    const [teamsOptions, setTeamsOptions] = useState([]);
    const [eventTeams, setEventTeams] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventMsg, setEventMsg] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventHour, setEventHour] = useState('');

    useEffect(() => {
        let optionsArray = [];

        if(sprint.teams.length > 0){
            sprint.teams.map((item) => {
                const option = {
                    value: item.id,
                    label: item.name
                }
                optionsArray.push(option);
            });
        }

        setTeamsOptions(optionsArray);
    }, []);

    const [sprintEvents, setSprintEvents] = useState([]);
    useEffect(() => {
        let eventArray = [];

        if(sprint.events.length > 0){
            sprint.events.map((item) => {
                eventArray.push(item);
            });
        }

        setSprintEvents(eventArray);
    }, []);

    const [createEventForm, setCreateEventForm] = useState(false);
    function toggleTaskForm() {
        setCreateEventForm(!createEventForm);
    }

    function createEvent(e) {
        e.preventDefault();
        const dateMeeting = new Date(`${eventDate} ${eventHour}`).toString();
        const newEvent = {
            name: eventName,
            msg: eventMsg,
            date: dateMeeting,
            event_teams: eventTeams,
            idSprint: sprint.id
        }
        const optionsWorkersStatus = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        };
        fetch(`http://localhost:8080/events/add`, optionsWorkersStatus)
            .then((res) => res.json())
            .then((res) => {
                updateSprint();
            })
            .catch(err => console.error(err));
    }

    function selectedOption(e) {
        const selectedArray = [];
        e.map((item) => {
            selectedArray.push(item.value);
        });
        setEventTeams(selectedArray);
    }

    function EventDate({data}) {
        const dataFinal = new Date(data);
        let diaDaSemana = '';

        switch (dataFinal.getDay()){
            case 0:
                diaDaSemana = 'Domingo';
                break;

            case 1:
                diaDaSemana = 'Segunda';
                break;

            case 2:
                diaDaSemana = 'Terça';
                break;

            case 3:
                diaDaSemana = 'Quarta';
                break;

            case 4:
                diaDaSemana = 'Quinta';
                break;

            case 5:
                diaDaSemana = 'Sexta';
                break;

            case 6:
                diaDaSemana = 'Sábado';
                break;
        }

        return (
            <div className={styles.cardDate}>
                <p>{dataFinal.getDate()}</p>
                <div className={styles.cardDateInfo}>
                    <p>{diaDaSemana}</p>
                    <p className={styles.cardDateInfoHour}>{dataFinal.getHours() < 10 ? '0' + dataFinal.getHours() : dataFinal.getHours()} : {dataFinal.getMinutes() < 10 ? '0' + dataFinal.getMinutes() : dataFinal.getMinutes()}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.eventWrapper}>
            <div className={styles.btnAddEvent}>
                <form onSubmit={(e) => createEvent(e)} className={`${styles.btnAddEventForm} ${createEventForm === true ? 'd-block' : ''}`}>
                    <div className="row">
                        <fieldset className={`col ${eventName === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="name">Nome da reunião</label>
                            <input type="text" className={`input`} id="name" onKeyUp={(item) => setEventName(item.target.value)}/>
                        </fieldset>
                        <fieldset className={`col ${eventMsg === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="msg">Mensagem da reunião</label>
                            <textarea id="msg" className={`input`} onKeyUp={(item) => setEventMsg(item.target.value)} />
                        </fieldset>
                    </div>
                    <div className="row">
                        <fieldset className={`col ${eventDate === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="date">Dia da reunião</label>
                            <input type="date" className={`input`} id="date" onChange={(item) => setEventDate(item.target.value)}/>
                        </fieldset>
                        <fieldset className={`col ${eventHour === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="hour">Hora da reunião</label>
                            <input type="time" className={`input`} id="hour" onChange={(item) => setEventHour(item.target.value)}/>
                        </fieldset>
                    </div>
                    <fieldset className={`mt-2 ${eventTeams === false ? styles.error : ''}`}>
                        <label htmlFor="times" className={`label mb-1`}>Adicionar times:</label>
                        <Select
                            className="basic-single"
                            isSearchable
                            name="times"
                            isMulti
                            options={teamsOptions}
                            onChange={(e) => selectedOption(e)}
                        />
                    </fieldset>
                    <div className="d-flex mt-2">
                        <button className="btn btn-sm btn-primary">Criar Reunião</button>
                        <button className="btn btn-sm btn-cinza ml-2" type="reset" onClick={() => toggleTaskForm()}>Cancelar</button>
                    </div>
                </form>
                <button className={`${styles.btnAddEventPlus} ${createEventForm === true ? 'd-none' : ''}`} onClick={() => toggleTaskForm()}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {
                sprintEvents.length > 0 &&
                    <ul className={styles.cards}>
                        {
                            sprintEvents.map((item) => {
                                return (
                                    <li className={styles.eventCard}>
                                        <EventDate data={item.date} />
                                        <div className={styles.eventCardBox}>
                                            <p className={styles.eventCardName}>{item.name}</p>
                                            <p className={styles.eventCardMsg}>{item.msg}</p>
                                            <ul className={styles.eventCardTeams}>
                                                {
                                                    item.teams.map((team) => {
                                                        return (
                                                            <li>
                                                                <div className={styles.eventCardTeam} style={{backgroundColor: team.bgColor}}>
                                                                    {team.name}
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
            }
        </div>
    )
}