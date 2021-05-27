
import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../Styles/cardDisplay.scss';
import CountUp from 'react-countup';


const CardsDisplay = (props) => {

    const { data = { confirmed: 0 }, country } = props;         // passing initial values 
    const { confirmed, deaths, lastUpdate, latitude, longitude, recovered } = data;

    // const { data = { {confirmed: 0}, deaths, lastUpdate, recovered }, country } = props;
    // const { confirmed: 0, deaths, lastUpdate, recovered } = data;


    // console.log(data)
    // console.log(country)



    return (


        <div>
            {/*   <Row >
                <Col style={{ paddingRight: "0px", alignItems: "center", justifyContent: "center" }}>
                    <p>Use preview channels to test and share dfsf sdfsfs changes a before going live</p>
                </Col>

                <Col style={{ paddingRight: "0px", alignItems: "center", justifyContent: "center" }}>
                    <p>Use preview channels to test and share dfsf sdfsfs changes a before going live</p>
                </Col>

                <Col md={4} xs={11} sm={11}>
                    <p>Use preview channels to test and share changes df dfdfdgdg dgedgert4e rt dfg sfdergtefdgv wsergw before going live</p>
                </Col>

            </Row> */}




            <div className="myflex">
                <div>
                    <div style={{ paddingRight: "0px", alignItems: "center", justifyContent: "center" }}>
                        <div className="flip">
                            <div className="front">
                                {/* <div className="card" style={{ marginRight: "0rem", width: "100%" }} > */}
                                <div className=" card-body text-center">
                                    <h4 className="card-title" id="infected">Infected</h4>
                                    {country ? (<h5>in  {country} </h5>) : null}

                                    <Card.Title>
                                        {
                                            confirmed && !country ?
                                                (
                                                    <CountUp
                                                        start={0}
                                                        end={confirmed.value}
                                                        duration={2.5}
                                                        separator=","
                                                    />
                                                ) :
                                                country ?
                                                    (<CountUp
                                                        start={0}
                                                        end={confirmed}
                                                        duration={2.5}
                                                        separator=","
                                                    />) :
                                                    null
                                        }
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                    <div className="icon"><i className="far fa-plus-square ico_big" style={{ color: "#008000" }}></i></div>
                                </div>
                                {/* </div> */}
                            </div>

                            <div className="back" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80)" }} >
                                <p className="text-shadow">SARS-CoV-2</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div style={{ paddingRight: "0px", alignItems: "center", justifyContent: "center" }}>
                        <div className="flip">
                            <div className="front">
                                <div className="card-body text-center">
                                    <h4 className="card-title" id="recovered">Recovered</h4>
                                    {country ? (<h5>in  {country} </h5>) : null}
                                    <Card.Title>
                                        {
                                            recovered && !country ?
                                                (
                                                    <CountUp
                                                        start={0}
                                                        end={recovered.value}
                                                        duration={2.5}
                                                        separator=","
                                                    />
                                                ) :
                                                country ?
                                                    (<CountUp
                                                        start={0}
                                                        end={recovered}
                                                        duration={2.5}
                                                        separator=","
                                                    />) :
                                                    null
                                        }
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                    <div className="icon"><i className="far fa-heart ico_big"></i></div>
                                </div>
                            </div>

                            <div className="back" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1584110007451-c9981a3496dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)" }} >
                                <p className="text-shadow">Wear Mask</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div style={{ paddingRight: "0px", alignItems: "center", justifyContent: "center" }}>
                        <div className="flip">
                            <div className="front">
                                <div className="card-body text-center">
                                    <h4 className="card-title" id="death">Death</h4>
                                    {country ? (<h5>in  {country} </h5>) : null}
                                    <Card.Title>
                                        {
                                            deaths && !country ?
                                                (
                                                    <CountUp
                                                        start={0}
                                                        end={deaths.value}
                                                        duration={2.5}
                                                        separator=","
                                                    />
                                                ) :
                                                country ?
                                                    (<CountUp
                                                        start={0}
                                                        end={deaths}
                                                        duration={2.5}
                                                        separator=","
                                                    />) :
                                                    null
                                        }
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                    <div className="icon"><i className="fas fa-skull-crossbones ico_big"></i></div>
                                </div>
                            </div>

                            <div className="back" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1587814969489-e5df12e17391?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1056&q=80)" }} >
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </div>








        /*   <Row id="mob_view" >
              <Col md={4} xs={12} sm={12} style={{ paddingRight: "0px", alignItems: "center", justifyContent: "center" }}>
                  <div className="flip">
                      <div className="front">
                          <div className="card" style={{ marginRight: "0rem", width: "100%" }} >
                              <div className=" card-body text-center">
                                  <h4 className="card-title" id="infected">Infected</h4>
                                  {country ? (<h5>in  {country} </h5>) : null}
  
                                  <Card.Title>
                                      {
                                          confirmed && !country ?
                                              (
                                                  <CountUp
                                                      start={0}
                                                      end={confirmed.value}
                                                      duration={2.5}
                                                      separator=","
                                                  />
                                              ) :
                                              country ?
                                                  (<CountUp
                                                      start={0}
                                                      end={confirmed}
                                                      duration={2.5}
                                                      separator=","
                                                  />) :
                                                  null
                                      }
                                  </Card.Title>
                                  <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                                  <div className="icon"><i className="far fa-plus-square ico_big" style={{ color: "#008000" }}></i></div>
  
                              </div>
                          </div>
                      </div>
  
                      <div className="back" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80)" }} >
                          <p className="text-shadow">SARS-CoV-2</p>
                      </div>
                  </div>
              </Col>
  
              <Col md={4} xs={12}>
                  <div className="flip">
                      <div className="front">
                          <div className="card-body text-center">
                              <h4 className="card-title" id="recovered">Recovered</h4>
                              {country ? (<h5>in  {country} </h5>) : null}
                              <Card.Title>
                                  {
                                      recovered && !country ?
                                          (
                                              <CountUp
                                                  start={0}
                                                  end={recovered.value}
                                                  duration={2.5}
                                                  separator=","
                                              />
                                          ) :
                                          country ?
                                              (<CountUp
                                                  start={0}
                                                  end={recovered}
                                                  duration={2.5}
                                                  separator=","
                                              />) :
                                              null
                                  }
                              </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                              <div className="icon"><i className="far fa-heart ico_big"></i></div>
                          </div>
                      </div>
  
                      <div className="back" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1584110007451-c9981a3496dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)" }} >
                          <p className="text-shadow">Wear Mask</p>
                      </div>
                  </div>
              </Col>
  
              <Col md={4} xs={12}>
                  <div className="flip">
                      <div className="front">
                          <div className="card-body text-center">
                              <h4 className="card-title" id="death">Death</h4>
                              {country ? (<h5>in  {country} </h5>) : null}
                              <Card.Title>
                                  {
                                      deaths && !country ?
                                          (
                                              <CountUp
                                                  start={0}
                                                  end={deaths.value}
                                                  duration={2.5}
                                                  separator=","
                                              />
                                          ) :
                                          country ?
                                              (<CountUp
                                                  start={0}
                                                  end={deaths}
                                                  duration={2.5}
                                                  separator=","
                                              />) :
                                              null
                                  }
                              </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted"> {new Date(lastUpdate).toDateString()} </Card.Subtitle>
                              <div className="icon"><i className="fas fa-skull-crossbones ico_big"></i></div>
                          </div>
                      </div>
  
                      <div className="back" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1587814969489-e5df12e17391?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1056&q=80)" }} >
                      </div>
                  </div>
              </Col>
          </Row> */

    )
}

export default CardsDisplay;
