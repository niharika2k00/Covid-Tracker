
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CHART from './Chart.js';
import COUNTRY from './Country.js';
import CARDS from './CardsDisplay.js';
import { fetchData } from './API/Api.js';
import '../App.css';



const MainHome = () => {

    const [data, setData] = useState({});
    const [country, setCountry] = useState('');


    useEffect(async () => {
        const fetched_DATA = await fetchData();
        console.log(fetched_DATA);
        setData(fetched_DATA);
    }, [setData]);


    useEffect(() => {
        console.log(data);
    }, [setData])


    const country_ChangeHnadler = async (coun) => {
        console.log(coun);
        const fetched_DATA = await fetchData(coun);
        console.log(fetched_DATA);
        setData(fetched_DATA);
        setCountry(coun);
    }



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
                />
            </Container>
        </div>
    )
}

export default MainHome;
