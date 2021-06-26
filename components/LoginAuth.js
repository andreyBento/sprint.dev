import styles from '/public/css/Login.module.scss';
import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import PasswordInput from "./PasswordInput";

export default function LoginAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const router = useRouter();

    const validarLogin = (event) => {
        event.preventDefault();
        let exist = false;
        existingUsers.map((item, index) => {
            if(item.email === email && item.password === password){
                localStorage.setItem('COMMON', true);
                localStorage.setItem('AUTH_TOKEN', item.id);
                exist = true;
            }
        });
        if(exist){
            router.push(`/home`);
        } else {
            setError("e-mail ou senha incorretos");
        }
    };

    const [existingUsers, setExistingUsers] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET'
        };

        fetch(`http://localhost:8080/users/`, options)
            .then((res) => res.json())
            .then((res) => {
                setExistingUsers(res);
            })
            .catch(err => console.error(err))
    }, []);

    return (
        <form onSubmit={(event) => validarLogin(event)}>
            <p className="errorMsg" style={error !== false ? {display: 'block'} : {display: 'none'}}>{error}</p>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="user" className="label">e-mail</label>
                <input type="email" className="input" id="user" onKeyUp={(item) => setEmail(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <div className="d-flex align-items-end justify-content-between">
                    <label htmlFor="password" className="label">senha</label>
                    <p className="fs-12"><Link href="/esq-senha"><a className="link c-azul">esqueceu sua senha?</a></Link></p>
                </div>
                <PasswordInput onKeyUp={(value) => setPassword(value)} id="password" />
            </fieldset>
            <button className="btn btn-primary">entrar</button>
        </form>
    );
}