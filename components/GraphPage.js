import styles from '/public/css/GraphPage.module.scss';
import Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import {useEffect, useRef, useState} from "react";

export default function GraphPage({updateSprint, sprint, expiredSprint}){
    HC_exporting(Highcharts);

    function diferencaEmDias(inicio, fim) {
        const time = fim.getTime() - inicio.getTime();
        return Math.floor(time / (1000 * 3600 * 24));
    }

    const [burndownOptions, setBurndowOptions] = useState({
        title: {
            text: 'Gráfico Burndown'
        },
        yAxis: {
            title: {
                text: 'Tarefas'
            }
        },
        chart: {
            type: 'line'
        },
        plotOptions: {
            series: {
                pointStart: 1
            }
        },
        series: [
            {
                name: 'Mundo ideal',
                data: []
            },
            {
                name: 'Progresso',
                data: []
            }
        ]
    });
    useEffect(() => {
        // const createdAt = new Date(new Date(sprint.createdAt).setHours(24,0,0));
        const createdAt = new Date(sprint.createdAt);
        const expiresAt = new Date(sprint.expiresAt);

        // console.log(new Date(new Date(sprint.createdAt).setHours(new Date(sprint.createdAt).getHours() - 24)))

        // Mundo Ideal
        let mundoIdealArray = [];
        const calcIdeal = Math.round(sprint.tasks.length/diferencaEmDias(createdAt, expiresAt));
        let valorIdeal = sprint.tasks.length;
        for(let i = 1; i <= diferencaEmDias(createdAt, expiresAt); i++){
            if(i === diferencaEmDias(createdAt, expiresAt)){
                valorIdeal = 0;
            } else {
                valorIdeal -= calcIdeal;
            }

            mundoIdealArray.push(valorIdeal);
        }

        // Progresso
        let progressoArray = [];
        for(let i = 1; i <= diferencaEmDias(createdAt, expiresAt);){
            let tasks = 0;

            sprint.tasks.map((item) => {
                if(item.status === 'feito'){
                    tasks ++;
                }
            });

            progressoArray.push(tasks);

            if(i === (diferencaEmDias(createdAt, new Date()) + 1)){
                i = diferencaEmDias(createdAt, expiresAt) + 1;
            } else {
                i++;
            }
        }

        setBurndowOptions({
            series: [
                {
                    name: 'Mundo ideal',
                    data: mundoIdealArray
                },
                {
                    name: 'Progresso',
                    data: progressoArray
                }
            ]
        });
    }, []);

    const [tasksOptions, setTasksOptions] = useState({
        title: {
            text: 'Tarefas'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        chart: {
            type: 'column'
        },
        legend: {
            enabled: false
        },
        series: []
    });
    useEffect(() => {
        let backlog = 0;
        let andamento = 0;
        let revisao = 0;
        let feitas = 0;
        sprint.tasks.map((item) => {
            if(item.status === 'backlog'){
                backlog += 1;
            }
            if(item.status === 'andamento'){
                andamento += 1;
            }
            if(item.status === 'revisão'){
                revisao += 1;
            }
            if(item.status === 'feito'){
                feitas += 1;
            }
        });
        setTasksOptions({
            series: [
                {
                    name: "Quantidade de tarefas",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Total",
                            y: sprint.tasks.length,
                            color: '#547DEF'
                        },
                        {
                            name: "Backlog",
                            y: backlog,
                            color: '#7FDBDA'
                        },
                        {
                            name: "Em andamento",
                            y: andamento,
                            color: '#EDE682'
                        },
                        {
                            name: "Em revisão",
                            y: revisao,
                            color: '#FEBF63'
                        },
                        {
                            name: "Feitas",
                            y: feitas,
                            color: '#ADE498'
                        }
                    ]
                }
            ]
        });
    }, []);

    const [teamsOptions, setTeamsOptions] = useState({
        title: {
            text: 'Tarefas por status e por time'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        chart: {
            type: 'column'
        },
        legend: {
            enabled: false
        },
        series: []
    });
    useEffect(() => {
        const seriesData = [];

        sprint.teams.map((team) => {
            let backlog = 0;
            let andamento = 0;
            let revisao = 0;
            let feitas = 0;

            team.tasks.map((task) => {
                if(task.status === 'backlog'){
                    backlog += 1;
                }
                if(task.status === 'andamento'){
                    andamento += 1;
                }
                if(task.status === 'revisão'){
                    revisao += 1;
                }
                if(task.status === 'feito'){
                    feitas += 1;
                }
            });

            const teamData = {
                name: team.name,
                data: [backlog, andamento, revisao, feitas],
                color: team.bgColor
            }
            seriesData.push(teamData);
        });

        setTeamsOptions({
            xAxis: {
                categories: ['Backlog', 'Andamento', 'Revisão', 'Feitas']
            },
            series: seriesData
        });
    }, []);

    return (
        <div className={styles.graphWrapper}>
            <div className={styles.boxGraph}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={burndownOptions}
                />
            </div>
            <div className={`mt-2 ${styles.boxGraph}`}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={tasksOptions}
                />
            </div>
            <div className={`mt-2 ${styles.boxGraph}`}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={teamsOptions}
                />
            </div>
        </div>
    )
}