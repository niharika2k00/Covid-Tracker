
import React, { useState, useEffect } from 'react';
import { Dropdown, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import '../Styles/introscreen.css';


const IntroScreen = () => {

    return (
        <div style={{ backgroundColor: 'black' }}>
            <Link to='/covidupdates'>
                <section className="Button" id="btncenter" Style={{ marginLeft: "2rem", paddingLeft: "2rem" }}>
                    <a className="Button-btn" Style={{ marginLeft: "2rem", paddingLeft: "2rem" }} href="/">Updates </a>
                </section>
            </Link>

            <Particles
                params={{
                    "particles": {
                        "line_linked": {
                            "color": "#FFFFFF"
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
                style={{
                    width: '100%',
                    background: `#000000`
                }}
            />


        </div>
    )
}

export default IntroScreen;
