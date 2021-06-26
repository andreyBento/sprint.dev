import styles from '/public/css/Login.module.scss';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import LoginAuth from "/components/LoginAuth";
import { signIn, useSession } from 'next-auth/client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {useRouter} from "next/router";

export default function Login(){
    const [session, loading] = useSession();
    const router = useRouter();

    const colors = [
            '#ADE498',
            '#EDE682',
            '#FE91CA',
            '#FEBF63',
            '#7FDBDA'
        ];
    function randomIntFromInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const color = randomIntFromInterval(0, (colors.length - 1));

    function createUser(){
        let firstNameFirstWord = session.user.name.split(' ')[0];
        const username = `@${firstNameFirstWord.toLowerCase()}`;
        const passwordGenerated = session.user.name + session.user.name.slice(0,1).toUpperCase() + randomIntFromInterval(1, 20);

        const newUser = {
            firstName: session.user.name,
            lastName: session.user.name,
            email: session.user.email,
            password: passwordGenerated,
            username: username,
            bgColor: colors[color]
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        };
        fetch(`http://localhost:8080/users/add`, options)
            .then((res) => res.json())
            .then((res) => {
                window.localStorage.setItem('AUTH_TOKEN', res.id);
                router.push('/home')
            })
            .catch(err => console.error(err))
    }

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET'
        };

        fetch(`http://localhost:8080/users/`, options)
            .then((res) => res.json())
            .then((res) => {
                setUsers(res);
            })
            .catch(err => console.error(err))
    }, []);

    function checkUser(){
        let isNew = true;
        const options = {
            method: 'GET'
        };

        fetch(`http://localhost:8080/users/`, options)
            .then((res) => res.json())
            .then((res) => {
                res.map((item) => {
                    if(item.email === session.user.email){
                        console.log('notNew')
                        isNew = false;
                        localStorage.setItem('AUTH_TOKEN', item.id);
                        router.push(`/home`);
                    }
                });
                if(isNew){
                    createUser();
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if(session !== null && session !== undefined){
            checkUser();
        }
    }, [session]);

    return (
        <section className={styles.wrapper}>
            <div className={styles.dir}>
                <p className={`fw-600 ${styles.msgFlutuante}`}>Ainda não é cadastrado? <Link href="/cadastro"><a className="link c-azul">Cadastre-se agora.</a></Link></p>
                <div className={styles.info}>
                    <h1 className="titulo h1 mb-2">entrar no <strong>Sprint.dev</strong></h1>
                    <button className={`btn btn-github mb-4`} onClick={() => signIn()}><FontAwesomeIcon icon={faGithub} className="btn-github_icon" /> Sign in with GitHub</button>
                    <LoginAuth/>
                </div>
            </div>
            <div className={styles.esq}>
                <img className={styles.esqImg} src="/img/img-login.png" alt="Imagem"/>
                <p className={styles.ilustracaoDireitos}>
                    Arte por: <a className="link c-azul" href="https://storyset.com/mobile" target="_blank" tabIndex="0" aria-label="Clique para acessar mais sobre Freepik Storyset. Este link irá lhe redirecionar para outro site.">Freepik Storyset</a>
                </p>
            </div>
        </section>
    )
}
