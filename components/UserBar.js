import styles from "/public/css/UserBar.module.scss";
import React, {useEffect, useState} from "react";
import Link from "next/link";

export default function UserBar({job = false, user}) {

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
                <span className={styles.esferaUser} style={{backgroundColor: user.bgColor}}>
                    <span>{user.firstName !== undefined && user.firstName.slice(0,1)}{user.lastName !== undefined && lastNameFirstUppercase(user.lastName)}</span>
                </span>
                <span className={styles.infoUser}>
                    <span className={styles.nome}>{user.firstName} {user.lastName}</span>
                    { job && <span className={styles.job}>B</span> }
                </span>
            </a>
        </Link>
    )
}