
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../Styles/chart.css';
import { fetch_DailyData, fetch_StateData } from './API/Api.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import ReactMapGL, { Marker, LinearInterpolator } from 'react-map-gl';



const Chart = ({ data, country, state }) => {

    const { confirmed, recovered, deaths, longitude, latitude } = data;
    const [dailyData, setDailyData] = useState([]);     // GLOBAL DATA ---- taking array as we have to map this later
    const [stateData, setStateData] = useState([]);      // taking array as we have]
    const [self_state, setSelf_State] = useState({});    // single state obj 



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
                            label: 'Infected',
                            backgroundColor: ['#cdb4db', '#b5e48c', 'crimson'],
                            data: [confirmed, recovered, deaths],
                            borderWidth: 0,
                            // barThickness: "100",
                            // barPercentage: 0.5,
                            // categoryPercentage: 0.5
                            categoryPercentage: 0.5, barPercentage: 1.0
                        },
                    ],
                }}
                width=" 100%"
                height={100}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                    responsive: true,
                    maintainAspectRatio: false,
                    defaultFontSize: "14px",
                    legend: { display: false },
                    // The barPercentage and categoryPercentage (the default values are 0.9 and 0.8) are used to size the bar only if barThickness is not set.
                    scales: {
                        xAxes: [{ categoryPercentage: 0.5, barPercentage: 1.0 }]
                    }
                }}
            />
        ) : null
    );


    // ------------------------------   FOR self Location(state) represented in a DOUGHNUT Graph  ----------------
    const Doughnut_Graph = (
        Object.keys(self_state).length !== 0 ? (
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
                            outerRadius: '100%',
                            innerRadius: "99%",
                            cornerRadius: '7%',
                            padAngle: '10'
                        },
                    ],
                }}
                width={400}
                height={400}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    defaultFontSize: "14px",
                    legend: { display: false }
                }}
            />
        ) : null
    );






    let mapWidth = 730;
    let mapHeight = 450;
    if (window.innerWidth <= 600) {
        mapWidth = 500;
        mapHeight = 550;
    }



    const mapAPI_key = 'pk.eyJ1IjoibmloYXJpa2FkdXR0YSIsImEiOiJja3AwMGdrZmQweG9jMnhtY3Z4MWMxNjA5In0.19L02rWJz_paNh7KrP2RVg';

    const [theme, setTheme] = useState('streets-v11');
    const [viewport, setViewport] = useState({
        width: mapWidth,
        height: mapHeight,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 1,
    });
    const [marker, setMarker] = useState({ lat: 0, lan: 0, });
    const [transitionDuration, setTransitionDuration] = useState(200);


    const handleMarkerPosition = (e) => {
        e.preventDefault();
        setMarker({ lat: latitude, lan: longitude });
    };






    return (
        <div>
            <div>
                <Row>
                    <Col md={7} xs={12} lg={7}>
                        <h3 id="state_name">{country} </h3>
                        <div style={{ borderRadius: "50%" }}>
                            <ReactMapGL
                                getCursor={(e) => {
                                    if (e.isDragging) setTransitionDuration(0);
                                    else setTransitionDuration(200);
                                }}
                                {...viewport}
                                transitionDuration={transitionDuration}
                                transitionInterpolator={new LinearInterpolator()}
                                mapStyle={`mapbox://styles/mapbox/${theme}`}
                                mapboxApiAccessToken={mapAPI_key}
                                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                                onClick={(e) => {
                                    handleMarkerPosition(e);
                                    setViewport((v) => {
                                        return { ...v, latitude: e.lngLat[1], longitude: e.lngLat[0] };
                                    });
                                }}>
                                <Marker
                                    draggable
                                    onDragEnd={(e) => handleMarkerPosition(e)}
                                    latitude={latitude}
                                    longitude={longitude}
                                    offsetLeft={-25}
                                    offsetTop={-50}
                                >
                                    <div>
                                        <img
                                            src={require('../Assets/pin.svg').default}
                                            style={{ width: 50, height: 50, transformOrigin: 'center' }}
                                            alt='marker'
                                            draggable={false}
                                        />
                                    </div>
                                </Marker>
                            </ReactMapGL>
                        </div>

                    </Col>

                    <Col md={5} lg={5} sm={10} >
                        {country ? Bar_Chart : Line_Graph}
                    </Col>
                </Row>
            </div>

            <Row className="rowTopgap" >
                <Col lg={6} md={6} sm={12} >
                    {Doughnut_Graph}
                </Col>

                <Col lg={4} md={4} sm={12} id="details">
                    <h3 id="state_name">{self_state.state} </h3>
                    <p className="infected" >Infected : {self_state.confirmed} </p>
                    <p className="recovered">Recovered : {self_state.recovered} </p>
                    <p className="death" >Deaths : {self_state.deaths} </p>
                </Col>
            </Row>


        </div>
    )
}

export default Chart;

