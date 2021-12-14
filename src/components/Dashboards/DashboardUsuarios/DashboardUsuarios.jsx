import React, { useContext, useEffect}  from 'react';

import Sidebar from "../../Layout/Sidebar/Sidebar"
import Topbar from "../../Layout/Topbar/Topbar";
import AuthContext from '../../../Context/Autenticacion/authContext';
import UsuariosContext from '../../../Context/Usuarios/usuariosContext';
import Usuarios from '../../../pages/Usuarios/Usuarios';

import './DashboardUsuarios.css'


const DashboardHome = () => {
    
    const usuariosContext = useContext(UsuariosContext);
    const { obtenerUsuarios, usuarios } = usuariosContext;

    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario } = authContext;
    
   
    useEffect(() => {
            usuarioAutenticado();
            obtenerUsuarios()
    }, [])

    let rows;
    if(usuarios){
        rows = usuarios.map((user,i)=>{
            return  {id: i+1 ,...user};
        })
    }
    
    return (
        
        <div className="dashboard">
            <Topbar value={usuario}/>
            <div className="contenedor">
                <Sidebar/>
                {usuarios.length === 0 ?( 
                    <p className="loading">Cargando ... </p>
                ):(
                    <Usuarios usuarios={rows}/>
                )}
            </div>
        </div>
    );
}

export default DashboardHome;