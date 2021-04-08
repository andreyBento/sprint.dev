import styles from "../public/css/Aside.module.scss";
import ClientOnly from "./ClientOnly";
import UserBar from "./UserBar";
import Link from "next/link";

export default function Aside() {

    return(
        <aside className={styles.aside}>
            <div className={`d-flex align-items-center justify-content-between ${styles.logo}`}>
                <h1 className="titulo h1">
                    <Link href="/home"><a tabIndex="0" aria-label="Clique para acessar a página inicial.">Sprint.dev</a></Link>
                </h1>
            </div>
            <div className={`${styles.box}`}>
                <ClientOnly>
                    <UserBar/>
                </ClientOnly>
            </div>
        </aside>
    )
}