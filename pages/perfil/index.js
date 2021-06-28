import styles from '/public/css/Perfil.module.scss';
import Aside from "/components/Aside";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import PasswordInput from "/components/PasswordInput";
import {useRouter} from "next/router";
import apiUrl from "../../apiUrl/apiUrl";
import Loading from "../../components/Loading";

export default function Perfil() {
    const router = useRouter();

    const [user, setUser] = useState({});
    useEffect(() => {
        atualizarUser();
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bgColor, setBgColor] = useState('');
    function atualizarPrimeiraSecao(e) {
        e.preventDefault();

        let firstNameFirstWord = firstName.split(' ')[0];
        let lastNameFirstWord = lastName.split(' ')[0];
        const newUsername = `@${firstNameFirstWord.toLowerCase() + lastNameFirstWord.toLowerCase()}`;
        setUsername(newUsername);

        const update = {
            firstName,
            lastName,
            username: newUsername,
            email,
            bgColor
        }

        const optionsBasic = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        };
        const url = apiUrl(window.location.origin);
        return fetch(`${url}/users/${user.id}`, optionsBasic)
            .then((res) => res.json())
            .then((res) => {
                atualizarUser();
                setEditBasic(!editBasic)
            })
            .catch(err => console.error(err));
    }

    const [editBasic, setEditBasic] = useState(false);
    function editarBasico() {
        if(editBasic === true){
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setEmail(user.email);
            setBgColor(user.bgColor);
        }
        setEditBasic(!editBasic);
    }

    function atualizarUser() {
        const options = {
            method: 'GET'
        };
        const userID = window.localStorage.getItem('AUTH_TOKEN');
        const url = apiUrl(window.location.origin);
        fetch(`${url}/users/${userID}`, options)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
                setFirstName(res.firstName);
                setLastName(res.lastName);
                setUsername(res.username);
                setEmail(res.email);
                setBgColor(res.bgColor);
                document.getElementById('loader').remove();
            })
            .catch(err => console.error(err))
    }

    const [novaSenha, setNovaSenha] = useState('');
    const [confNovaSenha, setConfNovaSenha] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    function atualizarSegundaSecao(e) {
        e.preventDefault();

        if(novaSenha !== '' && confNovaSenha !== ''){
            if(novaSenha === confNovaSenha){
                setPasswordError(false);
                const updatePassword = {
                    password: novaSenha
                }

                const optionsPassword = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatePassword)
                };
                const url = apiUrl(window.location.origin);
                return fetch(`${url}/users/${user.id}/password`, optionsPassword)
                    .then((res) => res.json())
                    .then((res) => {
                        atualizarUser();
                    })
                    .catch(err => console.error(err));
            } else{
                setPasswordError(true);
            }
        }
    }

    function deletarConta(){
        if (window.confirm("Você realmente deseja deletar sua conta?")) {
            const options = {
                method: 'DELETE'
            };
            const url = apiUrl(window.location.origin);
            fetch(`${url}/users/${user.id}`, options)
                .then((res) => {
                    window.localStorage.removeItem('AUTH_TOKEN');
                    router.push(`/login`);
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div className="d-flex">
            <Aside/>
            <Loading id={'loader'} />
            <div className={`conteudo`}>
                <Link href={'/'}>
                    <a className={`btnVoltar`} tabIndex={0} aria-label={"Clique para retornar para a página inicial,"}>
                        <FontAwesomeIcon icon={faArrowLeft} className={`btnVoltarIcone`} />
                        <span>Home</span>
                    </a>
                </Link>
                <div className="mt-4">
                    <h2 className="titulo h2">Informações básicas</h2>
                    <h3 className="titulo h3 mt-4 mb-2">Nome, email e cor de perfil</h3>
                    <form onSubmit={(e) => atualizarPrimeiraSecao(e)}>
                        <div className="row">
                            <fieldset className="col">
                                <label htmlFor="firstname" className="label">Seu nome</label>
                                <input type="text" className={`input`} id="firstname" readOnly={!editBasic} defaultValue={user.firstName} onKeyUp={(item) => setFirstName(item.target.value)}/>
                            </fieldset>
                            <fieldset className="col">
                                <label htmlFor="lastname" className="label">Seu sobrenome</label>
                                <input type="text" className={`input`} id="lastname" readOnly={!editBasic} defaultValue={user.lastName} onKeyUp={(item) => setLastName(item.target.value)}/>
                            </fieldset>
                        </div>
                        <div className="row">
                            <fieldset className="col">
                                <label htmlFor="email" className="label">Seu email</label>
                                <input type="email" className={`input`} readOnly={!editBasic} defaultValue={user.email} onKeyUp={(item) => setEmail(item.target.value)}/>
                            </fieldset>
                            <fieldset className="col">
                                <label htmlFor="bgcolor" className="label">Sua cor de perfil</label>
                                <input type="color" className={`input`} id="bgcolor" disabled={!editBasic} defaultValue={user.bgColor} onChange={(item) => setBgColor(item.target.value)}/>
                            </fieldset>
                        </div>
                        <div className={`mt-2 ${editBasic === true ? 'd-flex' : 'd-none'}`}>
                            <button className="btn btn-success" type="submit">Confirmar alterações</button>
                            <button className="btn btn-cinza ml-2" type="reset" onClick={() => editarBasico()}>Descartar alterações</button>
                        </div>
                    </form>
                    <div className={`${editBasic === false ? 'd-flex' : 'd-none'}`}>
                        <button className="btn btn-primary mt-2" onClick={() => editarBasico()}>Alterar estas informações</button>
                    </div>

                    <h3 className="titulo h3 mt-4 mb-2">Senha e email</h3>
                    <form onSubmit={(e) => atualizarSegundaSecao(e)}>
                        <p className={`${passwordError === true ? '' : 'd-none'} c-danger fs-14`}>As senhas não são iguais</p>
                        <div className={`row mt-2`}>
                            <fieldset className={`col ${passwordError === true ? 'error' : ''}`}>
                                <label htmlFor="nova-senha" className="label">Nova senha</label>
                                <PasswordInput id="nova-senha" onKeyUp={(value) => setNovaSenha(value)} />
                            </fieldset>
                            <fieldset className={`col ${passwordError === true ? 'error' : ''}`}>
                                <label htmlFor="conf-nova-senha" className="label">Confirmar nova senha</label>
                                <PasswordInput id="conf-nova-senha" onKeyUp={(value) => setConfNovaSenha(value)} />
                            </fieldset>
                        </div>
                        <button className="btn btn-primary mt-2" type="submit">Atualizar senha</button>
                    </form>

                    <button className="btn btn-danger mt-8" onClick={() => deletarConta()}>Deletar minha conta</button>
                </div>
            </div>
        </div>
    )
}
