import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

import "./Chart.css"


const CustomTooltip = ({ active, payload, data }) => {
  if (active && payload && payload.length) {
    let fecha = transform(payload[0].payload.created_at)

    let field ={
      title: '',
      datos: '',
      medicion: ''
    }

    switch(data){
      case 1:
        field = {
          title: 'Nivel de Agua Maximo',
          datos: payload[0].payload.field1,
          medicion: 'Cm'
        }
        break;
      case 2:
        field = {
          title: 'Nivel de Agua Minimo',
          datos: payload[0].payload.field2,
          medicion: 'Cm'
        }
        break;  
      case 3:
        field = {
          title: 'Nivel de Agua',
          datos: payload[0].payload.field3,
          medicion: 'Cm'
        }
        break;
      case 4:
        field = {
          title: 'Velocidad del Viento',
          datos: payload[0].payload.field4,
          medicion: 'Km/h'
        }
        break;
      case 5:
        field = {
          title: 'Temperatura',
          datos: payload[0].payload.field5,
          medicion: '°C'
        }
        break;
      case 6:
        field = {
          title: 'Humedad',
          datos: payload[0].payload.field6,
          medicion: '%'
        }
        break;
      default:
        break;
    }

    return (
      <div className="custom-tooltip" style={{backgroundColor:'#ffffff', padding:10, 
      boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
          
        <p className="label" >
          {`${field.title} : ${field.datos} ${field.medicion}`}
        </p>
        <p className="label" >
          {`Fecha : ${fecha}`}
        </p>
      </div>
    );
  }

  return null;
};

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

export default function Chart ({datos}) {
  const width = 470;
  const height = 300;
  const stroke = '#2c69a6';

  return (
        <div className = "chart">
            <div className="component">
                <h3>Temperatura °C</h3>
                <LineChart
                  width={width}
                  height={height}
                  data={datos}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="entry_id" />
                  <YAxis type="number" domain={['dataMin', 'auto']} />
                  <Tooltip content={<CustomTooltip data={5}/>}/>
                  <Line type="monotone" dataKey="field5"  stroke={stroke} label="false"/>
                </LineChart>
            </div>
            <div className="component">
                <h3>Humedad %</h3>
                <LineChart
                  width={width}
                  height={height}
                  data={datos}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="entry_id" />
                  <YAxis type="number" domain={['dataMin', 'auto']} />
                  <Tooltip content={<CustomTooltip data={6}/>}/>
                  <Line type="monotone" dataKey="field6"  stroke={stroke } />
                </LineChart>
            </div>
            <div className="component">
                <h3>Anemometro Km/h</h3>
                <LineChart
                  width={width}
                  height={height}
                  data={datos}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="entry_id" />
                  <YAxis type="number" domain={['dataMin', 'auto']} />
                  <Tooltip content={<CustomTooltip data={4}/>}/>
                  <Line type="monotone" dataKey="field4"  stroke={stroke } />
                </LineChart>
            </div>
            <div className="component">
                <h3>Nivel del Agua cm</h3>
                <LineChart
                  width={width}
                  height={height}
                  data={datos}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="entry_id" />
                  <YAxis type="number" domain={['dataMin', 'auto']} />
                  <Tooltip content={<CustomTooltip data={3}/>}/>
                  <Line type="monotone" dataKey="field3"  stroke={stroke } />
                </LineChart>
            </div>
            <div className="component">
                <h3>Nivel del Agua Maximo cm</h3>
                <LineChart
                  width={width}
                  height={height}
                  data={datos}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="entry_id" />
                  <YAxis type="number" domain={['dataMin', 'auto']} />
                  <Tooltip content={<CustomTooltip data={1}/>}/>
                  <Line type="monotone" dataKey="field1"  stroke={stroke } />
                </LineChart>
            </div>
            <div className="component">
                <h3>Nivel del Agua Minimo cm</h3>
                <LineChart
                  width={width}
                  height={height}
                  data={datos}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="entry_id" />
                  <YAxis type="number" domain={['dataMin', 'auto']} />
                  <Tooltip content={<CustomTooltip data={2}/>}/>
                  <Line type="monotone" dataKey="field2"  stroke={stroke } />
                </LineChart>
            </div>
        </div>
    )
}
