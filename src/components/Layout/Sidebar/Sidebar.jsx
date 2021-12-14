import "./Sidebar.css";
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import React, { useContext}  from 'react';
import { useNavigate } from "react-router-dom";

import AuthContext from '../../../Context/Autenticacion/authContext';

const Sidebar = () => {
    
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { cerrarSesion } = authContext;


    const salir = e =>{
        cerrarSesion();
        navigate('/');
    }
    const home = e =>{
        navigate('/home');
    }
    const usuarios = e =>{
        navigate('/usuarios');
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem" onClick={home}>
                            <HomeSharpIcon/>
                            Home
                        </li>
                        <li className="sidebarListItem" onClick={usuarios}>
                            <PersonSharpIcon/>
                            Usuarios
                        </li>
                    </ul>
                    <h3 className="sidebarTitle">Datos Personales</h3>
                    <ul className="sidebarList">
                        
                        <li className="sidebarListItem" onClick={salir}>
                                <LogoutSharpIcon/>
                                Salir
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
}

export default Sidebar;