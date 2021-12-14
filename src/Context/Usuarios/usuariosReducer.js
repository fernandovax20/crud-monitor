import {
    OBTENER_USUARIOS,
    EDITAR_USUARIO
} from '../../types';

export default function acceso(state, action){
    switch(action.type){

        case OBTENER_USUARIOS:

            return {
                ...state,
                usuarios: action.payload
            }
        case EDITAR_USUARIO:

            return {
                ...state,
                editable: action.user
            }
        default:
            return state;
    }
}