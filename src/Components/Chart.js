
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Styles/chart.css';
import { fetch_DailyData, fetch_StateData } from './API/Api.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';


const Chart = ({ data, country, state }) => {

    const { confirmed, recovered, deaths } = data;
    const [dailyData, setDailyData] = useState([]);   // GLOBAL DATA ---- taking array as we have to map this later
    const [stateData, setStateData] = useState([]); // taking array as we have]
    const [self_state, setSelf_State] = useState({});



    // ------------------     DATA FOR THE LINE CHART         * GLOBAL DATA For 1 year *        ----------------
    useEffect(() => {
        const DAILY_DATA = async () => {
            const INFO = await fetch_DailyData();
            setDailyData(INFO);
        }
        DAILY_DATA();
    }, []);

    useEffect(() => {
        // console.log(dailyData);  // array of obj [{} {} {}]
    }, [dailyData]);




    //  ------------------     DATA FOR THE DOUGHNUT CHART         * State - wise Data fetching *        ----------------
    useEffect(() => {
        const STATE_DATA = async () => {
            const Result_Arr = await fetch_StateData();
            // console.log(Result_Arr);

            Result_Arr.sort(function (a, b) {
                return a["state"].localeCompare(b["state"]);
            });

            console.log(Result_Arr);
            setStateData(Result_Arr);
        }
        STATE_DATA();
    }, []);



    useEffect(() => {
        if (stateData.length !== 0) {
            for (var i = 0; i < stateData.length; i++) {
                if (stateData[i].state === state) {
                    console.log(stateData[i]);
                    setSelf_State(stateData[i]);
                }
            }
        }
    }, [stateData]);


    useEffect(() => {
        if (Object.keys(self_state).length !== 0)
            console.log("SELF-STATE  : ", self_state);
    }, [self_state]);



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
                width={100}
                height={50}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    );



    const Doughnut_Graph = (
        confirmed ? (
            // Object.keys(self_state).length !== 0 ? (
            <Doughnut
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            data: [self_state.confirmed, self_state.recovered, self_state.deaths],
                            // data: [confirmed.value, recovered.value, deaths.value],
                            backgroundColor: ['#cdb4db', '#b5e48c', 'crimson'],
                            hoverOffset: 1,
                            borderRadius: 0,
                            borderWidth: 0,
                            width: "300px",
                            height: "200px",
                            outerRadius: '100%',
                            innerRadius: "99%",
                            cornerRadius: '7%',
                            padAngle: '10'
                        },
                    ],
                    width: "300px",
                    height: "200px",
                    title: { fontSize: 10 },
                }}
            />
        ) : null
    );




    return (
        <div>
            <div>
                {country ? Bar_Chart : Line_Graph}
            </div>

            <Row>
                <Col lg={10} md={10} sm={12} >
                    {Doughnut_Graph}
                </Col>

                <Col lg={2} md={2} sm={12} >
                    <p>Infected : {self_state.confirmed} </p>
                    <p>Recovered : {self_state.recovered} </p>
                    <p>Deaths : {self_state.deaths} </p>
                </Col>


            </Row>
        </div>
    )
}

export default Chart;
