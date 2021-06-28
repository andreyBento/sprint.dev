import styles from '/public/css/Loading.module.scss';

export default function Loading({id}){

    return (
        <div className={styles.loading} id={id}>
            <div className={styles.ldsRoller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}