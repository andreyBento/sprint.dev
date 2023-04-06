import styles from '/public/css/EventPage.module.scss';
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import apiUrl from "../apiUrl/apiUrl";
import EventCard from "./EventCard";

export default function EventPage({updateSprint, sprint, expiredSprint}){

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
        const url = apiUrl(window.location.origin);
        fetch(`${url}/events/add`, optionsWorkersStatus)
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
                        <button disabled={expiredSprint && 'disabled'} className="btn btn-sm btn-primary">Criar Reunião</button>
                        <button className="btn btn-sm btn-cinza ml-2" type="reset" onClick={() => toggleTaskForm()}>Cancelar</button>
                    </div>
                </form>
                <button disabled={expiredSprint && 'disabled'} className={`${styles.btnAddEventPlus} ${createEventForm === true ? 'd-none' : ''}`} onClick={() => toggleTaskForm()}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {
                sprintEvents.length > 0 &&
                    <ul className={styles.cards}>
                        {
                            sprintEvents.map((item, index) => {
                                return (
                                    <li key={`ec${index}`} className={styles.cardsLi}>
                                        <EventCard expiredSprint={expiredSprint} updateSprint={updateSprint} options={teamsOptions} item={item} />
                                    </li>
                                )
                            })
                        }
                    </ul>
            }
        </div>
    )
}