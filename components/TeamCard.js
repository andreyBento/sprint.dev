import styles from '/public/css/TeamCard.module.scss';
import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import Select from 'react-select';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import apiUrl from "../apiUrl/apiUrl";

export default function TeamCard({team, updateTeams, updateSprint}) {

    const [modalOpen, setModalOpen] = useState(false);
    function toggleModal(){
        if(modalOpen === false){
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('body')[0].removeAttribute('style');
        }
        setModalOpen(!modalOpen);
    }

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET'
        };
        const url = apiUrl(window.location.origin);
        fetch(`${url}/users/`, options)
            .then((res) => res.json())
            .then((res) => {
                let newArray = [];
                res.map((item) => {
                    let isNew = true;
                    team.people.map((person) => {
                        if(person.id === item.id){
                            isNew = false;
                        }
                    });
                    if(isNew === true){
                        const option = {
                            value: item.id,
                            label: item.username
                        }
                        newArray.push(option);
                    }
                });
                setUsers(newArray);
            })
            .catch(err => console.error(err))
    }, []);

    const [selectedOptions, setSelectedOptions] = useState([]);
    function selectedOption(e){
        setSelectedOptions(e);
    }

    function deletarTime(){
        if (window.confirm("Você realmente deseja deletar essa time?")) {
            const options = {
                method: 'DELETE'
            };
            const url = apiUrl(window.location.origin);
            fetch(`${url}/teams/${team.id}`, options)
                .then((res) => {
                    toggleModal();
                    updateTeams();
                    updateSprint();
                })
                .catch(err => console.error(err));
        }
    }

    function adicionarPessoas(e){
        e.preventDefault();
        const updateTeam = {
            idPeople: []
        }
        team.people.map((item) => {
            updateTeam.idPeople.push(item.id);
        });
        selectedOptions.map((item) => {
            updateTeam.idPeople.push(item.value);
        });

        const optionsTeam = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateTeam)
        };
        const url = apiUrl(window.location.origin);
        return fetch(`${url}/teams/${team.id}/peopleAdd`, optionsTeam)
            .then((res) => res.json())
            .then((res) => {
                updateTeams();
            })
            .catch(err => console.error(err));
    }

    const [updateTeam, setUpdateTeam] = useState(false);
    const [teamName, setTeamName] = useState(team.name);
    const [teamBgColor, setTeamBgColor] = useState(team.bgColor);
    function atualizarForm() {
        setUpdateTeam(!updateTeam);
    }

    function alterarTime(){
        const novaInfo = {
            name: teamName,
            bgColor: teamBgColor
        }
        const optionsTeam = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaInfo)
        };
        const url = apiUrl(window.location.origin);
        return fetch(`${url}/teams/${team.id}`, optionsTeam)
            .then((res) => res.json())
            .then((res) => {
                updateTeams();
                updateSprint();
            })
            .catch(err => console.error(err));
    }

    function removerUsuario(id) {
        if (window.confirm("Você realmente deseja remover esse usuário?")) {
            const userToDelete = {
                idUser: id
            }
            const options = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToDelete)
            };
            const url = apiUrl(window.location.origin);
            fetch(`${url}/teams/${team.id}/people`, options)
                .then((res) => {
                    toggleModal();
                    updateTeams();
                    updateSprint();
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div>
            <div className={styles.card} onClick={() => toggleModal()}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardColor} style={{backgroundColor: team.bgColor}} />
                    <p className={styles.cardHeaderInfo}>
                        <span className={styles.cardLabel}>Time</span>
                        <span className={`${styles.cardTeam}`}>{team.name}</span>
                    </p>
                </div>
                <ul className={styles.cardUsers}>
                    {
                        team.people.length === 0 &&
                            <li><p className={styles.teamPeopleMsg}>Esse time não possui pessoas, por favor clique neste card para adicionar.</p></li>
                    }
                    {
                        team.people.map((item, index) => {
                            return(
                                <li key={`w${index}`}>
                                    <p className={styles.cardUsersItem}>{item.firstName.slice(0,1)}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={styles.cardFooter}>
                    {
                        team.tasks.length === 0 ?
                            <p>Esse time não possui tarefas</p>
                            :
                            <p>{team.tasks.length} {team.tasks.length > 1 ? 'tarefas' : 'tarefa'}</p>
                    }
                </div>
            </div>
            <Modal isVisible={modalOpen} close={() => toggleModal()}>
                <div className={styles.modalConteudo}>
                    <div className={`${styles.cardHeader}`}>
                        <div className="d-flex align-items-center">
                            <div className={styles.cardColor} style={{backgroundColor: teamBgColor}} />
                            <input type="color" value={teamBgColor} className={`${styles.inputBgColor} ${updateTeam === false ? 'd-none' : ''}`} onChange={(e) => setTeamBgColor(e.target.value)}/>
                        </div>
                        <div className={`${updateTeam === true ? 'ml-2' : ''}`}>
                            <p className={`${styles.cardHeaderInfo} ${updateTeam === true ? 'pl-2' : ''}`}>
                                <span className={styles.cardLabel}>{updateTeam === true ? 'Novo nome do time' : 'Time'}</span>
                                <span className={`${styles.cardTeam} ${updateTeam === true ? 'd-none' : ''}`}>{team.name}</span>
                            </p>
                            <input defaultValue={teamName} type="text" className={`input ${updateTeam === false ? 'd-none' : ''}`} onKeyUp={(e) => setTeamName(e.target.value)}/>
                        </div>
                    </div>
                    {
                        team.people.length > 0 &&
                        <h4 className={`titulo h4 mt-2`}>Pessoas que trabalham nessa equipe:</h4>
                    }
                    {
                        team.people.length > 0 &&
                        <ul className={`mt-1 mb-4 ${styles.listaUsers}`}>
                            {
                                team.people.map((item, index) => {
                                    return (
                                        <li key={`tp${index}`} className={`position-relative`}>
                                            <button
                                                className={`btn btn-danger ${updateTeam === false ? styles.active : ''} ${styles.btnDeletarUser}`}
                                                onClick={() => removerUsuario(item.id)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} className={styles.btnDeletarUserIcon} />
                                            </button>
                                            <p className={styles.cardUsersItem} title={item.username}>{item.firstName.slice(0,1)}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                    <form className={team.people.length === 0 ? 'mt-4' : ''} onSubmit={(e) => adicionarPessoas(e)}>
                        <label htmlFor="pessoas" className={`label mb-1`}>Adicionar pessoas:</label>
                        <Select
                            className="basic-single"
                            isSearchable
                            name="pessoas"
                            isMulti
                            options={users}
                            onChange={(e) => selectedOption(e)}
                        />
                        <button className={`btn btn-primary mt-2 ${styles.btnAdd}`}>Adicionar</button>
                    </form>
                    <div className={`mt-6 ${styles.actionWrapper} ${updateTeam === false ? 'd-none' : 'd-block'}`}>
                        <button className={`btn btn-success ${styles.actionWrapperBtn}`} onClick={() => alterarTime()}>Confirmar atualização</button>
                        <button className={`btn btn-cinza ${styles.actionWrapperBtn}`} onClick={() => atualizarForm()}>Cancelar atualização</button>
                    </div>
                    <div className={`mt-6 ${styles.actionWrapper} ${updateTeam === true ? 'd-none' : 'd-block'}`}>
                        <button className={`btn btn-cinza ${styles.actionWrapperBtn}`} onClick={() => atualizarForm()}>Alterar time</button>
                        <button className={`btn btn-danger ${styles.actionWrapperBtn}`} onClick={() => deletarTime()}>Deletar time</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}