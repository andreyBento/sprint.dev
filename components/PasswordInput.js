import styles from "/public/css/PasswordInput.module.scss";
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

export default function PasswordInput({onKeyUp, id}) {
    const [type, setType] = useState('password');

    const changeType = () => {
        if(type === 'password'){
            setType("text");
        } else {
            setType("password");
        }
    };

    return(
        <div className={styles.passwordWrapper}>
            <input type={type} className={`input`} id={id} onKeyUp={(item) => onKeyUp(item.target.value)} />
            <FontAwesomeIcon icon={type === "password" ? faEyeSlash : faEye} className={styles.passwordIcon} onClick={() => changeType()} />
        </div>
    )
}