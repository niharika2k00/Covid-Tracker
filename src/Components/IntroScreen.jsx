
import React, { useState, useEffect } from 'react';
import { Dropdown, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import '../Styles/introscreen.css';


const IntroScreen = () => {


    const Mobile = window.innerWidth;

    return (
        <div style={{ backgroundColor: '#2ec4b6' }}>
            <Link to='/covidupdates'>
                <div className="butn">
                    <h1>
                        COVID Up<span className="first">da</span>tes
                    </h1>
                </div>

            </Link>



            { Mobile < 550 ?
                (
                    <Particles
                        className=" particles_style"
                        params={{
                            "particles": {
                                "line_linked": {
                                    "color": "#fff"
                                },
                                "number": {
                                    "value": 40
                                },
                                "size": {
                                    "value": 3
                                }
                            },
                            "interactivity": {
                                "events": {
                                    "onhover": {
                                        "enable": true,
                                        "mode": "repulse"
                                    }
                                }
                            }
                        }}
                    />
                )
                :
                (
                    <Particles
                        className=" particles_style"
                        params={{
                            "particles": {
                                "line_linked": {
                                    "color": "#fff"
                                },
                                "number": {
                                    "value": 130
                                },
                                "size": {
                                    "value": 3
                                }
                            },
                            "interactivity": {
                                "events": {
                                    "onhover": {
                                        "enable": true,
                                        "mode": "repulse"
                                    }
                                }
                            }
                        }}
                    />
                )
            }



        </div>
    )
}

export default IntroScreen;
