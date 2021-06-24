import styles from '../public/css/TeamCard.module.scss';
import React from "react";

export default function TeamCard({team}) {

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardColor} style={{backgroundColor: team.bgColor}} />
                <p className={styles.cardHeaderInfo}>
                    <span className={styles.cardLabel}>Time</span>
                    <span className={styles.cardTeam}>{team.name}</span>
                </p>
            </div>
            <ul className={styles.cardUsers}>
                {
                    team.people.map((item, index) => {
                        return(
                            <p className={styles.cardUsersItem} key={`w${index}`}>{item.firstName.slice(0,1)}</p>
                        )
                    })
                }
            </ul>
            <div className={styles.cardFooter}>
                <p>{team.tasks.length} tarefas em andamento</p>
            </div>
        </div>
    )
}