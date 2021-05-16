
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../Styles/chart.css';
import { fetch_DailyData } from './API/Api.js';
import { Line, Bar } from 'react-chartjs-2';


const Chart = ({ data, country }) => {

    const { confirmed, recovered, deaths } = data;
    const [dailyData, setDailyData] = useState([]);   // taking array as we have to map this later


    // ------------------     DATA FOR THE LINE CHART GLOBAL   ----------------
    useEffect(() => {
        const DAILY_DATA = async () => {
            const INFO = await fetch_DailyData();
            setDailyData(INFO);
        }

        DAILY_DATA();
    }, []);


    useEffect(() => {
        console.log(dailyData);  // array of obj [{} {} {}]
    }, [dailyData]);



    const Line_Graph = (
        dailyData.length !== 0 ?
            (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        // datasets: [{} {}]
                        datasets: [
                            {
                                data: dailyData.map(({ confirmed }) => confirmed),
                                label: 'Infected',
                                borderColor: '#4ecdc4',
                                fill: true,
                                width: "100",
                                height: 100,
                                tension: 0.1
                            },

                            {
                                data: dailyData.map(({ deaths }) => deaths),
                                label: 'Deaths',
                                borderColor: 'crimson',
                                // backgroundColor: "rgba(75,192,192,0.2)",
                                fill: true,
                            }
                        ]
                    }}
                    width={400}
                    height={150}
                />
            ) : null
    );



    // ------------------------------   FOR Each Country represented in a Bar Graph  ----------------
    const Bar_Chart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            data: [confirmed.value, recovered.value, deaths.value],
                        },
                    ],
                }}

                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    );



    return (
        <div>
            <div>
                {country ? Bar_Chart : Line_Graph}
            </div>
        </div>
    )
}

export default Chart;
