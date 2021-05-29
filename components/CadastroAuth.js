import styles from '../public/css/Login.module.scss';
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import PasswordInput from "./PasswordInput";

export default function CadastroAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(false);

    const colors = [
        '#ADE498',
        '#EDE682',
        '#FE91CA',
        '#FEBF63',
        '#7FDBDA'
    ];
    let color = randomIntFromInterval(0, (colors.length - 1));

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const router = useRouter();

    function createUser() {
        let firstNameFirstWord = firstName.split(' ')[0];
        let lastNameFirstWord = lastName.split(' ')[0];
        const username = `@${firstNameFirstWord.toLowerCase() + lastNameFirstWord.toLowerCase()}`;
        const user = {
            firstName,
            lastName,
            email,
            password,
            username,
            bgColor: colors[color]
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        fetch(`http://localhost:8080/users/add`, options)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                window.localStorage.setItem('AUTH_TOKEN', res.id);
                router.push('/home')
            })
            .catch(err => console.error(err))
    }

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

    const validarCadastro = (event) => {
        event.preventDefault();
        if(password !== passwordConf){
            setError("as senhas não são iguais")
        } else {
            if(email.includes('@')){
                let exist = false;
                existingUsers.map((item) => {
                    if(item.email === email){
                        exist = true;
                    }
                });
                if(exist){
                    setError("esse e-mail já está sendo usado");
                } else {
                    setError(false);
                    createUser();
                }
            } else {
                setError("este e-mail não é valido")
            }
        }
    };

    return (
        <form onSubmit={(event) => validarCadastro(event)}>
            <p className="errorMsg" style={error !== false ? {display: 'block'} : {display: 'none'}}>{error}</p>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="name" className="label">nome</label>
                <input type="text" className="input" id="name" onKeyUp={(item) => setFirstName(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="lastName" className="label">sobrenome</label>
                <input type="text" className="input" id="lastName" onKeyUp={(item) => setLastName(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="email" className="label">e-mail</label>
                <input type="email" className="input" id="email" onKeyUp={(item) => setEmail(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="password" className="label">senha</label>
                <PasswordInput onKeyUp={(value) => setPassword(value)} id="password" />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="passwordConf" className="label">confirme sua senha</label>
                <PasswordInput onKeyUp={(value) => setPasswordConf(value)} id="passwordConf" />
            </fieldset>
            <button className="btn btn-primary">cadastrar</button>
        </form>
    );
}