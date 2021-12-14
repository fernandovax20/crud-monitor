import React from 'react'
import './FeaturedInfo.css'

export default function FeaturedInfo({datos}) {
    return (
        <div className='featured'>
            <div className="featuredItem">
                <span className="featuredTitle">Temperatura</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{datos ?datos[4].field5:''}</span>
                    <span className="featuredMoneyRate">
                        °C 
                    </span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Humedad</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{datos ?datos[4].field6:''}</span>
                    <span className="featuredMoneyRate">
                        % 
                    </span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Viento</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{datos ?datos[4].field4:''}</span>
                    <span className="featuredMoneyRate">
                        Km/h 
                    </span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Nivel Agua</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{datos ?datos[4].field3:''}</span>
                    <span className="featuredMoneyRate">
                        cm 
                    </span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Nivel Maximo</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{datos ?datos[4].field1:''}</span>
                    <span className="featuredMoneyRate">
                        cm
                    </span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Nivel Minimo</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{datos ?datos[4].field2:''}</span>
                    <span className="featuredMoneyRate">
                        cm 
                    </span>
                </div>
            </div>
            
        </div>
    )
}
