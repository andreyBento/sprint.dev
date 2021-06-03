import styles from '../public/css/Comment.module.scss';

export default function Comment({style, comment, isMine = false, keyValue}) {

    return(
        <div key={keyValue} className={`${styles.comment} ${isMine === true ? styles.isMine : ''}`} style={style}>
            {isMine === false && <p className={styles.commentOwner}>{comment.owner.firstName.slice(0,1)}</p>}
            <p className={styles.commentTexto}>{comment.msg}</p>
        </div>
    )
}