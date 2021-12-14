import React, {useState, useContext, useEffect}  from 'react';
import { Button, Card, Image, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import AlertaContext from '../../Context/Alertas/AlertaContext';
import AuthContext from '../../Context/Autenticacion/authContext';
import Imagen from "../../img/Logo.png"
import "./Login.css"


const Login = () => {
    const navigate = useNavigate();
    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    useEffect(() => {
        
        if(autenticado){
            navigate('/home');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, navigate]);


    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const registrar = e =>{
        navigate('/regist');
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if( email.trim() === '' || 
            password.trim() === '' ) {
                
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

        iniciarSesion({ 
            "correo": email,
            "password":password, 
        });
        
    }

    return (
        <div>
            <div className="wave-wraper">
                <div className="card">
                    <Card className="text-center" style={{marginTop:0}}>

                        <Card.Body>
                            <Image src={Imagen} style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px', width:300 }} />
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
                                { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
                                <Button style={{ background: '#2c69a6' }} onClick={onSubmit} >Iniciar Sesión</Button>
                        </Card.Body>
                        <Card.Footer >

                                <Button variant="outline-secondary" style={{ width: '60%', borderColor: '#f7f7f7' }} onClick={registrar}>Registrese</Button>
                            
                        </Card.Footer>
                    </Card>
                </div>



                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
            </div>


        </div>
    );
}

export default Login;