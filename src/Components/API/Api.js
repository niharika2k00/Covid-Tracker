
import axios from "axios";

const URL = "https://covid19.mathdro.id/api";



//  ------------  FETCHING GLOBAL DATA (for Bar Chart)  ------------
export const fetchData = async (country) => {

    let changeable_Url = URL;

    try {

        if (country) {
            // https://covid19.mathdro.id/api/countries/Algeria/confirmed
            changeable_Url = `${URL}/countries/${country}/confirmed`;

            const response = await axios.get(changeable_Url);
            const Obj = response.data[0];
            console.log(response)

            const usableData = {
                confirmed: Obj.confirmed,
                recovered: Obj.recovered,
                deaths: Obj.deaths,
                lastUpdate: Obj.lastUpdate,
                latitude: Obj.lat,
                longitude: Obj.long
            };
            console.log(usableData);
            return usableData;
        }

        else {
            // const response = await axios.get(URL);
            const { data } = await axios.get(changeable_Url);
            // const { confirmed, recovered } = data

            const usableData = {
                confirmed: data.confirmed,
                recovered: data.recovered,
                deaths: data.deaths,
                lastUpdate: data.lastUpdate,
            };
            console.log(usableData);
            return usableData;
        }

    } catch (error) {
        console.log(error);
    }
};



//  ------------  FETCHING GLOBAL DAILY DATA SET for 1 year (for Line Chart) ------------
export const fetch_DailyData = async () => {
    try {
        const response = await axios.get(`${URL}/daily`);
        const { data } = response;      // destructure
        // console.log(data);               // whole Array of Objects [{} {}]

        const usableData = data.map((obj) => (
            {
                confirmed: obj.confirmed.total,
                deaths: obj.deaths.total,
                date: obj.reportDate,
            }
        ));
        // console.log(usableData);
        return usableData;

    } catch (error) {
        console.log(error);
    }
};




//  ------------  FETCHING ALL THE  COUNTRIES  SET  ------------
export const fetch_Countries = async () => {
    try {
        const response = await axios.get(`${URL}/countries`);
        const { data } = response;
        // console.log(data.countries);               // whole Array of Objects [{} {}]

        const country_Name = data.countries.map((obj) => obj.name);
        return country_Name;

    } catch (error) {
        console.log(error);
    }
};




// --------------  Fetching data for each STATE IN INDIA ------------------------------
export const fetch_StateData = async () => {
    try {
        const response = await axios.get('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true');
        const { data } = response;
        // console.log(data);

        const Usable_State_Data = data.regionData.map((obj) => (    // regionData ---> [{} {} {}]
            {
                confirmed: obj.totalInfected,                       /* OBJ --> each array element */
                recovered: obj.recovered + obj.newRecovered,
                deaths: obj.deceased + obj.newDeceased,
                state: obj.region
            }
        ));
        console.log(Usable_State_Data);
        return Usable_State_Data;
        // return data;
    }
    catch (error) {
        console.log(error);
    }
};






/*
 const response = await axios.get(url);

 (insode function)
  confirmed : response.data.confirmed

.
             ||OR||

const { data } = await axios.get(url);

 (insode function)
confirmed : data.confirmed

             ||OR||


  const { data } = await axios.get(url);
  const { confirmed, recovered } = data

   confirmed: confirmed,  OR confirmed

*/
