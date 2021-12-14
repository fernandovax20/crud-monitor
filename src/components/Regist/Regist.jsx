import React, {useState, useContext, useEffect} from 'react';
import { Button, Card, Image, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

import AlertaContext from '../../Context/Alertas/AlertaContext';
import AuthContext from '../../Context/Autenticacion/authContext';
import Imagen from "../../img/Logo.png"
import "./Regist.css"

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 100px;
  border-color: red;
`;


const Regist = () => {

    const navigate = useNavigate();
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const {registrarUsuario, mensaje, registrado, estaRegistrado} = authContext;

    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if(registrado) {
            setLoading(true);
            setTimeout(() => {
                estaRegistrado();
                setLoading(false);
                navigate('/');
            }, 3000);
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, registrado, navigate]);

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    

    // extraer de usuario
    const { nombre, email, password, confirmar } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === '' ) {
                
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                
                return;
        }
        var regex = /\S+@\S+\.\S+/;
        if (regex.test(email) === false) {
            mostrarAlerta('Correo no valido, ingrese nuevamente', 'alerta-error');
            return;
        }

        // Password minimo de 6 caracteres
        if(password.length < 6) {
            mostrarAlerta('La contraseña debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Los 2 passwords son iguales
        if(password !== confirmar) {
            mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
            return;
        }
        registrarUsuario({
            "nombre": nombre,
            "correo": email,
            "password":password,
            "rol":"ADMIN"
        })

    }

    return (
        <div>
            
            {loading ? 
            (   <div>
                    <h2 style={{marginTop:200 ,textAlign:'center'}}>Ya te has registrado exitosamente, ya puedes iniciar sesión</h2>
                    <RingLoader color={'#2c69a6'} loading={loading} css={override} size={350} />
                </div>
            ) 
                : 
            (
                <div className="wave-wraper">
                    <div className="card">
                        <Card className="text-center" style={{marginTop:0}}>

                            <Card.Body>
                                <Image src={Imagen} style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px', width:300 }} />
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Nombre"
                                        aria-label="Nombre"
                                        aria-describedby="basic-addon1"
                                        name="nombre"
                                        value={nombre}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Correo"
                                        aria-label="Correo"
                                        aria-describedby="basic-addon1"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Contraseña"
                                        aria-label="Contraseña"
                                        aria-describedby="basic-addon1"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Contraseña nuevamente"
                                        aria-label="Contraseña"
                                        aria-describedby="basic-addon1"
                                        type="password"
                                        name="confirmar"
                                        value={confirmar}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
                                
                                <Button style={{ background: '#2c69a6', width:"110px"}} onClick={onSubmit}>Registrar</Button>
                                
                            </Card.Body>
                        </Card>
                    </div>



                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="wave wave3"></div>
                </div>
            ) }

        </div>
    );
}

export default Regist;