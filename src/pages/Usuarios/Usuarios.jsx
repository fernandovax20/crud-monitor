import React, { useContext, useState } from 'react'
import {  Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import LocationSearchingSharpIcon from '@mui/icons-material/LocationSearchingSharp';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UsuariosContext from '../../Context/Usuarios/usuariosContext';
import EditUser from '../EditUser/EditUser';
import Locations from'../Locations/locations';

import './Usuarios.css';


export default function Usuarios({usuarios}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [user, setUser] = useState('');

  const usuariosContext = useContext(UsuariosContext);
  const { borrarUsuarios} = usuariosContext;

  const handleAdd = () => {
    navigate(`/usuarios/add`);
  };

  const handleDelete = (uid) => {
    borrarUsuarios(uid);
  };

  const handleClose = () => setShow(false);
  const handleCloseLocation = () => setShowLocation(false);

  const handleShow = (uid) => {
    let user = usuarios.filter((user) => user.uid === uid)
    setUser(user[0]);
    setShow(true);
  }
  const handleLocation= (uid) => {
    let user = usuarios.filter((user) => user.uid === uid)
    setUser(user[0]);
    setShowLocation(true);
  }


  

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 250 },
    { field: 'correo', headerName: 'Correo', width: 500 },
    { field: 'uid', headerName: 'UID', width: 450 },
    { field: 'rol', headerName: 'Rol', width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <EditIcon className="userListEdit" onClick={() => handleShow(params.row.uid)} />
            <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.uid)} />
            <LocationSearchingSharpIcon  className="userListLocation"  onClick={() => handleLocation(params.row.uid)}/>
          </>
        );
      },
    },
  ];
  return (
    <div className="usuarios">
      <div>
        <AddIcon className='add' onClick={() => handleAdd()} />
      </div>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={usuarios}
          disableSelectionOnClick
          pageSize={9}
          rowsPerPageOptions={[9]}
          columns={columns}

        />
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuarios</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          <EditUser usuarios = {user} close = {handleClose}/>

        </Modal.Body>
      </Modal>

      <Modal show={showLocation} onHide={handleCloseLocation} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ultima Localizacion del usuario</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          <Locations usuarios={user}/>

        </Modal.Body>
      </Modal>

    </div>
  )
}