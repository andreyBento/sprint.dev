import styles from "/public/css/Aside.module.scss";
import UserBar from "./UserBar";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import { signOut, useSession } from 'next-auth/client';

export default function Aside() {
    const router = useRouter();
    const [session, loading] = useSession();

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
                updateProjects(res);
            })
            .catch(err => console.error(err))
    }, []);

    const [hadSession, setHadSession] = useState(false);
    useEffect(() => {
        if(localStorage.getItem('COMMON') === 'true'){
            setHadSession(false);
        } else {
            setHadSession(true);
        }
    }, []);
    useEffect(() => {
        if(session === null){
            if(hadSession === true){
                window.localStorage.removeItem('AUTH_TOKEN');
                router.push(`/login`);
            }
        }
    }, [session]);

    function logout() {
        if(session !== null){
            signOut();
        } else {
            window.localStorage.removeItem('AUTH_TOKEN');
            router.push(`/login`);
        }
    }

    function enterSprint(sprint) {
        const arrayName = sprint.name.split(' ');
        let url = '';
        arrayName.map((item, index) => {
            if(index > 0){
                url += `-${item.toLowerCase()}`;
            } else {
                url += item.toLowerCase();
            }
        });
        window.localStorage.setItem('SPRINT_TOKEN', sprint.id);
        router.push(`/${url}`);
        setTimeout(() => {
            location.reload();
        }, 100);
    }

    const [projects, setProjects] = useState([]);
    function updateProjects(user){
        if(user.teams !== undefined){
            if(user.teams.length > 0){
                let newProjects = [];

                user.teams.map((team) => {
                    team.sprints.map((otherSprint) => {
                        let isNew = true;
                        user.projects.map((project) => {
                            if(otherSprint.project.id === project.id){
                                isNew = false;
                            }
                        });
                        if(isNew === true){
                            let box = otherSprint.box;
                            box.sprints = team.sprints;
                            let project = otherSprint.project;
                            project.boxes = [box];
                            newProjects.push(project);
                        }
                    });
                });

                user.projects.map((item) => {
                    newProjects.push(item);
                });

                setProjects(newProjects);

            } else {
                setProjects(user.projects);
            }
        } else {
            setProjects(user.projects);
        }
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
            {
                projects !== undefined &&
                    <div className={`${styles.box} mt-4`}>
                        <ul className={styles.listaProjects}>
                            {
                                projects.length > 0 &&
                                projects.map((project) => {
                                    return (
                                        <li>
                                            <p className={styles.projetoNome}>{project.name}</p>
                                            {
                                                project.boxes.length > 0 &&
                                                <ul className={styles.listaBoxes}>
                                                    {
                                                        project.boxes.map((box) => {
                                                            return (
                                                                <li>
                                                                    <p className={styles.boxNome}>{box.name}</p>
                                                                    {
                                                                        box.sprints.length > 0 &&
                                                                        <ul className={styles.listaSprints}>
                                                                            {
                                                                                box.sprints.map((sprint) => {
                                                                                    return (
                                                                                        <li className={styles.linkSprint} onClick={() => enterSprint(sprint)}>
                                                                                            <p>{sprint.name}</p>
                                                                                        </li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    }
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
            }
            <ul className={styles.listaLinks}>
                <li className={styles.link}><button className={`btn-link ${styles.action}`} onClick={() => logout()}>Sair</button></li>
            </ul>
        </aside>
    )
}