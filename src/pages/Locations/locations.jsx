import React, { useState } from 'react'
import SimpleMap from './Interfaz/SimpleMap'
import './locations.css'



export default function Locations({usuarios}) {
    const [coordenadas] = useState({
        lat: usuarios.latitud,
        lng: usuarios.longitud
    })
    

    return (

        <div style={{ width: "100%", height: '100%', margin: "0 auto" }}>
            {(coordenadas.lat && coordenadas.lng)===0?(<h2 style={{textAlign:'center'}}>El usuario no ha usado la aplicacion con geoseguimiento</h2>):(<SimpleMap data={coordenadas} />)}
            
        </div>
    )
}

