import styles from '/public/css/Login.module.scss';
import React, {useEffect} from 'react';
import Link from "next/link";
import LoginAuth from "/components/LoginAuth";

export default function Login() {

    useEffect(() => {
        //API KEY // AIzaSyCLBol1XnKr6paARfwFoeWBkZCn_Ra6Y4g
        // ID CLIENT //302072904653-rc1olciu9gikr98lcmqfn26g0rkaotu4.apps.googleusercontent.com
        // SECRET KEY //8RZSRrrc2eDxPSwOKoyeQeqx
    }, [])

    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.dir}>
                <p className={`fw-600 ${styles.msgFlutuante}`}>Ainda não é cadastrado? <Link href="/cadastro"><a className="link c-azul">Cadastre-se agora.</a></Link></p>
                <div className={styles.info}>
                    <h1 className="titulo h1 mb-2">entrar no <strong>Sprint.dev</strong></h1>
                    <div className="g-signin2" data-onsuccess="onSignIn" />
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
