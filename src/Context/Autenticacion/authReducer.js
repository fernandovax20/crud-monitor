import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    REGISTRADO, 
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
 } from '../../types'

export default function acceso(state, action){
    switch(action.type){

        //registro
        case REGISTRO_EXITOSO:
            return{
                ...state,
                registrado: true,
                mensaje: null,
            }
        
        case REGISTRADO:

            return{
                ...state,
                registrado: null,
                mensaje: null,
            }

        case REGISTRO_ERROR:

            return{
                ...state,
                mensaje: action.payload,
                registrado: null,
            }



        //Login   
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                autenticado: true,
                mensaje: null
            }
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                autenticado: null,
                mensaje: action.payload
            }
        case OBTENER_USUARIO: 

            return {
                ...state,
                autenticado: true,
                usuario: action.payload
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                usuario: null,
                autenticado: null,
            }
        
        default:
            return state;
    }
}