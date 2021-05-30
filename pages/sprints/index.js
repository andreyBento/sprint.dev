import styles from '../../public/css/SprintsPage.module.scss';
import React, {useState, useEffect} from "react";

export default function SprintsPage() {

    const [user, setUser] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET'
        };

        const userID = window.localStorage.getItem('AUTH_TOKEN');

        fetch(`http://localhost:8080/users/${userID}`, options)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            })
            .catch(err => console.error(err))
    }, []);

    return (
        <div className="d-flex">
            <p>p</p>
        </div>
    )
}
