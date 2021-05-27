
import React, { useEffect, useState } from 'react';
import { fetch_Countries } from './API/Api.js';
import '../Styles/country.css';


const Country = ({ country_ChangeHnadler }) => {

    const [countries, setCountries] = useState([]);   // taking array as we have to map this later

    useEffect(() => {
        const COUNTRIES = async () => {
            const INFO = await fetch_Countries();
            setCountries(INFO);
        }

        COUNTRIES();
    }, []);


    useEffect(() => {
        // console.log(countries);  // array of obj [{} {} {}]
    }, [countries]);

    var Mobile = window.innerWidth;




    return (
        <div style={{ marginTop: "4rem", paddingTop: "1rem" }}>

            {
                Mobile < 550 ?
                    (
                        <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            <p>
                                <span className="WWC_mob">World  <i className="fas fa-globe-americas" style={{ paddingRight: "3px", color: "black", fontSize: "1.5rem" }}></i> Wide COVID Live Updates</span>
                            </p>
                        </div>
                    )
                    :
                    (
                        <div className="minihead">
                            <h2 className="subheading">
                                {" "}
                                <i className="fas fa-globe-americas" style={{ paddingRight: "9px", fontSize: "2rem" }}></i>
                                <span>  World Wide COVID Live Updates </span>{" "}
                            </h2>
                        </div >
                    )
            }



            <form onChange={(e) => { country_ChangeHnadler(e.target.value) }} className=" country_search"  >
                <select className="form-select " aria-label="Default select example" id="panel"  >
                    <option selected value="global" placeholder="Global" >Pick a country</option>
                    {
                        countries.map((country, i) =>
                            <option value={country} key={i} >{country}</option>
                        )
                    }
                </select>
            </form>
        </div >
    )
}

export default Country
