import styles from "../public/css/BoxOrganizador.module.scss";
import SprintItem from "./SprintItem";

export default function BoxOrganizador({box}) {

    return (
        <div className={styles.box}>
            <p className={styles.boxName}>{box.name}</p>
            {
                box.sprints !== undefined && box.sprints.map(((item, index) => {
                    return(
                        <SprintItem sprint={item} keyValue={`sp${index}`} />
                    )
                }))
            }
        </div>
    )
}