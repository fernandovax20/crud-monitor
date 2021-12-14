import React, { useContext, useEffect}  from 'react';

import Home from "../../../pages/home/Home";
import Sidebar from "../../Layout/Sidebar/Sidebar"
import Topbar from "../../Layout/Topbar/Topbar";
import AuthContext from '../../../Context/Autenticacion/authContext';

import './Dashboard.css'

const DashboardHome = () => {
    
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario } = authContext;
    useEffect(() => {
        if(!usuario){
            usuarioAutenticado();
        }

    }, [usuario, usuarioAutenticado ])
    
    return (
        
        <div className="dashboard">
            <Topbar value={usuario}/>
            <div className="contenedor">
                <Sidebar/>
                <Home/>
                
            </div>
        </div>
    );
}

export default DashboardHome;