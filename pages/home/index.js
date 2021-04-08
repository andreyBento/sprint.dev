import styles from '../../public/css/Home.module.scss';
import Aside from "../../components/Aside";

export default function Home() {
    return (
        <div className="d-flex">
            <Aside/>
            <p>Home</p>
        </div>
    )
}
