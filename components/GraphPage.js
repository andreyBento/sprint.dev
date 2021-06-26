import styles from '../public/css/GraphPage.module.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useEffect, useState} from "react";

export default function GraphPage({updateSprint, sprint}){

    const [burndownIdealWorldData, setBurndowIdealWorldData] = useState([3,2,1,0]);
    const [burndownData, setBurndowData] = useState([3,2,2,1]);
    useEffect(() => {
        const createdAt = new Date(sprint.createdAt);
        const expiresAt = new Date(sprint.expiresAt);

        console.log(createdAt, expiresAt)

        let idealWorld = [sprint.tasks.length, 0];
    }, []);

    const options = {
        title: {
            text: 'Gráfico Burndown'
        },
        chart: {
            type: 'line'
        },
        series: [
            {
                data: burndownIdealWorldData
            },
            {
                data: burndownData
            }
        ]
    }

    return (
        <div className={styles.graphWrapper}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}