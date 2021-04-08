import styles from '../public/css/Login.module.scss';
import {useQuery, gql} from '@apollo/client';
import React, {useState} from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import {AUTH_TOKEN} from "../back-end/src/constants";
import PasswordInput from "./PasswordInput";

const USERS = gql`
  {
    users{
        email
        password
        id
    }
  }
`;

export default function LoginAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const router = useRouter();

    const { data } = useQuery(USERS);

    const validarLogin = (event) => {
        event.preventDefault();
        let exist = false;
        data.users.map((item, index) => {
            if(item.email === email && item.password === password){
                localStorage.setItem(AUTH_TOKEN, item.id);
                exist = true;
            }
        });
        if(exist){
            router.push(`/home`);
        } else {
            setError("e-mail ou senha incorretos");
        }
    };

    return (
        <form onSubmit={(event) => validarLogin(event)}>
            <p className={styles.errorMsg} style={error !== false ? {display: 'block'} : {display: 'none'}}>{error}</p>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="user" className={styles.label}>e-mail</label>
                <input type="email" className="input" id="user" onKeyUp={(item) => setEmail(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <div className="d-flex align-items-end justify-content-between">
                    <label htmlFor="password" className={styles.label}>senha</label>
                    <p className="fs-12"><Link href="/esq-senha"><a className="link c-azul">esqueceu sua senha?</a></Link></p>
                </div>
                <PasswordInput onKeyUp={(value) => setPassword(value)} id="password" />
            </fieldset>
            <button className="btn btn-primary">entrar</button>
        </form>
    );
}