import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';


import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR, 
    REGISTRADO,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
 } from '../../types'


const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        registrado:null,
        usuario: null,
        mensaje: null,
    }


    const [ state, dispatch ] = useReducer(AuthReducer, initialState);


    const estaRegistrado = () =>{
        dispatch({
            type: REGISTRADO,
        })
    }

    const registrarUsuario = async datos =>{
        try {

            const respuesta = await clienteAxios.post('api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

        } catch (error) {
            const alerta = {
                msg: error.response.data.errors[0].msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth/login', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value ={{
                token: state.token,
                autenticado: state.autenticado,
                registrado: state.registrado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                estaRegistrado,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >{props.children}

        </AuthContext.Provider>

    )
}

export default AuthState;