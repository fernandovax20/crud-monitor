import React, {useReducer} from 'react';

import usuariosContext from './usuariosContext';
import usuariosReducer from './usuariosReducer';

import {
    OBTENER_USUARIOS,
    EDITAR_USUARIO,
    ERROR_USUARIO
} from '../../types';

import clienteAxios from '../../config/axios';


const UsuariosState = props =>{

    const initialState = {
        usuarios : [],
        editable: '',
        editado:false
    }

    const [state, dispatch] = useReducer(usuariosReducer, initialState)

    const obtenerUsuarios = async () => {
        try {
            const resultado = await clienteAxios.get('/api/usuarios?limite=100');
            
            dispatch({
                type: OBTENER_USUARIOS,
                payload: resultado.data.usuarios
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: ERROR_USUARIO,
                payload: alerta
            })
        }
    }

    const borrarUsuarios = async (id) => {
        try {

            await clienteAxios.delete(`/api/usuarios/${id}`,{headers:{'x-token': localStorage.getItem('token')}});
            obtenerUsuarios();

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: ERROR_USUARIO,
                payload: alerta
            })
        }
    }

    const editarUsuario = async (uid, data) => {
        try {
            await clienteAxios.put(`/api/usuarios/${uid}`, data);
            obtenerUsuarios();
            dispatch({
                type: EDITAR_USUARIO,
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: ERROR_USUARIO,
                payload: alerta
            })
        }
    }


    return(
        <usuariosContext.Provider
            value={{
                obtenerUsuarios,
                borrarUsuarios,
                editarUsuario,
                usuarios: state.usuarios,
                editable: state.editable,
                editado: state.editado
            }}
        >
            {props.children}
        </usuariosContext.Provider>
    );
}
export default UsuariosState
