import styles from '../public/css/Login.module.scss';
import {useQuery, gql, useMutation} from '@apollo/client';
import React, {useState} from "react";
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

const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      user: {
         email: $email
         password: $password
         firstName: $firstName
         lastName: $lastName
      }
    ) {
      id
    }
  }
`;

export default function CadastroAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(false);

    const router = useRouter();

    const { data } = useQuery(USERS);

    const [createUser] = useMutation(CREATE_USER, {
        variables: {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        },
        onCompleted: ({ createUser }) => {
            localStorage.setItem(AUTH_TOKEN, createUser.id);
        }
    });

    const validarCadastro = (event) => {
        event.preventDefault();
        if(password !== passwordConf){
            setError("as senhas não são iguais")
        } else {
            if(email.includes('@')){
                let exist = false;
                data.users.map((item) => {
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
            <p className={styles.errorMsg} style={error !== false ? {display: 'block'} : {display: 'none'}}>{error}</p>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="name" className={styles.label}>nome</label>
                <input type="text" className="input" id="name" onKeyUp={(item) => setFirstName(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="lastName" className={styles.label}>sobrenome</label>
                <input type="text" className="input" id="lastName" onKeyUp={(item) => setLastName(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="email" className={styles.label}>e-mail</label>
                <input type="email" className="input" id="email" onKeyUp={(item) => setEmail(item.target.value)} />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="password" className={styles.label}>senha</label>
                <PasswordInput onKeyUp={(value) => setPassword(value)} id="password" />
            </fieldset>
            <fieldset className={`mb-2 ${error !== false ? styles.error : ''}`}>
                <label htmlFor="passwordConf" className={styles.label}>confirme sua senha</label>
                <PasswordInput onKeyUp={(value) => setPasswordConf(value)} id="passwordConf" />
            </fieldset>
            <button className="btn btn-primary">cadastrar</button>
        </form>
    );
}