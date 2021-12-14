import React from 'react';
import './Topbar.css';
import Imagen from "../../../img/LogoSolo.png";

export default function Topbar({value}) {
    
    
    
    return (
        <div className = "topbar">
            <div className = "topbarWrapper">
                <div className="topLeft">
                    <img src={Imagen} alt="Logo"/>
                    
                </div>
                <div className="topRigth">
                    <h2 className="welcome">Bienvenido {value ? value.rol: ''} {value ? value.nombre: ''}</h2>
                </div>
            </div>
        </div>
    );

}
