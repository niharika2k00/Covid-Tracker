
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../Styles/chart.css';
import { fetch_DailyData, fetch_StateData } from './API/Api.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';


const Chart = ({ data, country, state }) => {

    const { confirmed, recovered, deaths } = data;
    const [dailyData, setDailyData] = useState([]);   // GLOBAL DATA ---- taking array as we have to map this later
    const [stateData, setStateData] = useState([]); // taking array as we have]



    // ------------------     DATA FOR THE LINE CHART         * GLOBAL DATA For 1 year *        ----------------
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





    //  ------------------     DATA FOR THE LINE CHART         * State - wise Data fetching *        ----------------
    useEffect(() => {
        const STATE_DATA = async () => {
            const Result_Arr = await fetch_StateData();
            console.log(Result_Arr);

            Result_Arr.sort(function (a, b) {
                return a["state"].localeCompare(b["state"]);
            });

            console.log(Result_Arr);
            setStateData(Result_Arr);
        }
        STATE_DATA();
    }, [])



    useEffect(() => {

        stateData.map((each_StateObj) => {
            if (each_StateObj.state === state) {
                console.log(each_StateObj)
                setStateData(each_StateObj)
                return each_StateObj;
            }
            else {
                console.log("No Match Found");
            }
        })

    }, [])




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
                            backgroundColor: ['#cdb4db', '#b5e48c', 'crimson'],
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



    const Doughnut_Graph = (
        confirmed ? (
            <Doughnut
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            data: [stateData.totalCases, stateData.recovered + stateData.recoveredNew, stateData.deaths + stateData.deathsNew],
                            // data: [confirmed.value, recovered.value, deaths.value],
                            backgroundColor: ['#cdb4db', '#b5e48c', 'crimson'],
                            hoverOffset: 1
                        },
                    ],
                }}
            />
        ) : null
    );




    return (
        <div>
            <div>
                {country ? Bar_Chart : Line_Graph}
            </div>

            <div>
                {Doughnut_Graph}

            </div>
        </div>
    )
}

export default Chart;
