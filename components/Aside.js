import styles from "../public/css/Aside.module.scss";
import UserBar from "./UserBar";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Aside({user}) {
    const router = useRouter();

    function logout() {
        window.localStorage.removeItem('AUTH_TOKEN');
        router.push(`/login`);
    }

    return(
        <aside className={styles.aside}>
            <div className={`d-flex align-items-center justify-content-between ${styles.logo}`}>
                <h1 className="titulo h1">
                    <Link href="/home"><a tabIndex="0" aria-label="Clique para acessar a página inicial.">Sprint.dev</a></Link>
                </h1>
            </div>
            <div className={`${styles.box}`}>
                <UserBar user={user}/>
            </div>
            <ul className={styles.listaLinks}>
                <li className={styles.link}><button className={`btn-link ${styles.action}`} onClick={() => logout()}>Sair</button></li>
            </ul>
        </aside>
    )
}