
import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../Styles/cardDisplay.css';
import CountUp from 'react-countup';


const CardsDisplay = ({ data: { confirmed, deaths, lastUpdate, recovered } }) => {

    // const { confirmed, deaths, lastUpdate, recovered } = props.data;



    console.log(confirmed);
    if (!confirmed)
        return "Loading ..";


    return (
        <div>
            <Row>
                <Col md={4} xs={12} sm={12} >
                    <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div className="mainflip">
                            <div className="frontside">
                                <div className="card" style={{ marginRight: "0rem", width: "100%" }} >
                                    <div className="card-body text-center">
                                        {/* <p><img className=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image" /></p> */}
                                        <h4 className="card-title">Infected</h4>
                                        <Card.Title>
                                            <CountUp
                                                start={0}
                                                end={confirmed.value}
                                                duration={2.5}
                                                separator=","
                                            />
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                        <a href="#" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i></a>
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
                                        <h4 className="card-title">Recovered</h4>
                                        <Card.Title>
                                            <CountUp
                                                start={0}
                                                end={recovered.value}
                                                duration={2.5}
                                                separator=","
                                            />
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                        <a href="#" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i></a>
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
                                        <h4 className="card-title">Death</h4>
                                        <Card.Title>
                                            <CountUp
                                                start={0}
                                                end={deaths.value}
                                                duration={2.5}
                                                separator=","
                                            />
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                        <a href="#" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i></a>
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
