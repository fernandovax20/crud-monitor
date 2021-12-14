import React, { useContext, useEffect}  from 'react';

import Sidebar from "../../Layout/Sidebar/Sidebar"
import Topbar from "../../Layout/Topbar/Topbar";
import AuthContext from '../../../Context/Autenticacion/authContext';
import AddUser from '../../../pages/AddUser/AddUser';

export default function DashboardAddUser() {

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
                <AddUser/>
            </div>
        </div>
    )
}
