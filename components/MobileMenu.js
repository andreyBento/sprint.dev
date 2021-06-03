import styles from '../public/css/MobileMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCalendar, faComment, faColumns, faHome } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

export default function MobileMenu({user}) {

    return(
        <div className={styles.menu}>
            <button className={`btn btn-primary ${styles.btnAdd}`}><FontAwesomeIcon icon={faPlus}/></button>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/">
                            <a className={styles.navLink}><FontAwesomeIcon icon={faCalendar}/></a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/">
                            <a className={styles.navLink}><FontAwesomeIcon icon={faComment}/></a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/">
                            <a className={styles.navLink}><FontAwesomeIcon icon={faColumns}/></a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/">
                            <a className={styles.navLink}><FontAwesomeIcon icon={faHome}/></a>
                        </Link>
                    </li>
                </ul>
            </nav>
            {user.firstName !== undefined && <button className={`btn ${styles.btnUser}`} style={{backgroundColor: user.bgColor}}>{user.firstName.slice(0,1)}</button>}
        </div>
    )
}