
import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../Styles/cardDisplay.css';
import CountUp from 'react-countup';


const CardsDisplay = ({ data: { confirmed, deaths, lastUpdate, recovered }, country }) => {

    // const { confirmed, deaths, lastUpdate, recovered } = props.data;



    // console.log(confirmed);
    if (!confirmed)
        return "Loading ..";


    console.log(country)



    return (
        <div style={{ marginTop: "4rem", paddingTop: "1rem" }}  >
            <Row>
                <Col md={4} xs={12} sm={12} >
                    <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div className="mainflip">
                            <div className="frontside">
                                <div className="card" style={{ marginRight: "0rem", width: "100%" }} >
                                    <div className="card-body text-center">
                                        {/* <p><img className=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image" /></p> */}
                                        <h4 className="card-title" id="infected">Infected</h4>
                                        <h5>in  {country} </h5>
                                        <Card.Title>
                                            <CountUp
                                                start={0}
                                                end={confirmed.value}
                                                duration={2.5}
                                                separator=","
                                            />
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                        <div className="icon"><i className="far fa-plus-square ico_big" style={{ color: "#008000" }}></i></div>
                                        {/* <a href="#" className="btn btn-primary btn-sm"><i class="far fa-heart"></i></a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="backside">
                                <div className="card">
                                    <div className="card-body text-center mt-4">
                                        <h4 className="card-title">Sunlimetech</h4>
                                        <p className="card-text">This is basic card with image on top.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={4} xs={12}>
                    <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div className="mainflip">
                            <div className="frontside">
                                <div className="card" style={{ marginRight: "0rem", width: "100%" }} >
                                    <div className="card-body text-center">
                                        {/* <p><img className=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image" /></p> */}
                                        <h4 className="card-title" id="recovered" >Recovered</h4>
                                        <h5>in  {country} </h5>
                                        <Card.Title>
                                            <CountUp
                                                start={0}
                                                end={recovered.value}
                                                duration={2.5}
                                                separator=","
                                            />
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                        {/* <a href="#" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i></a>*/}
                                        <div className="icon"><i className="far fa-heart ico_big"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="backside">
                                <div className="card">
                                    <div className="card-body text-center mt-4">
                                        <h4 className="card-title">Sunlimetech</h4>
                                        <p className="card-text">This is basic card with image on top.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={4} xs={12}>
                    <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div className="mainflip">
                            <div className="frontside">
                                <div className="card" style={{ marginRight: "0rem", width: "100%" }} >
                                    <div className="card-body text-center">
                                        {/* <p><img className=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image" /></p> */}
                                        <h4 className="card-title" id="death">Death</h4>
                                        <h5>in  {country} </h5>
                                        <Card.Title>
                                            <CountUp
                                                start={0}
                                                end={deaths.value}
                                                duration={2.5}
                                                separator=","
                                            />
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                        {/* <a href="#" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i></a> */}
                                        <div className="icon"><i className="fas fa-skull-crossbones ico_big"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="backside">
                                <div className="card">
                                    <div className="card-body text-center mt-4">
                                        <h4 className="card-title">Sunlimetech</h4>
                                        <p className="card-text">This is basic card with image on top.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

            </Row>
        </div >
    )
}

export default CardsDisplay
