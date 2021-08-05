
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../Styles/chart.css';
import { fetch_DailyData, fetch_StateData } from './API/Api.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import ReactMapGL, { Marker, LinearInterpolator } from 'react-map-gl';
// import mapboxgl from '!mapbox-gl';



const Chart = React.memo((props) => {

    const { data = { latitude: 0, longitude: 0 }, country, state } = props;
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
                                borderColor: '#005f73',
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
                            backgroundColor: ['#64c3d6', '#a8e440', 'crimson'],
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


    const Bar_Chart1 = () => {

        return (
            <>
                {
                    confirmed ? (
                        <Bar
                            data={{
                                labels: ['Infected', 'Recovered', 'Deaths'],
                                datasets: [
                                    {
                                        label: 'Infected',
                                        backgroundColor: ['#005f73', '#e9ff70', 'crimson'],
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
                }
            </>
        )
    };


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
                            backgroundColor: ['#005f73', '#e9ff70', 'crimson'],
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




    var WIDTH = window.innerWidth;

    let mapWidth = 730;
    let mapHeight = 450;
    if (WIDTH <= 370 || WIDTH === 360) {
        mapWidth = 344;
        mapHeight = 320;
    }

    else if (WIDTH >= 390 && WIDTH <= 400) {
        mapWidth = 376;
        mapHeight = 320;
    }

    else if (WIDTH === 393) {
        mapWidth = 376;
        mapHeight = 320;
    }



    const mapAPI_key = 'pk.eyJ1IjoibmloYXJpa2FkdXR0YSIsImEiOiJja3AwMGdrZmQweG9jMnhtY3Z4MWMxNjA5In0.19L02rWJz_paNh7KrP2RVg';

    const [theme, setTheme] = useState('streets-v11');
    const [viewport, setViewport] = useState({
        width: mapWidth,
        height: mapHeight,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 1.5,
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
                {
                    !country ?
                        (
                            <Row style={{ justifyContent: "center", alignItems: "center" }} id="line_bottomgap"  >
                                <Col md={10} lg={10} sm={10} style={{ height: "10rem" }} >
                                    {Line_Graph}
                                </Col>

                            </Row>
                        )
                        :
                        (
                            <Row style={{ margin: "0rem", justifyContent: "center", alignItems: "center" }} >
                                <Col md={7} xs={12} lg={7} style={{ padding: ".6rem", justifyContent: "center", alignItems: "center" }}>
                                    <h3 id="country_name">{country} </h3>

                                    {
                                        latitude && longitude ?
                                            (
                                                <div className="map_shadow" >
                                                    <ReactMapGL
                                                        style={{ justifyContent: "center", alignItems: "center" }}
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
                                                            draggable={false}
                                                            onDragEnd={(e) => handleMarkerPosition(e)}
                                                            latitude={latitude}
                                                            longitude={longitude}
                                                            offsetLeft={-5}
                                                            offsetTop={-70}
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
                                            ) : null
                                    }
                                </Col>

                                <Col md={5} lg={5} sm={10} id="bar_style" >
                                    {/* {country ?  : Line_Graph} */}
                                    {/* {Bar_Chart} */}
                                    <Bar_Chart1 />
                                </Col>
                            </Row>
                        )
                }

            </div>


            <section>
                <h3 id="LState" > Local State  </h3>
            </section>
            <Row className="rowTopgap" >
                <Col lg={6} md={6} sm={8} >
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
})

export default Chart;

