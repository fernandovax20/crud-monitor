import React, {useEffect, useState} from 'react'
import Chart from '../../components/Charts/Chart'
import './Home.css'
import axios from 'axios'
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo';

const transform = (dateStr) => {
    const date = new Date(dateStr);
  
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    return (dt < 10 ? '0' : '') + dt + '/' + 
        (month < 10 ? '0' : '') + month + '/' + year + ' ' +  
        (hour < 10 ? '0' : '') + hour + ':' + 
        (min < 10 ? '0' : '') + min + ':' + sec;
  }

export default function Home() {

    const [datos, setDatos] = useState(null);

    const getData = async() =>{
        try {
          const datos = await axios.get('https://api.thingspeak.com/channels/1557662/feeds.json?api_key=97BYYUFW3V2UORV0&results=5')
          setDatos(datos.data.feeds)
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        if(!datos){
            getData();
        }
        setInterval(() => {
            getData();
        }, 60000);

    }, [datos])
    
    return (
        <div className = "home">
            <FeaturedInfo datos = {datos}/>
            <h2 className="update">Ultima Fecha de actualizacion {datos? transform(datos[4].created_at):''} </h2>
            <Chart datos={datos} />
        </div>
    )
}

