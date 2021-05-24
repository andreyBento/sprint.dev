import styles from '../../public/css/Home.module.scss';
import Aside from "../../components/Aside";
import React, {useState, useEffect} from "react";
import RightSide from "../../components/RightSide";

export default function Home() {

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
            <Aside user={user}/>
            <p>Home</p>
            <RightSide user={user} />
        </div>
    )
}
