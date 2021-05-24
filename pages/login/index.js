import styles from '../../public/css/Login.module.scss';
import React  from 'react';
import Link from "next/link";
import LoginAuth from "../../components/loginAuth";

export default function Login() {

    return (
        <section className={styles.wrapper}>
            <div className={styles.dir}>
                <p className={`fw-600 ${styles.msgFlutuante}`}>Ainda não é cadastrado? <Link href="/cadastro"><a className="link c-azul">Cadastre-se agora.</a></Link></p>
                <div className={styles.info}>
                    <h1 className="titulo h1 mb-2">entrar no <strong>Sprint.dev</strong></h1>
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
