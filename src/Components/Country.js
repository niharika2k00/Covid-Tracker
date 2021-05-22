
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



    return (
        <div style={{ marginTop: "4rem", paddingTop: "1rem" }}>
            <h3 className="WWC" >World Wide COVID Live Updates  </h3>
            <form onChange={(e) => { country_ChangeHnadler(e.target.value) }} className=" country_search"  >
                <select className="form-select " aria-label="Default select example" id="panel"  >
                    <option selected value="global">Global</option>
                    {
                        countries.map((country, i) =>
                            <option value={country} key={i} >{country}</option>
                        )
                    }
                </select>
            </form>
        </div>
    )
}

export default Country
