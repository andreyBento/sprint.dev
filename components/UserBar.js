import styles from "../public/css/UserBar.module.scss";
import {gql, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import {AUTH_TOKEN} from "../back-end/src/constants";
import Link from "next/link";

const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      firstName
      lastName
      colorBg
    }
  }
`;

export default function UserBar({job = false}) {
    const ID = localStorage.getItem(AUTH_TOKEN);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        colorBg: ''
    });

    const { loading, data } = useQuery(USER, {
        variables: {
            id: ID
        },
        onCompleted: ({user}) => {
            setUser(user);
        }
    });

    function lastNameFirstUppercase(text) {
        for(var i = 0; i < text.length; i++){
            if(text.charAt(i) === text.charAt(i).toUpperCase() && text.charAt(i) !== ' '){
                return text.charAt(i);
            }
        }
    }

    return (
        <Link href="/perfil">
            <a tabIndex="0" aria-label="Clique para acessar seu perfil" className={styles.wrapper}>
                <span className={styles.esferaUser} style={{backgroundColor: user.colorBg}}>
                    <span>{user.firstName.slice(0,1)}{lastNameFirstUppercase(user.lastName)}</span>
                </span>
                <span className={styles.infoUser}>
                    <span className={styles.nome}>{user.firstName} {user.lastName}</span>
                    { job && <span className={styles.job}>B</span> }
                </span>
            </a>
        </Link>
    )
}