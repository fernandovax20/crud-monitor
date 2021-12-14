import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login/Login.jsx';
import DashboardHome from './components/Dashboards/DashboardHome/DashboardHome.jsx';
import DashboardUsuarios from './components/Dashboards/DashboardUsuarios/DashboardUsuarios';
import Regist from './components/Regist/Regist.jsx';
import AlertaState from './Context/Alertas/AlertaState';
import AuthState from './Context/Autenticacion/authState.js';
import UsuariosState from './Context/Usuarios/usuariosState.js';
import DashboardAddUser from './components/Dashboards/DashboardAddUser/DashboardAddUser.jsx';

function App() {
  return (
    <div className="App" >
      <AlertaState>
        <AuthState>
          <UsuariosState>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/regist" element={<Regist />} />
                <Route path="/home" element={<DashboardHome />} />
                <Route path="/usuarios" element={<DashboardUsuarios/>} />
                <Route path="/usuarios/add" element={<DashboardAddUser/>} />
              </Routes>
            </Router>
          </UsuariosState>
        </AuthState>
      </AlertaState>
    </div>
  );
}

export default App;
