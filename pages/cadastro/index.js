import styles from '../../public/css/Login.module.scss';
import React  from 'react';
import Link from "next/link";
import CadastroAuth from "../../components/cadastroAuth";

export default function Cadastro() {

    return (
        <section className={styles.wrapper}>
            <div className={styles.dir}>
                <p className={`fw-600 ${styles.msgFlutuante}`}>Já é cadastrado? <Link href="/login"><a className="link c-azul">Então faça login.</a></Link></p>
                <div className={styles.info}>
                    <h1 className="titulo h1 mb-2">cadastrar no <strong>Sprint.dev</strong></h1>
                    <CadastroAuth/>
                </div>
            </div>
            <div className={styles.esq}>
                <img className={styles.esqImg} src="/img/img-cadastro.png" alt="Imagem"/>
                <p className={styles.ilustracaoDireitos}>
                    Arte por: <a className="link c-azul" href="https://storyset.com/mobile" target="_blank" tabIndex="0" aria-label="Clique para acessar mais sobre Freepik Storyset. Este link irá lhe redirecionar para outro site.">Freepik Storyset</a>
                </p>
            </div>
        </section>
    )
}
