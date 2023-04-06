import styles from "../public/css/EventPage.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import Select from "react-select";
import apiUrl from "../apiUrl/apiUrl";

export default function EventCard({item, options, updateSprint, expiredSprint}){

    const [defaultValueSelect, setDefaultValueSelect] = useState(options);
    const [teamsOptions, setTeamsOptions] = useState(options);
    const [eventTeams, setEventTeams] = useState(item.teams);
    const [eventName, setEventName] = useState(item.name);
    const [eventMsg, setEventMsg] = useState(item.msg);
    const [eventDate, setEventDate] = useState('');
    const [eventHour, setEventHour] = useState('');

    useEffect(() => {
        let arraySelected = [];
        teamsOptions.map((item) => {
            eventTeams.map((team) => {
                if(team.id === item.value){
                    arraySelected.push(item);
                }
            })
        });
        setDefaultValueSelect(arraySelected);

        let time = new Date(item.date).getHours() + ':' + new Date(item.date).getMinutes();
        setEventHour(time);

        let month = (new Date(item.date).getMonth() + 1) < 10 ? '0' + (new Date(item.date).getMonth() + 1) : (new Date(item.date).getMonth() + 1)
        let day = new Date(item.date).getDate() < 10 ? '0' + new Date(item.date).getDate() : new Date(item.date).getDate()
        let date = new Date(item.date).getFullYear() + '-' + month + '-' + day;
        setEventDate(date);
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    function toggleModal(){
        if(modalOpen === false){
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('body')[0].removeAttribute('style');
        }
        setModalOpen(!modalOpen);
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

    function deleteEvent() {
        if (window.confirm("Você realmente deseja deletar essa reunião?")) {
            const options = {
                method: 'DELETE'
            };
            const url = apiUrl(window.location.origin);
            fetch(`${url}/events/${item.id}`, options)
                .then((res) => {
                    updateSprint();
                })
                .catch(err => console.error(err));
        }
    }

    function updateEvent(e){
        e.preventDefault();
        const dateMeeting = new Date(`${eventDate} ${eventHour}`).toString();
        const updateEvent = {
            name: eventName,
            msg: eventMsg,
            date: dateMeeting,
            teams_id: eventTeams
        }
        const optionsWorkersStatus = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateEvent)
        };
        const url = apiUrl(window.location.origin);
        fetch(`${url}/events/${item.id}`, optionsWorkersStatus)
            .then((res) => res.json())
            .then((res) => {
                updateSprint();
                document.getElementsByTagName('body')[0].removeAttribute('style');
            })
            .catch(err => console.error(err));
    }

    function selectedOption(e){
        const selectedArray = [];
        e.map((item) => {
            selectedArray.push(item.value);
        });
        setEventTeams(selectedArray);
    }

    return (
        <div className={styles.eventCard}>
            <div className="d-flex align-items-center justify-content-between">
                <EventDate data={item.date} />
                <ul className={styles.listaActions}>
                    <li className={`${styles.item} btn btn-primary ${expiredSprint && 'disabled'}`} onClick={expiredSprint ? undefined : () => toggleModal()}>
                        <FontAwesomeIcon icon={faPencilAlt} className={styles.action} />
                    </li>
                    <li className={`${styles.item} btn btn-danger ${expiredSprint && 'disabled'}`} onClick={expiredSprint ? undefined : () => deleteEvent()}>
                        <FontAwesomeIcon icon={faTrash} className={styles.action} />
                    </li>
                </ul>
            </div>
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
            <Modal isVisible={modalOpen} close={() => toggleModal()}>
                <form onSubmit={(e) => updateEvent(e)} className={`${styles.modalForm}`}>
                    <div className="row">
                        <fieldset className={`col ${eventName === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="name">Nome da reunião</label>
                            <input type="text" defaultValue={item.name} className={`input input-bordered`} id="name" onKeyUp={(item) => setEventName(item.target.value)}/>
                        </fieldset>
                        <fieldset className={`col ${eventMsg === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="msg">Mensagem da reunião</label>
                            <textarea id="msg" defaultValue={item.msg} className={`input input-bordered textarea`} onKeyUp={(item) => setEventMsg(item.target.value)} />
                        </fieldset>
                    </div>
                    <div className="row">
                        <fieldset className={`col ${eventDate === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="date">Dia da reunião</label>
                            <input type="date" defaultValue={eventDate} className={`input input-bordered`} id="date" onChange={(item) => setEventDate(item.target.value)}/>
                        </fieldset>
                        <fieldset className={`col ${eventHour === false ? styles.error : ''}`}>
                            <label className={`label mb-1`} htmlFor="hour">Hora da reunião</label>
                            <input type="time" defaultValue={eventHour} className={`input input-bordered`} id="hour" onChange={(item) => setEventHour(item.target.value)}/>
                        </fieldset>
                    </div>
                    <fieldset className={`mt-2 ${eventTeams === false ? styles.error : ''}`}>
                        <label htmlFor="times" className={`label mb-1`}>Adicionar times:</label>
                        <Select
                            defaultValue={defaultValueSelect}
                            className="basic-single"
                            isSearchable
                            name="times"
                            isMulti
                            options={teamsOptions}
                            onChange={(e) => selectedOption(e)}
                        />
                    </fieldset>
                    <div className="d-flex mt-2">
                        <button disabled={expiredSprint && 'disabled'} className="btn btn-sm btn-primary">Alterar Reunião</button>
                        <button className="btn btn-sm btn-cinza ml-2" type="reset" onClick={() => toggleModal()}>Cancelar</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}