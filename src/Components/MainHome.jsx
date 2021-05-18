
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CHART from './Chart.js';
import COUNTRY from './Country.js';
import CARDS from './CardsDisplay.js';
import { fetchData } from './API/Api.js';
import '../App.css';



const MainHome = () => {

    const [data, setData] = useState({});               // world wide data
    const [country, setCountry] = useState('');          // country picker 
    const [state, setState] = useState('');              //  determine state using geolocation



    //  Fetching the data for the Individual Country
    useEffect(async () => {
        const fetched_DATA = await fetchData();
        console.log(fetched_DATA);
        setData(fetched_DATA);
    }, [setData]);


    useEffect(() => {
        console.log(data);
    }, [setData])



    //  Select the Country for details Visualisation
    const country_ChangeHnadler = async (coun) => {
        console.log(coun);
        const fetched_DATA = await fetchData(coun);
        console.log(fetched_DATA);
        setData(fetched_DATA);
        setCountry(coun);
    }



    // Getting Users Location  -----
    const Current_Location = async (position) => {
        try {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3697969502744aa2862b2adf7f520d3a`)
            // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=018c97d6cc253f65fa3f407c8e0fc518&units=metric`)
            const Actual_Object = await res.json();
            console.log(Actual_Object);
            var STATE = Actual_Object.results[0].components.state;
            console.log("STATE : ", STATE);
            setState(STATE);
        }
        catch (error) {
            console.log(error);
        }

        /*  const { latitude, longitude } = position.coords;
         console.log(latitude, longitude);
         fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3697969502744aa2862b2adf7f520d3a`)
             .then(res => res.json())
             .then(console.log); */
    };



    //  ----->    Method to get the position of the device
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(Current_Location, console.log);
    }, []);



    return (
        <div>
            <Container className="self_container">
                <CARDS
                    data={data}
                />
                <COUNTRY
                    country_ChangeHnadler={country_ChangeHnadler}
                />
                <CHART
                    data={data}
                    country={country}
                    state={state}
                />
            </Container>
        </div>
    )
}

export default MainHome;
